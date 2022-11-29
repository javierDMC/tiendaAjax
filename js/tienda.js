	let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"];

	//numero del pedido para el carrito
	let numeroPedido = 500; 
	
	//creación del carrito
	let carrito = new Carrito(numeroPedido);

	let orden = '';

	
	function creaListaCriterios(){
		let $listaCriterios = document.getElementById("criteriosOrdenacion");

		for(let i = 0; i < criterios.length; i++){
			const option = document.createElement('option');
			option.textContent = criterios[i];
			$listaCriterios.appendChild(option);
		}

		$listaCriterios.addEventListener('change', (event)=>{
			switch(event.target.value){
				case 'Ascendente por precio':
					orden = 'Ascendente';
					break;
				case 'Descendente por precio':
					orden = 'Descendente';
					break;
				default:
					orden = 'Sin';
			}
			pintaArticulos(orden);
		});	
	}

	function pintaArticulos(orden){

		const container = document.getElementById("contenedor");
		container.innerHTML = "";
		

		//clono la lista para que cuando selecciones Sin orden, recupere la original, para no modificar los datos reales
		let listaOrden = [...listaArticulos];
		
		//dependiendo del evento que recoja el select hara una cosa u otra
		if(orden == 'Ascendente'){
			listaOrden.sort((a,b)=>a.precio-b.precio);
		}else if(orden == 'Descendente'){
			listaOrden.sort((a,b)=>a.precio-b.precio).reverse();
		}

		//forEach para pintar una card por articulo del array
		listaOrden.forEach(articulo => {
			const htmlCard = `<div class="col">\
			<div class="card border-dark mx-1 mb-3" style="border-width: 2px;">\
			<img src="assets/${articulo.codigo}.jpg" class="card-img-top" width="200" height="200">\
			<div class="card-body">\
			<h5 class="card-title">${articulo.nombre}</h5>\
			<p class="card-text">${articulo.descripcion}</p>\
			<b>\
				<p class="card-text text-center">${articulo.precio} €</p>
			</b>\
			</div>\
			<button id="${articulo.codigo}" class="btn-success">COMPRAR</button>\
			</div>\
			</div>`;
			
			container.innerHTML += htmlCard;

			
		});
		//adddEvenListener del boton
		Array.from(document.getElementsByClassName("btn-success")).forEach(btn=>btn.addEventListener("click", ()=> this.ponArticuloEnCarrito(btn.id)));
		
	}
	
	
	function ponArticuloEnCarrito(codigoArticuloSeleccionado){
		carrito.anyadeArticulo(codigoArticuloSeleccionado);	
	}

	function borraArticuloEnCarrito(codigoArticuloSeleccionado){
		carrito.borraArticulo(codigoArticuloSeleccionado);
	}


	function verCarro(){
		carrito.verCarrito();

	}

	function efectuaPedido(){
		alert("¡PEDIDO REALIZADO!");
		const dialogo = document.getElementById("miDialogo");
		dialogo.close();
		//cambiar el numero del pedido del carrito
		numeroPedido += 1;
		//mostrar el pedido por consola
		console.log(JSON.stringify(carrito));
		//vaciar el carrito una vez hecho el pedido
		carrito = new Carrito(numeroPedido);
	}

	function anyadirEventosCarrito(){
		//boton efectuar pedido->tendrá que llamar a la función efectuaPedido()
		const efectuarPedido = document.getElementById("btnEfectuaPedido");
		
		efectuarPedido.addEventListener('click', () => efectuaPedido());
	}

	window.onload=()=>{
		creaListaCriterios();
		//asignacion del evento click a la imagen del carro
		let $imagenCarrito = document.getElementById("imagenCarrito");
		if ($imagenCarrito){
			$imagenCarrito.addEventListener('click', (event) => {
		verCarro();
			});
		}
		pintaArticulos(orden);
		//añado el evento del carrito 'efectuar pedido' para cargarlo al inicio para evitar duplicidades
		anyadirEventosCarrito();
	}

