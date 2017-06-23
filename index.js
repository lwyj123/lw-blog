const fs = require('fs');  
var fileName = 't.txt';  
fs.watch(fileName,( function () {  
    var count = 0;  
      
    return function(){  
        count++;  
        var data=fs.readFileSync("t.txt","utf-8");
        console.log("文件" + fileName + " 内容刚刚改变。。第" + count + "次" + ",data:" + data);  
    };  
})());  
console.log("watching file...");  