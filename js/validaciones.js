// const inputNacimiento = document.querySelector('#birth');

// inputNacimiento.addEventListener('blur',(evento) =>{
//     validarNacimiento(evento.target);
// });

export function valida(input) {
    const tipoDeInput = input.dataset.tipo; // atributo data-"tipo" en nuestro caso
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    
    // console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML='';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío.',
    },

    email: {
        valueMissing: 'El campo correo no puede estar vacío.',
        typeMismatch: 'El correo no es válido.',
    },

    password: {
        valueMissing: 'El campo contraseña no puede estar vacío.',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.',
    },

    nacimiento: {
        valueMissing: 'El campo fecha de nacimiento no puede estar vacío.',
        customError: 'Debes tener al menos 18 años de edad.',
    },

    numero: {
        valueMissing: 'El campo número de teléfono no puede estar vacío.',
        patternMismatch: 'El formato requerido es XXX-XXX-XXX 9 números',
    },

    direccion: {
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres.',
    },

    ciudad: {
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'La ciudad debe contener entre 4 a 30 caracteres.',
    },

    estado: {
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'El estado debe contener entre 4 a 30 caracteres.',
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach( (error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    });

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad.';
    }
    // Funcion el cual nos permitira enviar un mensaje de error personalizado.
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    // console.log(fecha,'|||||',fechaActual);
    return (diferenciaFechas <= fechaActual);
}