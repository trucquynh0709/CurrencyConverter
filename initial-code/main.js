function convertCurrency(amount, from, to) {
  const rates = {
    USD: 1,
    VND: 26337,
    EUR: 0.85345370,
    AUD: 1.38954087,
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


