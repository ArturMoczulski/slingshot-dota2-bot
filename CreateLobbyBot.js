var Dota2Bot = require('./Dota2Bot.js'),
    dota2 = require('dota2')
    
module.exports = function(credentials) {
    var dota2bot = Dota2Bot(credentials),
        superCreateLobby = dota2bot.createLobby
        
    dota2bot.createLobby = function(lobbyReady) {
        superCreateLobby("123qweasdzxc","password", lobbyReady)
    }
    
    return dota2bot
}