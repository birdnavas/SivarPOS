import express from "express";
import cors from "cors";

import { Sequelize } from "sequelize";
const baseDatos = new Sequelize("tierra", "root", "usbw", {
  host: "localhost",
  dialect: "mysql",
});

import { DataTypes } from "sequelize";

const FacturaModel = baseDatos.define(
  "factura",
  {
    fecha: { type: DataTypes.DATE },
    monto: { type: DataTypes.REAL },
    cliente: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  }
);

export const getAllFactura = async (req, res) => {
  try {
      const factura = await FacturaModel.findAll()
      res.json(factura)
  } catch (error) {
      res.json( {message: error.message} )
  }
}

export const getFactura = async (req, res) => {
      try {
          const factura = await FacturaModel.findAll({
              where:{ id:req.params.id }
          })
          res.json(factura[0])
      } catch (error) {
          res.json( {message: error.message} )
      }
}

export const createFactura = async (req, res) => {
  try {
     await FacturaModel.create(req.body)
     res.json({
         "message":"¡Registro creado correctamente!"
     })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

export const updateFactura = async (req, res) => {
  try {
      await FacturaModel.update(req.body, {
          where: { id: req.params.id}
      })
      res.json({
          "message":"¡Registro actualizado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

export const deleteFactura = async (req, res) => {
  try {
      await FacturaModel.destroy({ 
          where: { id : req.params.id }
      })
      res.json({
          "message":"¡Registro eliminado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

const router = express.Router();

router.get("/", getAllFactura);
router.get("/:id", getFactura);
router.post("/", createFactura);
router.put("/:id", updateFactura);
router.delete("/:id", deleteFactura);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/factura", router);

try {
  await baseDatos.authenticate();
  console.log("Conexión exitosa a la DB");
} catch (error) {
  console.log(`El error de conexión es: ${error}`);
}

app.listen(8000, () => {
  console.log("Server UP running in http://localhost:8000/");
});
