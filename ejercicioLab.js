const textoBueno = '((PARENTESIS) [CORCHETES] [[[TRES CORCHETES]]] {{2 LLAVES}})'
const textoMalo = '((PARENTESIS) [CORCHETES] [[[TRES CORCHETES]]] {{2 LLAVES}}'

function validarTexto(texto) {
    let cantidadParentesisAbierto = 0
    let cantidadParentesisCerrado = 0
    let cantidadCorchetesAbierto = 0
    let cantidadCorchetesCerrado = 0
    let cantidadLlavesAbierto = 0
    let cantidadLlavesCerrado = 0

    for(let i = 0; i < texto.length; i++) {
        if(texto[i] === '(') cantidadParentesisAbierto++
        else if (texto[i] === ')') cantidadParentesisCerrado++
        else if (texto[i] === '[') cantidadCorchetesAbierto++
        else if (texto[i] === ']') cantidadCorchetesCerrado++
        else if (texto[i] === '{') cantidadLlavesAbierto++
        else if (texto[i] === '}') cantidadLlavesCerrado++    
    }
    

    if (cantidadParentesisAbierto === cantidadParentesisCerrado &&
        cantidadCorchetesAbierto === cantidadCorchetesCerrado &&
        cantidadLlavesAbierto === cantidadLlavesCerrado) 
        return true
    else return false
}

console.log(validarTexto(textoBueno))
console.log(validarTexto(textoMalo))