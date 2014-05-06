var PubNubTempoDBServer = require('./pubnub-tempodb');

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Start PubNub TempoDB Bridge Server
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PubNubTempoDBServer.server({
    request : request,
    error   : error,
    debug   : debug,
    pubnub  : {
        ssl           : true,
        publish_key   : 'pub-c-74c6367e-98c4-43a5-8ff9-64946f32dbc7',
        subscribe_key : 'sub-c-a7f2d50e-d544-11e3-b488-02ee2ddab7fe',
        secret_key    : 'sec=sec-c-NTkwNTIyMTctMzA5Mi00ZDg2LTg4MzgtOWIxMDJiNDM2MTFj',
        channel       : 'tempodb',
        connect       : server_ready
    },
    tempodb : {
        secure : true,
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
        'https://www.pubnub.com/console/?'                            +
        'sub=sub-c-a7f2d50e-d544-11e3-b488-02ee2ddab7fe&'             +
        'pub=pub-c-74c6367e-98c4-43a5-8ff9-64946f32dbc7&'             +
        'sec=sec-c-NTkwNTIyMTctMzA5Mi00ZDg2LTg4MzgtOWIxMDJiNDM2MTFj&' +
        'channel=tempodb'
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
