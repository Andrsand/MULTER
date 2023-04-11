const express = require("express");
const multer = require("multer");

const app = express();

const storageConfig = multer.diskStorage({ // multer.diskStorage() принимает объект с двумя параметрами
    destination: (req, file, cb) => {      // destination: определяет место для сохранения загруженных файлов
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {         // filename: определяет имя для загруженных файлов
        cb(null, file.originalname);
    }
});

// определение фильтра
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" || // file.mimetype проверяет MIME-тип файла
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

app.use(express.static(__dirname));

app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"));
app.post("/upload", function (req, res, next) {

    let filedata = req.file;
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000, () => { console.log("Server started"); });