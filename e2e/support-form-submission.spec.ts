import { mockSupportersApi, parseMultipartBody } from "./support/api";
import { supportFormEnv } from "./support/env";
import { expect, test } from "./support/fixtures";

test.describe("Support form submission", () => {
  test("registers a supporter who leaves only an e-mail", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      email: "maria@example.com",
      city: "Belo Horizonte",
    });
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();
    await expect(supportForm.successPanel).toContainText(
      "Obrigada pelo seu apoio! Entraremos em contato em breve."
    );
    await expect(supportForm.form).toBeHidden();
    await expect(
      supportForm.toast("Obrigada pelo apoio! Entraremos em contato em breve.")
    ).toBeVisible();

    expect(requests).toHaveLength(1);
    expect(parseMultipartBody(requests[0]).fields).toMatchObject({
      name: "Maria Silva",
      email: "maria@example.com",
      whatsapp: "",
      city: "Belo Horizonte",
      check_supportSocialMedia: "false",
      check_supportStreets: "false",
      check_supportArt: "false",
      check_receiveMaterial: "false",
      source: supportFormEnv.environment,
    });
  });

  test("registers a supporter who leaves only a WhatsApp number", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "João Pedro",
      whatsapp: "11987654321",
      city: "São Paulo",
    });
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();

    const { fields } = parseMultipartBody(requests[0]);

    expect(fields.email).toBe("");
    expect(fields.whatsapp).toBe("(11) 98765-4321");
    expect(fields.city).toBe("São Paulo");
  });

  test("sends every support option the supporter selected", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Ana Souza",
      email: "ana@example.com",
      whatsapp: "11987654321",
      city: "Recife",
    });
    await supportForm.checkbox("socialMedia").check();
    await supportForm.checkbox("streets").check();
    await supportForm.checkbox("receiveMaterial").check();
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();

    expect(parseMultipartBody(requests[0]).fields).toMatchObject({
      check_supportSocialMedia: "true",
      check_supportStreets: "true",
      check_supportArt: "false",
      check_receiveMaterial: "true",
    });
  });

  test("authenticates the request with the configured API key", async ({
    page,
    supportForm,
  }) => {
    test.skip(!supportFormEnv.apiKey, "VITE_API_KEY is not configured");

    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Carla Dias",
      email: "carla@example.com",
      city: "Salvador",
    });
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();

    const headers = await requests[0].allHeaders();

    expect(requests[0].method()).toBe("POST");
    expect(headers["x-api-key"]).toBe(supportFormEnv.apiKey);
  });
});
