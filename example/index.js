const arma3_be = require("../src/index")

//Set config and attempt rcon connection
arma3_be.Config({
    IP: "127.0.0.1",
    Port: "2306",
    Password: "testpassword",
    Debug: true,
    RetryOnFailedAttempt: true
})

//Get a list of connected players
arma3_be.SendCommand("players").then((response) => {
    console.log(response)
})

//Note that there is no response when sending "say" command
arma3_be.SendCommand("say -1 Hello world!").then(() => {
    console.log("Successfully sent message!")
})