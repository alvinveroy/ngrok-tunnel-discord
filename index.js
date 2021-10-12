require('dotenv').config();
const ngrok = require('ngrok');
const { Webhook, } = require('discord-webhook-node');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

const fbbot = async _ => {
    const url = await ngrok.connect(5000);
    return url;
}
const ssh = async _ => {
    const url = await ngrok.connect({
        proto : 'tcp',
        addr : 22,
        authtoken: process.env.AUTH,
    });    
    return url;
};

const IMAGE_URL = 'https://cdn.discordapp.com/icons/674207974016811028/2542f2fbcc434a47f2d3139ad850c211.png';
hook.setUsername('Server Tunnel');
hook.setAvatar(IMAGE_URL);

ssh()
fbbot()

.then(data => { 
    hook.send(data);
    console.log('Tunnel Address: ' + data);
})
.catch(err => console.log(err));