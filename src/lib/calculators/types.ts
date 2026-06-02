/** Shared types for all calculators. */

export interface CalcRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface CalcResult {
  headline?: string;
  rows: CalcRow[];
  notes?: string[];
}

export interface CalcError {
  error: string;
}

export type CalcOutput = CalcResult | CalcError;

export interface Calculator {
  id: string;
  /** Takes raw string values keyed by input field_id; returns a result or an error. */
  calculate(values: Record<string, string>): CalcOutput;
}

export function isCalcError(output: CalcOutput): output is CalcError {
  return (output as CalcError).error !== undefined;
}
