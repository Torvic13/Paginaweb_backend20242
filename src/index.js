import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Usuario, Productos} from "./dao/index.js"
import { Sequelize } from 'sequelize';
const app = express();
const port = 3000;

// Configuración para trabajar con formularios POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("assets"));

// Endpoint para obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        // Obtener todos los productos de la base de datos
        const productos = await Productos.findAll();

        // Si no se encuentran productos, devolver un mensaje de error
        if (productos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }

        // Devolver los productos en formato JSON
        res.json(productos);
    } catch (error) {
        console.error("Error de base de datos:", error);
        // Si ocurre un error en la consulta, devolver un error 500
        res.status(500).json({ error: `Hubo un problema con la consulta a la base de datos: ${error.message}` });
    }
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, categoria, precio, imagen } = req.body;
    const nuevoProducto = {
      id: productos.length + 1, // Asumiendo un ID incremental
      nombre,
      categoria,
      precio,
      imagen
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto); // Retornamos el nuevo producto creado
  });

// Endpoint para productos de perros
app.get('/productos/perros', async (req, res) => {
    try {
        const { categoria } = req.query;

        // Condiciones para filtrar productos
        const condition = categoria 
            ? { where: { categoria: categoria } }
            : { where: { categoria: { [Sequelize.Op.like]: 'perro%' } } };

        // Obtener productos filtrados
        const productosFiltrados = await Productos.findAll(condition);

        // Si no se encuentran productos
        if (productosFiltrados.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos para esta categoría' });
        }

        // Devolver los productos
        res.json(productosFiltrados);
    } catch (error) {
        // Capturar y mostrar detalles del error
        console.error("Error de base de datos:", error);
        res.status(500).json({ error: `Hubo un problema con la consulta a la base de datos: ${error.message}` });
    }
});



  
// Endpoint para productos de gatos
app.get('/productos/gatos', async (req, res) => {
    try {
        const { categoria } = req.query;

        // Condiciones para filtrar productos
        const condition = categoria 
            ? { where: { categoria: categoria } }
            : { where: { categoria: { [Sequelize.Op.like]: 'gato%' } } };

        // Obtener productos filtrados
        const productosFiltrados = await Productos.findAll(condition);

        // Si no se encuentran productos
        if (productosFiltrados.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos para esta categoría' });
        }

        // Devolver los productos
        res.json(productosFiltrados);
    } catch (error) {
        // Capturar y mostrar detalles del error
        console.error("Error de base de datos:", error);
        res.status(500).json({ error: `Hubo un problema con la consulta a la base de datos: ${error.message}` });
    }
});
  app.post("/productos", (req, resp) => {
    const dataInput = req.body;
    if (req.body.nombre === undefined 
        || req.body.categoria === undefined
        || req.body.precio === undefined 
        || req.body.imagen === undefined) {
        resp.status(400).send({
            error: "Input invalido"
        });
        return;
    }

    const nuevoId = Productos.length + 1;
    const nuevoProducto = {
        ...dataInput,
        id: nuevoId
    };
    productos.push(nuevoProducto);

    resp.send({
        error: ""
    });
});

app.put("/productos",(req, resp) =>{
    const dataInput= req.body

    if (req.body.id === undefined){
            resp.status(400).send({
            error: "Input invalido"
        });
        return;
    }

    for(let p of Productos){
        if(p.id == dataInput.id){
            p.nombre = (dataInput.nombre == undefined ? p.nombre : dataInput.nombre);
            p.categoria = (dataInput.categoria == undefined ? p.categoria : dataInput.categoria);
            p.precio = (dataInput.precio == undefined ? p.precio : dataInput.precio);
            p.imagen = (dataInput.imagen == undefined ? p.imagen : dataInput.imagen);


            resp.send({
                error: ""
            });

            return;
        }
    }
    resp.status(400).send({
        error: "ID de producto no existe"
    });

    app.delete("/productos/:id", (req,resp) =>{
        const idProducto = req.params.id

        let pos = -1
        for(let i = 0; i <productos.length; i++){
            const p = Productos[i]
            if (p.id === idProducto){
                posicion = i
                break
            }
        }   
        if (posicion === -1){
            resp.status(400).send({
                error: "ID de producto no existe"
            })
        }
        productos.splice(posicion, 1)

        resp.send({
            error: ""
        })

    })
     
})
app.get("/productos/:id", (req, resp) =>{
    const idProducto = req.params.id
    const productoADevolver = Productos.filter((p)=>{
        return p.id == idProducto
    })

    if(productoADevolver.length === 0){
        resp.status(400).send({
            error: "ID de producto no existe"
        })
        return
    }
    resp.send(productoADevolver[0])
})

// Lista de productos recomendados
const productosRecomendados= [
    {
        id: 1,
        name: "Canbo Adulto Cordero Razas",
        priceRange: "S/56.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "Precios Bomba",
    },
    {
        id: 2,
        name: "Canbo Cuidado De Esterilizados",
        priceRange: "S/35.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "Precios Bomba",
    },
    {
        id: 3,
        name: "Dogxtreme Adulto Cordero Alimento",
        priceRange: "S/52.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "40% en el 2do",
        extraBadge: "Garantía 100%",
    },
    {
        id: 4,
        name: "Canbo Adulto Cordero Razas",
        priceRange: "S/56.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "Precios Bomba",
    },
    {
        id: 5,
        name: "Klinkat Arena Para Gato",
        priceRange: "S/22.90 ",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
    },
    {
        id: 6,
        name: "Royal Canin Mini Adult",
        priceRange: "S/89.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "15% de descuento",
    },
    {
        id: 7,
        name: "Whiskas Adulto Pollo",
        priceRange: "S/25.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "Oferta Especial",
    },
    {
        id: 8,
        name: "Pro Plan Puppy Razas Medianas",
        priceRange: "S/32.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "20% en el 2do",
    },
    {
        id: 9,
        name: "Nutrience Grain Free Gatos",
        priceRange: "S/25.90 ",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "Precios Bomba",
        extraBadge: "Garantía 100%",
    },
    {
        id: 10,
        name: "Pedigree Dentastix Razas Grandes",
        priceRange: "S/12.90",
        image: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dwd77614a9/images/canbo-cuidado-de-esterilizados-sterilized-care-1kg.jpg",
        badge: "3x2",
    },
];

// Endpoint para obtener productos recomendados
app.get("/api/recomendados", (req, res) => {
    res.json(productosRecomendados);
});

// Endpoint para login de usuario
app.post("/login", async (req, resp) => {
    const dataInput = req.body

    console.log(dataInput)

    const usuario = dataInput.usuario
    const password = dataInput.password

    if (usuario == undefined || password == undefined)
    {
        // Error por envio incorrecto de input
        const dataOutput = {
            error : "Input incorrecto. Revisar peticion"
        }
        resp.send(dataOutput)
        return
    }

    const usuarios = await Usuario.findAll({
        where : {
            usuario : usuario,
            password : password
        }
    })
    if(usuarios.length > 0){

        // Login exitoso
        const dataOutput = {
            error : ""
        }
        resp.send(dataOutput)
    
    }else{
        // Error login
        const dataOutput = {
            error : "Error en el login."
        }
        resp.send(dataOutput)
    }

})
app.listen(port, () => {
  console.log("Servidor web iniciado en puerto " + port);
});
