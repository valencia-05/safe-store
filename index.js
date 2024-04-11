const express = require('express');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar la conexión a la base de datos usando Sequelize
const sequelize = new Sequelize('u196388150_SRT', 'u196388150_SRT', 'o5er$1Gw%cBm345', {
  host: '154.56.47.52',
  dialect: 'mysql'
});

// Definir el modelo de la tabla tienda con los campos adicionales
class Tienda extends Model { }
Tienda.init({
  nombre_tienda: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colonia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  municipio: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'tienda', tableName: 'tienda' }); // Se establece el nombre de la tabla como 'tienda'

// Definir la ruta para buscar tiendas por nombre
app.get('/tienda/:nombre', async (req, res) => { // Se cambia la ruta de '/tiendas/:nombre' a '/tienda/:nombre'
  const nombreTienda = req.params.nombre;

  try {
    const tienda = await Tienda.findOne({ 
      where: { nombre_tienda: nombreTienda },
      attributes: ['nombre_tienda', 'calle', 'colonia', 'municipio'] // Solo seleccionamos estos campos
    });
    if (!tienda) {
      res.status(404).json({ error: 'Tienda no encontrada' });
      return;
    }
    res.json(tienda);
  } catch (err) {
    console.error('Error al buscar la tienda:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log('Servidor iniciado en http://localhost:8000');
  });
});
