const Discord = require("discord.js");

module.exports = {
    name: "teste",
    description: "comando teste",
    aliases: ["teste"],
    async execute(bot,message,args){
      message.delete()
      message.channel.send("Teste realizado com sucesso.")

    }
}
