const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Plant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '식물 id (PK)'
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '하드웨어 외래키(FK)'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '사용자 id 외래키(FK)'
    },
    plant_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '식물 이름'
    },
    species: {
      type: DataTypes.STRING(100),
      comment: '식물 종'
    },
    reg_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      comment: '식물 등록일'
    }
  }, {
    tableName: 'plant',
    timestamps: false,
    comment: '식물 정보 테이블'
  });
};