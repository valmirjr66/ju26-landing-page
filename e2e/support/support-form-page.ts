import { expect, type Locator, type Page } from "@playwright/test";
import type { UploadFile } from "./files";

export type TextField = "name" | "email" | "whatsapp" | "city";

export type CheckboxField =
  "socialMedia" | "streets" | "art" | "receiveMaterial";

const CHECKBOX_TEST_IDS: Record<CheckboxField, string> = {
  socialMedia: "support-form-check-support-social-media",
  streets: "support-form-check-support-streets",
  art: "support-form-check-support-art",
  receiveMaterial: "support-form-check-receive-material",
};

export type SupportFormValues = Partial<Record<TextField, string>>;

export class SupportFormPage {
  readonly page: Page;
  readonly form: Locator;
  readonly successPanel: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly whatsappInput: Locator;
  readonly cityInput: Locator;
  readonly contactHint: Locator;
  readonly submitButton: Locator;
  readonly artUploadPanel: Locator;
  readonly artFileInput: Locator;
  readonly termsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.getByTestId("support-form");
    this.successPanel = page.getByTestId("support-form-success");
    this.nameInput = page.getByTestId("support-form-name");
    this.emailInput = page.getByTestId("support-form-email");
    this.whatsappInput = page.getByTestId("support-form-whatsapp");
    this.cityInput = page.getByTestId("support-form-city");
    this.contactHint = page.getByTestId("support-form-contact-hint");
    this.submitButton = page.getByTestId("support-form-submit");
    this.artUploadPanel = page.getByTestId("support-form-art-upload");
    this.artFileInput = page.getByTestId("support-form-art-file");
    this.termsLink = page.getByTestId("support-form-terms-link");
  }

  async goto() {
    await this.page.goto("/");
    await this.waitForSettledLayout();
    await this.form.scrollIntoViewIfNeeded();
    await expect(this.nameInput).toBeVisible();
  }

  /**
   * Custom fonts and hero images reflow the sections above the form, which
   * keeps every element below them moving. Waiting for both avoids acting on
   * a target that Playwright still considers unstable.
   */
  private async waitForSettledLayout() {
    await this.page.waitForFunction(
      () =>
        document.fonts.status === "loaded" &&
        Array.from(document.images).every(image => image.complete)
    );
  }

  input(field: TextField): Locator {
    return this.page.getByTestId(`support-form-${field}`);
  }

  errorFor(field: TextField): Locator {
    return this.page.getByTestId(`support-form-${field}-error`);
  }

  checkbox(field: CheckboxField): Locator {
    return this.page.getByTestId(CHECKBOX_TEST_IDS[field]);
  }

  toast(text: string): Locator {
    return this.page.locator("[data-sonner-toast]").filter({ hasText: text });
  }

  async fill(values: SupportFormValues) {
    if (values.name !== undefined) await this.nameInput.fill(values.name);
    if (values.email !== undefined) await this.emailInput.fill(values.email);
    if (values.whatsapp !== undefined) await this.typeWhatsApp(values.whatsapp);
    if (values.city !== undefined) await this.cityInput.fill(values.city);
  }

  /**
   * The WhatsApp field is masked and reformats whatever it already holds, so
   * it has to be emptied before the new digits are applied.
   */
  async typeWhatsApp(digits: string) {
    await this.whatsappInput.fill("");
    await this.whatsappInput.fill(digits);
  }

  async attachArtFile(file: UploadFile | string) {
    await this.artFileInput.setInputFiles(file);
  }

  async selectedArtFileCount(): Promise<number> {
    return this.artFileInput.evaluate(
      (input: HTMLInputElement) => input.files?.length ?? 0
    );
  }

  async submit() {
    await this.submitButton.click();
  }
}
