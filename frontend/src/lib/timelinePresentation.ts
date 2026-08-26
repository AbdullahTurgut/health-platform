import { documentTypeLabels } from "@/lib/documentType";

import { imagingTypeLabels } from "@/lib/imagingType";

import { medicalTestCategoryLabels } from "@/lib/medicalTest";

import type { TestCategory } from "@/types/medicalTest";

import type { DocumentType } from "@/types/medicalDocument";

import type { ImagingType } from "@/types/imaging";

import type { TimelineEvent } from "@/types/timeline";

export type TimelinePresentation = {
  title: string;
  subtitle: string | null;
  description: string | null;
};

export function getTimelinePresentation(
  event: TimelineEvent,
): TimelinePresentation {
  switch (event.type) {
    case "VISIT":
      return getVisitPresentation(event);

    case "MEDICAL_TEST":
      return getMedicalTestPresentation(event);

    case "IMAGING":
      return getImagingPresentation(event);

    case "DOCUMENT":
      return getDocumentPresentation(event);

    case "MEDICATION":
      return {
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
      };
  }
}

function getVisitPresentation(event: TimelineEvent): TimelinePresentation {
  let title = event.title;

  if (title === "Medical Visit") {
    title = "Tıbbi Ziyaret";
  } else if (title.endsWith(" Visit")) {
    title = `${title.slice(0, -" Visit".length)} Ziyareti`;
  }

  return {
    title,
    subtitle: event.subtitle,
    description: event.description,
  };
}

function getMedicalTestPresentation(
  event: TimelineEvent,
): TimelinePresentation {
  return {
    title: event.title,
    subtitle: translateMedicalTestSubtitle(event.subtitle),
    description: event.description,
  };
}

function getImagingPresentation(event: TimelineEvent): TimelinePresentation {
  return {
    title: translateImagingTitle(event.title),
    subtitle: event.subtitle,
    description: event.description,
  };
}

function getDocumentPresentation(event: TimelineEvent): TimelinePresentation {
  return {
    title: event.title,
    subtitle: translateDocumentSubtitle(event.subtitle),
    description: event.description,
  };
}

function translateMedicalTestSubtitle(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const [rawCategory, ...rest] = value.split(" · ");

  const category =
    rawCategory in medicalTestCategoryLabels
      ? medicalTestCategoryLabels[rawCategory as TestCategory]
      : rawCategory;

  return rest.length > 0 ? `${category} · ${rest.join(" · ")}` : category;
}

function translateDocumentSubtitle(value: string | null): string | null {
  if (!value) {
    return null;
  }

  if (value in documentTypeLabels) {
    return documentTypeLabels[value as DocumentType];
  }

  return value;
}

function translateImagingTitle(value: string): string {
  const separator = " - ";

  const separatorIndex = value.indexOf(separator);

  const rawType =
    separatorIndex === -1 ? value : value.slice(0, separatorIndex);

  const remainder =
    separatorIndex === -1 ? "" : value.slice(separatorIndex + separator.length);

  const translatedType =
    rawType in imagingTypeLabels
      ? imagingTypeLabels[rawType as ImagingType]
      : rawType;

  return remainder ? `${translatedType} - ${remainder}` : translatedType;
}
