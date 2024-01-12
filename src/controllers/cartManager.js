const fs = require("fs").promises;
class CartManager {
  static lastCid = 0;
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  createCart() {
    const newCart = {
      cid: ++CartManager.lastCid,
      products: [],
    };
    this.carts.push(newCart);
    return newCart.cid; // Devuelve el cid del nuevo carrito
  }

  async addProduct(cid, nuevoObjeto) {
    const cartIndex = this.carts.findIndex((cart) => cart.cid === cid);

    if (cartIndex !== -1) {
      const newProduct = {
        id: nuevoObjeto.id, //
      };
      this.carts[cartIndex].products.push(newProduct);
    } else {
      console.log("No se encontró el carrito con el cid proporcionado");
    }
  }
}
