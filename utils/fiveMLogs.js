// Reigster server events
RegisterNetEvent('D2BotFiveM:sendLog');
RegisterNetEvent('D2BotFiveM:sendLogWithColor');
RegisterNetEvent('D2BotFiveM:sendLogWithColorEX');

onNet("D2BotFiveM:sendLog", (chid, msg) => {
    sendLog(chid, msg);
  }
);

onNet("D2BotFiveM:sendLogWithColor", (chid, title, color, msg) => {
    sendLogWithColor(chid, title, color, msg);
  }
);

onNet("D2BotFiveM:sendLogWithColorEX", (chid, title, color, msg) => {
    sendLogWithColorEX(chid, title, color, img, msg);
  }
);

exports('sendLog', (chid, msg) => {
    sendLog(chid, msg);
});

exports('sendLogWithColor', (chid, title, color, msg) => {
    sendLogWithColor(chid, title, color, msg);
});

exports('sendLogWithColorEX', (chid, title, color, img, msg) => {
    sendLogWithColorEX(chid, title, color, img, msg);
});

function sendLog(chid, msg) {
	const channel = client.channels.get(chid);
	channel.send(msg);
}

function sendLogWithColor(chid, title, color, msg) {
    const channel = client.channels.get(chid);
    const emp = new MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(msg)
        .setTimestamp();
    channel.send(emp);
}

function sendLogWithColorEX(chid, title, color, img, msg) {
    const channel = client.channels.get(chid);
    const emp = new MessageEmbed()
        .setTitle(title)
        .setAuthor(author, authorimg, authorlink)
        .setColor(color)
        .setDescription(msg)
        .setThumbnail(img)
        .setTimestamp();
    channel.send(emp);
}