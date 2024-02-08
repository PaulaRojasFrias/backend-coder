const CartModel = require("../models/cart.model.js");

class CartManager {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log("Error al crear el nuevo carrito");
    }
  }

  async getCartByid(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        console.log("No existe un carrito con ese id");
        return null;
      }
      return cart;
    } catch (error) {
      console.log("Error al obtener el carrito", error);
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartByid(cartId);
      const productExist = cart.products.find(
        (item) => item.product.toString() === productId
      );
      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al agregar producto al carrito", error);
    }
  }
}

module.exports = CartManager;
