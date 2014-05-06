var PubNubClient  = require('pubnub');
var TempoDBClient = require('tempodb').TempoDBClient;

var server     =
exports.server =
function(setup) {
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Init Vendor Libs
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    var tempodb = new TempoDBClient( setup.tempodb.key, setup.tempodb.secret );
    var pubnub  = PubNubClient(setup.pubnub);

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Secure Bridge Connection
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    pubnub.subscribe({
        channel : setup.pubnub.channel,
        message : reciever,
        connect : setup.pubnub.connect
    });

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Data Event Receiver
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function reciever(data) {
        console.log(data);
    }
};
