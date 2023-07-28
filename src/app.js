const express = require('express');
const fs = require('fs');
const ProductManager = require('./ProductManager.js');
const app = express();
const PORT = 3000;
const manager = new ProductManager('./products.json');


app.get('/products', (req, res) => {
  fs.readFile('./products.json', 'utf8', (error, data) => {
    if (error) {
      console.error('Error leyendo el archivo:', error);
      return res.status(500).json({ error: 'Error al leer el archivo de productos' });
    }

    const products = JSON.parse(data);
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit)) {
      return res.json(products.slice(0, limit));
    } else {
      return res.json(products);
    }
  });
});

app.get('/products/:id', (req, res)=>{
  const idDelObjeto = parseInt(req.params.id);

  fs.readFile('./products.json', 'utf-8', (err, data)=>{
      if(err){
          console.log('error al leer')
      }
      try {
          const objetos=JSON.parse(data);
          const objetoEncontrado=objetos.find((producto)=>producto.id===idDelObjeto)

          if(objetoEncontrado){
              return res.json(objetoEncontrado)
          }else{
            console.log('No se encontró la persona')
          }
      } catch (parseError) {
          console.log('error al analizar el archivo JSON', parseError);
      }
  })
})

//ESTOS FUERON OTROS DOS METODOS QUE INTENTE USAR PERO NI IDEA POR QUE NO FUNCIONAN
//ASI QUE SI LEES ESTO Y TENES GANAS, POR FAVOR ¿ME PODRIAS DECIR POR QUE NO FUNCIONARON)?

// app.get('/products/:pid', (req, res) => {
//   const productId = parseInt(req.params.pid);
//   try {
//     const product = manager.getProducts().find((product)=>product.id===productId)
//     if(product)
//     return res.json(product)
//   } catch (error) {
//     return res.status(404).json({ error: error.message + " aaaa" });
//   }
// });


// app.get('/products/:pid', (req, res) => {
//   const productId = parseInt(req.params.pid);
//   try {
//     const product = manager.getProductById(productId);
//     return res.json(product);
//   } catch (error) {
//     return res.status(404).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});