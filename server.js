const express = require('express')
const app = express()
const {Router}= require('express')
const routerProducts=Router()
const Api = require('./index')
const api = new Api()


app.use(express.static('public'))
app.use('/api/productos',routerProducts)

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))


// PRODUCTOS
routerProducts.get('/',(req,res)=>{
    let completeList=JSON.stringify(api.getAll())
    res.json(`La lista de producto es : ${completeList}`)
})

routerProducts.get('/:id',(req,res)=>{
    let selectedProduct = JSON.stringify(api.getById(req.params.id))
    if (selectedProduct){
            res.json(`Su producto es : ${selectedProduct}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
})

routerProducts.post('/',(req,res)=>{
    api.save(req.body)
    let productSaved = JSON.stringify(req.body)
    res.json(`Se agrego el producto : ${productSaved}`)
})

routerProducts.put('/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let newProd = req.body
    api.updateById(id,newProd)
    let productUpdated = JSON.stringify(req.body)
    res.json(`Se actualizo correctamente.....la nueva informacion es: ${productUpdated}`)
})

routerProducts.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let productDeleted =JSON.stringify(api.deleteById(id))
    if (productDeleted){
        res.json(`Se elimino correctamente el producto ${productDeleted}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
})
// PUERTO

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
        })
    server.on("error", error => console.log(`Error en servidor ${error}`))