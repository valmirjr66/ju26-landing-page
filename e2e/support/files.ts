import { truncate, writeFile } from "node:fs/promises";
import path from "node:path";

const MB = 1024 * 1024;

export type UploadFile = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};

export const supportedImageFile: UploadFile = {
  name: "arte-da-campanha.png",
  mimeType: "image/png",
  buffer: Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64"
  ),
};

export const unsupportedFile: UploadFile = {
  name: "documento.pdf",
  mimeType: "application/pdf",
  buffer: Buffer.from("%PDF-1.4 not an accepted artwork format"),
};

export const mediaLimits = [
  {
    label: "an image",
    filename: "arte-da-campanha.png",
    maxBytes: 10 * MB,
    rejectionMessage: "A imagem deve ter no máximo 10 MB.",
  },
  {
    label: "an audio file",
    filename: "musica-da-campanha.mp3",
    maxBytes: 15 * MB,
    rejectionMessage: "O áudio deve ter no máximo 15 MB.",
  },
  {
    label: "a video",
    filename: "clipe-da-campanha.mp4",
    maxBytes: 25 * MB,
    rejectionMessage: "O vídeo deve ter no máximo 25 MB.",
  },
];

/**
 * Creates a sparse file so the megabyte-sized limits can be exercised without
 * allocating the bytes or shipping them to the browser. Chromium reads the size
 * from disk and infers the MIME type from the extension, just as it would for a
 * file the supporter picked themselves.
 */
export async function createSizedFile(
  directory: string,
  filename: string,
  bytes: number
): Promise<string> {
  const filePath = path.join(directory, filename);

  await writeFile(filePath, "");
  await truncate(filePath, bytes);

  return filePath;
}
