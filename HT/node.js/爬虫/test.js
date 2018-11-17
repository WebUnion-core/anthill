const request = require('request');
var iconv = require('iconv-lite');
const fs = require('fs')
const cheerio = require('cheerio');

function start() {
    request.get({
        url: 'https://news.qq.com/',
        encoding: null
    }, (err, res, body) => {
        var buf = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(buf)
        let nes = $('#channelNavPart').find('li a').each(function (i, elem) {
            let tag = elem.children[0].data;
            if (tag != '首页' || tag != '滚动') {
                captureHome(elem.children[0].data, elem.attribs.href)
            }
        });
    })
}


function captureHome(tag, src) {
    request.get({
        url: src,
        encoding: null
    }, (err, res, body) => {
        var buf = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(buf)
        $('.item-pics').each(function (i, elem) {
            captureSingle({
                type: tag,
                title: $(this).find('h3 a').text(),
                time: $(this).find('.time').text(),
                source: $(this).find('.source').text(),
                src: $(this).find('h3 a').attr('href')
            })
        })
        // fs.writeFileSync('./test.txt', buf, 'utf8')
    })
}


function captureSingle(parent) {
    let newObj = parent
    request.get({
        url: newObj.src,
        encoding: null
    }, (err, res, body) => {
        var buf = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(buf, {
            decodeEntities: false
        })
        newObj.content = $.html()
        fs.writeFile(`./news/${newObj.title}.html`, newObj.content, function (err) {
            if (err) console.log(err)
        })
    })
}

start();