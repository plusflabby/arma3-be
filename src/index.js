const BE_Node = require("battle-node")
const events = require('events')
let BE = null
let Debug = false
let RetryOnFailedAttempt = true
const BE_Messages = new events.EventEmitter()

function reconnect(Config) {
    if (BE !== null) {
        setTimeout(() => {
            const BE_Config = Config

            BE = new BE_Node(BE_Config)

            BE.login()
    
            BE.on('login', function(err, success) {
                if (err) {
                    if (Debug === true) console.log('Unable to reconnect to server. Check IP & Port. Retrying..')
                    reconnect(BE_Config)
                }
                else if (success == true) {
                    if (Debug === true) console.log('Logged in to RCON successfully.')
                }
                else if (success == false) {
                    if (Debug === true) console.log('RCON login failed! The password may be incorrect. Retrying..')
                    reconnect(BE_Config)
                }
            })
    
            BE.on('disconnected', function() {
                if (Debug === true) console.log('RCON server disconnected. Retrying..')
                reconnect(BE_Config)
            })
    
            BE.on('message', function(message) {
                BE_Messages.emit("message", message)
            })
        }, 10000)
    }
}

module.exports.Config = (Config) => {
    if (typeof Config !== "object") throw new Error("Config must be an object and the object keys must be strings.")
    else {
        if (typeof Config.Debug === "boolean") {
            if (Config.Debug === true) Debug = true
        }
        if (typeof Config.RetryOnFailedAttempt === "boolean") {
            if (Config.RetryOnFailedAttempt === false) RetryOnFailedAttempt = false
        }

        const BE_Config = {
            ip: Config.IP,
            port: Config.Port,
            rconPassword: Config.Password
        }

        BE = new BE_Node(BE_Config)

        BE.login()

        BE.on('disconnected', function() {
            if (Debug === true) console.log('RCON server disconnected. Retrying..')
            if (RetryOnFailedAttempt === true) reconnect(BE_Config)
        })

        BE.on('login', function(err, success) {
            if (err) {
                console.log('Unable to connect to server. Check IP & Port. Retrying..')
                if (RetryOnFailedAttempt === true) reconnect(BE_Config)
            }
            else if (success == true) {
                if (Debug === true) console.log('Logged in to RCON successfully.')
            }
            else if (success == false) {
                console.log('RCON login failed! The password may be incorrect. Retrying..')
                if (RetryOnFailedAttempt === true) reconnect(BE_Config)
            }
        })

        BE.on('message', function(message) {
            BE_Messages.emit("message", message)
        })
    }
}

module.exports.SendCommand = (Command) => {
    if (BE !== null) {
        return new Promise((resolve, reject) => {
            if (typeof Command !== "string") resolve("Command must be a string")
            else {
                BE.sendCommand(Command, function(output) {
                    resolve(output)
                })
            }
        })
    }
}

module.exports.Messages = BE_Messages