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

// Event listener for Convert button
document.addEventListener("DOMContentLoaded", function() {
  const convertButton = document.getElementById("convert-button");
  const amount1 = document.getElementById("amount-1");
  const currency1 = document.getElementById("currency-1");
  const amount2 = document.getElementById("amount-2");
  const currency2 = document.getElementById("currency-2");

  convertButton.addEventListener("click", function() {
    const inputAmount = parseFloat(amount1.value);
    const fromCurrency = currency1.value;
    const toCurrency = currency2.value;

    if (!amount1.value) {
      alert("Please enter an amount");
      return;
    }

    const result = convertCurrency(inputAmount, fromCurrency, toCurrency);
    
    if (typeof result === "string") {
      alert(result);
    } else {
      amount2.value = result.toFixed(2);
    }
  });
});


