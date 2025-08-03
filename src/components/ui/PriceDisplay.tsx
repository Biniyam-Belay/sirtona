// src/components/ui/PriceDisplay.tsx
import { formatETBAmount, CURRENCY } from '../../lib/currency';

interface PriceDisplayProps {
  amount: number;
  period?: string;
  showSymbol?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const PriceDisplay = ({ 
  amount, 
  period, 
  showSymbol = true, 
  className = '',
  size = 'medium' 
}: PriceDisplayProps) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const periodClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className={`flex items-baseline ${className}`}>
      {showSymbol && (
        <span className={`${periodClasses[size]} text-gray-600 mr-1`}>
          {CURRENCY.symbol}
        </span>
      )}
      <span className={`${sizeClasses[size]} font-bold text-gray-800`}>
        {formatETBAmount(amount)}
      </span>
      {period && (
        <span className={`${periodClasses[size]} text-gray-600 ml-1`}>
          {period}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
