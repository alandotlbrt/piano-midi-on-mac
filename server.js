const express = require('express');
const path = require('path');
const midi = require('midi');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  initializeMidi();
});

function initializeMidi() {
  
  const input = new midi.Input();

  const activeNotes = new Set();

  const portCount = input.getPortCount();
  console.log(`Nombre de ports MIDI disponibles: ${portCount}`);

  if (portCount === 0) {
    console.log('Aucun périphérique MIDI trouvé.');
    return; 
  }

  try {
    input.openPort(0);
    console.log('Port MIDI ouvert.');

    const midiToNote = (note) => {
      const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const octave = Math.floor(note / 12) - 1;
      const noteName = notes[note % 12];
      return `${noteName}${octave}`;
    };

    input.on('message', (deltaTime, message) => {
      const [status, note, velocity] = message;
    
      if (status >= 144 && status <= 159 && velocity > 0) {
        activeNotes.add(note%12); 
      }

      if ((status >= 128 && status <= 143) || (status >= 144 && velocity === 0)) {
        activeNotes.delete(note%12); 
      };
      const sortedNotes = Array.from(activeNotes).sort((a, b) => a - b);
      console.log(sortedNotes)
      const rootNote = sortedNotes[0];
      if (sortedNotes.length == 3){
        const notesArray = sortedNotes
        if (notesArray[2]- notesArray[1]==3 && notesArray[1]-notesArray[0]==4){
          console.log(`accord majeur mon gars en ${midiToNote(notesArray[0])}`)
        } else if (notesArray[2]- notesArray[1]==4 && notesArray[1]-notesArray[0]==3){
          console.log(`accord mineur mon gars en ${midiToNote(notesArray[0])}`)
        } else {
          console.log("non")
        }

      }
      
    });

    input.ignoreTypes(false, false, false);
    console.log('Écoute des messages MIDI... Appuyez sur les touches de votre piano.');

    process.on('SIGINT', () => {
      input.closePort();
      console.log('Port MIDI fermé.');
      process.exit();
    });

  } catch (error) {
    console.error('Erreur lors de l\'ouverture du port MIDI:', error);
  }
}
