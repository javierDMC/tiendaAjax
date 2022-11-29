
function pintarTabla(datosTabla) {

    const listaArticulosDB = JSON.parse(datosTabla);

    const contenedorTabla = document.getElementById("contenedorTabla");
    contenedorTabla.innerHTML = "";

    //pinta la primera linea de la tabla
    let htmlTabla = `<table id="tabla" class="table table-striped table-info mx-1 mb-3">\
			<tr>\
			<th>Código</th>\
			<th>Nombre</th>\
			<th>Descripción</th>\
			<th>Precio</th>\
			<th>Unidades</th>\
			<th></th>\
            `;
    contenedorTabla.innerHTML += htmlTabla;

    //pinta el resto de lineas de la tabla, una por cada registro en la base de datos
    listaArticulosDB.forEach(articulo => {
        htmlTabla += `<tr>\
        <th>${articulo.id}</th>\
        <th>${articulo.nombre}</th>\
        <th>${articulo.descripcion}</th>\
        <th>${articulo.precio} €</th>\
        <th><button id="${articulo.id}" class="btn btn-primary">Modificar</button>\
        <button id="${articulo.id}" class="btn btn-danger">Borrar</button>\
        </th>\
        </tr>`;
        contenedorTabla.innerHTML = htmlTabla;
    });

    htmlTabla += `</table>`;
    contenedorTabla.innerHTML = htmlTabla;

    //adddEvenListener de los botones
    Array.from(document.getElementsByClassName("btn btn-primary")).forEach(btn => btn.addEventListener("click", () => this.getById(btn.id)));
    Array.from(document.getElementsByClassName("btn btn-danger")).forEach(btn => btn.addEventListener("click", () => this.borraArticulo(btn.id)));

}

function get() {

    //petición AJAX, la propia petición pinta la tabla actualizada
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/articulos");

    xhr.setRequestHeader("Content-type", "application/Json;charset=utf-8");

    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 200) {
            pintarTabla(xhr.response);
        } else {
            console.log("ERROR " + xhr.status + " " + xhr.statusText)
        }
    }

}

function getById(id) {

    //petición AJAX pasando el id para que solo nos retorne ese articulo
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/articulos/" + id);

    xhr.setRequestHeader("Content-type", "application/Json;charset=utf-8");

    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 200) {
            //se llama a la función mostrarDialog,que abre el dialog y muestra el articulo recuperado
            mostrarDialogMod(xhr.response);
        } else {
            console.log("ERROR " + xhr.status + " " + xhr.statusText)
        }
    }
}

function create() {
    //asignacion del dialogo 
    const dialogo = document.getElementById("miDialogo");

    dialogo.showModal();
}

function anyadirArticulo() {

    //recuperacion de los valores introducidos en el formulario mediante nombre del campo en el formulario
    let id = document.formularioNuevoArticulo.articulo_id.value;
    let productoNombre = document.formularioNuevoArticulo.articulo_nombre.value;
    let productoDescripcion = document.formularioNuevoArticulo.articulo_descripcion.value;
    let productoPrecio = document.formularioNuevoArticulo.articulo_precio.value;


    //petición AJAX
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000/articulos");

    let miPost = { "id": id, "nombre": productoNombre, "descripcion": productoDescripcion, "precio": parseInt(productoPrecio) };

    xhr.setRequestHeader("Content-type", "application/Json;charset=utf-8");

    xhr.send(JSON.stringify(miPost));

    xhr.onload = function () {
        if (xhr.status == 201) {
            console.log(xhr.response)
        } else {
            console.log("ERROR " + xhr.status + " " + xhr.statusText)
        }
    }


}

function actualizarArticulo(){

    //recuperacion de los valores introducidos en el formulario
    let id_mod = document.getElementById("id_mod").value;
    let productoNombre_mod = document.getElementById("nombre_mod").value;
    let productoDescripcion_mod = document.getElementById("descripcion_mod").value;
    let productoPrecio_mod = document.getElementById("precio_mod").value;

    //petición AJAX
    let xhr = new XMLHttpRequest();

    xhr.open("PATCH", "http://localhost:3000/articulos/" + id_mod);

    let miPost_mod = {"nombre": productoNombre_mod, "descripcion": productoDescripcion_mod, "precio": parseInt(productoPrecio_mod) };

    xhr.setRequestHeader("Content-type", "application/Json;charset=utf-8");

    xhr.send(JSON.stringify(miPost_mod));

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.response)
            
        } else {
            console.log("ERROR " + xhr.status + " " + xhr.statusText)
        }
    }

    alert("Articulo actualizado");

}

function mostrarDialogMod(articulo){

    //constante en la cual se almacena el articulo parseado porque viene siendo un string guarro
    const articuloJson = JSON.parse(articulo)

    //recupera en la constante dialogo el boton modificar
    const dialogo = document.getElementById("dialogoModificar");

    //apertura del dialogo
    dialogo.showModal();
    
    //mostrar en cada campo el valor correspondiente en el articulo(objeto)que nos habian pasado
    document.getElementById("id_mod").value = articuloJson.id;
    document.getElementById("nombre_mod").value = articuloJson.nombre;
    document.getElementById("descripcion_mod").value = articuloJson.descripcion;
    document.getElementById("precio_mod").value = articuloJson.precio;


}

function borraArticulo(id) {


    let xhr = new XMLHttpRequest();

    xhr.open("DELETE", `http://localhost:3000/articulos/` + id);

    xhr.setRequestHeader("Content-type", "application/Json;charset=utf-8");

    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 200) {
            //si la peticion tiene exito, se llama a get para volver a recuperar los datos y pintar la tabla,
            //funcion que ya está presente en el propio get
            get();
        } else {
            console.log("ERROR " + xhr.status + " " + xhr.statusText)
        }
    }
}

function eventoCreate() {
    //boton efectuar pedido->tendrá que llamar a la función anyadirArticulo()
    document.getElementById("btnAnyadirArticulo").addEventListener('click', () => anyadirArticulo());
}

function eventoActualizaArticulo() {
    //boton añadir->tendrá que llamar a la función anyadirArticulo()
    document.getElementById("btnActualizaArticulo").addEventListener('click', () => actualizarArticulo());
}


window.onload = () => {
    // al cargar la pagina hacemos un get de los datos de la base de datos
    get();
    //asignacion del evento click l boton de nuevo articulo
    let $botonNuevoArticulo = document.getElementById("botonNuevoArticulo");
    if ($botonNuevoArticulo) {
        $botonNuevoArticulo.addEventListener('click', (event) => {
            create();
            eventoCreate();
        });
    }
    eventoActualizaArticulo();

}

