(function() {
    const startTime = performance.now();
    window.addEventListener('load', function() {
        const endTime = performance.now();
        const loadTime = (endTime - startTime).toFixed(2);
        document.getElementById('time-info').innerText = `Page loaded in ${loadTime} ms`;
    });
})();
