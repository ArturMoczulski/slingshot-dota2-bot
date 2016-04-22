jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

describe('CreateLobbyBot', function() {   
    
    var expectedLobby;
    
    beforeEach(function(done) {
        
        var botCredentials = require('../../botConfig.js'),
            CreateLobbyBot = require('../../CreateLobbyBot.js'),
            bot = CreateLobbyBot(botCredentials)
        
        bot.createLobby(function(client, lobby) {
            
            expectedLobby = lobby
            
            done()
        })
    })
    
    it('creates a lobby in Dota2', function() {
        
        expect(expectedLobby.lobby_id).toBeTruthy()
        
    })
})