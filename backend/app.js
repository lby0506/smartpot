const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./domain');

const app = express();

// 미들웨어 설정 순서
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('smartpot-secret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'smartpot-secret',
  cookie: { httpOnly: true, secure: false } 
}));
app.use(flash());

// 데이터베이스 동기화
db.sequelize.sync({ force: true }) 
  .then(() => console.log('smartpot2 DB 연결 및 테이블 생성 성공'))
  .catch(err => console.error('DB 에러:', err));

app.get('/', (req, res) => res.send('SmartPot2 서버 정상 가동 중'));

module.exports = app; // bin/www에서 사용