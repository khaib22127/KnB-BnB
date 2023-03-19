"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "ownerId" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      lat: {
        type: DataTypes.DECIMAL,
      },
      lng: {
        type: DataTypes.DECIMAL,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(5,2),
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
