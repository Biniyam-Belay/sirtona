// src/lib/currency.ts

/**
 * Formats a number as Ethiopian Birr (ETB) currency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export function formatETB(
  amount: number,
  options: {
    showDecimals?: boolean;
    locale?: string;
  } = {}
): string {
  const { showDecimals = false, locale = 'en-US' } = options;
  
  // Format with proper thousand separators
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  
  return `${CURRENCY.symbol}${formatter.format(amount)}`;
}

/**
 * Formats a number as Ethiopian Birr without the currency symbol
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted number string
 */
export function formatETBAmount(
  amount: number,
  options: {
    showDecimals?: boolean;
    locale?: string;
  } = {}
): string {
  const { showDecimals = false, locale = 'en-US' } = options;
  
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  
  return formatter.format(amount);
}

/**
 * Currency constants for Ethiopian Birr
 */
export const CURRENCY = {
  symbol: 'Br',
  code: 'ETB',
  name: 'Ethiopian Birr',
} as const;

/**
 * Common pricing tiers in ETB for Ethiopian market
 * Based on competitive pricing for web development services in Ethiopia
 */
export const PRICING_TIERS = {
  starter: 4500, // Affordable entry level for small businesses
  professional: 9000, // Mid-tier for growing businesses
  enterprise: 18000, // Premium tier for large enterprises
} as const;

/**
 * Utility to convert USD to ETB (for reference)
 * Note: Exchange rates fluctuate, this is for estimation only
 */
export function usdToETB(usdAmount: number, exchangeRate: number = 45): number {
  return Math.round(usdAmount * exchangeRate);
}
