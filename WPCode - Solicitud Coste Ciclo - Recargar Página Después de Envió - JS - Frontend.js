document.addEventListener('wpcf7mailsent', function(event) {
    // Comprueba el formulario
    if (event.detail.contactFormId === 9031) {
        setTimeout(function() {
            location.reload(); // Refresca la página después de 3 segundos
        }, 6000); // 6000 ms = 6 segundos
    }
}, false);
