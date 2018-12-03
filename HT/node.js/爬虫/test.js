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

// start();


request.get({
    url: 'http://lf.snssdk.com/api/news/feed/v46/?category=news_hot',
    // encoding: null
}, (err, res, body) => {
    let data = JSON.parse(body).data
    for (let v of data) {
        let nesObj;
        let content = JSON.parse(v.content)
        let {
            abstract,
            display_url,
            media_name
        } = content
        display_url = display_url.replace(/http:\/\/toutiao.com\/group\//, '')
        display_url = display_url.replace('/', '')
        nesObj = {
            abstract,
            media_name,
            display_url
        }

        request.get({
            url: `http://a3.pstatp.com/article/content/lite/14/1/${display_url}/${display_url}/1/`,
            // encoding: null
        }, (err, res, body) => {
            let data = JSON.parse(body).data;
            let content = data.content;
            nesObj.content = content
            console.log(data.h5_extra)
        })
    }
})



function saveExtra(url, info) {
    request.get({
        url: `http://a3.pstatp.com/article/content/lite/14/1/${display_url}/${display_url}/1/`,
        // encoding: null
    }, (err, res, body) => {
        console.log(JSON.parse(body).data)
        // newsList.push(nesObj)
    })
}