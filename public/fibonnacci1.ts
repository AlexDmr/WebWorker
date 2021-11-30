// export {};

function fibo(n) {
  if (n < 2) return n;
  return fibo(n-1) + fibo(n-2);
}

onmessage = (msg) => {
  const start = Date.now();
  const nb = msg.data;
  const result = fibo(nb);
  postMessage( {duration: Date.now() - start, nb, result} );
}
