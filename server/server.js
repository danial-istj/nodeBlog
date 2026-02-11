const http=require('http');
const fs =require('fs');
const _ =require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //loadash

    const num = _.random(0, 20)
    console.log(num)

    const greet = _.once(() => {
        console.log('Hello from once function.')
    })
    greet()
    greet()

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;

        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;

        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end()
            break;

        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }

    //set header content type
    res.setHeader('Content-Type', 'text/html')

    fs.readFile(path, (err, data) => {
        if (err) throw new Error(
            'File not found'
        );
        // res.write(data)
        res.end(data)
    })
});

server.listen(7000, 'localhost', () => {
    console.log('listening for request on port 7000');
})