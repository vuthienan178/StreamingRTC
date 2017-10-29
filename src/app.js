const openCamera = require('./openCamera.js');
const $ = require('jquery');
//openCamera();
const Peer = require('simple-peer');
const p = new Peer({initiator: location.hash === '#1',trickle : false});

p.on('signal', token =>{
    $('#txtMySignal').val(JSON.stringify(token));
});



console.log('xin chao cac ban');