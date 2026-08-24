export const MAX_MEDICAL_DOCUMENT_SIZE = 10 * 1024 * 1024;

export const ALLOWED_MEDICAL_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;

  return `${mb.toFixed(1)} MB`;
}

export function isAllowedMedicalDocumentFile(file: File): boolean {
  return (ALLOWED_MEDICAL_DOCUMENT_MIME_TYPES as readonly string[]).includes(
    file.type,
  );
}
