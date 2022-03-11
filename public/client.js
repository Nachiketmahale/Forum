
const socket=io('http://localhost:3000');
const nam=prompt('Enter your name to chat with your friends');
const message=document.getElementById('data');
const send=document.getElementById('btn');
const message_Wrapper=document.getElementById('message-container');
const form=document.getElementById('form');
const audio=new Audio('ting.mp3');
socket.emit('new_user_joined',nam)

socket.on('user_joined',nam=>{
    addmessage('',nam,"joined");
})

const addmessage=(m,n,p)=>{
    const newmessage=document.createElement('div');
    if(p==="joined"){
        newmessage.innerHTML=`<p>${n} joined the room</p>`;
    }
    else{
        newmessage.innerHTML=`<p>${n}: ${m}</p>`;
    }
    newmessage.classList.add("message");
    newmessage.classList.add(p);
    message_Wrapper.append(newmessage);
}
//utilities

form.addEventListener('submit',(e)=>{
    e.preventDefault();
});

send.addEventListener('click',()=>{
    const msg=message.value;
    addmessage(msg,"you","sender");
    socket.emit('send_to_server',msg);
    message.value=" ";
})

socket.on('receive',data=>{
    addmessage(data.message,data.name,"receiver");
    audio.play();
})


