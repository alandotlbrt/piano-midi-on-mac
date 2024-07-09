const midi = require('midi');

const input = new midi.Input();

const portCount = input.getPortCount();

if (portCount === 0) {
  console.log('Aucun périphérique MIDI trouvé.');
  process.exit();
}

console.log('Périphériques MIDI disponibles :');
for (let i = 0; i < portCount; i++) {
  console.log(`${i}: ${input.getPortName(i)}`);
}

input.openPort(0);

input.on('message', (deltaTime, message) => {
  const [status, note, velocity] = message;

  if (status >= 144 && status <= 159) {
    const action = status >= 144 && status <= 159 ? 'Note On' : 'Note Off';
    console.log(`Action: ${action}, Note: ${note}, Vélocité: ${velocity}`);
  }
});

input.ignoreTypes(false, false, false);

console.log('Écoute des messages MIDI... Appuyez sur les touches de votre piano.');

process.on('SIGINT', () => {
  input.closePort();
  console.log('Port MIDI fermé.');
  process.exit();
});
