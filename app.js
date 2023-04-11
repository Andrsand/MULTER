const express = require("express");
const multer = require("multer");

const app = express();

app.use(express.static(__dirname));
app.use(multer({ dest: "uploads" }).single("filedata")); //  multer добавляется в виде компонента middleware.  Передается объект с параметром dest указывающим путь для загрузки файлов. В данном случае это папка uploads:
//функция single() указывает, что загружаться будет один файл. На форме в index.html есть поле для загрузки одного файла с именем filedata. В single передается название поля, которое используется на форме для загрузки файла.
app.post("/upload", function (req, res, next) {

    let filedata = req.file;
    console.log(filedata);
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000);