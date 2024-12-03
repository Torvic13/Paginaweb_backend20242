import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
    'mundomascotasdb',
    'admin',
    'admin',{
    host: 'Localhost',
    port: 5432,
    dialect: 'postgres' 
});

const Usuario = sequelize.define(
    "Usuario",
    {
        id :{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nombre :{
            type: DataTypes.STRING
        },
        usuario :{
            type: DataTypes.STRING
        },
        password :{
            type: DataTypes.STRING
        }
    },
    {
    freezeTableName : true,
    timestamps : false
    }
)
// Definir el modelo de Producto
const Productos = sequelize.define(
    "Productos",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        categoria: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);
export {
    Usuario,
    Productos
}
export default sequelize