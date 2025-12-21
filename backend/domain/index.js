const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false, 
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 파일 불러오기
const userEntity = require('./user/entity/User');
const deviceEntity = require('./device/entity/Device');
const plantEntity = require('./plant/entity/Plant');
const diagnosisEntity = require('./diagnosisLog/entity/DiagnosisLog');
const wateringEntity = require('./wateringLog/entity/WateringLog');

// 🚨 안전하게 실행 (함수일 때만 호출)
db.User = typeof userEntity === 'function' ? userEntity(sequelize) : null;
db.Device = typeof deviceEntity === 'function' ? deviceEntity(sequelize) : null;
db.Plant = typeof plantEntity === 'function' ? plantEntity(sequelize) : null;
db.DiagnosisLog = typeof diagnosisEntity === 'function' ? diagnosisEntity(sequelize) : null;
db.WateringLog = typeof wateringEntity === 'function' ? wateringEntity(sequelize) : null;

// 관계 설정 (null 체크 포함)
if (db.User && db.Plant) {
    db.User.hasMany(db.Plant, { foreignKey: 'user_id', sourceKey: 'id' });
    db.Plant.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
}
if (db.Device && db.Plant) {
    db.Device.hasMany(db.Plant, { foreignKey: 'device_id', sourceKey: 'id' });
    db.Plant.belongsTo(db.Device, { foreignKey: 'device_id', targetKey: 'id' });
}
if (db.Plant && db.DiagnosisLog) {
    db.Plant.hasMany(db.DiagnosisLog, { foreignKey: 'plant_id', sourceKey: 'id' });
    db.DiagnosisLog.belongsTo(db.Plant, { foreignKey: 'plant_id', targetKey: 'id' });
}
if (db.Plant && db.WateringLog) {
    db.Plant.hasMany(db.WateringLog, { foreignKey: 'plant_id', sourceKey: 'id' });
    db.WateringLog.belongsTo(db.Plant, { foreignKey: 'plant_id', targetKey: 'id' });
}

module.exports = db;