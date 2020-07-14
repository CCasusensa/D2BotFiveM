# D2BotFiveM
Discord Bot in FiveM
author CCasusensa(lrenex)


### Installation + setting up
```
Download resource
Put it in the `resource/other` directory

Configure resource `config.json` to look like this
"token": "", // bot token https://discord.com/developers/applications
"avatar": "", // bot avatar url
"status": "", // bot Status
"name": "" // bot Name

Configure your `server.cfg` to look like this
start D2BotFiveM
```

### setting up
```
Download resource
Put it in the `resource/other` directory

Configure your `server.cfg`
start D2BotFiveM
```

### Code examples

```
#send log to Discord


#Server Side
exports['D2BotFiveM']:sendLog(discord channel ID, message)
exports['D2BotFiveM']:sendLogWithColor(discord channel ID, title, color, message)
exports['D2BotFiveM']:sendLogWithColorEX(discord channel ID, title, color, image url, message)


#Client Side
TriggerServerEvent('D2BotFiveM:sendLog', discord channel ID, message)
TriggerServerEvent('D2BotFiveM:sendLogWithColor', discord channel ID, title, color, message)
TriggerServerEvent('D2BotFiveM:sendLogWithColorEX', discord channel ID, title, color, image url, message)
```
