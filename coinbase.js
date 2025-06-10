
async function fetchBalance() {
  try {
    const res = await fetch('https://samitopr.pythonanywhere.com/balance');
    const data = await res.json();
    document.getElementById('balance').innerText = 'Balance: $' + data.usd;
  } catch (err) {
    console.error('Balance fetch error:', err);
    document.getElementById('balance').innerText = 'Balance fetch failed.';
  }
}

async function tradeXRP(amount) {
  try {
    const res = await fetch('https://samitopr.pythonanywhere.com/trade', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({symbol: 'XRP-USD', amount: amount})
    });
    const result = await res.json();
    alert('Trade executed: ' + result.status);
  } catch (err) {
    console.error('Trade error:', err);
    alert('Trade failed.');
  }
}
