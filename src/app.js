const test = require('./test');
const getStream = require('./getStream');
const playVideo = require('./playVideo');
import uid from 'uid';
import Peer from 'peerjs';
import $ from 'jquery';
const config = {host:'9000-d698c0e6-3cf6-4f06-b90a-7c622a79ca72.ws-us02.gitpod.io', port:443, secure:true, key: 'peerjs'}
//const uid = require('uid');
function getPeer(){
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}
//getStream();
const peer = new Peer(getPeer());
//console.log(peer);
$('#btnCall').click(() => {
    const friendId = $('#txtFriendId').val();
    console.log(friendId);
    getStream(stream => {
        playVideo(stream,'localStream');
        const call = peer.call(friendId,stream);
        call.on('stream',(remoteStream) => playVideo(remoteStream,'friendStream'));
    });
});
peer.on('call', (call) => {
    getStream(stream => {
        playVideo(stream,'localStream');
        call.answer(stream);
        call.on('stream',(remoteStream) => playVideo(remoteStream,'friendStream'));
    });
  });