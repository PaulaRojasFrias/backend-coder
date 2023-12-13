const fs = require("fs").promises;

class ProductManager {
  static ultimoId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    let { title, description, price, img, code, stock } = nuevoObjeto;

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

    await this.guardarArchivo(this.products);
  }

  getProducts() {
    console.log(this.products);
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

//Testing

const manager = new ProductManager("./productos.json");

manager.getProducts();

const productoPrueba = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  img: "Sin imagen",
  code: "abc123",
  stock: 25,
};

manager.addProduct(productoPrueba);

const zapatillasConverse = {
  title: "zapatillas converse",
  description: "Color rojo",
  price: 5000,
  img: "Sin imagen",
  code: "fff333",
  stock: 3,
};

manager.addProduct(zapatillasConverse);

const zapatillasNike = {
  title: "zapatillas nike",
  description: "Color negro",
  price: 8000,
  img: "Sin imagen",
  code: "eee222",
  stock: 5,
};
manager.addProduct(zapatillasNike);

manager.getProducts();

async function testeamosBusquedaPorId() {
  const buscado = await manager.getProductsById(2);
  console.log(buscado);
}

testeamosBusquedaPorId();

const zapatillasFila = {
  id: 1,
  title: "zapatillas fila",
  description: "color blanco",
  price: 10000,
  img: "Sin imagen",
  code: "iii999",
  stock: 10,
};

async function testeamosActualizar() {
  await manager.updateProduct(1, zapatillasFila);
}

testeamosActualizar();
