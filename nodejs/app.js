var http = require('http'),
	chat = require('./chat'),
	server,
	io,
	port = process.env.PORT || 5555;

server = http.createServer();
chat.init(server);

server.listen(port);
console.log('Node.js chat server listening @ ' + port);
