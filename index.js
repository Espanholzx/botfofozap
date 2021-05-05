const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');


const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const cmds = fs.readdirSync(`./cmds`).filter(file => file.endsWith('.js'));
for(const file of cmds){
    const cmd = require(`./cmds/${file}`);

    bot.commands.set(cmd.name, cmd);
}


bot.on("ready", () => {

    let activities = [
        'TEXTO 0', //defina as mensagens que o bot ira exibir
        'TEXTO 1',
        'TEXTO 2',
        'TEXTO 3'
    ],
    i = 0;
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING" //WATCHING, LISTENING, PLAYING, STREAMING
    }), 5000);// Defina o tempo do bot em milisegundos
    });



bot.on('message', async message => {

        
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = bot.commands.get(cmdName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmd) return message.reply(`Esse comando não existe.`);

    try{
        cmd.execute(bot, message, args);
    }catch(err){
        message.reply(`there was an error in the console.`);
        console.log(err);
    }

    // const cmd = args.shift().toLowerCase();

    // try{
    //     bot.commands.get(cmd).execute(bot, msg, args);
    // }catch(e){
    //     msg.reply(`there was an error in the console.`);
    //     console.log(e);
    // }
})

bot.on('ready', () => {
    cmds.forEach(cmd => {
        console.log(`\u001b[31m[${cmd}] \u001b[37mCarregado com sucesso.`);
    })
    console.log(`\u001B[36m${bot.user.tag} \u001b[37mCarregado com sucesso`)
})


bot.login(token);
