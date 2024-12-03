app.get("/", (req, resp)=>{
    const html =`
    <h1> Programacion web <h1/>
    <form action = '/ejemplo_post' method = 'POST'>
       <input type='text' name='nombre' />
       <input type='text' name='codigo' />
       <button tyoe 'submit'> procesar </button>
    </form>   
    `
    resp.send(html)

})
app.get("/ejemplo_path/:nombre/:codigo", (req,resp)=>{
   const nombre = req.params.nombre
   const codigo = req.params.codigo

   const html = `
   <div> nombre: ${nombre} </div>
   <div> codigo: ${codigo}</div>
   `
   resp.send(html)
})
app.get("/ejemplo_query", (req,resp)=>{
    const nombre = req.query.nombre
    const codigo = req.query.codigo
    
    const html = `
   <div> nombre: ${nombre} </div>
   <div> codigo: ${codigo}</div>
   `
   resp.send(html)
})
app.post("/ejemplo_post",(req,resp)=>{
   const nombre = req.body.nombre
   const codigo = req.body.codigo
   
   const html = `
  <div> nombre: ${nombre} </div>
  <div> codigo : ${codigo}</div>
  `
  resp.send(html)
})