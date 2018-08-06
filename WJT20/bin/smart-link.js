#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const srcPath = path.resolve(__dirname, './..');
const dataPath = path.resolve(__dirname, './../database');
const allMdFiles = fs.readdirSync(srcPath);
const jsonData = [];
const dataType = 'JSON';
const pre = 50;
const ignore = JSON.stringify([ 'readme.md' ]);

// 组装数据
function readAllFiles() {
    // allMdFiles.forEach(function(item, index) {
    //     if (ignore.indexOf(item) > 0 && item.indexOf('.md') > 0) {
    //         const filePath = srcPath + '/' + item;
    //
    //         // isFile: 是否文件
    //         // isDirectory: 是否目录
    //         if (fs.statSync(filePath).isFile()) {
    //             const fileCont = fs.readFileSync(filePath, 'utf-8');
    //
    //             console.log(fileCont);
    //         }
    //     }
    // });

    const filePath = srcPath + '/Angular2学习笔记——基本内容.md';

    // isFile: 是否文件
    // isDirectory: 是否目录
    if (fs.statSync(filePath).isFile()) {
        let fileCont = fs.readFileSync(filePath, 'utf-8');
        const matchData = fileCont.match(/\#+\s.+\s\#+/g).slice(3);
        let secCounter = 0;
        let thrCounter = 0;

        // matchData.forEach(function(item, index) {
        //     const title = item.split(' ')[1];
        //     let newTitle = '';
        //
        //     if (item.indexOf('## ') === 0) {
        //         // 二级标题
        //         secCounter++;
        //         newTitle = '## <a name="href' + secCounter + '">' + title + '</a> ##';
        //     }
        //
        //     if (item.indexOf('### ') === 0) {
        //         // 三级标题
        //         thrCounter++;
        //         newTitle = '### <a name="href' + secCounter + '-' + thrCounter + '">' + title + '</a> ###';
        //     }
        //
        //     fileCont = fileCont.replace(item, newTitle);
        // });

        // fs.writeFileSync(
        //     filePath,
        //     fileCont,
        //     'utf-8'
        // );

        const direcStart = fileCont.indexOf('## 目录 ##') + 8;
        const direcEnd = direcStart + fileCont.substr(direcStart).indexOf('##');
        const direc = fileCont.substring(direcStart, direcEnd);
        console.log(direc);
    }
}

// 写入所有文件数据
function writeAllDataFiles() {

}

(function() {
    readAllFiles();
    writeAllDataFiles();
})();
