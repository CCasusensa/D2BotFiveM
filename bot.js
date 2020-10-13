const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client();
const { updatePlayerCountStatus } = require("./utils/updatePlayerCount.js");
const { autoStatus } = require("./utils/autoStatus.js");
global.config = require("./config.json");
require("./utils/commands.js");

client.on('ready', () => {
    console.log(`Discord Bot logged in ${client.user.tag}`);
    client.user.setActivity(config.status, {
        type: 'PLAYING'
    });
	if (config.avatar.length > 0) {
		client.user.setAvatar(config.avatar);
	}
	if (config.name.length > 0) {
		client.user.setUsername(config.name);
	}
	if (config.updatePlayerStatus) {
		updatePlayerCountStatus(client, config.updatePlayerStatusSec);
	}
	if (config.autoStatus) {
		autoStatus(client, config.autoStatusMsg, config.autoStatusSec);
	}
});

// bot login
client.login(config.token);
