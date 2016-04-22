var botCredentials = require('./botConfig.js'),
    testBotCredentials = require('./testBotConfig.js'),
    CreateLobbyeBot = require('./CreateLobbyBot.js')
    
var bot = CreateLobbyBot(botCredentials),
    testBot = JoinLobbyBot(testBotCredentials)
    
bot.createLobby(function(client) {
    testBot.joinLobby()
})
