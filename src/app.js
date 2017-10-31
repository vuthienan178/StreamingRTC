const Peer = require('peerjs');
const uid = require('uid');
const $  = require ('jquery');
const openStream = require('./openCamera');
const playVideo = require('./playVideo')
function getPeer(){
    const id = uid(10);
    $('#peer-id').append(id);
    return uid(10);
}
const peer = new Peer(getPeer(),{host:'localhost',port: 3000, secure : true,key :'peerjs'});

$('#btnCall').click(() => {
    const friendId = $('#txtFiendId');
    openStream(stream => {
                playVideo(stream,'localStream');
                const call = peer.call(friendId,stream);
                console.log(call);
                call.on('stream',remoteSream => {
                    playVideo(remoteSream,'friendStream');
                })
    });
});
console.log('asdfadsf');

peer.on('call', (call) => {
    openStream(stream => {
        playVideo(stream,'localStream');
        call.answer(stream);
        console.log('fghfgh');
        call.on('stream', remoteStream => playVideo(stream,'friendStream'));
    });
});