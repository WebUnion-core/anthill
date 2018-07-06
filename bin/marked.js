let path = require('path');
let fs = require('fs');
let marked = require('marked');

const srcPath = path.resolve(__dirname, './../WJT20');
const allMdFiles = fs.readdirSync(srcPath);
const jsonData = [];

allMdFiles.forEach(function(item, index) {
    if (item !== 'images') {
        const fileCont = fs.readFileSync(srcPath + '/' + item, 'utf-8');
        const resultCont = encodeURI(marked(fileCont));
<<<<<<< HEAD
        jsonData.push({
            name: item,
            cont: resultCont
        });
    }
});

fs.writeFileSync(path.resolve(__dirname, './../markdown-data.json'), JSON.stringify(jsonData, null, 4), 'utf-8');
=======
        jsonData.push({name: item, cont: resultCont});
    }
});

fs.writeFileSync(
    path.resolve(__dirname, './../markdown-data.json'),
    JSON.stringify(jsonData, null, 4), 'utf-8'
);
>>>>>>> ef5801d619fce4ec4d489fa50e184327e8dbda52
