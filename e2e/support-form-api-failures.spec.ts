import { mockSupportersApi } from "./support/api";
import { expect, test } from "./support/fixtures";

const supporter = {
  name: "Maria Silva",
  email: "maria@example.com",
  city: "Belo Horizonte",
};

test.describe("Support form API failures", () => {
  test("keeps the filled data when the API rejects the registration", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page, [{ status: 500 }]);

    await supportForm.fill(supporter);
    await supportForm.submit();

    await expect(
      supportForm.toast("Erro ao enviar formulário. Tente novamente.")
    ).toBeVisible();
    await expect(supportForm.successPanel).toBeHidden();
    await expect(supportForm.nameInput).toHaveValue(supporter.name);
    await expect(supportForm.emailInput).toHaveValue(supporter.email);
    await expect(supportForm.cityInput).toHaveValue(supporter.city);
    await expect(supportForm.submitButton).toBeEnabled();

    expect(requests).toHaveLength(1);
  });

  test("reports a generic error when the request never reaches the API", async ({
    page,
    supportForm,
  }) => {
    await mockSupportersApi(page, [{ abort: true }]);

    await supportForm.fill(supporter);
    await supportForm.submit();

    await expect(
      supportForm.toast("Algo deu errado. Tente novamente mais tarde.")
    ).toBeVisible();
    await expect(supportForm.form).toBeVisible();
  });

  test("shows the sending state while the request is in flight", async ({
    page,
    supportForm,
  }) => {
    await mockSupportersApi(page, [{ status: 201, delayMs: 1500 }]);

    await supportForm.fill(supporter);
    await supportForm.submit();

    await expect(supportForm.submitButton).toHaveText("ENVIANDO...");
    await expect(supportForm.submitButton).toBeDisabled();

    await expect(supportForm.successPanel).toBeVisible();
  });

  test("lets the supporter retry after a failed attempt", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page, [
      { status: 500 },
      { status: 201 },
    ]);

    await supportForm.fill(supporter);
    await supportForm.submit();

    await expect(
      supportForm.toast("Erro ao enviar formulário. Tente novamente.")
    ).toBeVisible();

    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();
    expect(requests).toHaveLength(2);
  });
});
