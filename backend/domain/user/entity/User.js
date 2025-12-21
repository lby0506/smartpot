const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '사용자 id (PK)'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      comment: '로그인 이메일'
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '암호화된 비밀번호'
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '사용자 닉네임'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '계정 생성일'
    }
  }, {
    tableName: 'user', // 실제 DB 테이블 이름
    timestamps: false,
    comment: '사용자 정보 테이블'
  });
};