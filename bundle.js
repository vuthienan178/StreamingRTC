/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function playVideo(stream, idVideo) {
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = function () {
        video.play();
    };
}

module.exports = playVideo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Peer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"peerjs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const uid = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"uid\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const openStream = __webpack_require__(2);
const playVideo = __webpack_require__(0);
const getIceObject = __webpack_require__(3);

getIceObject(iceConfig => {
    const connectionObj = {
        host: 'stream2905.herokuapp.com',
        port: 443,
        secure: true,
        key: 'peerjs',
        config: iceConfig
    };

    const peer = new Peer(getPeer(), connectionObj);

    $('#btnCall').click(() => {
        const friendId = $('#txtFriendId').val();
        openStream(stream => {
            playVideo(stream, 'localStream');
            const call = peer.call(friendId, stream);
            call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
        });
    });

    peer.on('call', call => {
        openStream(stream => {
            console.log('123123123')
            playVideo(stream, 'localStream');
            call.answer(stream);
            call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
        });
    });

});

function getPeer() {
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}






/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const playVideo = __webpack_require__(0);

function openStream(cb) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(stream => {
            cb(stream);
        })
        .catch(err => console.log(err));
}

module.exports = openStream;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function getIceObject(cb) {
    $.ajax({
        url: "https://service.xirsys.com/ice",
        data: {
            ident: "vanpho",
            secret: "2b1c2dfe-4374-11e7-bd72-5a790223a9ce",
            domain: "vanpho93.github.io",
            application: "default",
            room: "default",
            secure: 1
        },
        success: function (data, status) {
            // data.d is where the iceServers object lives
            cb(data.d);
        },
    });
}

module.exports = getIceObject;


/***/ })
/******/ ]);