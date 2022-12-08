/**
 * type MATRIX = [a: BigInt, b: BigInt, c: BigInt, d: BigInt];
 * (a c)
 * (b d)
 */
function mult(M1, M2) {
    return [
        M1[0]*M2[0] + M1[2]*M2[1],
        M1[1]*M2[0] + M1[3]*M2[1],
        M1[0]*M2[2] + M1[2]*M2[3],
        M1[1]*M2[2] + M1[3]*M2[3],
    ]
}

function pow(M, n) {
    if (n <= 1) return M;
    const n2 = n%2===0 ? n/2 : (n-1)/2;
    const M2 = pow( mult(M, M), n2);
    return n%2 === 0 ? M2 : mult(M, M2);
}

function fibo(n) {
    const M0 = [BigInt(0), BigInt(1), BigInt(1), BigInt(1)];
    const res = pow(M0, n)[3];
    return res;
}

  onmessage = (msg) => {
    const start = Date.now();
    const nb = msg.data;
    const result = fibo(nb);
    console.log(`fibo3(${nb}) = ${result}`)
    postMessage( {duration: Date.now() - start, nb, result} );
  }


  console.log(
    "Matrix",
    [0, 1, 2, 3, 4, 5, 6].map( n => fibo(n) ),
  )