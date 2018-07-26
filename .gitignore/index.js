const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = ("-")

client.login(process.env.TOKEN); //POUR LOGIN LE CLIENT

client.on('ready', function() {
    console.log("bot online");              //AFFICHER LE FAIT QU'IL SOIT ONLINE DANS LA CONSOLE
    client.user.setGame("💙 Loli Universe 💙");     //FAIRE EN SORTE QUE LE BOT JOUE A QUELQUE CHOSE
});

//POUR REPONDRE A DES MESSAGES


client.on('message', message => {
  if (message.channel.type === "dm"){ 
    return console.log(`DM recevied from ${message.author.username}`);
    }

    if(message.content === "ping"){
        message.reply("pong, I work");
    }

    if(message.content === prefix + "help") {
      var aide_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:robot: Here are all my comand !`)
        .setDescription(`My actuals commands :`)
        .setThumbnail(client.user.avatarURL)
        .addField(":tools: Moderation", "Do `-helpmod` to see all my moderation command")
        .addField(":tada: Fun", "Do `-helpfun` to see all my fun command")
        .setFooter("LoliSpy.exe - Developped by Rich836#3246")
        .setTimestamp()
      message.channel.send(aide_embed);
    }

    if(message.content === prefix + "helpmod") {
      var mod_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Here are my moderation command`)
        .setThumbnail(client.user.avatarURL)
        .addField("kick <@user>", "Kick the user !")
        .addField("ban <@user>", "Ban the user !")
        .addField("clear <number>", "Delete the indicated amount of message")
        .addField("mute <@user>", "Mute the tagged user")
        .addField("unmute <@user>", "Unmute the tagged user")
        .addField("warn <user> <reason>", "Warn the mentionned user for a specific reason")
        .addField("showwarns <user>", "Show the warn of the specific user")
        .addField("delwarns <user> <number>", "Delete the warns that you specified in <numbers> (check showarns to get the number)")
        .setFooter("LoliSpy.exe - Develloped by Rich836#3246")
        .setTimestamp()
      message.channel.send(mod_embed);
    }

    if(message.content === prefix + "helpfun") {
      var fun_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: here are my funny commands`)
        .setThumbnail(client.user.avatarURL)
        .addField("ping", "The bot answer pong")
        .addField("stats", "To see your statistics")
        .addField("info", "Gave you information on me and on my creator")
        .addField("server", "Show the information and the statistics of your server")
        .setFooter("LoliSpy.exe - Developped by Rich836#3246")
        .setTimestamp()
      message.channel.send(fun_embed);
    }

    if(message.content === prefix + "info"){
      var info_embed = new Discord.RichEmbed()
        .setColor("##40A496")
        .setTitle("Here are my information and the information of this server")
        .addField(" :robot: Name:", `${client.user.tag}`, true)
        .addField("Descriminator :", `#${client.user.discriminator}`)
        .addField("ID :", `${client.user.id}`)
        .addField("Prefix", "My prefix is -")
        .addField("Created by :", "Rich836#3246")
        .addField("ID of the creator", "252369513222242324")
        .setFooter("Please ask the creator for further information.")
      message.channel.send(info_embed)
    }

    if(message.content.startsWith(prefix + "server")){
      var server_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Server Information")
        .addField("Server name :", message.guild.name)
        .addField("Created on : ", message.guild.createdAt)
        .addField("You joined on :", message.member.joinedAt)
        .addField("Number of user :", mesage.guild.memberCount)
      message.channel.sendEmbed(server_embed)
    }

    if(message.content.startsWith(prefix + "kick")){
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) 
        return message.channel.send("Sorry but you don't have the good permission for that")

        if(message.mentions.users.size === 0){
            return message.channel.send("You need to mention someone")
        }

        var kick = message.guild.member(message.mentions.user.first());
        if(!kick){
            return message.channel.send("It seems that the user doesn't exist")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
            return message.channel.send("I don't have the good permission for that");
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} got kicked by ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")){
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) 
        return message.channel.send("Sorry but you don't have the good permission for that")

        if(message.mentions.users.size === 0){
            return message.channel.send("You need to mention someone")
        }

        var ban = message.guild.member(message.mentions.user.first());
        if(!ban){
            return message.channel.send("It seems that the user doesn't exist")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")){
            return message.channel.send("I don't have the good permission for that");
        }

        ban.ban().then(member => {
            message.channel.send(`${member.user.username} got banned by ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) 
        return message.channel.send("Sorry but you don't have the good permission for that");

        let args = message.content.split(" ").slice(1);

        if(!args[0])
          return message.channel.send("Please precise an amount of message")
          message.channel.bulkDelete(args[0]).then (() => {
          message.channel.send(`${args[0]} messages got deleted`)
          
        })
      }

    if(message.content.startsWith(prefix + "mute")){
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) 
        return message.channel.send("Sorry but you don't have the good permission for that");

        if(message.mentions.users.size === 0){
            return message.channel.send("You need to mention someone");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute){
            return message.channel.send("It seems that the user doesn't exist");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")){
            return message.channel.send("I don't have the good permission for that");
        }
        
        message.guild.channels.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} is now muted`);
        })

    }

    if(message.content.startsWith(prefix + "unmute")){
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) 
        return message.channel.send("Sorry but you don't have the good permission for that");

        if(message.mentions.users.size === 0){
            return message.channel.send("You need to mention someone");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute){
            return message.channel.send("It seems that the user doesn't exist");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")){
            return message.channel.send("I don't have the good permission for that");
        }
        
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} is now unmuted`);
        })

    }



    if(message.content.startsWith(prefix + "sondage")) {
        if(message.author.id === "252369513222242324"){
            const messageSlice = message.content.slice(prefix.length).trim();
            say1 = messageSlice.substring(11,29)
            say2 = messageSlice.substring(30) 
            message.delete().catch();
            if (message.guild.channels.has(say1)){
              var sondage_embed = new Discord.RichEmbed()
                .setDescription("Sondage")
                .addField(say2, "Answer with :white_check_mark: or :x:")
                .setColor("#0xB40404")
                .setTimestamp()
              client.channels.get(say1).sendEmbed(sondage_embed)
            .then(function (message) {
                message.react("✅")
                message.react("✖")
            }).catch(function() {
              });
            }else{
              var sondage_embed2 = new Discord.RichEmbed()
                .setDescription("Sondage")
                .addField(messageSlice.substring(9), "Answer with :white_check_mark: or :x:")
                .setColor("#0xB40404")
                .setTimestamp()
              message.channel.sendEmbed(sondage_embed2)
            .then(function (message) {
                message.react("✅")
                message.react("✖")
            }).catch(function() {
              })};
          }else{
            return message.reply("You don't have the good permission for that")
    }};
    
    
    
    if(message.content.startsWith(prefix + "say")){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the right perms");
      const messageSlice = message.content.slice(prefix.length).trim();
      say1 = messageSlice.substring(6,24)
      say2 = messageSlice.substring(25)
      message.delete().catch();
      if (message.guild.channels.has(say1)){
        client.channels.get(say1).send(say2)
      }else{
        message.channel.send(messageSlice.substring(4))
      }
    }



//DEBUT COMMANDE WARN /////////////////////////////////////////////////////////////////////////////////////////////////////////

var fs = require('fs'); 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if(message.content.startsWith(prefix + "warn")){ 

  var mentionned = message.mentions.users.first();

  if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("You don't have the good permission for that").catch(console.error);

  if(message.mentions.users.size === 0) {
    return message.channel.send("You need to mention someone");
  }else{
    const args = message.content.split(' ').slice(1);
    const mentioned = message.mentions.users.first();
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send('Warn | **'+mentionned.tag+' got warned**');
 
message.mentions.users.first().send(`**Warn |** You got warned from **${message.guild.name}** by **${message.author.username}**\n\n**Reason:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("You must do : "+prefix+"warn <user> <reason>");
 
          }
 
        } else {
 
          message.channel.send("You must do : "+prefix+"warn <user> <reason>");
 
        }
 
      } else {
 
        message.channel.send("You must do : "+prefix+"warn <user> <reason>");
 
      }
 
    } else {
 
      message.channel.send("I don't have the good permission for that");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"showwarns")||message.content===prefix+"showwarns") {
 

 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("You don't have the good permission for that").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** don't have any warns");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** don't have any warns");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** have **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" Warn given by **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** on **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("You must do : "+prefix+"showwarn <user>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("You must do : "+prefix+"showshwarns <user>");
 
      }
 
    } else {
 
      message.channel.send("I don't have the good permission for that");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"delwarns")||message.content===prefix+"delwarns") {
 

 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("You don't have the good permission for that").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" ndon't have any warns");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("This warn doesn't exist");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`The warn of **${mentioned.tag}**\': **${args[1]}** has been deleted`);
 
            return;
 
          } if (args[1] === "all") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`All the warns of **${mentioned.tag}** got deleted`);
 
            return;
 
          } else {
 
            message.channel.send("You must do : "+prefix+"delwarns <user> <number>");
 
          }
 
        } else {
 
          message.channel.send("You must do : "+prefix+"delwarns <user> <number>");
 
        }
 
      } else {
 
       message.channel.send("You must do : "+prefix+"delwarns <user> <number>");
 
      }
 
    } else {
 
      message.channel.send("I don't have the good permission for that");
 
    }
 
  }

  //FIN COMMANDE WARN ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0].toLowerCase()) {
        case "stats" :

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setTitle(`User Stats : ${message.author.username}`)
            .addField(`ID :`, msgauthor, true)
            .addField("Creation of the account : ", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(message.author.avatarURL)
            .setFooter("It's your profile dude :D")
            message.reply("Your stats are in your DM's *slide to your dm's*")
            message.author.send({embed: stats_embed})
        break;
    }


});
