# vhstatus
vhstatus provides a status page for a dedicated [Valheim](http://valheimgame.com) server.
It shows a list of online and offline players. To run it you'll need [Node.js](https://nodejs.org/en/) and access to the server log file.

## To install and run

Copy and edit `config.json.example` to `config.json` with your server name, path to server log and optional update frequency and port.


```
cp config.json.example config.json
vi config.json
npm install
npm run start
```

Now access the status page on, e.g., http://localhost:3000

## Docker Instructions
```
docker build -t vhstatus .
docker run -d -p 3000:3000 -v $(pwd)/logs/:/usr/src/app/logs/ vhstatus
```

## Rsync server.log
Use SSH Keys to rsync without password
```
ssh-keygen
ssh-copy-id -i ~/.ssh/id_rsa.pub steam@valheim

rsync -a steam@valheim:/opt/valheim/server.log /opt/vhstatus/logs/server.log
```
