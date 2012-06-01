var socketIo = require('socket.io');

function init (server) { 
		
	var io = socketIo.listen(server);

	io.sockets.on('connection', function(socket){
		socket.on('join', function (userName){
			socket.set('userName', userName);
			socket.broadcast.emit('join', userName);
		});
		socket.on('message', function (message){
			
			socket.get('userName', function (err, userNameData){
				var data = { message : message, userName : userNameData.userName };
				socket.emit('message', data)
				socket.broadcast.emit('message', data);
			});			
		
		});
		socket.on('disconnect', function () {
			socket.get('userName', function (err, userNameData) {
				socket.broadcast.emit('unjoin', { userName : userNameData.userName });
			})			
		});		
	});
}

exports.init = init;
