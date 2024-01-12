const fs = require("fs").promises;

class ProductManager {
  static ultimoId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    let {
      title,
      description,
      price,
      img,
      code,
      stock,
      status,
      category,
      thumbnails,
    } = nuevoObjeto;
    status = status ?? true;

    if (
      !title ||
      !description ||
      !price ||
      !img ||
      !code ||
      !stock ||
      !status ||
      !category
    ) {
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

    await this.guardarArchivo(this.products);
  }

  getProducts() {
    console.log(this.products);
    return this.products;
  }

  async getProductsById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find((item) => item.id === id);

      if (!buscado) {
        console.log("No se ha encontrado el producto");
      } else {
        console.log("Se ha encontrado el producto: ");
        return buscado;
      }
    } catch (error) {
      console.log("Se produjo un error al leer el archivo ", error);
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Se produjo un error al leer el archivo", error);
    }
  }

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        //para que no se actualice el id
        productoActualizado.id = id;
        arrayProductos.splice(index, 1, productoActualizado);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("No se encontro el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
}

//exportacion

module.exports = ProductManager;
