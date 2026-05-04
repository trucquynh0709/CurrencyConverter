function convertCurrency(amount, from, to) {
  const rates = {
    USD: 1,
    VND: 25000,
    EUR: 1.08,
    AUD: 0.66,
  };

  if (typeof amount !== "number" || isNaN(amount)) {
    return "Invalid amount";
  }

  if (amount < 0) {
    return "Amount cannot be negative";
  }

  if (amount > 1e12) {
    return "Amount too large";
  }

  if (!(from in rates) || !(to in rates)) {
    return "Invalid currency";
  }

  if (!rates[from] || !rates[to]) {
    return "Invalid currency";
  }

  return (amount / rates[from]) * rates[to];

  
}
console.log(convertCurrency(100, "USD", "VND")); 
// expect ~2500000

console.log(convertCurrency(2500000, "VND", "USD")); 
// expect ~100

console.log(convertCurrency(-100, "USD", "USD")); 
// expect 100

console.log(convertCurrency(100, "ABC", "USD")); 
// expect "Invalid currency"
