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
        if (!action) return error({
            info  : 'Invalid Request',
            event : event
        });

        // Fire Event
        request(event);
        events.fire( action, event );
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Ping/Pong Receiver
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    events.bind( 'ping', function(event) {
        pubnub.publish({
            channel : event.response,
            message : { action : 'pong', data : 'pong' }
        });
    } );

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Write Event
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    events.bind( 'write', function(event) {
        var action   = event.action   // Action "write", "read", "ping"
        ,   series   = event.series   // TempoDB Series Key
        ,   response = event.response // Response Channel
        ,   data     = event.data;    // Payload

        tempodb.write_key( series, data, function(result) {
            if (!result.body) result.body = "Success";
            if (response) pubnub.publish({
                channel : response,
                message : { action : 'write', data : result }
            });
            debug(result);
        } );
    } );

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Read Event
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    events.bind( 'read', function(event) {
        var action   = event.action   // Action "write", "read", "ping"
        ,   series   = event.series   // TempoDB Series Key
        ,   response = event.response // Response Channel
        ,   data     = event.data;    // Payload

        tempodb.read(
            event.start || new Date('2010-01-01'),
            event.end   || new Date,
            event,
        function(result) {
            if (response) pubnub.publish({
                channel  : response,
                message  : { action : 'read', data : result },
                callback : debug
            });
            debug(JSON.stringify(result));
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
