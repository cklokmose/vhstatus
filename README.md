# vhstatus
vhstatus provides a status page for a dedicated [Valheim](http://valheimgame.com) server.
It shows a list of online and offline players. To run it you'll need [Node.js](https://nodejs.org/en/) and access to the server log file.

## To install and run

```
npm install
```

Edit `config.json` with your server name, path to server log and optional update frequency and port.

```
npm run start
```

Now access the status page on, e.g., http://localhost:3000


### Docker Instructions
rsync server.log to ./logs/server.log

```
docker build -t vhstatus .
docker run -p 3000:3000 -v ./logs/:/usr/src/app/logs/ vhstatus
```