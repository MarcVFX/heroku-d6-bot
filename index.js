/* BOT VARIABLES/CONSTANTS */
const Discord = require("discord.js");
const schedule = require('node-schedule');
const latestvid = require('latestvid');
const fs = require("fs");
const TOKEN = "MzUxNTEyMTQ3MDEzOTI2OTEz.DIWmKg.xqMXl09glrvtziuHmnKeAx8PHW0";
var prefix = "d!";
var bot = new Discord.Client();
var version = "1.22.09";
var Servers = [];
var rosterData = JSON.parse(fs.readFileSync("./roster.json", "utf8"));
var othersData = JSON.parse(fs.readFileSync("./others.json", "utf8"));

var date = new Date()
var hours = date.getUTCHours()
var minutes = date.getUTCMinutes()
var day = date.getUTCDate()
var month = date.getUTCMonth()
var year = date.getUTCFullYear()


/* EMBED VARIABLES */
const hexColor = "2EA319";
const admHexColor = "#c10d0d";
const guildIconURL = "https://cdn.discordapp.com/icons/346767747226664971/beaf3e96dc6fe20fc00f76c212a6c116.webp";

/*  FILES */

/* SOCIAL MEDIAS */
const yt = "https://www.youtube.com/channel/UCrjxT16pynjv80PevE16ueQ";
const tt = "@District6Arts"

/* FUNCTIONS */
function saveRosterJSON(){
    rosterData["rosterUpdate"] = day +"/"+ (month >= 10 ? month : "0" + month) +"/"+ year + " at " + (hours >= 10 ? hours : "0" + hours) +":"+ (minutes >= 10 ? minutes : "0" + minutes) + " (UTC Time)"
    fs.writeFile("./roster.json", JSON.stringify(rosterData), (err) => {
        if (err) console.error(err)
      });
}
function saveOthersJSON(){
    fs.writeFile("./others.json", JSON.stringify(othersData), (err) => {
        if (err) console.error(err)
    });
}

function rosterText(role){
    var toRoll = "";
    if (role[0] == undefined) return "This role is empty";
    else{
        for (var i = 0; i < role.length - 1; i ++) {
            var toRoll = toRoll + role[i] + ", ";
        }
    
    }
    function needAnd(role){
        if (role.length == 1){
            return role[role.length - 1];
        }
        else{
            return "and " + role[role.length - 1];
        }
    };
    return toRoll + needAnd(role);
};


/* FUNCTION TO SCHEDULER */
function reminder(channel){
    var toSend = bot.channels.find("name", channel);
    var remind = new Discord.RichEmbed()
        .setTitle("For our fans:")
        .addField("Our Youtube channel:", yt)
        .addField("Our Twitter: ", tt)
        .addField("For more info: ", "type " + prefix + "help")
        .setColor(hexColor)
        .setThumbnail(guildIconURL);   
    toSend.sendEmbed(remind);
};
function goodMorning(channel){
    var toSend = bot.channels.find("name", channel);
    toSend.send("Good morning, team!");
};
function queue(channel){
    var toSend = bot.channels.find("name", channel)
    toSend.send("Remember to send your uploads to our channel! It's EZ, just send it to " + bot.channels.find("name", "upload-queue") + " channel");
};
function useful(channel){
    var toSend = bot.channels.find("name", channel);
    toSend.send("I'm useful, want to see? Just type " + prefix + "help");
};

