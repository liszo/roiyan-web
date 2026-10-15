// Hand-written placeholders. Replace with the generated OpenAPI types
// (lib/api/schema.d.ts) once the API publishes its schema.

/** Pillar codes from 04_GLOSSARY_AND_CODES.md. */
export type PillarCode = "GA" | "SY" | "AU" | "DS" | "PM" | "VB";

export type Pillar = {
  code: PillarCode;
  nameFa: string;
};

export type Service = {
  code: string;
  pillarCode: PillarCode;
  nameFa: string;
  /** One-time price in toman. Comes from the API; never a constant in this repo. */
  oneTimePriceToman: number;
  /** Monthly price in toman, or null if the service has none. */
  monthlyPriceToman: number | null;
};
