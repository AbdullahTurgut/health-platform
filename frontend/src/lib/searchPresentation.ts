import { diseaseStatusLabels } from "@/lib/disease";
import { documentTypeLabels } from "@/lib/documentType";
import { imagingTypeLabels } from "@/lib/imagingType";
import { medicalTestCategoryLabels } from "@/lib/medicalTest";
import { resultFlagLabels } from "@/lib/resultFlag";

import type { DiseaseStatus } from "@/types/disease";
import type { ImagingType } from "@/types/imaging";
import type { DocumentType } from "@/types/medicalDocument";
import type { TestCategory } from "@/types/medicalTest";
import type { SearchResultItem } from "@/types/search";
import type { ResultFlag } from "@/types/testResult";

export type SearchResultPresentation = {
  title: string;
  subtitle: string | null;
  description: string | null;
};

export function getSearchResultPresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  switch (result.type) {
    case "DISEASE":
      return getDiseasePresentation(result);

    case "VISIT":
      return getVisitPresentation(result);

    case "MEDICAL_TEST":
      return getMedicalTestPresentation(result);

    case "TEST_RESULT":
      return getTestResultPresentation(result);

    case "IMAGING":
      return getImagingPresentation(result);

    case "DOCUMENT":
      return getDocumentPresentation(result);

    case "DOCTOR":
    case "HOSPITAL":
    case "MEDICATION":
      return {
        title: result.title,
        subtitle: result.subtitle,
        description: result.description,
      };
  }
}

function getDiseasePresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  const subtitle =
    result.subtitle && result.subtitle in diseaseStatusLabels
      ? diseaseStatusLabels[result.subtitle as DiseaseStatus]
      : result.subtitle;

  return {
    title: result.title,
    subtitle,
    description: result.description,
  };
}

function getVisitPresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  let title = result.title;

  if (title === "Medical Visit") {
    title = "Tıbbi Ziyaret";
  } else if (title.endsWith(" Visit")) {
    title = `${title.slice(0, -" Visit".length)} Ziyareti`;
  }

  return {
    title,
    subtitle: result.subtitle,
    description: result.description,
  };
}

function getMedicalTestPresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  return {
    title: result.title,
    subtitle: translateMedicalTestSubtitle(result.subtitle),
    description: result.description,
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

function getTestResultPresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  return {
    title: result.title,
    subtitle: cleanTestResultSubtitle(result.subtitle),
    description: result.description,
  };
}

function cleanTestResultSubtitle(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const cleaned = value
    .replace(/^null\s+/i, "")
    .replace(/^null$/i, "")
    .trim();

  if (!cleaned) {
    return null;
  }

  const parts = cleaned.split(" · ");

  const possibleFlag = parts.at(-1);

  if (possibleFlag && possibleFlag in resultFlagLabels) {
    parts[parts.length - 1] = resultFlagLabels[possibleFlag as ResultFlag];
  }

  return parts.join(" · ");
}

function getImagingPresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  return {
    title: translateImagingTitle(result.title),
    subtitle: result.subtitle,
    description: result.description,
  };
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

function getDocumentPresentation(
  result: SearchResultItem,
): SearchResultPresentation {
  return {
    title: result.title,
    subtitle: translateDocumentSubtitle(result.subtitle),
    description: result.description,
  };
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
