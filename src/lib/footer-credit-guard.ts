/**
 * Footer credit guard.
 *
 * The footer credit must read EXACTLY "Developed by Techithrive.com".
 * These helpers are used by the Footer (to fall back safely) and can be used by
 * a build-time check to fail the build on any wrong spelling.
 */

export const REQUIRED_FOOTER_CREDIT = 'Developed by Techithrive.com';

/** True only for the exact required string (no leading/trailing whitespace). */
export function isValidFooterCredit(value: string | undefined | null): boolean {
  return typeof value === 'string' && value === REQUIRED_FOOTER_CREDIT;
}

/**
 * Returns the credit if valid, otherwise the required string. Never throws, so
 * a typo in the CMS can't break the page render — the correct text is always
 * shown. Pair with assertFooterCredit() in a build check to catch typos early.
 */
export function safeFooterCredit(value: string | undefined | null): string {
  return isValidFooterCredit(value) ? (value as string) : REQUIRED_FOOTER_CREDIT;
}

/**
 * Throws on any wrong spelling/variation (e.g. "Techlthrive", "TechIThrive",
 * missing ".com"). Intended for a build-time guard or test.
 */
export function assertFooterCredit(value: string | undefined | null): void {
  if (!isValidFooterCredit(value)) {
    throw new Error(
      `Footer credit must be exactly "${REQUIRED_FOOTER_CREDIT}", but received: ${JSON.stringify(
        value
      )}`
    );
  }
}
