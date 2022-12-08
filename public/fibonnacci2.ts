// export {};

function fibo(n) {
    if (n < 2) return n;
    let n2 = BigInt(0);
    let n1 = BigInt(1);
    for (let i = 2; i <= n; i++) {
      [n2, n1] = [n1, n1 + n2];
    }
    return n1;
  }

  onmessage = (msg) => {
    const start = Date.now();
    const nb = msg.data;
    const result = fibo(nb);
    // console.log("linear", nb, "->", result);
    postMessage( {duration: Date.now() - start, nb, result} );
  }
