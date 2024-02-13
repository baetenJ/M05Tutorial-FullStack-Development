// before anything run the 'npm install' to install any missing dependencies
// express is a framework that enables more elegant routing

const http = require('http');
const fs = require('fs'); //library gives ability to read file
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();
    greet();
    // set header content type 
    res.setHeader('Content-Type', 'text/html');

    // routing system for different urls
    // status codes handled
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break
        case '/about-me':
            path += 'about.html';
            res.statusCode = 301;
            // redirect to about page
            res.setHeader('Location', '/about');
            res.end();
            break
        default:
            path += '404.html';
            res.statusCode = 404;
            break
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data); // used for multiple things being written

            res.end(data); // can use res.end(data); for a single item
        }
    })

   //  res.write('hello ninjas');
   //res.write('<head><link rel="stylesheet" href="#"></head>');
   //res.write('<h1>Hello ninjas</h1>')
   //res.write('<p>We are really doing something</p>')
    //res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});