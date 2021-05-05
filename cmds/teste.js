const Discord = require("discord.js");

module.exports = {
    name: "teste",
    description: "teste",
    aliases: ["teste"],
    async execute(bot,message,args){
      message.channel.send("Teste realizado com sucesso.")
      message.delete()
    }
}
