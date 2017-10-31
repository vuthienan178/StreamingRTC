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
const peer = new Peer(getPeer(),{host:'https://streamingrtc.herokuapp.com/',port: 443, secure : true,key :'peerjs'});

$('#btnCall').click(() => {
    const friendId = $('#txtFiendId');
    openStream(stream => {
                playVideo(stream,'localStream');
                const call = peer.call(friendId,stream);
                call.on('stream',remoteSream => {
                    playVideo(remoteSream,'friendStream');
                })
    });
});

peer.on('call', (call) => {
    openStream(stream => {
        playVideo(stream,'localStream');
        call.answer(stream);
        console.log('fghfgh');
        call.on('stream', remoteStream => playVideo(stream,'friendStream'));
    });
});