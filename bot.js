const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client;
const { updatePlayerCount } = require("./utils/");
const prefix = "!";
global.config = require("./config.json");

client.on('ready', () => {
    console.log(`Discord Bot logged in ${client.user.tag}`);
    client.user.setActivity(config.status, {
        type: 'PLAYING'
    });
    client.user.setAvatar(config.avatar);
    client.user.setUsername(config.name);
    //updatePlayerCount(client, 5)

});

exports('sendLog', (chid, msg) => {
    const channel = client.channels.get(chid);
    channel.send(msg);
});

exports('sendLogWithColor', (chid, title, color, msg) => {
    const channel = client.channels.get(chid);
    const emp = new MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(msg)
        .setTimestamp();
    channel.send(emp);
});

exports('sendLogWithColorEX', (chid, title, color, img, msg) => {
    const channel = client.channels.get(chid);
    const emp = new MessageEmbed()
        .setTitle(title)
        .setAuthor(author, authorimg, authorlink)
        .setColor(color)
        .setDescription(msg)
        .setThumbnail(img)
        .setTimestamp();
    channel.send(emp);
});

function getUserFromMention(mention) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return client.users.get(mention);
    }
}

function getUserFromMentionRegEx(mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    const id = matches[1];
    return client.users.get(id);
}

function formatAMPM(date) {
    var hours = date.getHours();
    var ampm = hours >= 12 ? '下午' : '上午';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var strTime = ampm + hours;
    return strTime;
}

client.on('message', message => {
    if (!message.content.startsWith(prefix))
        return;
    const withoutPrefix = message.content.slice(prefix.length);
    const split = withoutPrefix.split(/ +/);
    const command = split[0];
    const args = split.slice(1);

    switch (command) {
        case "頭像": {
            if (args[0]) {
                const user = getUserFromMention(args[0]);
                if (!user) {
                    return message.reply('找不到該用戶。');
                }
                const userAvatar = user.displayAvatarURL;
                const avatarList = message.mentions.users.map(user => {
                    return message.channel.send(`${user.username}的頭像: ${user.displayAvatarURL({ dynamic: true })}`);
                });
            } else {
                return message.channel.send(`${message.author.username}, 您的頭像: ${message.author.displayAvatarURL({ dynamic: true })}`);
            }
            break;
        }
        case "測試": {
            message.reply('回傳');
            break;
        }
        case "rip": {
            const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
            message.channel.send(attachment);
            break;
        }
        case "用戶訊息": {
            message.channel.send(`您的用戶名: ${message.author.username}\n您的用戶ID: ${message.author.id}`);
            break;
        }
        case "時間訊息": {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.round(totalSeconds % 60);
            let uptime = `${days} 天, ${hours} 小時, ${minutes} 分鐘 ${seconds} 秒`;
            var time = new Date();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            var date = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
            message.reply(`\n機器人已經運行了:${uptime}\n台灣時間: ${formatAMPM(time)}時${minute}分${second}秒 ${date}`);
            break;
        }
        case "伺服器訊息": {
            if (message.author.id !== 213694456526929920) {
                message.guild.members.fetch().then(fetchmembers => {
                    const totalOnline = fetchmembers.filter(member => member.presence.status === 'online' || member.presence.status === 'idle' || member.presence.status === 'dnd' && !member.user.bot).size;
                    const totalOffline = fetchmembers.filter(member => member.presence.status === 'offline' && !member.user.bot).size;
                    const busyPlayers = fetchmembers.filter(member => member.presence.status === 'dnd' && !member.user.bot).size;
                    const idlePlayers = fetchmembers.filter(member => member.presence.status === 'idle' && !member.user.bot).size;
                    const onlinePlayers = fetchmembers.filter(member => member.presence.status === 'online' && !member.user.bot).size;
                    const totalBots = fetchmembers.filter(member => member.user.bot).size;
                    const totalPlayers = fetchmembers.filter(member => !member.user.bot).size;
                    message.reply(`\nDISCORD名字: ${message.guild.name}\n總共成員有: ${message.guild.memberCount}位、在線: ${totalOnline} 個、機器人: ${totalBots}個、成員:${totalPlayers}位、隱藏或離線:${totalOffline}位、忙碌${busyPlayers}位、閒置${idlePlayers}位、有空:${onlinePlayers}位`);
                });
            } else {
                message.channel.send('不是本人來想用指令阿!');
            }
            break;
        }
        case "開服": {
            const channel = client.channels.get('569693695725797377');
            const emp = new MessageEmbed()
                .setTitle('鄉村小鎮公告')
                .setColor('#26FFFF')
                .setDescription('@everyone 城鎮已開放!')
                .setThumbnail('https://i.imgur.com/zEpsBsG.png')
                .setTimestamp();
            channel.send(emp);
            channel.send('@everyone').then(msg => { msg.delete(1000) }).catch();
            break;
        }
    }
});

// bot login
client.login(config.token);
