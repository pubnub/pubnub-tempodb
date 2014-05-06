# IoT TempoDB Bridge over PubNub

Secure your IoT data and enable global WAN access with PubNub and
the TempoDB Bridge for all Internet of Things devices.
This bridge allows you to interface with TempoDB using any PubNub
Client SDK including, JavaScript, C, mBed (ARM), Electric Emp,
Arduino, Raspberry Pi, PIC32, Ruby, iOS Objective-C, Android Embedded,
Java, PHP, .NET C# and more!
You can connect all your IoT devices using this bridge adapter.

There are no firewall rules to configure and the bridge adapter can
run on any network connected computer behind a closed firewall.
This includes your laptop!
And even your data center with closed firewall rules.
Wow how does that work?

## PubNub IoT TempoDB Bridge Setup

Install dependencies using NPM simple package management system.

```
npm install pubnub-tempodb
```

## PubNub IoT TempoDB Example Server Bridge

You can run the following from your laptop to web-enable TempoDB.
This script below is an example usage of the server bridge.
You can simply run `node server.js` after you've installed
`pubnub-tempodb` npm library.

```javascript
//
// - server.js -
//

// Load IoT TempoDB PubNub Bridge Server
var PubNubTempoDBServer = require('pubnub-tempodb');

// Start PubNub TempoDB Server Bridge
PubNubTempoDBServer.server({
    pubnub : {
        ssl           : true,
        publish_key   : 'pub-c-74c6367e-98c4-43a5-8ff9-64946f32dbc7',
        subscribe_key : 'sub-c-a7f2d50e-d544-11e3-b488-02ee2ddab7fe',
        secret_key    : 'sec=sec-c-NTkwNTIyMTctMzA5Mi00ZDg2LTg4MzgtOWIxMDJiNDM2MTFj',
        channel       : 'temodb',
        connect       : server_ready
    },
    tempodb : {
        secure : true,
        key    : '438cbdf5aff34aea8d29556ea22670f4', 
        secret : '764de767e00a445aaaa841d9b94e2fda'
    }
});
```

