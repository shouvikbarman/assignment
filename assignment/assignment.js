const fs = require('fs');
const page1 = fs.readFileSync('./book/page1.txt',{encoding:'utf8', flag:'r'});

const page2 = fs.readFileSync('./book/page2.txt',{encoding:'utf8', flag:'r'});

const page3 = fs.readFileSync('./book/page3.txt',{encoding:'utf8', flag:'r'});

const exclude = fs.readFileSync('./book/exclude-words.txt',{encoding:'utf8', flag:'r'});

let page1arr = page1.split(/[ .:;?!~,`"&|()<>{}\[\]\d\r\n/\\]+/);
let page2arr = page2.split(/[ .:;?!~,`"&|()<>{}\[\]\d\r\n/\\]+/);
let page3arr = page3.split(/[ .:;?!~,`"&|()<>{}\[\]\d\r\n/\\]+/);
let excludearr = exclude.split('\n')

let excludeWords = {};
let lookup = {};
let result = {};

for (word of excludearr) {
    excludeWords[word] = [1]
}

for (let i = 0; i < page1arr.length; i++) {

    let word = page1arr[i].toLowerCase();
    if(i == page1arr.length-1){
        lookup = {}
    }
    if (word in excludeWords || word in lookup) continue;
    if (result[word]){
        result[word].push(1);
    }else {
        result[word] = [1]
        lookup[word] = [1]
    }

}

for (let i = 0; i < page2arr.length; i++) {
    let word = page2arr[i].toLowerCase();
    if(i == page2arr.length - 1){
        lookup = {}
    }
    if (word in excludeWords || word in lookup) continue;
    if (result[word]){
        result[word].push(2);
        lookup[word] = [2]
    }else {
        result[word] = [2]
        lookup[word] = [2]
    }

}

for (let i = 0; i < page3arr.length; i++) {

    let word = page3arr[i].toLowerCase();
    if(i == page3arr.length - 1){
        lookup = {}
    }
    if (word in excludeWords || word in lookup) continue;
    if (result[word]){
        result[word].push(3);
        lookup[word] = [3]
    }else {
        result[word] = [3]
        lookup[word] = [3]
    }

}

let resultKeyArr = Object.keys(result).sort();

var logger = fs.createWriteStream('./result/result.txt')
logger.write('Word : Page Numbers\n---------------------\n')
resultKeyArr.forEach(key => {
    logger.write(`${key} : ${result[key]}\n`)
})
