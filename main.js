var dropbox = require('dropbox');
var express = require('express');
var everyauth = require('everyauth');
var ejs = require('ejs');
var fs = require('fs');

everyauth.dropbox
    .entryPath('/login')
    .consumerKey('hm6mivak4p6iwfs')
    .consumerSecret('5z3mljqqlw9apue')
    .findOrCreateUser( function(sess, accessToken, accessSecret, user) {
        console.log('identified user');
    })
    .redirectPath('/');

var server = express.createServer();
server.configure(function() {
    server.register('html', ejs);
    server.set('view engine', 'html');
    server.set('views', __dirname + '/view');

    server.use(express.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret : 'We are dropbox people' }));
    server.use(express.static(__dirname + '/public'));
    server.use(everyauth.middleware());
    server.use(server.router);

    everyauth.helpExpress(server);
});

server.get('/', function(req, res){
    res.render('index.html');
});

var users = { 'foo' : 'bar' };

server.listen(1337);

