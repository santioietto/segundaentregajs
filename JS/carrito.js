class Stock{
    constructor (id, producto, precio){
        this.producto = producto;
        this.precio = precio;
        this.id = id;
        this.codigoproducto = Math.round(Math.random()*100);
    }


    datosproducto(){
        return "- " + this.id + " " + this.producto +  "$" + this.precio + "\n";
    }

    getPrecio(){
        return this.precio;
    }
}