(function(){

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Init Bridge
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var pubnub = PUBNUB({ 
    ssl           : true,
    publish_key   : 'pub-c-74c6367e-98c4-43a5-8ff9-64946f32dbc7',
    subscribe_key : 'sub-c-a7f2d50e-d544-11e3-b488-02ee2ddab7fe'
});

pubnub.server_channel   = 'tempodb';
pubnub.response_channel = '50N3l1dzRocjY3dDZ5aG';

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Data Event Receiver
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
pubnub.subscribe({
    channel : pubnub.response_channel,
    connect : ping,
    message : receiver
});

function receiver( data, envelope, channel ) {
    pubnub.events.fire( data.action, data );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Check Connectivity Ping/Pong
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
pubnub.events.bind( 'pong', pong );
function pong() {
    if (pong.ready) return;
    pong.ready = true;

    clearInterval(ping.iv);
    sounds.play('media/notify');

    var indicator = pubnub.$("indicator")
    ,   title     = pubnub.$("indicator-title");

    log('Connection Ready');
    title.innerHTML     = 'Connection Ready';
    indicator.innerHTML = '<span class="glyphicon glyphicon-check"></span>';

    animate( title, [
        { 'd' : 1.6, 'ty' : -12 }
    ] );

    animate( indicator, [
        { d : 0.1, color : '#00d779' },
        { d : 0.2, color : '#fff' },
        { d : 0.1, color : '#00d779' },
        { d : 0.2, color : '#fff' },
        { d : 0.1, color : '#00d779' },
        { d : 0.2, color : '#fff' },
        { d : 0.2, color : '#00d779', ty : -10 }
    ] );

    setInterval( function() {
        animate( indicator, [
            { d : 0.8, color : '#00d779', ty : -2 }
        ] );
    }, 1500 );

    setInterval( function() {
        animate( indicator, [
            { d : 0.9, color : '#00d779', ty : -10 }
        ] );
    }, 2000 );
}
function ping() {
    pubnub.publish({
        channel : pubnub.server_channel,
        message : { action : 'ping', response : pubnub.response_channel }
    });
}
ping.iv = setInterval( ping, 1500 );

log.out = pubnub.$('result');
function log(data) {
    log.out.innerHTML = JSON.stringify(data) + "\n" + log.out.innerHTML;
}

})();
