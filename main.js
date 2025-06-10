
const supportedPairs = ["BTC-USD", "ETH-USD", "XRP-USD", "SOL-USD", "ADA-USD"];

async function fetchCandles(pair) {
  const response = await fetch(`https://api.exchange.coinbase.com/products/${pair}/candles?granularity=3600`);
  const data = await response.json();
  return data.slice(0, 30); // latest 30 candles
}

function drawChart(candles, pair) {
  const canvas = document.getElementById("candleChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0d1b2a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#29b882";
  ctx.fillText(`Live Chart (${pair})`, 20, 20);

  const max = Math.max(...candles.map(c => c[2]));
  const min = Math.min(...candles.map(c => c[1]));
  const scale = canvas.height / (max - min);

  candles.forEach((c, i) => {
    const open = c[3];
    const close = c[4];
    const high = c[2];
    const low = c[1];

    const x = 20 + i * 10;
    const yHigh = canvas.height - (high - min) * scale;
    const yLow = canvas.height - (low - min) * scale;
    const yOpen = canvas.height - (open - min) * scale;
    const yClose = canvas.height - (close - min) * scale;

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    ctx.strokeStyle = close >= open ? "#29b882" : "#ff4d4d";
    ctx.beginPath();
    ctx.moveTo(x - 2, yOpen);
    ctx.lineTo(x + 2, yClose);
    ctx.stroke();
  });
}

async function updateChart() {
  const pair = document.getElementById("pair").value;
  const candles = await fetchCandles(pair);
  drawChart(candles, pair);
}

// Initialize with XRP
window.onload = async () => {
  const select = document.getElementById("pair");
  supportedPairs.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    select.appendChild(option);
  });
  select.value = "XRP-USD";
  updateChart();

  const saved = localStorage.getItem("ATABEY_MEMORY");
  if (saved) {
    document.getElementById("memory-display").innerText = "[Memory: " + saved + "]";
  }
};
