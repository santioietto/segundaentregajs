
// Variables globales
let buscar = null
let acumular = 0
let msjgeneral = ""
let total = 0

// Creo nuevo array vacio para utilizarlo como base de datos del login
let usuario = new Array();
usuario.push(new Logearte("Santi", "santi111", "s@gmail.com"));
usuario.push(new Logearte("Agustin", "agus222", "agus@gmail.com"));
usuario.push(new Logearte("Octavio", "octi333", "octim@gmail.com"));

// // Creo array vacio para utulizarlo como carrito
let carrito = new Array();

// Creo array vacio y pusheo los datos de los productos en stock
let stock = new Array();
stock.push(new Stock(stock.length + 1, "Semillas ", 5000));
stock.push(new Stock(stock.length + 1, "Insecticidas ", 6000));
stock.push(new Stock(stock.length + 1, "Herbicida ", 5000));
stock.push(new Stock(stock.length + 1, "Deposito ", 4000));
stock.push(new Stock(stock.length + 1, "Tratamiento ", 2000));

// Inicio mensaje
let inicio = alert("Bienvenidos a nuestro sitio \n \n Por favor logearte para continuar")

// Realizo funcion con num de intentos y validando los datos que ingreso el usuario
function ingreso() {
    for (let i = 0; i < 5; i++) {
        user = prompt("Ingresa tu usuario")
        pass = prompt("Ingresa tu contrasenia")
        // Creo variable para que valide el usuario ingresado por el cliente realizando un find en el array ya definido
        vamos = usuario.find(u => u.user.toLowerCase() === user.toLowerCase() && u.pass.toLowerCase() === pass.toLowerCase());
        if (vamos) {
            // Le muestro al cliente un mensaje de bienvenida y concateno los datos del usuario
            return document.write("Bienvenido! " + "<br>" + vamos.datosusuario());

        } else {
            alert("Usuario y/o contrasenia invalidos")
        }
    }
}

// llamo a la funcion ingreso
ingreso();


// Una vez que ingresa el usuario correcto, puede realizar tareas en el carrito

if (vamos) {

    let check = confirm("Desea acceder al carrito?")
    let mensaje = "1- Agregar productos\n 2-Eliminar producto \n 3- Ver carrito \n  4-Realizar compra \n 5- Realizar descuento 10% \n 6- Salir  "

    // Genero un ciclo while para cara accion
    while (check) {
        let respuesta = parseInt(prompt(mensaje))

        // Utilizo el switch para cada caso que tiene el menu
        switch (respuesta) {           
            case 1:
                agregarproducto();
                break;

            case 2:
                eliminarproducto();
                break;

            case 3:
                vercarrito();
                break;
            case 4:
                check = realizarcompra()

                break;

            case 5:
                descuento();
                break;

            case 6:
                check = !confirm("Desea salir?");
                alert("Gracias por elegirnos!");
                break;


            default:
                if (respuesta >= 6) {
                    alert("El codigo ingresado no existe \n\n Recargar la pagina para volver a operar")
                }
                check = false               
                break;
        }

    }
} else {
    // Si el usuario agoto el numero de intentos para logear le muestro el alert
    alert("Recargue la pagina para desbloquear")
}

// funcion para agregar producto
function agregarproducto() {
    let opciones = parseInt(prompt("Elija el id del producto"))
    // Validacion en el caso de que lo que ingrese sea erroneo
    if (isNaN(opciones)) {
        alert("No ingresaste un numero")
        return;
    }

    // Creo una variable donde busco en el array stock el elemento id y lo comparo con el que le pedi al usuario
    buscar = stock.find(e => e.id === opciones)
    // Valido que is diferente el codigo ingresado le muestro un alert
    if (!buscar) {
        alert("El codigo que ingresaste no existe")
        return;
    }

    // Utilizo la variable global acumular que inicia en 0, y le asigno el precio de cada producto encontrado con el metodo find
    acumular += buscar.precio
    carrito.push(buscar)

    // al mensaje general le sumalizo los datos de los producto encontrados en la variable buscar
    msjgeneral += buscar.datosproducto();
    alert("Producto agregado: \n" + msjgeneral + "\n" + "El total es: $" + acumular)


}

// funcion para elimnar producto
function eliminarproducto() {
    // Valido si el array carrito tiene algun elemento si no le muestro el msj
    if (carrito.length == 0) {
        alert("No tienes ningun producto para eliminar")
        return;
    } else {
        // Una vez encontrado los producto paso a seleccionar y eliminar
        opciones = parseInt(prompt("Elija el id del producto a eliminar del carrito: \n" + msjgeneral + "\n" + "El total es: $" + acumular))
        if (isNaN(opciones)) {
            alert("No ingresaste un numero")
            return;
        }
        // Realizo un for donde utilizo el metodo splice para que elimine el producto que seleccione
        for (let i = 0; i < carrito.length; i++) {

            if (carrito[i].id == opciones) {
                carrito.splice(i, 1)


                let descuentoprecio = stock.find(e => e.id == opciones)
                acumular -= descuentoprecio.precio
                // creo una variable booleana iniciada en true
                devolucion = true
                i = carrito.length + 1;
            } else {
                devolucion = false;
            }
        }
        // valido la variable en falso para que me muestre que el codigo ingresado no existe
        if (!devolucion) {
            alert("El codigo ingresado no esta en el carrito o no existe")
        }
    }

    msjgeneral = ""
    // realizo un foreach para recorrer el array carrito que esta sin el producto eliminado
    carrito.forEach(e => msjgeneral += e.datosproducto());
    alert(msjgeneral + "\n" + acumular)

}

// funcion ver carrito
function vercarrito() {
    msjgeneral = ""
    // realizo un foreach para recorrer el array carrito para que me muestre los productos hasta el momento
    carrito.forEach(e => msjgeneral += e.datosproducto());
    alert(msjgeneral + "\n" + "Total sin descuento: $" + acumular + "\n" + "Total con descuento: $" + total)

}

// funcion para terminar la compra
function realizarcompra() {
    // valido la funcion
    if (!carrito.length == 0) {
        // diferencio si el producto ingresa por descuento
        if (total) {
            compra = confirm("Compra con descuento: \n" + msjgeneral + "\n" + "Precio total: $" + total + "\n" + "\n" + "Desea terminar la compra?");           
            if (compra) {
                document.write("<br>" + msjgeneral + "<br>Total: $" + total + "<br> Gracias por elegirnos! <br> ¡Te esperamos pronto!")
                return false;
            }
        } else {
            // Si no va ingresar como compra y muestra el valor real del producto
            compra = confirm("Compra total: \n" + msjgeneral + "Total: $" + acumular + "\n" + "\n" + "Desea terminar la compra?");
            if (compra) {
                document.write("<br>" + msjgeneral + "<br>Total: $" + acumular + "<br> Gracias por elegirnos! <br> ¡Te esperamos pronto!")
                return false;
            }

        }


    } else {
        // muestro que el carrito este vacio
        alert("El carrito esta vacio!")
        return true;
    }

}

// funcion para el caso de descuento
function descuento() {
    msjgeneral = ""
    // realizo la validacion para ver si hay elementos en el array carrito
    if (carrito.length == 0) {
        alert("No tienes productos agregados al carrito")
    } else {
        carrito.forEach(e => msjgeneral += e.datosproducto());
        total = acumular * 0.90;
        alert(msjgeneral + "\n" + "Precio total con descuento: " + total)
    }

}

