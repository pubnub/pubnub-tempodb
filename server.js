var PubNubTempoDBServer = require('./pubnub-tempodb');

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Start PubNub TempoDB Bridge Server
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PubNubTempoDBServer.server({
    request : request,
    error   : error,
    debug   : debug,
    pubnub  : {
        publish_key   : 'demo',
        subscribe_key : 'demo',
        secret_key    : 'demo',
        channel       : 'temodb',
        connect       : server_ready
    },
    tempodb : {
        key    : '438cbdf5aff34aea8d29556ea22670f4', 
        secret : '764de767e00a445aaaa841d9b94e2fda'
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// On Server Ready
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function server_ready() {
    console.log('Server Bridge is Ready!');
    console.log(
        'http://www.pubnub.com/console/?'+
        'channel=tempodb'+
        '&pub=demo'+
        '&sub=demo'
    );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// On Request Events
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function request(data) {
    console.log( 'REQUEST', data );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// On Errors Events
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function error(data) {
    console.log( 'ERROR', data );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// On Debug Events
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function debug(data) {
    console.log( 'DEBUG', data );
}
