const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Device', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '하드웨어 id (PK)'
    },
    device_serial: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '하드웨어 장치 실제 시리얼 넘버'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'error'),
      defaultValue: 'active',
      comment: '장치 현재 상태'
    },
    last_connect: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '최종 통신 시간'
    },
    current_moisture: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '현재 센서값 (토양 수분)'
    }
  }, {
    tableName: 'device', // 실제 DB에 생성될 테이블 이름
    timestamps: false,    // 기본 생성 컬럼(createdAt, updatedAt) 자동 생성 안 함
    comment: '하드웨어 장치 정보 테이블'
  });
};