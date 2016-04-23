var botCredentials = require('./botConfig.js'),
    CreateLobbyBot = require('./CreateLobbyBot.js')
    
var bot = CreateLobbyBot(botCredentials)
    
bot.createLobby(function(client, lobby) {
    console.log(lobby)
})
