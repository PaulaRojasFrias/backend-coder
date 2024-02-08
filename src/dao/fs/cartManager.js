const fs = require("fs").promises;
class CartManager {
  static lastCid = 0;
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayCarts = JSON.parse(respuesta);
      return arrayCarts;
    } catch (error) {
      console.log("Se produjo un error al leer el archivo", error);
    }
  }

  async guardarArchivo(arrayCarts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayCarts, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

  async createCart() {
    const newCart = {
      cid: ++CartManager.lastCid,
      products: [],
    };
    this.carts.push(newCart);
    await this.guardarArchivo(this.carts);
    return newCart.cid;
  }

  async getCartById(cid) {
    try {
      const arrayCarts = await this.leerArchivo();
      const buscado = arrayCarts.find((item) => item.id === id);

      if (!buscado) {
        console.log("No se ha encontrado el carrito");
      } else {
        console.log("Se ha encontrado el carrito: ");
        return buscado;
      }
    } catch (error) {
      console.log("Se produjo un error al leer el archivo ", error);
    }
  }

  async addProduct(cid, nuevoObjetoId) {
    const cartIndex = this.carts.findIndex((cart) => cart.cid === cid);

    if (cartIndex !== -1) {
      const existingProductIndex = this.carts[cartIndex].products.findIndex(
        (product) => product.id === nuevoObjetoId
      );

      if (existingProductIndex !== -1) {
        this.carts[cartIndex].products[existingProductIndex].quantity += 1;
      } else {
        const newProduct = {
          id: nuevoObjetoId,
          quantity: 1,
        };
        this.carts[cartIndex].products.push(newProduct);
      }

      await this.guardarArchivo(this.carts);
    } else {
      console.log("No se encontró el carrito con el cid proporcionado");
    }
  }
}

module.exports = CartManager;
//