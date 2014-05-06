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
    console.log('alskdjfl');
    if (data == 'pong') pong();
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Check Connectivity Ping/Pong
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function pong() {
    var indicator = pubnub.$("indicator");
    indicator.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
    pubnub.css( indicator, { color : "#2e1" } );
}
function ping() {
    pubnub.publish({
        channel : pubnub.server_channel,
        message : { action : 'ping', response : pubnub.response_channel }
    });
}


})();
