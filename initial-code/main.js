
function convertCurrency(amount, from, to) {
  const rates = {
    USD: 1,
    VND: 26283,
    EUR: 1.17193429,
    AUD: 0.71988728,
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

console.log(convertCurrency(100, "VND", "USD"));


