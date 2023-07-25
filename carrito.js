function guardarProductosCarrito(produ){
    localStorage.setItem("carrito", JSON.stringify(produ));   
}

function cargarProductosCarrito(){
    return JSON.parse(localStorage.getItem("carrito")) || [];  
}

function vaciarCarrito() {
    Swal.fire({
        title: 'Esta seguro que desea vaciar el carrito?',
        text: "No se podra revertir!",
        icon: 'warning',
        showCancelButton: true, 
        cancelButtonText: 'Cancelar', 
        cancelButtonColor: '#d33',   
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            mostrarProductosCarrito();
            actualizarBotonCarrito();  
            Swal.fire(
                'Carrito Vaciado!',
                'Tus productos han sido eliminados del carrito',
                'success',
          )
        }  
    })
}

function estaEnElCarrito(id){
    const carrito = cargarProductosCarrito();   
    return carrito.some(item => item.id === id)
}

function darFuncionalidadCarrito() {     
    fetch('./cervezas.json')  // hago un GET a un archivo local
    .then((resp) => {
        if (resp.ok) {
            return resp.json(); //convierto los objetos de json a javascript
        } else {            
            Toastify({
                text: "Hubo un error, por favor intente mas tarde",        
                duration: 5000,
                close: true,
                gravity: 'bottom',
                stopOnFocus: true,            
                }).showToast();
        }
    })
    .then((stock) => {       
        stock.forEach((prod) => {
            document.getElementById(`botonProd${prod.id}`).addEventListener('click', () => {
                agregarAlCarrito(prod.id);
            })
        })
    })
}

function agregarAlCarrito(id){
    const carrito = cargarProductosCarrito();        
    if (estaEnElCarrito(id)){           
        let pos = carrito.findIndex(item => item.id === id)
        carrito[pos].cantidad += 1;        
    }
    else{     
        fetch('./cervezas.json')  // hago un GET a un archivo local
        .then((resp) => {
        if (resp.ok) {
            return resp.json(); //convierto los objetos de json a javascript
            } else {            
                Toastify({
                    text: "Hubo un error, por favor intente mas tarde",        
                    duration: 5000,
                    close: true,
                    gravity: 'bottom',
                    stopOnFocus: true,            
                    }).showToast();
            }
        })
        .then((stock) => {    
            const producto = stock.find(item => item.id === id); 
            carrito.push(producto);                
            carrito[carrito.length-1].cantidad = 1;                 
        })       
    }       
    guardarProductosCarrito(carrito);
    actualizarBotonCarrito();
}

function eliminarProducto(id){
    const carrito = cargarProductosCarrito();
    const productos = carrito.filter(item => item.id !== id);
    guardarProductosCarrito(productos);   
    mostrarProductosCarrito();
    actualizarBotonCarrito();
}

function totalProductosCarrito(){
    const productos = cargarProductosCarrito();
    return productos.reduce((total, item) => total += item.cantidad, 0);
}

function totalPagarCarrito(){
    const productos = cargarProductosCarrito();
    return productos.reduce((total, item) => total += item.cantidad * item.precio, 0);
}

function actualizarBotonCarrito(){
    document.getElementById("carrito").innerText = totalProductosCarrito();     
}


