var PubNubClient  = require('pubnub');
var TempoDBClient = require('tempodb').TempoDBClient;

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Start the IoT Server Bridge for TempoDB via PubNub
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
exports.server = function(setup) {
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Init Vendor Libs
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    var tempodb = new TempoDBClient(
        setup.tempodb.key,
        setup.tempodb.secret,
        setup.tempodb
    );
    var pubnub  = PubNubClient(setup.pubnub);
    var request = setup.request || function(){};
    var error   = setup.error   || function(){};
    var debug   = setup.debug   || function(){};

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
    function reciever(event) {
        var action = event.action
        ,   series = event.series
        ,   data   = event.data;

        // Check Input
        if (!data || !action || !series) return error({
            info  : 'Invalid Request',
            event : event
        });

        // Fire Event
        request(event);
        events.fire( action, event );
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Data Event Receiver
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    events.bind( 'write', function(event) {
        var action   = event.action   // Action "write", "read", "ping"
        ,   series   = event.series   // TempoDB Series Key
        ,   response = event.response // Response Channel
        ,   data     = event.data;    // Payload

        tempodb.write_key( series, data, function(result) {
            if (response) pubnub.publish({
                channel : response,
                message : result
            });
            debug(result);
        } );
    } );
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Events Manager
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var events = {
    'list'   : {},
    'unbind' : function( name ) { events.list[name] = [] },
    'bind'   : function( name, fun ) {
        (events.list[name] = events.list[name] || []).push(fun);
    },
    'fire' : function( name, data ) {
        (events.list[name] || []).forEach(function(fun) { fun(data) });
    }
};
