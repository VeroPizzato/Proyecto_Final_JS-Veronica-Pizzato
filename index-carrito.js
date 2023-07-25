function mostrarProductosCarrito(){
    const productos = cargarProductosCarrito();
    let salida = "";    

    if (totalProductosCarrito() > 0){
        salida += `<table class="table table-hover">
        <tr>       
        <td colspan="4" class="text-end"><button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar</button></td>            
        </tr>`;

        for (producto of productos){
            salida += `<tr>
            <td>${producto.estilo}</td>
            <td>${producto.cantidad} x $${producto.precio}</td>
            <td>$${producto.cantidad * producto.precio}</td>
            <td class="text-end"><button class="btn btn-danger" onclick="eliminarProducto(${producto.id})"><img src="img/residuo.png" alt="Eliminar producto" width="16"/></button></td>            
            </tr>`;
        }
                
        salida += `<tr>
        <td colspan="2">Total a Pagar</td>
        <td colspan="2">$${totalPagarCarrito()}</td>
        </tr>`;

        salida += `</table>`;        
    }
    else{        
        salida = `<div class="alert alert-danger text-center" role="alert">
        No se agregaron productos en el carrito!
        </div>`       
    }

    document.getElementById("productos").innerHTML = salida;
}

mostrarProductosCarrito();
actualizarBotonCarrito();