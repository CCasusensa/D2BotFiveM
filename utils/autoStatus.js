module.exports = {
    autoStatus: (client, statusMsgs, seconds) => {
        const interval = setInterval(function setStatus() {
            status = statusMsgs[Math.floor(Math.random() * statusMsgs.length)];
            client.user.setActivity(status, {type: 'PLAYING'})
            return setStatus;
        }(), seconds * 1000)
    }
}