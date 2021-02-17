
/**
 * Sovryn node health check
*/
const express= require('express');
const app = express();
const http = require('http').createServer(app);
const Web3 = require('web3');

const serverPort = 3001;
const web3 = new Web3("http://127.0.0.1:4444");
const web3S = new Web3("ws://127.0.0.1:4445/websocket");
const web3Iov = new Web3('https://public-node.rsk.co');


http.listen(serverPort, () => {
    console.log('listening on *:'+serverPort);
});

app.get('/', async (req, res)=> {
    const b = await web3.eth.getBlockNumber();
    const s = await web3S.eth.getBlockNumber();
    const i = await web3Iov.eth.getBlockNumber();
    console.log(new Date(Date.now())+ " processed blocks: rpc "+b+", wss: "+s+"  iov: "+i);

    if(Math.abs(b - s) <= 3 && Math.abs(b-i)<=3) return res.status(200).send("ok");

    res.status(500).send("not in sync");
});
