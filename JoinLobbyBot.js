var Dota2Bot = require('./Dota2Bot.js'),
    dota2 = require('dota2')
    
module.exports = function(credentials) {
    var dota2bot = Dota2Bot(credentials)
    
    dota2bot.joinLobby = function() {
        
        this.connect(function(client) {
            lobbyId = '24513333891031801';
            client.joinPracticeLobby(lobbyId, "password", function() {
                console.log("joined lobby id: "+lobbyId)
            })
            client.on('practiceLobbyUpdate', function(lobby) {
                console.info('practiceLobbyUpdate:')
                console.info(lobby)
            });
            setTimeout(function(){
                client.leavePracticeLobby(function(err, body){
                    console.log(JSON.stringify(body));
                });
            }, 60000);
        })
        
    }
    
    return dota2bot
}