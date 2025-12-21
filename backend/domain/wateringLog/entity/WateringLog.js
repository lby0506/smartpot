const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('WateringLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id (PK)'
    },
    plant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '식물 id (FK)'
    },
    log_type: {
      type: DataTypes.ENUM('manual', 'auto'),
      comment: '급수 유형 (수동/자동)'
    },
    duration_sec: {
      type: DataTypes.INTEGER,
      comment: '펌프 작동 시간 (초)'
    },
    is_auto: {
      type: DataTypes.BOOLEAN,
      comment: '자동 실행 여부'
    },
    logged_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '기록 시각'
    },
    moisture_level: {
      type: DataTypes.INTEGER,
      comment: '급수 당시 토양 수분 센서 값'
    }
  }, {
    tableName: 'watering_log',
    timestamps: false,
    comment: '급수 및 관리 이력 테이블'
  });
};