// Import stylesheets
import './style.css';
import { loadAsBlob } from './utils';
declare const Chart;

// Get button reference
const bt = document.querySelector("button");

// Get canvas reference
const canvasFibo = document.querySelector("#chartFibo") as HTMLCanvasElement;

// Charts
const chart = new Chart(canvasFibo, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Récursion naïve',
      data: [],
      borderWidth: 1
    }, {
      label: 'Calcul linéaire',
      data: [],
      borderWidth: 1
    }, {
      label: 'Calcul matricielle',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      },
      y: {
        beginAtZero: true
      }
    }
  }
});
chart.options.animation = false; // disables all animations


// Load and create 2 workers, subscribe to the button to start computation
Promise.all([
  loadAsBlob('./fibonnacci1.ts'),
  loadAsBlob('./fibonnacci2.ts'),
  loadAsBlob('./fibonnacci3.ts'),
]).then( ([b1, b2, b3]) => {
  const w1 = new Worker( b1 );
  const w2 = new Worker( b2 );
  const w3 = new Worker( b3 );

  bt.onclick = () => go(w1, w2, w3);
} );

// Function that will handle compuatation distribution
async function go(w1: Worker, w2: Worker, w3: Worker) {
  const MIN = (document.querySelector("#MIN") as HTMLInputElement).valueAsNumber;
  const MAX = (document.querySelector("#MAX") as HTMLInputElement).valueAsNumber;
  const P = (document.querySelector("#P") as HTMLInputElement).checked;
  console.log(`fibo from ${MIN} to ${MAX}`);

  if ( (document.querySelector("#checkRec") as HTMLInputElement).checked ) w1.postMessage(MIN);
  if ( (document.querySelector("#checkLin") as HTMLInputElement).checked ) w2.postMessage(MIN);
  if ( (document.querySelector("#checkLog") as HTMLInputElement).checked ) w3.postMessage(MIN);

  chart.data.datasets.forEach( ds => ds.data = [] )
  chart.update();

  w1.onmessage = (msg) => {
    chart.data.datasets[0].data.push( {x: msg.data.nb, y: msg.data.duration} )
    if (msg.data.nb < MAX) {
      const next = P ? Math.max(1, msg.data.nb) * 2 : msg.data.nb + 1
      w1.postMessage( next );
    }
    chart.update();
  }
  w2.onmessage = (msg) => {
    chart.data.datasets[1].data.push( {x: msg.data.nb, y: msg.data.duration} )
    if (msg.data.nb < MAX) {
      const next = P ? Math.max(1, msg.data.nb) * 2 : msg.data.nb + 1
      w2.postMessage( next );
    }
  }
  w3.onmessage = (msg) => {
    chart.data.datasets[2].data.push( {x: msg.data.nb, y: msg.data.duration} )
    if (msg.data.nb < MAX) {
      const next = P ? Math.max(1, msg.data.nb) * 2 : msg.data.nb + 1
      w3.postMessage( next );
    }
  }

  setInterval( () => chart.update(), 100 );

  w1.onerror = console.error;
  w2.onerror = console.error;
  w3.onerror = console.error;
}


