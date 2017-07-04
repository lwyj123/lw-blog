const fs = require('fs'); 
// a better way to watch file change
var chokidar = require('chokidar'); 
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
watcher.add('./**/*.md');
watcher
  .on('add', function(path) { log('File', path, 'has been added'); })
  .on('addDir', function(path) { log('Directory', path, 'has been added'); })
  .on('change', function(path) { log('File', path, 'has been changed'); })
  .on('unlink', function(path) { log('File', path, 'has been removed'); })
  .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
  .on('error', function(error) { log('Error happened', error); })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); });
  

console.log("watching file...");  