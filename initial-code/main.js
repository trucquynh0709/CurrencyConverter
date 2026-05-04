function convertCurrency(amount, from, to) {
  const rates = {
    USD: 1,
    VND: 25000,
    EUR: 1.08,
    AUD: 0.66,
  };

  if (!rates[from] || !rates[to]) {
    return "Invalid currency";
  }

  return (amount / rates[from]) * rates[to];
}