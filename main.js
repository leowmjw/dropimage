var dropbox = require('dropbox');
var express = require('express');
var everyauth = require('everyauth');
var ejs = require('ejs');

var server = express.createServer();
server.configure(function() {
    server.register('html', ejs);
    server.set('view engine', 'html');
    server.set('views', __dirname + '/view');

    server.use(express.cookieParser());
    server.use(express.session({ secret : 'We are dropbox people' }));
    server.use(express.static(__dirname + '/public'));
});

server.get('/', function(req, res){
    res.render('index.html');
});

server.listen(1337);

