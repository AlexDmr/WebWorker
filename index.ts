// Import stylesheets
import './style.css';
import { loadAsBlob } from './utils';

// MIN an MAX values for computing Fibonnacci
const MIN = 2;
const MAX = 50;

// Pre-fill the table
const tbody = document.querySelector("tbody");
let str = ``;
for (let i = MIN; i <= MAX; i++) {
  str += `<tr><td>Fibonnacci(${i})</td><td></td><td></td></tr>`;
}
tbody.innerHTML = str;

// Get button reference
const bt = document.querySelector("button");

// Load and create 2 workers, subscribe to the button to start computation
Promise.all([loadAsBlob('./fibonnacci1.ts'), loadAsBlob('./fibonnacci2.ts')]).then( ([b1, b2]) => {
  const w1 = new Worker( b1 );
  const w2 = new Worker( b2 );

  bt.onclick = () => go(w1, w2);
} );

// Function that will handle compuatation distribution
async function go(w1: Worker, w2: Worker) {
  w1.postMessage(2);
  w2.postMessage(2);

  w1.onmessage = (msg) => {
    document.querySelector(`table tr:nth-child(${msg.data.nb - MIN + 1}) td:nth-child(2)`).textContent = JSON.stringify(msg.data);
    if (msg.data.nb < MAX) {
      w1.postMessage( msg.data.nb + 1 );
    }
  }
  w2.onmessage = (msg) => {
    document.querySelector(`table tr:nth-child(${msg.data.nb - MIN + 1}) td:nth-child(3)`).textContent = JSON.stringify(msg.data);
    if (msg.data.nb < MAX) {
      w2.postMessage( msg.data.nb + 1 );
    }
  }

  w1.onerror = console.error;
  w2.onerror = console.error;
}


