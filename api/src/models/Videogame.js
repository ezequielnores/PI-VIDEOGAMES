const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type: DataTypes.STRING,
      allowNull:true
    },
    rating:{
      type:DataTypes.FLOAT,
      allowNull:true,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },{
    timestamps:false
  });
};
