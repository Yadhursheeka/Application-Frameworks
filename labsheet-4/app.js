// Step 1
//part a
// node -v --> type in terminal

// part b
// initiate the project using 'npm init' and follow the steps
// create a file named app.js

// part c
console.log('Hello World');
// can print error as :
console.error('Something went wrong');
console.error(new Error('Something went wrong'));

// part d
// run using 'node app.js' or 'npm start'
// Guidelines to execute the app.js in different ways :
// To execute this file, there are many ways to execute it.
// 1: in Terminal, type node and the file name --> node app.js
// 2: Go to package.json and inside the 'scripts', type:
//   "scripts": {
//     "start": "node app.js"
//   },
// 2.1 : Then a play button is displayed alongside 'start', can click on that to execute..
// 2.2 : Complete Step 2 and then open terminal and type --> npm start

// 3 : Open Command Prompt in the working directory, and type node app.js


// Step 2
// part a
const os = require('os');

// part b
console.log('Architecture ' + os.arch());
console.log("Platform " + os.platform());
console.log('CPU Length ' + os.cpus().length);
console.log("Uptime " + os.uptime());
console.log('CPUs : ');
    for(const cpu of os.cpus()) {       // using in instead of 'of' will print index of cpus stored
        console.log(cpu);
    }

// Step 3
// part a
// Create a file named test.txt and add text into it as 'NodeJS is Awesome.'

// part b
const fs = require('fs');

// part c
// __dirname is the global variable
// __dirname is the file path of the current working directory.
// Let's see what __dirname contains :
console.log("__dirname = " + __dirname);
// using __dirname which is a system variable to save the file location
// So here, we are appending the file '/test.txt' with __dirname :
const fileName = __dirname + '/test.txt';

// part d
// reading file asynchronously, in the readFile method, a callback
// is passed with two arguments, which is the error  and the content passed.
//      === Method 1 ===
fs.readFile(fileName, (err, data) => {
    // this false --> the if(err) body will not be executed
    // err == null      --> this false
    // err == undefined --> this false
    // Here, err is an object and does not check for following conditions,
    // but only the above 2 conditions...

    // err == 0         --> this false
    // in err == 0 --> if it was an array, it might return true since
    // it holds a value... As the first index of an array is zero.
    // err == ''        --> this false
    // err == false     --> this false
    if (err) {
        console.error(err);
        return;
    }

    console.log(data.toString());
    // data is a buffer, so to print the content, we need to convert
    // it to string
});

// part e
fs.readFile(fileName, (err, data) => {
    if(err) {
        console.error(err);
    }
    console.log(data);
    // data is a buffer, so will be printed as it is.
});

// EXTRA KNOWLEDGE :
//      === Method 2 ===
// To print without using __dirname for fileName :
fs.readFile('test.txt', (err, data) => {
    if(err) {
        console.error(err);
    }
    console.log(data.toString());
});

//      === Method 2.2 - using encoding as a parameter in readFile() ===
fs.readFile(fileName, 'utf-8', (err, data) => {
    if(err) {
        console.error(err);
    }
    console.log(data.toString());
});

//      == Method 2.3 - using encoding as a parameter inside data.toString() ===
fs.readFile(fileName, (err, data) => {
    if(err) {
        console.error(err);
    }
    console.log(data.toString('utf-8'));
});


// part f --> Reading file Synchronously
// Synchronous operations are held for very special cases in NodeJS.
// Sometimes synchronous operations are used in situations where some
// files in a directory needs to be read before loading the NodeJS modules...
// *** Should be using readFile() and asynchronous operations mostly...
// Not Synchronous operations
//      --- Method 1 ---
const data1 = fs.readFileSync(fileName);
console.log(data1);

//      --- Method 2 ---
const data2 = fs.readFileSync('test.txt');
console.log('Synchronous ' + data2.toString());

// Step 4 - using read streams to copy content of a file
// We can use readStreams and writeStreams to direct file contents from
// one end to the other. However, when it comes larger files, it might
// be quite difficult to stream them, but smaller ones would be easier...
// We are using the file system, since it was already imported to const fs,
// we'll be using that in the below steps :

// part a --> creating variables to store the path of readFile and writeFile
const readFile = __dirname + '/test.txt';
const writeFile = __dirname + '/test-copy.txt';

// part b --> creating readStream and writeStream for taking contents from readingFile
// //              and displaying/directing readFile contents to writeFile
const readStream = fs.createReadStream(readFile);
const writeStream = fs.createWriteStream(writeFile);

// part c
// directing file contents from readFile to writeFile by using pipe()
readStream.pipe(writeStream);

// part d
// verify that test-copy.txt is being created while executing the
// above commands, and that it contains the same content as that
// of test.txt

// part e
// Listening to the data event of readStream and printing the output
// of the file contents that were directed...
readStream.on('data', data => {
    console.log('Read Stream ' + data.toString());
});

// EXTRA KNOWLEDGE :
// Listeners for readStream and WriteStream :

// Some available listeners for readStream are :
//      close, end
// *** Remember that, when 'close' is used with readStream, close should also be used with writeStream
// *** Else if 'end' was used with readStream, 'finish' should be used with writeStream

// If you need to do anything after reading the file contents,
// i.e end of reading file, the addListener() can be used to do so :
readStream.addListener('end', () => {
    console.log("End of file read");
});

// Some available listeners for writeStream are :
//      finish, close
// *** Remember that, when 'close' is used with writeStream, 'close' should also be used with readStream
// *** Else if 'finish' was used with writeStream, 'end' should be used with readStream

// If you need to do anything after writing the readFile contents,
// i.e. end of writingFile, the addListener() can be used to do so :
writeStream.addListener('finish', () => {
    console.log("End of file write");
    console.log(fs.readFileSync(writeFile, 'utf-8').toString());
});

// Anything printed after the end of writeStream, will not
// be executed... Only applicable for writeStream and not readStream
// and applies with synchronous operations only...
// For example :
//console.log(fs.readFileSync(writeFile, 'utf-8').toString());
// The above synchronous command will not give any output... But once we have put
// it inside the addListener() of writeStream, it will display the contents...

// Step 5 -- Just to understand how http server is created in NodeJS, it's not the one used in WebServices...
// part a -- importing 'http' core module from available libraries
const http = require('http');

// part b
// http.createServer( (req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h1>Hello World</h1>');
//     res.end();
// }).listen(3000, (err) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log('Server is listening on port 3000');
// });

// part c   --> run the project and check if it's executing on browser
//             or type localhost:3000 and check

// part d
http.createServer( (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    switch(req.method) {
        case 'GET' : res.write('<h1>Hello World</h1>');
                     res.end();
                     break;

        case 'POST' : req.on('data', data => {
                      res.write('<h1>Hello ' + data + '</h1>');
                      });
                      res.end();
                      break;

        case 'PUT' :  req.on('data', data => {
                      res.write('<h1>Hi ' + data + '</h1>');
                      });
                      res.end();
                      break;
    }

}).listen(3000, (err) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log('Server is listening on port 3000');
});

// EXTRA KNOWLEDGE TO KNOW :
// Let's say you have a function as below :
function display() {
    document.write('<h1>Exporting Functions</h1>');
};
// And you need the function to be exported to another file... Then :
// module.exports = {display};

// And the importing in the other file is done as :
// const {display} = require('./app');