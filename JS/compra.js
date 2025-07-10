document.addEventListener("DOMContentLoaded", function () {
    // Recupera de sessionStorage los productos comprados
    // y el total de los mismos
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    const total = sessionStorage.getItem('total') || 0;
    // Pasa de texto a float y fija el número de decimales
    const totalNumerico = parseFloat(total) || 0;
    const totalFormateado = totalNumerico.toFixed(2);

    const resumenDiv = document.getElementById("detalle");

    let resumenTextoHTML = "<h3>Resumen de tu Compra</h3>";

    // Recorre la lista de productos que fueron recuperados 
    // de localstorage y lo presenta en pantalla
    for (let i = 0; i < productos.length; i++) {
        const productoActual = productos[i]; 
        resumenTextoHTML += `${productoActual.nombre}: $${parseFloat(productoActual.precio).toFixed(2)}<br>`;
    }

    // Presenta en pantalla el total a pagar
    resumenTextoHTML += `<strong>Total a pagar: $${totalFormateado}</strong>`;
    resumenDiv.innerHTML = resumenTextoHTML;

    function enviarFormulario(event) {
        event.preventDefault();

        // Toma del formulario los diferentes campos de contacto del cliente
        const nombreContacto = document.getElementById('nombre').value.trim();
        const emailContacto = document.getElementById('contactoEmail').value.trim();
        const telefonoContacto = document.getElementById('telefono').value.trim();

        // Verifica que se hayan cargado los datos de contacto
        if (!nombreContacto || !emailContacto || !telefonoContacto) {
            // Si falta algún campo se retira y advierte que falta algún dato para el envio del formulario.
            alert("Por favor, completa todos los campos de contacto antes de enviar.");
            return; 
        }

        // Recorre el array de productos y genera el texto de productos comprados para ser enviado al cliente
        let detallesCarritoParaEnvio = '';
        for (let i = 0; i < productos.length; i++) {
            const productoActual = productos[i];
            detallesCarritoParaEnvio += `${productoActual.nombre} - $ ${parseFloat(productoActual.precio).toFixed(2)}\n`;
        }
        console.log("1")
        // Texto con el detalle de la compra
        document.getElementById('carritoData').value = detallesCarritoParaEnvio;
        console.log("2")
        // Total de la compra
        document.getElementById('totalCarrito').value = `$${totalFormateado}`;
        console.log("3")
        // Envia el formulario
        document.getElementById('formulario').submit();
    }

    // Si se preciona el boton de envio lo detecta y ejecuta la funcion enviarFormulario
    const botonEnviar = document.getElementById('botonEnviar');
    if (botonEnviar) {
        botonEnviar.addEventListener('click', enviarFormulario);
    } else {
        console.warn("ADVERTENCIA: No se encontró el botón con ID 'botonEnviar'.");
    }
}); 