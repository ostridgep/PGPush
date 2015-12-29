'use strict';

var app = {
    // Application Constructor
    initialize: function() {
        app.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        app.log('Received Event: ' + id);
        app.log('Initialize Kinvey PhoneGap library.');

        var promise = Kinvey.init({
            appKey: window.APP_KEY,
            appSecret: window.APP_SECRET,
            apiHostName: window.API_HOSTNAME
        }).then(function(activeUser) {
            app.log('Kinvey PhoneGap library initialized.')

            if (!activeUser) {
                return Kinvey.User.signup({
                    username: 'phonegap',
                    password: 'phonegap'
                }).catch(function(err) {
                    if (err.name === 'UserAlreadyExists') {
                        return Kinvey.User.login('phonegap', 'phonegap');
                    }

                    throw err;
                });
            }

            return activeUser;
        }).then(function(activeUser){
            app.log('The phonegap user has been logged in to Kinvey.');
            app.log('Register the device for push notifications.');

            var push = PushNotification.init({
                android: {
                    senderID: window.GOOGLE_PROJECT_ID
                },
                ios: {
                    alert: true,
                    badge: true,
                    sound: true
                }
            });

            push.on('registration', function(data) {
                if (!Kinvey.getActiveUser()) {
                    app.log('No logged in user.');
                }
                else {
                    Kinvey.Push.register(data.registrationId).then(function() {
                        app.log('Device has been registered.');
                    }, function(error) {
                        app.log('Error: ' + JSON.stringify(err));
                    })
                }
            });

            push.on('notification', function(data) {
                app.log(JSON.stringify(data));
                alert(data.message);

                if (data.sound) {
                    var media = new Media(data.sound);
                    media.play();
                }
            });

            push.on('error', function(err) {
                app.log('Error: ' + JSON.stringify(err));
            });
        }).catch(function(err) {
            app.log('Error: ' + JSON.stringify(err));
        });
    },

    log: function(text) {
        var node = document.createElement('p');
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        document.getElementById('output').appendChild(node);
    }
};
