# arma3-be
Connects to your arma 3 server's battleye.

## Requirements
- [Node.JS](https://nodejs.dev/)
- [NPM](https://www.npmjs.com/) - This is installed by default when you install Node.JS

## Installation
1. Install the package using NPM with command `npm i --save arma3-be`
2. Done! Now time to configure.

## Configuration
### Package
Add this to the top of your file
```javascript
const arma3_be = require("arma3-be")
```
### RCon
Add this function to your file and change the key values.
```javascript
arma3_be.Config({
    IP: "127.0.0.1",
    Port: "2306",
    Password: "testpassword",
    Debug: false,
    RetryOnFailedAttempt: true
})
```

## Functions
### arma3_be.Config(Config)
This function is to attempt to setup a connection to your battleye service on your arma 3 server. <br />
The config must be an object.
#### Object Keys
- "IP" (string) - The IPv4 address to your arma 3 server's RCon.
- "Port" (string) - The port to your arma 3 server's RCon.
- "Password" (string) - The password to your arma 3 server's RCon.
- "Debug" (true or false) - To log connection attempts to the console.
- "RetryOnFailedAttempt" (true or false) - To attempt to reconnect to RCon on failed attempts.

### arma3_be.SendCommand(Command)
This function is to send a battleye command to your server. <br />
The command must be a string. <br />
See [Battleye Documentation](https://www.battleye.com/support/documentation/) for a list of commands.
```javascript
//This command will globaly message players with "Hello world!"
arma3_be.SendCommand("say -1 Hello world!").then(() => {
    console.log("Successfully sent message!") //Note - The "say" command has no response
})

//This command logs all connected players to console
arma3_be.SendCommand("players").then((response) => {
    console.log(response)
})
```

## To-Do List
- Hardcode a function to retrieve server messages