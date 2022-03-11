const express=require('express');
const app=express();
const http=require('http');
const ejs=require('ejs');
const server=http.createServer(app);
const {Server}=require('socket.io');
const port=process.env.PORT||3000;

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.render('home');
})

const io=new Server(server);
const users={}
io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('new_user_joined',(nam)=>{
        users[socket.id]=nam;
        socket.broadcast.emit('user_joined',nam);
    })
    socket.on('send_to_server',message=>{
        console.log("message ",message);
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
})
server.listen(port,console.log('server started'));