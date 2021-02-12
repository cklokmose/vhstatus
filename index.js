const http = require("http")
const express = require('express')
const app = express()
const fs = require("fs");
const ws = require('ws');
let users = {}

app.use(express.static('www'))

const server = http.createServer(app);
const wss = new ws.Server({ server });

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

wss.on('connection', socket => {
  socket.on('message', message => console.log(message));
  sendUsers();
});

function sendUsers() {
	fs.readFile(config.log, "utf8", (err, data) => {
		if (err) {
			console.log(err)
			process.exit(1)
		} else {
			let lines = data.split("\n");

			let lastUser;
			for (let line of lines) {
				let handshake = line.match(/(handshake from client )(\d+)/);
				let user = line.match(/(Got character ZDOID from )([\w ]+)(\s:)/);
				let disconnected = line.match(/(Closing socket )(\d\d+)/)
				if (handshake) {
					let id = handshake[2];
					let time = new Date(line.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/));
					users[id] = {connected: time, disconnected: undefined, user: undefined};
					lastUser = id;
				}
				if (disconnected) {
					let id = disconnected[2];
					let user = users[id];
					let time = new Date(line.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/));
					user.disconnected = time;
				}
				if (user) {
					if (lastUser) {
						users[lastUser].user = user[2];
						lastUser = undefined;
					}
				}
			}
			wss.clients.forEach((client) => {
				let msg = {};
				msg.users = users;
				msg.serverName = config.serverName;
				client.send(JSON.stringify(msg));
			});
		}
	});
}

setInterval(sendUsers, config.freq);

server.listen(config.port, () => {
  console.log(`Valheim status at http://localhost:${config.port}`)
})
