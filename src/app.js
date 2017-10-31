const Peer = require('peerjs');
const uid = require('uid');
const $  = require ('jquery');
function getPeer(){
    const id = uid(10);
    $('#peer-id').append(id);
    return uid(10);
}
const peer = new Peer(getPeer(),{host:'localhost',port: 3000, secure : true,key :'peerjs'});
console.log(peer);