const path = require('path');
const fs = require('fs');
const marked = require('marked');
const md5 = require('./md5');

const srcPath = path.resolve(__dirname, './..');
const dataPath = path.resolve(__dirname, './../database');
const allMdFiles = fs.readdirSync(srcPath);
const jsonData = [];
const dataType = 'JSON';
const pre = 50;

// 组装数据
function readAllFiles() {
    allMdFiles.forEach(function(item, index) {
        const filePath = srcPath + '/' + item;

        // isFile: 是否文件
        // isDirectory: 是否目录
        if (fs.statSync(filePath).isFile()) {
            const fileCont = fs.readFileSync(filePath, 'utf-8');
            const resultCont = encodeURI(marked(fileCont));

            if (index % pre === 0) {
                jsonData.push({});
            }

            jsonData[jsonData.length - 1][md5(item, 8)] = {
                name: item,
                cont: resultCont
            };
        }
    });
}

// 写入所有文件数据
function writeAllDataFiles() {
    jsonData.forEach(function(item, index) {
        const hash = 'md-data' + (index + 1);
        // const hash = (new Date()).valueOf();
        const name = hash + '.' + dataType.toLowerCase();
        writeDataFiles(name, JSON.stringify(item, null, 4));
        console.log('output success: ' + name);
    });
}

// 写入单个文件数据
function writeDataFiles(fileName, content) {
    fs.writeFileSync(
        dataPath + '/' + fileName,
        content,
        'utf-8'
    );
}

(function() {
    readAllFiles();
    writeAllDataFiles();
})();
