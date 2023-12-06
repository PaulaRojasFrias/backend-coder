class ProductManager {
  constructor() {
    this.products = [];
  }

  static ultimoId = 0;

  addProduct(title, description, price, img, code, stock) {
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((item) => item.code == code)) {
      console.log("El codigo debe ser unico");
      return;
    }

    const newProduct = {
      id: ++ProductManager.ultimoId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products.push(newProduct);
  }

  getProducts() {
    console.log(this.products);
  }

  getProductsById(id) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      console.log("No se ha encontrado el producto");
    } else {
      console.log("Se ha encontrado el producto: ", product);
    }
    return product;
  }
}

const manager = new ProductManager();

manager.getProducts();

manager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

manager.getProducts();

//comprobando validaciones
manager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

manager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc321"
);

manager.addProduct(
  "zapatillas converse",
  "Color rojo",
  5000,
  "Sin imagen",
  "fff333",
  3
);

manager.getProducts();

manager.getProductsById(2);

manager.getProductsById(5);
