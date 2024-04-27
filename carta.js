// Función para validar el RUT
function validarRut(rut) {
    // Verificar que el RUT tenga el formato correcto (números y guión)
    var regex = /^[0-9]+-[0-9kK]{1}$/;
    if (!regex.test(rut)) {
        return false;
    }

    // Extraer el cuerpo y el dígito verificador del RUT
    var rutSinGuion = rut.replace('-', '');
    var cuerpo = rutSinGuion.slice(0, -1);
    var dvIngresado = rutSinGuion.slice(-1).toUpperCase();

    // Calcular el dígito verificador esperado
    var suma = 0;
    var multiplo = 2;
    for (var i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        if (multiplo < 7) {
            multiplo += 1;
        } else {
            multiplo = 2;
        }
    }
    var dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) {
        dvEsperado = 0;
    } else if (dvEsperado === 10) {
        dvEsperado = 'K';
    }

    // Comparar el dígito verificador ingresado con el esperado
    return dvIngresado === dvEsperado.toString();
}

// Función para generar la carta de presentación
function generarCarta() {
    // Obtener los valores de los campos del formulario
    var rut = document.getElementById('rut').value;
    var apellidoPaterno = document.getElementById('apellidoPaterno').value;
    var apellidoMaterno = document.getElementById('apellidoMaterno').value;
    var nombre = document.getElementById('nombre').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var edad = document.getElementById('edad').value;
    var genero = document.getElementById('genero').value;
    var email = document.getElementById('email').value;
    var celular = document.getElementById('celular').value;
    var profesion = document.getElementById('profesion').value;
    var motivacion = document.getElementById('motivacion').value;

    // Validar que todos los campos estén llenos
    if (rut === '' || apellidoPaterno === '' || apellidoMaterno === '' || nombre === '' || fechaNacimiento === '' || edad === '' || genero === '' || email === '' || celular === '' || profesion === '' || motivacion === '') {
        alert('Por favor completa todos los campos del formulario.');
        return;
    }

    // Validar el RUT
    if (!validarRut(rut)) {
        alert('El RUT ingresado no es válido.');
        return;
    }

    // Generar la carta de presentación
    var carta = `Carta de presentación:

    Estimado equipo de Chile Limpio,

    Me llamo ${nombre} ${apellidoPaterno} ${apellidoMaterno}, RUT ${rut}, y deseo postular al trabajo de apoyo ambiental en la isla de Chiloé. Tengo ${edad} años y soy ${genero}. Mi fecha de nacimiento es ${fechaNacimiento}.

    Soy ${profesion} y me motiva profundamente la oportunidad de contribuir al cuidado y preservación del medio ambiente en esta hermosa isla. ${motivacion}.

    Quedo a su disposición para cualquier consulta adicional.

    Atentamente,
    ${nombre}`;

    // Mostrar la carta en el campo de texto
    document.getElementById('carta').value = carta;
}
