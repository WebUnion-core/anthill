#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const md5 = require('./md5');

const srcPath = path.resolve(__dirname, './..');
const allMdFiles = fs.readdirSync(srcPath);
const ignore = require('./ignore.json');
const files = {};

// 格式化每篇记录的标题
function formatEachFile() {
    allMdFiles.forEach(function(item, index) {
        if (ignore.indexOf(item) < 0 && item.indexOf('.md') > 0) {
            const filePath = srcPath + '/' + item;
            console.log(filePath);

            // isFile: 是否文件
            // isDirectory: 是否目录
            if (fs.statSync(filePath).isFile()) {
                let fileCont = fs.readFileSync(filePath, 'utf-8');

                // 读取文本信息
                const _tag = fileCont.match(/TAG        : .+/)[0].replace('TAG        : ', '');
                const _id = fileCont.match(/ID         : .+/)[0].replace('ID         : ', '');
                if (!files[_tag]) {
                    files[_tag] = [];
                }
                files[_tag].push({
                    name: item.replace('.md', ''),
                    hash: md5(item, 8),
                    id: _id
                });

                if (fileCont.indexOf('<a name="href') < 0 && fileCont.indexOf('## 目录 ##') > 0) {
                    const matchData = fileCont.match(/\#+\s.+\s\#+/g).slice(2);
                    let secCounter = 0;
                    let thrCounter = 0;

                    matchData.forEach(function(item, index) {
                        const title = item.split(' ')[1];
                        let newTitle = '';

                        if (item.indexOf('## ') === 0) {
                            // 二级标题
                            secCounter++;
                            newTitle = '## <a name="href' + secCounter + '">' + title + '</a> ##';
                        } else {
                            // 三级标题
                            thrCounter++;
                            newTitle = '### <a name="href' + secCounter + '-' + thrCounter + '">' + title + '</a> ###';
                        }

                        fileCont = fileCont.replace(item, newTitle);
                    });

                    secCounter = 0;
                    thrCounter = 0;

                    let newItem = '';
                    const direcStart = fileCont.indexOf('## 目录 ##') + 8;
                    const direcEnd = direcStart + fileCont.substr(direcStart).indexOf('##');
                    const direcStr = fileCont.substring(direcStart, direcEnd);
                    const direcAry = direcStr.match(/\s+[0-9]+.\s.+/g);

                    direcAry.forEach(function(item) {
                        let ary;

                        if (item.indexOf('    ') >= 0) {
                            // 三级标题
                            thrCounter++;
                            ary = item.substr(6).split(' ');
                            ary[0] = '\n    ' + ary[0];
                            ary[1] = '[' + ary[1] + ']' + '(#href' + secCounter + '-' + thrCounter + ')';
                        } else {
                            // 二级标题
                            ary = item.split(' ');
                            secCounter++;
                            ary[1] = '[' + ary[1] + ']' + '(#href' + secCounter + ')'
                        }

                        newItem += ary.join(' ');
                    });
                    fileCont = fileCont.replace(direcStr, newItem + '\r\n\r\n');
                    fs.writeFileSync(filePath, fileCont, 'utf-8');
                }
            }
        } else {
            console.log('_IGNORE_ : ', item);
        }
    });
}

// 格式化README
function formatReadMe() {
    let fileCont = '\r\n# 导航 #\r\n\r\n';
    Object.keys(files).forEach(function(tag) {
        fileCont += '## ' + tag + '系列 ##\r\n\r\n';
        files[tag].forEach(function(item) {
            fileCont += '- [' + item.id + ', ' + item.hash + '] : [' + item.name + '](./' + item.name + '.md)\r\n\r\n';
        });
    });
    fs.writeFileSync(srcPath + '/README.md', fileCont, 'utf-8');
}

(function() {
    formatEachFile();
    formatReadMe();
})();

var datetime = new Date();
var month = datetime.getMonth();
datetime.setMonth(month - 1 >= 0 ? month - 1 : 11);
console.log(datetime); // 2019-12-14

var nowDate = new Date();
var datetime = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
);
console.log(datetime); // 2018-12-31
