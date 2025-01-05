const http = require('http');
const httpProxy = require('http-proxy');

require('dotenv').config();

const URL_PROXY = process.env.URL_PROXY;
const PORT_PROXY = process.env.PORT_PROXY;
const URL_VUE = process.env.URL_VUE;
const URL_REACT = process.env.URL_REACT;


const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
    
    if (req.url.startsWith('/') && !req.url.startsWith('/dashboard')) {
        proxy.web(req, res, { target: URL_VUE });
        
    } else if (req.url.startsWith('/dashboard')) {
        proxy.web(req, res, { target: URL_REACT });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT_PROXY, () => {
    console.log('Proxy server running at ' + URL_PROXY);
});
