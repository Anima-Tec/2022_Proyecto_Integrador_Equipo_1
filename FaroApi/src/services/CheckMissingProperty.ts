import { Career } from "../model/Career";
import { Centre } from "../model/Centre";

export type CheckMissingPropertyResult = {
  ok: boolean;
  property?: string;
};

export const CheckMissingProperty_Centre = (
  body: Centre
): CheckMissingPropertyResult => {
  const centre: Centre = Object.assign(new Centre(), body);

  Object.keys(centre).forEach((key) => {
    if (centre[key] === null || centre[key] === undefined) {
      if (key !== "idCentre") return { ok: false, property: key };
    }
  });
  return { ok: true };
};

export const CheckMissingProperty_Career = (
  body: any
): CheckMissingPropertyResult => {
  const career: Centre = Object.assign(new Career(), body);

  Object.keys(career).forEach((key) => {
    if (career[key] === null || career[key] === undefined) {
      if (key !== "idCareer") return { ok: false, property: key };
    }
  });
  return { ok: true };
};
