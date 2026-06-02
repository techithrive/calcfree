/** Shared types for all calculators. */

export interface CalcRow {
  label: string;
  value: string;
  emphasis?: boolean;
  /** Optional grouping key so results can render sectioned breakdown tables. */
  group?: string;
  /** Optional short note shown under the row (result interpretation). */
  note?: string;
}

export interface CalcResult {
  headline?: string;
  rows: CalcRow[];
  notes?: string[];
  /** Optional plain-English interpretation of what the result means. */
  interpretation?: string;
}

export interface CalcError {
  error: string;
}

export type CalcOutput = CalcResult | CalcError;

export interface Calculator {
  id: string;
  /** Takes raw string values keyed by input field_id; returns a result or an error. */
  calculate(values: Record<string, string>): CalcOutput;
  /** Optional named presets the UI can offer ("Typical contractor", etc.). */
  presets?: CalcPreset[];
}

/** A preset fills the form with a starting scenario. Future UI can surface these. */
export interface CalcPreset {
  label: string;
  values: Record<string, string>;
  description?: string;
}

export function isCalcError(output: CalcOutput): output is CalcError {
  return (output as CalcError).error !== undefined;
}

/**
 * Input field metadata — the contract a tool's CMS entry maps to. Documents the
 * full set of fields the framework supports so future tools (simple OR advanced)
 * share one shape. `advanced: true` inputs can sit behind an "Advanced settings"
 * disclosure; `optional: true` inputs don't block calculation.
 */
export interface CalcInput {
  label: string;
  field_id: string;
  type: 'currency' | 'percent' | 'number' | 'select' | 'toggle';
  unit?: string;
  required?: boolean;
  optional?: boolean;
  advanced?: boolean;
  help_text?: string;
  default?: string | number | boolean;
  min?: number;
  max?: number;
  options?: { label: string; value: string }[];
}
