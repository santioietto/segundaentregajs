
    // Variables generales
    let buscar = null
    let acumular = 0
    let msjgeneral = ""
    let total = 0

    // Creo nuevo array vacio para utilizarlo como base de datos del login
    let usuario = new Array();
    usuario.push(new Logearte("Santi", "santi111", "s@gmail.com"));
    usuario.push(new Logearte("Agustin", "agus222", "agus@gmail.com"));
    usuario.push(new Logearte("Octavio", "octi333", "octim@gmail.com"));


    // Inicio mensaje
    let inicio = alert("Bienvenidos a nuestro sitio \n \n Por favor logearte para continuar")

    // Realizo funcion con num de intentos y validando los datos que ingreso el usuario
    function ingreso() {
        for (let i = 0; i < 5; i++){
            user = prompt("Ingresa tu usuario")
            pass = prompt("Ingresa tu contrasenia")
            // Creo variable para que valide el usuario ingresado por el cliente realizando un find en el array ya definido
            vamos = usuario.find(u => u.user.toLowerCase() === user.toLowerCase() && u.pass.toLowerCase() === pass.toLowerCase());
            if (vamos){
                // Le muestro al cliente un mensaje de bienvenida y concateno los datos del usuario
                return document.write("Bienvenido! " + "<br>" + vamos.datosusuario());

            }else{
                alert("Usuario y/o contrasenia invalidos")
            }
        }
    }

    // llamo a la funcion ingreso
    ingreso();



    // // Creo base de datos de productos sobre un array vacio
    let carrito = new Array();


    let stock = new Array();
    stock.push(new Stock(stock.length + 1, "Semillas ", 5000));
    stock.push(new Stock(stock.length + 1, "Insecticidas ", 6000));
    stock.push(new Stock(stock.length + 1, "Herbicida ", 5000));
    stock.push(new Stock(stock.length + 1, "Deposito ", 4000));
    stock.push(new Stock(stock.length + 1, "Tratamiento ", 2000));


    // Una vez que ingresa el usuario correcto, puede realizar tareas en el carrito

    if(vamos){

        let check = confirm("Desea acceder al carrito?")
        let mensaje = "1- Agregar productos\n 2-Eliminar producto \n 3- Realizar compra \n 4- Realizar descuento 10% \n 5- Salir  "
    
        // Genero un ciclo while para cara accion
        while (check) {
            let respuesta = parseInt(prompt(mensaje))
            switch (respuesta) {
                case 1:
                    agregarproducto();
                    break;
    
                case 2:
                    eliminarproducto();
                    break;
    
                case 3:
                    realizarcompra();
                    check = false;
                    break;
    
                case 4:
                    descuento();
                    break;
    
                case 5:
                    check = !confirm("Desea salir?");
                    alert("Gracias por elegirnos!");
                    break;
    
                default:
                    check = false
                    break;
            }
        }
    } else{
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

        buscar = stock.find(e => e.id === opciones)
        if (!buscar) {
            alert("El codigo que ingresaste no exite")
            return;
        }

        // Utilizo la variable global acumular que inicia en 0, y le asigno el precio de cada producto
        acumular += buscar.precio
        carrito.push(buscar)

        msjgeneral += buscar.datosproducto();
        alert("Producto agregado: \n" + msjgeneral + "\n" + "El total es: $" + acumular)


    }

    // funcion para elimnar producto
    function eliminarproducto() {
        let opciones = parseInt(prompt("Elija el id del producto a eliminar del carrito: \n" + msjgeneral + "\n" + "El total es: $" + acumular))
        if (isNaN(opciones)) {
            alert("No ingresaste un numero")
            return;
        }

        for (let i = 0; i < carrito.length; i++) {

            if (carrito[i].id == opciones) {
                carrito.splice(i, 1)
                i = carrito.length + 1;
            }

        }


        let descuentoprecio = stock.find(e => e.id == opciones)
        acumular -= descuentoprecio.precio

        msjgeneral = ""

        carrito.forEach(e => msjgeneral += e.datosproducto());
        alert(msjgeneral + acumular)

    }

    // funcion para terminar la compra
    function realizarcompra() {
        if (total) {
            compra = confirm("Compra con descuento: \n" + msjgeneral + total + "\n" + "\n" + "Desea terminar la compra?");
            if (compra) {
                document.write(msjgeneral + total + "<br> Gracias por elegirnos! <br> ¡Te esperamos pronto!")
                
            }
        } else {
            compra = confirm("Compra total: \n" + msjgeneral + acumular + "\n" + "\n" + "Desea terminar la compra?");
            if (compra) {
                document.write(msjgeneral + acumular + "<br> Gracias por elegirnos! <br> ¡Te esperamos pronto!")
                
            }
        }
    }
    
    // funcion para el caso de descuento
    function descuento() {
        total = acumular * 0.90;
        alert(total);
    }

