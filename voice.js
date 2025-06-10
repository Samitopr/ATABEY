
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function startVoiceRecognition() {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const voiceInput = event.results[0][0].transcript;
    document.getElementById('voice').value = voiceInput;
    simulateVoiceInput(voiceInput);
  };

  recognition.onerror = function(event) {
    document.getElementById('error').innerText = 'Voice error: ' + event.error;
  };

  recognition.start();
}
