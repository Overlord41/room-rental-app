const { DataTypes } = require("sequelize")

module.exports = sequelize => {

  const Property = sequelize.define(
    "property",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      numberOfRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxNumberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      coordinates: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      flat: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { timestamps: false },
  )

  Property.associate = models => {
   // Relacionando Propiedad y Usuario
   Property.belongsTo(models.User, {
     sourceKey: "id",
     foreignKey: "userID",
   })
   
   // Relacionando Propiedad y TypoPropiedad
   Property.belongsTo(models.Type_property, {
     sourceKey: "id",
     foreignKey: "typePropertyID",
   })

  //  Relacionando Propiedad con Servicio (m:m)
   Property.belongsToMany(models.Service, {
     through: "PropertyServices",
     timestamps: false,
   })
 }
}
