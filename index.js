const dbase= require('./database/mongodb.js');
var app = require('express')();
var server = require('http').Server(app);
let functions=require('./function.js');

server.listen(3002);

app.get('/location', async function (req, res) {
 let final= await functions.sendPush();
  res.send(final)
});
async function start(){
try{
  await dbase.cool();
  
}catch(error){
   throw error;
}

console.log(`Server running at:3002`);
};
start();
