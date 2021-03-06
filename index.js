'use strict'

var http = require("http").createServer(server),
     fs = require("fs"),
     io = require("socket.io")(http),
     conexions = 0   
function server(req, res){
 fs.readFile("index.html", (err, data)=>{
     if(err){
         res.writeHead(500, {'Content-Type': 'text/html'})
         return res.end('<h1>Error interno del servidor</h1>')
     }
     else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        return res.end(data, 'utf-8')
     }
 })
}
http.listen(3000)
console.log("localhost:3000")

io.on('connection', (socket)=>{
socket.emit('hello', {message:'Hola Mundo con Socket.IO'})
socket.on('otro evento que me invente', (data)=>{
    console.log(data)
})
conexions++
console.log(`Conexiones Activas: ${conexions}`)
//socket.emit('connect users', {numbers: conexions})
socket.broadcast.emit('connect users', {numbers: conexions})
socket.on('disconnect', ()=>{
    conexions --
    console.log(`Conexiones Activas: ${conexions}`)
    socket.broadcast.emit('connect users', {numbers: conexions})
})
})