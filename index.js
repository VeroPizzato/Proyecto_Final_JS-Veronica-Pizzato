let listaProdu = document.getElementById("productos");

function crearCards() {   
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
          stock.forEach(prod => {
               listaProdu.innerHTML += ` <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card justify-content-center align-items-center border-0" style="width: 18rem; margin: auto auto; align-items: center; margin-bottom: 15px; " >
                         <div>
                              <img class="produ" src="${prod.img}" alt="${prod.estilo}" width="250" height="250"/>
                         </div>
                         <div class="card-body text-center">
                              <h3 class="card-title">${prod.estilo}</h5>
                              <h5 class="card-text">$ ${prod.precio}</h2>                         
                              <a id="botonProd${prod.id}" class="btn btn-danger">Agregar</a>
                         </div>
                    </div>
               </div> `               
          })
     })
     darFuncionalidadCarrito();    
}

crearCards();
actualizarBotonCarrito();