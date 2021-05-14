const express = require('express')
const app = express();
const port = 3000;
const Discord = require('discord.js');
const client = new Discord.Client();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/guild', async (req, res) => {
	console.log(req.body.name);
	const Guild = await client.guilds.create(req.body.name, {
	channels: [
	    {"name": "invite-channel"},
	]
	});

	const GuildChannel = Guild.channels.cache.find(channel => channel.name == "invite-channel");
	const Invite = await GuildChannel.createInvite({maxAge: 0, unique: true, reason: "Testing."});

	res.send(Invite.url);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

client.once('ready', () => {
	console.log('Ready!');
});

client.login('ODMzNDk1MDM1Nzg1Mzc5ODYw.YHzKvg.aa9Pju40HILw721SslKRB3V5XQk');