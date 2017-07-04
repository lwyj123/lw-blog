const fs = require('fs'); 
// a better way to watch file change
var chokidar = require('chokidar'); 
var escapeJSON = require('escape-json-node');
var fileName = 't.txt';  
/*fs.watch('./', {
    persistent: true, // 设为false时，不会阻塞进程。
    recursive: false
}, function(event, filename) {
    if (event === 'change') {
        console.log('检测到文件change。' + filename);
        var data=fs.readFileSync(filename, "utf-8");
        if (filename) {
            console.log('文件change:', data);
        }
    }
});*/

var chokidar = require('chokidar');

var watcher = chokidar.watch('file, dir, or glob', {
  ignored: [ 
    'node_modules',
    'README.md'
  ],
  persistent: true
});

var log = console.log.bind(console);
var showdown  = require('showdown');
var converter = new showdown.Converter();

watcher.add('./**/*.mda');
watcher
  .on('add', function(path) { log('File', path, 'has been added'); })
  .on('addDir', function(path) { log('Directory', path, 'has been added'); })
  .on('change', function(path) {
    log('File', path, 'has been changed'); 

    var info = readFileInfo(path);
    var dirPath = path.replace(/(.*)\/[^\/.]+\..*?$/, '$1')
    generateArticleJson(dirPath, info);
  })
  .on('unlink', function(path) { log('File', path, 'has been removed'); })
  .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
  .on('error', function(error) { log('Error happened', error); })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); });
  

console.log("watching file...");  


function readFileInfo(path) {
    var data = fs.readFileSync(path, "utf-8");
    data = data.split('%%%%%%%%');

    var html = converter.makeHtml(data[1]).replace(/\n/g, '');
    var metaObj = JSON.parse(data[0]);
    var stat = fs.statSync(path);

    metaObj['created_CST'] = stat.ctime;
    metaObj['modified_CST'] = stat.mtime;
    metaObj['slug'] = metaObj.title.replace(' ', '-');
    return {
        metaObj: metaObj,
        html: html
    }
}
function generateArticleJson(basePath, infoObj) {
    fs.writeFile(`${basePath}/${infoObj.slug}.json`, escapeJSON(JSON.stringify(infoObj)), function (err) {
        if (err) {
            console.log(err);
        } else {
            var temp = JSON.stringify(infoObj)
            log(JSON.stringify(infoObj).replace(/\\"/g, '\\"'))
        }
    });
}