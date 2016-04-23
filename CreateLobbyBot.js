var Dota2Bot = require('./Dota2Bot.js'),
    dota2 = require('dota2')
    
module.exports = function(credentials) {
    var dota2bot = Dota2Bot(credentials)
    
    dota2bot.createLobby = function(lobbyReady) {
        
        this.connect(function(client) {
            
            client.on('practiceLobbyUpdate', function(lobby) {
                console.info('Lobby ready: '+lobby.lobby_id)
                lobbyReady(client, lobby)
            });
            
            var createLobbyAttempt = function() {
                client.createPracticeLobby("password",
                                            {"game_name": "123qweasdzxc",
                                            "server_region": dota2.ServerRegion.USWEST,
                                            "game_mode": dota2.schema.DOTA_GameMode.DOTA_GAMEMODE_AR,
                                            "series_type": 2,
                                            "game_version": 1,
                                            "allow_cheats": false,
                                            "fill_with_bots": false,
                                            "allow_spectating": true,
                                            "pass_key": "password",
                                            "radiant_series_wins": 0,
                                            "dire_series_wins": 0,
                                            "allchat": true
                                            },
                                            function(err, body){
                                                 console.log("Couldn't create a lobby. Retrying...");
                                                 if(err) {
                                                     createLobbyAttempt();
                                                 }
                                            });
            }
            createLobbyAttempt()
            
            // setTimeout(function(){
            //     client.leavePracticeLobby(function(err, body){
            //         console.log(JSON.stringify(body));
            //     });
            // }, 60000);
        })
        
    }
    
    return dota2bot
}