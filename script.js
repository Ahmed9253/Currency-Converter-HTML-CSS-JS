const enterAmount = document.getElementById("amount");
const form = document.getElementById("currencyForm");
const baseCurrencySlect = document.getElementById("baseCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const result = document.getElementById("convertedAmount");

window.addEventListener("load", () => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then((res) => res.json())
        .then((data) => {
            const currencies = Object.keys(data.rates);
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency;
                option.innerText = currency;
                option.style.color = "rgb(38, 38, 92)";
                baseCurrencySlect.appendChild(option);
                toCurrencySelect.appendChild(option.cloneNode(true));
            });
        });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = enterAmount.value;
    const baseCurrency = baseCurrencySlect.value;
    const toCurrency = toCurrencySelect.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            result.innerText = `${amount} ${baseCurrency} = ${convertedAmount} ${toCurrency}`;
        });
});