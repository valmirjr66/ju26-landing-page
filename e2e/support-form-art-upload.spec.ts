import { mockSupportersApi, parseMultipartBody } from "./support/api";
import { supportFormEnv } from "./support/env";
import {
  createSizedFile,
  mediaLimits,
  supportedImageFile,
  unsupportedFile,
} from "./support/files";
import { expect, test } from "./support/fixtures";

test.describe("Artwork upload", () => {
  test.skip(
    !supportFormEnv.artUploadEnabled,
    "VITE_ENABLE_ART_UPLOAD is turned off"
  );

  test("reveals the upload panel only after the art option is selected", async ({
    supportForm,
  }) => {
    await expect(supportForm.artUploadPanel).toBeHidden();

    await supportForm.checkbox("art").check();
    await expect(supportForm.artUploadPanel).toBeVisible();
    await expect(supportForm.artFileInput).toHaveAttribute(
      "accept",
      ".png,.jpg,.jpeg,.webp,.mp4,.webm,.mp3,.wav"
    );

    await supportForm.checkbox("art").uncheck();
    await expect(supportForm.artUploadPanel).toBeHidden();
  });

  test("sends a supported artwork along with the registration", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Bruno Alves",
      email: "bruno@example.com",
      city: "Fortaleza",
    });
    await supportForm.checkbox("art").check();
    await supportForm.attachArtFile(supportedImageFile);
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();

    const { fields, files } = parseMultipartBody(requests[0]);

    expect(fields.check_supportArt).toBe("true");
    expect(files.artFile).toMatchObject({
      filename: supportedImageFile.name,
      contentType: supportedImageFile.mimeType,
    });
  });

  test("registers the supporter without a file when none is attached", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Bruno Alves",
      email: "bruno@example.com",
      city: "Fortaleza",
    });
    await supportForm.checkbox("art").check();
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();

    const { fields, files } = parseMultipartBody(requests[0]);

    expect(fields.check_supportArt).toBe("true");
    expect(files.artFile).toBeUndefined();
  });

  test("rejects an unsupported format and clears the selection", async ({
    supportForm,
  }) => {
    await supportForm.checkbox("art").check();
    await supportForm.attachArtFile(unsupportedFile);

    await expect(
      supportForm.toast("Formato de arquivo não suportado.")
    ).toBeVisible();
    expect(await supportForm.selectedArtFileCount()).toBe(0);
  });

  for (const { label, filename, maxBytes, rejectionMessage } of mediaLimits) {
    test(`rejects ${label} one byte above its limit`, async ({
      supportForm,
      tempDir,
    }) => {
      await supportForm.checkbox("art").check();
      await supportForm.attachArtFile(
        await createSizedFile(tempDir, filename, maxBytes + 1)
      );

      await expect(supportForm.toast(rejectionMessage)).toBeVisible();
      expect(await supportForm.selectedArtFileCount()).toBe(0);
    });
  }

  test("discards the attached file when the art option is unselected", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Bruno Alves",
      email: "bruno@example.com",
      city: "Fortaleza",
    });
    await supportForm.checkbox("art").check();
    await supportForm.attachArtFile(supportedImageFile);

    await supportForm.checkbox("art").uncheck();
    await supportForm.checkbox("art").check();

    expect(await supportForm.selectedArtFileCount()).toBe(0);

    await supportForm.submit();
    await expect(supportForm.successPanel).toBeVisible();

    expect(parseMultipartBody(requests[0]).files.artFile).toBeUndefined();
  });
});
