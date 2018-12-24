#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const marked = require('marked');
const md5 = require('./md5');

const srcPath = path.resolve(__dirname, './..');
const dataPath = path.resolve(__dirname, './../database');
const allMdFiles = fs.readdirSync(srcPath);
const jsonData = [];
const dataType = 'JSON';
const length = 1000;
const ignore = require('./ignore.json');

// 组装数据
function readAllFiles() {
    allMdFiles.forEach(function(item, index) {
        if (ignore.indexOf(item) < 0 && item.indexOf('.md') > 0) {
            const filePath = srcPath + '/' + item;

            // isFile: 是否文件
            // isDirectory: 是否目录
            if (fs.statSync(filePath).isFile()) {
                const fileCont = fs.readFileSync(filePath, 'utf-8');
                const resultCont = encodeURI(marked(fileCont));

                if (index % length === 0) {
                    jsonData.push({});
                }

                jsonData[jsonData.length - 1][md5(item, 8)] = {
                    name: item,
                    cont: resultCont
                };
            }
        } else {
            console.log('_IGNORE_ : ', item);
        }
    });
}

// 写入所有文件数据
function writeAllDataFiles() {
    jsonData.forEach(function(item, index) {
        const hash = 'md-data' + (index + 1);
        const name = hash + '.' + dataType.toLowerCase();
        fs.writeFileSync(dataPath + '/' + name, JSON.stringify(item, null, 4), 'utf-8');
    });
}

(function() {
    readAllFiles();
    writeAllDataFiles();
})();
