export function valida(input){
    const tipoDeInput = input.dataset.tipo; //Con dataset se obtiene toda la colección de datas identificados dentro de código HTML y ".tipo" en este caso, es el identificador de un data específico.
    //Por cada uno de los inputs se verifica si existen dentro de la constante "validadores" de este caso.
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    //este if será para verificar validity
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]; 

//nuevo objeto para crear mensaje de error
const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch:"El correo no es válido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 dígitos XXXXXXXXXX"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch:"La dirección debe contener entre 4 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch:"La dirección debe contener entre 4 y 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch:"La dirección debe contener entre 4 y 40 caracteres"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
    mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje); 
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const difereciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return difereciaFechas <= fechaActual;
}