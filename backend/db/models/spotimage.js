'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE' });
     SpotImage.belongsTo(models.Review, { through: models.Spot, foreignKey: 'spotId'});

    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
    },
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
  });
  return SpotImage;
};
