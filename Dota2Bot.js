module.exports = function(steamCredentials) {
    
    var dota2bot = {
        credentials: steamCredentials,
        connect: function(onReady) {
            
            var steam = require("steam"),
                util = require("util"),
                fs = require("fs"),
                crypto = require("crypto"),
                dota2 = require("dota2"),
                steamClient = new steam.SteamClient(),
                steamUser = new steam.SteamUser(steamClient),
                steamFriends = new steam.SteamFriends(steamClient),
                Dota2 = new dota2.Dota2Client(steamClient, true),
                dota2bot = this;
            
            var onSteamLogOn = function onSteamLogOn(logonResp) {
                    if (logonResp.eresult == steam.EResult.OK) {
                        steamFriends.setPersonaState(steam.EPersonaState.Busy); // to display your steamClient's status as "Online"
                        steamFriends.setPersonaName(dota2bot.credentials.steam_name); // to change its nickname
                        util.log("Logged on.");
                        Dota2.launch();
                        Dota2.on("ready", function() {
                            console.log("Node-dota2 ready.");
                            onReady(Dota2)
                        });
                        Dota2.on("unready", function onUnready() {
                            console.log("Node-dota2 unready.");
                        });
                        Dota2.on("chatMessage", function(channel, personaName, message) {
                            // util.log([channel, personaName, message].join(", "));
                        });
                        Dota2.on("guildInvite", function(guildId, guildName, inviter) {
                            // Dota2.setGuildAccountRole(guildId, 75028261, 3);
                        });
                        Dota2.on("unhandled", function(kMsg) {
                            util.log("UNHANDLED MESSAGE " + kMsg);
                        });
                        // setTimeout(function(){ Dota2.exit(); }, 5000);
                    }
                },
                onSteamServers = function onSteamServers(servers) {
                    util.log("Received servers.");
                    fs.writeFile('servers', JSON.stringify(servers));
                },
                onSteamLogOff = function onSteamLogOff(eresult) {
                    util.log("Logged off from Steam.");
                },
                onSteamError = function onSteamError(error) {
                    util.log("Connection closed by server.");
                };
            
            steamUser.on('updateMachineAuth', function(sentry, callback) {
                var hashedSentry = crypto.createHash('sha1').update(sentry.bytes).digest();
                fs.writeFileSync('sentry', hashedSentry)
                util.log("sentryfile saved");
                callback({
                    sha_file: hashedSentry
                });
            });
            
             // Login, only passing authCode if it exists
            var logOnDetails = {
                "account_name": dota2bot.credentials.steam_user,
                "password": dota2bot.credentials.steam_pass,
            };
            if (dota2bot.credentials.steam_guard_code) logOnDetails.auth_code = dota2bot.credentials.steam_guard_code;
            
            try {
                var sentry = fs.readFileSync('sentry');
                if (sentry.length) logOnDetails.sha_sentryfile = sentry;
            } catch (beef) {
                util.log("Cannae load the sentry. " + beef);
            }
            
            steamClient.on('debug', function(msg) {console.error(msg)});
            steamClient.on('error', onSteamError);
            
            steamClient.connect();
            steamClient.on('connected', function() {
                steamUser.logOn(logOnDetails);
            });
            steamClient.on('logOnResponse', onSteamLogOn);
            steamClient.on('loggedOff', onSteamLogOff);
            steamClient.on('servers', onSteamServers);
            
        }
    }
    
    
    return dota2bot
}

