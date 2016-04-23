var botCredentials = require('./botConfig.js'),
    CreateLobbyBot = require('./CreateLobbyBot.js'),
    prompt = require('prompt')
    
var bot = CreateLobbyBot(botCredentials)
    
var createLobby = function() {
        bot.createLobby(function(client, lobby) {
            console.log(lobby)
        })
    },
    leaveLobby = function(players) {
        bot.leaveLobby(players)
    },
    invitePlayers = function(players) {
        bot.inviteToLobby(players)
    },
    connect = function(clbk) {
        bot.connect(clbk)
    }
    
var players = ["76561198011392455"]

prompt.start()

function ContinuousPrompt() {
    prompt.get(['command'], function(err, result) {
        switch(result.command) {
            case 'connect': connect(); break;
            case 'leaveLobby': leaveLobby(players); break;
            case 'createLobby': createLobby(); break;
            case 'invitePlayers': invitePlayers(players); break;
            case 'disconnect': bot.disconnect(); break;
            case 'launch': bot.launchLobby(); break;
        }
        ContinuousPrompt()
    })
}


connect(ContinuousPrompt)