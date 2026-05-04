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

// ── Helpers ──────────────────────────────────────────────
const fmt = (v, cur) =>
  cur === "VND"
    ? v.toLocaleString("en-US", { maximumFractionDigits: 0 })
    : v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });

const nowTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

// ── History ───────────────────────────────────────────────
let history = [];

function renderHistory() {
  const list = document.getElementById("history-list");
  const empty = document.getElementById("history-empty");
  if (history.length === 0) {
    empty.style.display = "block";
    list.innerHTML = "";
    return;
  }
  empty.style.display = "none";
  list.innerHTML = history.map(h => `
    <div class="history-item">
      <div class="history-item-left">
        <div class="history-item-main">${h.fromAmt} ${h.from} = <em>${h.toAmt} ${h.to}</em></div>
        <div class="history-item-rate">1 ${h.from} = ${h.rate} ${h.to}</div>
      </div>
      <div class="history-item-time">${h.time}</div>
    </div>
  `).join("");
}

// ── Main logic ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convert-button");
  const amount1 = document.getElementById("amount-1");
  const currency1 = document.getElementById("currency-1");
  const amount2 = document.getElementById("amount-2");
  const currency2 = document.getElementById("currency-2");
  const swapBtn = document.getElementById("swap-btn");
  const clearBtn = document.getElementById("clear-btn");
  const resultPlaceholder = document.getElementById("result-placeholder");
  const resultMain = document.getElementById("result-main");
  const resultEq = document.getElementById("result-eq");
  const resultRate = document.getElementById("result-rate");

  convertButton.addEventListener("click", function () {
    if (!amount1.value) {
      alert("Please enter an amount");
      return;
    }

    const inputAmount = parseFloat(amount1.value);
    const fromCurrency = currency1.value;
    const toCurrency = currency2.value;
    const result = convertCurrency(inputAmount, fromCurrency, toCurrency);

    if (typeof result === "string") {
      alert(result);
      return;
    }

    const fmtResult = fmt(result, toCurrency);
    const rate = convertCurrency(1, fromCurrency, toCurrency);
    const fmtRate = fmt(rate, toCurrency);

    // Update amount field
    amount2.value = result.toFixed(2);

    // Update result strip
    resultPlaceholder.style.display = "none";
    resultEq.innerHTML = `${inputAmount.toLocaleString()} ${fromCurrency} = <em>${fmtResult} ${toCurrency}</em>`;
    resultRate.textContent = `1 ${fromCurrency} = ${fmtRate} ${toCurrency}`;
    resultMain.classList.add("visible");

    // Add to history
    history.unshift({
      fromAmt: inputAmount.toLocaleString(),
      from: fromCurrency,
      toAmt: fmtResult,
      to: toCurrency,
      rate: fmtRate,
      time: nowTime(),
    });
    if (history.length > 6) history.pop();
    renderHistory();
  });

  swapBtn.addEventListener("click", function () {
    [currency1.value, currency2.value] = [currency2.value, currency1.value];
    amount2.value = "";
    resultMain.classList.remove("visible");
    resultPlaceholder.style.display = "block";
  });

  clearBtn.addEventListener("click", function () {
    history = [];
    renderHistory();
  });

  renderHistory();
});