const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
  return sequelize.define('DiagnosisLog', {
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
    photo_url: {
      type: DataTypes.STRING(255),
      comment: 'AI 진단에 사용된 사진 URL'
    },
    diag_result: {
      type: DataTypes.STRING(255),
      comment: '진단 결과 (질병명 등)'
    },
    recommendation: {
      type: DataTypes.TEXT,
      comment: '권장 조치 사항'
    },
    diagnosed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '진단 시간'
    }
  }, {
    // 🚨 이 부분을 'diagnosis_log'에서 'diagnosislog'로 바꿉니다.
    // 이렇게 해야 MySQL에서 테이블 이름이 띄어쓰기 없이 깔끔하게 만들어집니다.
    tableName: 'diagnosislog', 
    timestamps: false,
    comment: 'AI 진단 이력 테이블'
  });
};