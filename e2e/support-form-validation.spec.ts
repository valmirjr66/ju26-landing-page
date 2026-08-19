import { mockSupportersApi, parseMultipartBody } from "./support/api";
import { supportFormEnv } from "./support/env";
import { expect, test } from "./support/fixtures";

test.describe("Support form validation", () => {
  test("keeps submit disabled until name, a contact channel and city are filled", async ({
    supportForm,
  }) => {
    await expect(supportForm.submitButton).toBeDisabled();

    await supportForm.fill({ name: "Maria Silva" });
    await expect(supportForm.submitButton).toBeDisabled();

    await supportForm.fill({ email: "maria@example.com" });
    await expect(supportForm.submitButton).toBeDisabled();

    await supportForm.fill({ city: "Belo Horizonte" });
    await expect(supportForm.submitButton).toBeEnabled();
  });

  test("treats whitespace-only values as empty", async ({ supportForm }) => {
    await supportForm.fill({
      name: "   ",
      email: "maria@example.com",
      city: "Belo Horizonte",
    });
    await expect(supportForm.submitButton).toBeDisabled();

    await supportForm.fill({ name: "Maria Silva", city: "   " });
    await expect(supportForm.submitButton).toBeDisabled();
  });

  test("enables submit when WhatsApp is the only contact channel", async ({
    supportForm,
  }) => {
    await supportForm.fill({
      name: "Maria Silva",
      whatsapp: "11987654321",
      city: "Belo Horizonte",
    });

    await expect(supportForm.submitButton).toBeEnabled();
  });

  test("does not submit on Enter while a contact channel is missing", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({ name: "Maria Silva", city: "Belo Horizonte" });
    await supportForm.nameInput.press("Enter");
    await page.waitForTimeout(250);

    await expect(supportForm.form).toBeVisible();
    await expect(supportForm.contactHint).toBeVisible();
    expect(requests).toHaveLength(0);
  });

  test("rejects an e-mail without a domain suffix", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      email: "maria@invalido",
      city: "Belo Horizonte",
    });
    await supportForm.submit();

    await expect(supportForm.errorFor("email")).toHaveText("E-mail inválido");
    await expect(
      supportForm.toast("Por favor, preencha todos os campos corretamente")
    ).toBeVisible();
    await expect(supportForm.form).toBeVisible();
    expect(requests).toHaveLength(0);
  });

  test("rejects an incomplete WhatsApp number", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      whatsapp: "1199",
      city: "Belo Horizonte",
    });
    await supportForm.submit();

    await expect(supportForm.errorFor("whatsapp")).toHaveText(
      "WhatsApp inválido"
    );
    expect(requests).toHaveLength(0);
  });

  test("accepts a 10-digit landline as the contact number", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      whatsapp: "1133334444",
      city: "Belo Horizonte",
    });
    await supportForm.submit();

    await expect(supportForm.successPanel).toBeVisible();
    expect(parseMultipartBody(requests[0]).fields.whatsapp).toBe(
      "(11) 33334-444"
    );
  });

  test("clears a field error as soon as the supporter edits it", async ({
    page,
    supportForm,
  }) => {
    await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      email: "maria@invalido",
      city: "Belo Horizonte",
    });
    await supportForm.submit();

    await expect(supportForm.errorFor("email")).toBeVisible();

    await supportForm.emailInput.fill("maria@example.com");

    await expect(supportForm.errorFor("email")).toBeHidden();
  });

  test("announces the error to screen readers through the invalid field", async ({
    page,
    supportForm,
  }) => {
    await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      email: "maria@invalido",
      city: "Belo Horizonte",
    });
    await supportForm.submit();

    await expect(supportForm.emailInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    await expect(supportForm.emailInput).toHaveAttribute(
      "aria-describedby",
      "email-error"
    );
    await expect(supportForm.errorFor("email")).toHaveAttribute(
      "id",
      "email-error"
    );
  });

  test("lets native validation block an e-mail without an @", async ({
    page,
    supportForm,
  }) => {
    const requests = await mockSupportersApi(page);

    await supportForm.fill({
      name: "Maria Silva",
      email: "maria-sem-arroba",
      city: "Belo Horizonte",
    });
    await supportForm.submit();
    await page.waitForTimeout(250);

    const typeMismatch = await supportForm.emailInput.evaluate(
      (input: HTMLInputElement) => input.validity.typeMismatch
    );

    expect(typeMismatch).toBe(true);
    await expect(supportForm.errorFor("email")).toBeHidden();
    await expect(supportForm.form).toBeVisible();
    expect(requests).toHaveLength(0);
  });

  test("points the consent term to the published document", async ({
    supportForm,
  }) => {
    test.skip(!supportFormEnv.termUrl, "VITE_TERM_URL is not configured");

    await expect(supportForm.termsLink).toHaveAttribute(
      "href",
      supportFormEnv.termUrl
    );
    await expect(supportForm.termsLink).toHaveAttribute("target", "_blank");
  });
});
