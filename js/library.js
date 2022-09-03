


/**
 * Función que crea un nodo y lo devuelve
 * @param {String} tipo -> El tipo de nodo a crear
 * @param {String} txt -> Texto que llevará, en su caso, el nodo
 * @returns -> El nodo creado
 */
 export function newNode(tipo, txt) {

    if (txt == undefined)
        return document.createElement(tipo);
    else {
        let nodo = document.createElement(tipo);
        let texto = document.createTextNode(txt);

        nodo.appendChild(texto);
        return nodo;
    }
}


/**
 * Función que inserta un nodo después de otro
 * @param {*} nodo -> El nodo a insertar
 * @param {*} nodoRef -> El nodo referencia
 */
 export function insertAfter(nodo, nodoRef){

    if(nodoRef.nextSibling)
        nodoRef.parentNode.insertBefore(nodo, nodoRef.nextSibling);
    else
        nodoRef.parentNode.appendChild(nodo);
}
