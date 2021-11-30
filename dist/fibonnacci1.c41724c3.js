function fibo1(n) {
    if (n < 2) return n;
    return fibo1(n - 1) + fibo1(n - 2);
}
onmessage = (msg)=>{
    const start = Date.now();
    const nb = msg.data;
    const result = fibo1(nb);
    postMessage({
        duration: Date.now() - start,
        nb,
        result
    });
};

//# sourceMappingURL=fibonnacci1.c41724c3.js.map
