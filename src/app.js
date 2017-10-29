const openCamera = require('./openCamera.js');
const $ = require('jquery');
//openCamera();
const Peer = require('simple-peer');
const p = new Peer({initiator: location.hash === '#1',trickle : false});

p.on('signal', token =>{
    $('#txtMySignal').val(JSON.stringify(token))
});

p.on('connect',() =>{
setInterval(()=> p.send(Math.random()),2000);

});

p.on('data',data => console.log('nhan du lieu:' + data))

$('#btnConnect').click(() => {
    const friendSignal = JSON.parse($('#txtFriendSignal').val());
    p.signal(friendSignal);
});

console.log('xin chao cac ban');