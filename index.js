const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 8080;

// Константы для статусов
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_ERROR = 500;

// Конфигурация Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

// Определение модели User
const User = sequelize.define("users", {
  idUser: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING },
  numberGroup: { type: DataTypes.STRING },
}, { timestamps: false });

app.use(cors());
app.use(express.json());

// Маршрут для главной страницы
app.get("/main", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

// Получение пользователя по ID
app.get("/getUser/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findOne({ where: { idUser } });
    if (!user) {
      return res.status(HTTP_STATUS_NOT_FOUND)
        .json({ message: "Запись не найдена!" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(HTTP_STATUS_ERROR)
      .json({ message: "Ошибка" });
  }
});

// Вставка нового пользователя
app.post("/insertUser", async (req, res) => {
  try {
    const { surname, numberGroup } = req.body;
    const newUser = await User.create({ surname, numberGroup });
    return res.status(HTTP_STATUS_CREATED)
      .json({ message: "Запись создана!", user: newUser });
  } catch (error) {
    return res.status(HTTP_STATUS_ERROR)
      .json({ message: "Ошибка" });
  }
});

// Удаление всех пользователей
app.delete("/deleteAll", async (req, res) => {
  try {
    await User.destroy({ where: {} });
    return res.json({ message: "Все записи удалены!" });
  } catch (error) {
    return res.status(HTTP_STATUS_ERROR)
      .json({ message: "Ошибка" });
  }
});

// Удаление пользователя по ID
app.delete("/deleteId/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const deleteUser = await User.destroy({ where: { idUser } });
    if (deleteUser === 0) {
      return res.status(HTTP_STATUS_NOT_FOUND).json({
        message: 'Запись с ID=${idUser} не найдена!'
      });
    }
    return res.json({ message: 'Запись по ID=${idUser} удалена' });
  } catch (error) {
    return res.status(HTTP_STATUS_ERROR)
      .json({ message: "Ошибка" });
  }
});

// Функция для запуска сервера
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log('Сервер работает на порту ${PORT}');
    });
  } catch (error) {
    console.error("Не удалось подключиться к базе данных:", error);
  }
}

// Запуск приложения
start();
