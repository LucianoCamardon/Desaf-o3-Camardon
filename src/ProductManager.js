const fs=require('fs');

class ProductManager{
  #products=[];
  #idProduct=0;
  #path;

  constructor(path){ 
    this.#path=path;
  }

  getProducts(){
    return this.#products    
  }

  addProducts(title, description, price, thumbnail, code, stock){
      const productWithSameCode = this.#products.find((products) => products.code === code );
      try{
        if(productWithSameCode){throw new Error("Ya existe un producto con ese código")}
        else{
          const newProduct={
            id:++this.#idProduct,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            }
          this.#products.push(newProduct);
        }
      }catch(error){
        console.error("Error:",error.message)
      }
  }

  updateProduct(id, updatedValue){
      const productIndex=this.#products.findIndex((product)=>product.id===id)
      if(productIndex !== -1){
        const updatedProduct={
          ...this.#products[productIndex],
          ...updatedValue,
        }
        this.#products[productIndex]=updatedProduct;
      }
      else{
        throw new Error("No existe un producto con esa ID")
      }
  }

  deleteProduct(id){
    const productIndex=this.#products.findIndex((product)=>product.id===id)
    if (productIndex !== -1){
      this.#products.splice(productIndex, 1)
    }
    else{
      throw new Error('No existe un producto con esa ID')
    }
  }

  getProductById(id) {
    const productById = this.#products.find((product) => product.id === id);
    if (productById) {
      return productById;
    } else {
      throw new Error("No existe ningún objeto con esa ID. (Error de ProductManager)");
    }
  } 
  
  uploadProductToJson(){
    const jsonData=JSON.stringify(this.#products, null, 2);

    fs.writeFile('./products.json', jsonData, (error) => {
      if (error) {
          console.error('Error uniendo a JSON:', error);
      } else {
        console.log('Los productos fueron unidos a JSON');
      }
    });
  }  
}


const manager=new ProductManager("./products.json")

manager.addProducts("Naranjas","Naranjas o Mandarinas? Nunca supe la diferencia",200,"Sin imagen","abc123",50);
manager.addProducts("Manzanas","Son manzanas, nunca viste una?",30,"Sin imagen 2","aaa001",40);
manager.addProducts("Bananas","Dale, si te re gustan las bananas a vos",300,"Sin imagen 2","aaa002",30);
manager.addProducts("Frutillas","Frutillita como el Juan",205,"Sin imagen 2","aaa003",80);
manager.addProducts("Sandias","Sandía? o Melon?",600,"Sin imagen 2","aaa004",40);
console.log(manager.getProducts())
//manager.uploadProductToJson();

module.exports=ProductManager;