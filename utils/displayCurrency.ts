const currencySymbols: Record<string, string> = {
  NGN: '₦'
};

const displayCurrency = (num: number) => {
    // Strictly ensure num is a number
  if (typeof num !== 'number' || isNaN(num) || num === undefined || num === null) {
    return `${currencySymbols['NGN']}0.00`; // fallback
  }

  let formatted = '';

  // Force 2 decimal places
  formatted = num.toFixed(2);

  // Add commas for thousands manually
  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Prepend the ₦ symbol manually (override any previous formatting)
  formatted = currencySymbols['NGN'] + formatted;

  return formatted;  // Return the formatted currency
};

export default displayCurrency;