/* Commands here \/ */
bot.on('ready', function(){
    bot.user.setPresence({ game: { name: "d!help", type: 0 } });
    console.log("ready and running");
});
bot.on("message", function(message){


/*
    if(message.content.includes('http') && message.channel != bot.channels.find("name", "links")){
        if(message.content.includes("http") && message.channel != bot.channels.find("name", "upload-queue")){
            if(message.content.includes("http") && message.channel != bot.channels.find("name", "d6-management")){
                if (message.author.equals(bot.user)) return;
                message.delete();
                message.reply("Send links on the " + bot.channels.find("name", "links") + " or" + bot.channels.find("name", "upload-queue") + " channels");
                
            }}};
    */
    if(!message.content.includes('http') && message.channel == bot.channels.find("name", "upload-queue")){
        message.delete();
        message.member.send("You can only send links on #upload-queue");
    }





    if(message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.send("Pong!");
            break;
        
        /* youtube */
        case "youtube":
            message.channel.send("Our official YouTube channel is " + yt);
            break;
        case "yt":
            message.channel.send("Our official YouTube channel is " + yt);
            break;
        
        /* twitter */
        case "twitter":
            message.channel.send("Our official Twitter is " + tt);
            break;
        case "tt":
            message.channel.send("Our official Twitter is " + tt);
            break;
       
        /* roster embed */
        case "roster":
            console.log(roster);    
            var roster = new Discord.RichEmbed()
                .addField("District6 official roster", tt)
                .addField("D6 - Management", rosterText(rosterData['D6']))
                .addField("D5 - Sponsors", rosterText(rosterData['D5']))
                .addField("D4 - Streamers", rosterText(rosterData['D4']))
                .addField("D3 - Editors", rosterText(rosterData['D3']))
                .addField("D2 - Graphics", rosterText(rosterData['D2']))
                .addField("D1 - Motion", rosterText(rosterData['D1']))
                .setColor(hexColor)
                .setThumbnail(guildIconURL)
                .setFooter("Roster updated at " + rosterData['rosterUpdate'])
            message.channel.sendEmbed(roster);
            break;
        case "add":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)){
                rosterData[args[1]].push(args[2])
                saveRosterJSON()
                message.reply("Sucessfully added " + "`" + args[2] + "`" + " to the roster")
            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }

            break;
        case "remove":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)){
                let index = rosterData[args[1]].indexOf(args[2])
                rosterData[args[1]].splice(index, 1)
                saveRosterJSON()
                message.reply("Sucessfully removed " + "`" + args[2]+ "`" + " from the roster")
            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }
        break;
        case "update":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)) saveRosterJSON()
            else {
                message.reply("You must be on the management role to do that bro :v")
            }    
        break;
        
        /* info embed */
        case "info":
            var info = new Discord.RichEmbed()
                .setTitle('D6 Bot Info')
                .addField("Version: ", version)
                .addField("Description", "A simple bot for the District6 Arts official discord server.")
                .addField("Author", "MarcVFX")
                .addField("Technical info", "This bot is running the 11.1.0 version of Discord.js, 7.8.0 version of Node.js and write on Visual Code Studio")
                .setColor(hexColor)
                .setThumbnail(guildIconURL)
                .setFooter("Want to send ideas? https://discord.gg/2HpHDeH")
            message.channel.sendEmbed(info);
            break;   
        
        /* SCHEDULED MESSAGE SUMMONER */
        case "scheduled":
                last();
            break;     

        /* HELP EMBED */
        case "help":
            var help = new Discord.RichEmbed()
                .setTitle("Help commands")
                .addField(prefix + "ping", "Pong!")
                .addField(prefix + "twitter or tt", "Send the twitter @ of our team")
                .addField(prefix + "youtube or yt", "Send our channel's link")
                .addField(prefix + "roster",  "Show up the entire roster of D6")
                .addField(prefix + "info", "Show up the bot info")
                .addField(prefix + "files", "Link all files that you will need")
                .addField(prefix + "adm", "Show up all managements commands (only for members on D6 - Management role)")
                .setColor(hexColor)
                .setThumbnail(guildIconURL)
            message.channel.sendEmbed(help);
            break;
        case "adm":
        var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            var adm = new Discord.RichEmbed()
                .setTitle("Management commands")
                .setDescription("Take care, my boi")
                .addField(prefix + "send [channel] [message to send]", "Send an message to an channel")
                .addField(prefix + "add [role] [name]", "Adds an member to the roster list.")
                .addField(prefix + "remove [role] name]", "Removes an member from the roster list.")
                .addField(prefix + "update", "Updates the roster list")
                .addField(prefix + "phrases", "Show up all bot error messages")
                .setColor(admHexColor)
                .setThumbnail(guildIconURL)
            if (message.member.roles.has(D6RoleID)) message.channel.sendEmbed(adm);
            else message.reply("You can't do that")
            break;

        /* FILES */
        case "files":
            var files = new Discord.RichEmbed()
                .setTitle("Please, select one of files below")
                .setDescription("Or you can use " + prefix + "all to get all files")
                .addField("AI file", prefix + "ai")
                .addField("PNG file", prefix + "png")
                .addField("PSD file", prefix + "psd")
                .addField("C4D file", prefix + "c4d")
                .addField("AVI file", prefix + "avi")
                .setColor(hexColor)
                .setThumbnail(guildIconURL)
            message.channel.sendEmbed(files);
            break;
        case "ai":
            message.reply("Here is the download link: " + othersData.links.logoAI);
            break;
        case "png":
            message.reply("Here is the download link: " + othersData.links.logoPNG);
            break;
        case "psd":
            message.reply("Here is the download link: " + othersData.links.logoPSD);
            break;
        case "c4d":
            message.reply("Here is the download link: " + othersData.links.logoC4D);
            break;
        case "avi":
            message.reply("Here is the download link: " + othersData.links.logoAVI);
            break;
        case "all":
            message.reply("Here is the download link: " + othersData.links.logoAll);
            break;

        case "updatelink":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)){
                if (args[2] == undefined) {
                    message.channel.send("You must put an link") 
                    return;
                }
                else if ("logo" + othersData.links[args[1]]){
                    message.channel.send("This file don't exist")
                    return;
                }
                else {
                    othersData.links["logo" + args[1]] = args[2]
                    message.channel.send("logo" + args[1] + " changed to " + "`" + args[2] + "`")
                    saveOthersJSON()
                }

            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }
            break;

        case "addphrase":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)){
                othersData.phrases.push(toRoll())
                message.channel.send("`" + toRoll() + "`" + " successfully added")
                saveOthersJSON();
                function toRoll(){
                    var toSend = ""
                    for (var i = 1; i < args.length; i++){
                        toSend = toSend + args[i] + " ";
                    }
                    return toSend;
                }

            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }
            break;
        case "removephrase":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)){
                let index = othersData.phrases.indexOf(args[1])
                message.channel.send("`" + othersData.phrases[index] + "`" + " successfully removed")
                othersData.phrases.splice(index, 1)
                saveOthersJSON();
            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }
            break;



        case "send":
            message.delete();
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)){
                channelCheck();
            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }
            function channelCheck(){
                var toSendMsg = " ";
                    for (var i = 0; i < othersData.channels.length; i++){
                        if (othersData.channels[i] == args[1]){
                            var toSendCnl= bot.channels.find("name", othersData.channels[i]);
                                for (var i = 2; i < args.length; i++){
                                    var toSendMsg = toSendMsg + args[i] + " ";
                                }
                                if (args[2] == undefined){
                                    message.reply("You must put an message to send")
                                    return
                                }
                                else {
                                    toSendCnl.send(toSendMsg);
                                    message.channel.send("Message sent to " + args[1] + " channel")
                                    return
                                }
                        }
                        else if (othersData.channels.length - 1 == i){
                            message.reply("This channel don't exists or I can't send an message to this channel");
                            return
                        }
                    }
                }
            break;

            case "phrases":
                var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
                if (message.member.roles.has(D6RoleID)){
                    message.channel.send("These are my error messages")
                    for (var i = 0; i < othersData.phrases.length; i ++){
                        message.channel.send("`" + othersData.phrases[i] + "`")
                    }
                }
                else {
                    message.reply("You must be on the management role to do that bro :v")
                }
                break;

            case "addchannel":
                if (args[1] != undefined){
                    othersData.channels.push(args[1])
                    message.channel.send("`" + args[1] + "`" + " added to channels list")
                    saveOthersJSON()
                    return;
                }
                else{
                    message.channel.send("You must need to put the channel name")
                    return;
                }
                break;
            case "removechannel":
                if (args[1] != undefined){
                    var index = othersData.channels.indexOf(args[1])
                    othersData.channels.splice(index, 1)
                    message.channel.send("`" + args[1] + "`" + " removed from channels list")
                    saveOthersJSON()
                }
                else {
                    message.channel.send("You must need to put the channel name")
                    return;
                }
                break;
            case "channels":
                var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
                if (message.member.roles.has(D6RoleID)){
                    message.channel.send("These are the channels that I can send messages")
                    for (var i = 0; i < othersData.channels.length; i++){
                        message.channel.send("`" + othersData.channels[i] + "`")
                    }
                }
                else {
                    message.reply("You must be on the management role to do that bro :v")
                }
                break;

        case "token":
            message.reply("ata bls");
            break;

        /* invalid command message */
        default:
            if (message.content == prefix) {
                message.channel.send("You need to put something after the **" + prefix + "** lol");
                return;
            }
            message.channel.send(othersData.phrases[Math.floor(Math.random()* othersData.phrases.length)]);
            break;


    }


});
/* SCHEDULED MESSAGE */
var a = schedule.scheduleJob('00 20 * * *', function(){
    reminder("general");
});
var b = schedule.scheduleJob('00 7 * * *', function(){
    goodMorning("general");
});
/*
var c = schedule.scheduleJob('30 * * * *', function(){
    var toSend = bot.channels.find("name", "general");
    toSend.send(latestVid());
});
*/

bot.login(process.env.BOT_TOKEN);
