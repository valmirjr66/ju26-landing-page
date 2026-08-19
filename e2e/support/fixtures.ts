import { test as base, expect } from "@playwright/test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { blockExternalRequests } from "./api";
import { SupportFormPage } from "./support-form-page";

type Fixtures = {
  supportForm: SupportFormPage;
  /** Scratch directory for upload files, removed once the test finishes. */
  tempDir: string;
};

export const test = base.extend<Fixtures>({
  tempDir: async ({}, use) => {
    const directory = await mkdtemp(path.join(tmpdir(), "ju26-e2e-"));

    await use(directory);
    await rm(directory, { recursive: true, force: true });
  },

  supportForm: async ({ page, baseURL }, use) => {
    if (!baseURL) {
      throw new Error("baseURL must be configured to run the e2e suite");
    }

    await blockExternalRequests(page, baseURL);

    const supportForm = new SupportFormPage(page);

    await supportForm.goto();
    await use(supportForm);
  },
});

export { expect };
