
// Simulated AI identity recognition (expand with real backend later)
const knownUsers = {
  "Samitopr": {
    voicePattern: "samito", // simulated tag
    deviceHash: "owner-device-001"
  },
  "Natalie": {
    voicePattern: "natalita",
    deviceHash: "aunt-device-002"
  }
};

function autoRecognize() {
  const user = localStorage.getItem('auto_user');
  if (user && knownUsers[user]) {
    console.log("Welcome back " + user);
    localStorage.setItem('atabey_login', 'true');
    window.location.href = 'index.html';
  }
}

function simulateVoiceInput(input) {
  for (const [name, data] of Object.entries(knownUsers)) {
    if (input.toLowerCase().includes(data.voicePattern)) {
      localStorage.setItem('auto_user', name);
      localStorage.setItem('atabey_login', 'true');
      window.location.href = 'index.html';
      return;
    }
  }
  document.getElementById('error').innerText = "Voice not recognized. Try again.";
}
