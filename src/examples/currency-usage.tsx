// Example usage of currency helper throughout the application

import { formatETB, formatETBAmount, CURRENCY, PRICING_TIERS, usdToETB } from '../lib/currency';

// Example 1: In a product card
export const ProductCard = ({ price }: { price: number }) => (
  <div className="product-card">
    <h3>Web Development Package</h3>
    <div className="price">
      {formatETB(price)} / month
    </div>
  </div>
);

// Example 2: In a billing summary
export const BillingSummary = ({ subtotal, tax, total }: { 
  subtotal: number; 
  tax: number; 
  total: number; 
}) => (
  <div className="billing-summary">
    <div className="line-item">
      <span>Subtotal:</span>
      <span>{formatETB(subtotal)}</span>
    </div>
    <div className="line-item">
      <span>Tax (15%):</span>
      <span>{formatETB(tax)}</span>
    </div>
    <div className="line-item total">
      <span>Total:</span>
      <span>{formatETB(total)}</span>
    </div>
  </div>
);

// Example 3: Currency conversion utility
export const CurrencyConverter = () => {
  const usdPrices = [99, 199, 399];
  const etbPrices = usdPrices.map(usd => usdToETB(usd));
  
  return (
    <div className="converter">
      <h3>USD to ETB Conversion</h3>
      {usdPrices.map((usd, index) => (
        <div key={usd} className="conversion-line">
          ${usd} USD = {formatETB(etbPrices[index])}
        </div>
      ))}
    </div>
  );
};

// Example 4: Using predefined pricing tiers
export const QuickPricing = () => (
  <div className="quick-pricing">
    <div className="tier">
      <h4>Starter</h4>
      <p>{formatETB(PRICING_TIERS.starter)}/month</p>
    </div>
    <div className="tier">
      <h4>Professional</h4>
      <p>{formatETB(PRICING_TIERS.professional)}/month</p>
    </div>
    <div className="tier">
      <h4>Enterprise</h4>
      <p>{formatETB(PRICING_TIERS.enterprise)}/month</p>
    </div>
  </div>
);

// Example 5: Different formatting options
export const FormattingExamples = () => (
  <div className="formatting-examples">
    <h3>Currency Formatting Examples</h3>
    
    {/* With decimals */}
    <p>Precise amount: {formatETB(4599.99, { showDecimals: true })}</p>
    
    {/* Without currency symbol */}
    <p>Amount only: {formatETBAmount(4500)}</p>
    
    {/* Currency info */}
    <p>Currency: {CURRENCY.name} ({CURRENCY.code})</p>
    <p>Symbol: {CURRENCY.symbol}</p>
  </div>
);
