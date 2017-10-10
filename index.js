/* BOT VARIABLES/CONSTANTS */
const Discord = require("discord.js");
const schedule = require('node-schedule');
const fs = require("fs");
var bot = new Discord.Client();
var rosterData = JSON.parse(fs.readFileSync("./roster.json", "utf8"));
var othersData = JSON.parse(fs.readFileSync("./others.json", "utf8"));
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

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
const website = "https://www.district6arts.co.uk/"
const port = "http://d6arts.carbonmade.com/"

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
        .addField("For more info: ", "type " + config.prefix + "help")
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
    toSend.send("I'm useful, want to see? Just type " + config.prefix + "help");
};







bot.on("guildMemberAdd", (member) => {
    var toSend = bot.channels.find("name", "general");
    var newMember = new Discord.RichEmbed()
        .setTitle("Welcome " + member.displayName + "!")
        .setDescription("Here are some things that you may need:")
        .addField("Youtube", yt)
        .addField("Twitter", tt)
        .addField("Website", website)
        .addField("Portfolio", port)
        .addField("I can also give you useful files", "Just type " + config.prefix + "files")
        .addField("For more useful commands", "Type " + config.prefix + "help")
        .setThumbnail(guildIconURL)
        .setColor(hexColor)
    toSend.send(member)
    toSend.send(newMember)


  });






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

    if (!message.content.startsWith(config.prefix)) return;

    var args = message.content.substring(config.prefix.length).split(" ");

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

        case "site":
            message.channel.send("Our official website is " + website);
            break;
        case "website":
            message.channel.send("Our official website is " + website);
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
                .addField("Version: ", config.version)
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
                .addField(config.prefix + "ping", "Pong!")
                .addField(config.prefix + "twitter or tt", "Send the twitter @ of our team")
                .addField(config.prefix + "youtube or yt", "Send our channel's link")
                .addField(config.prefix + "roster",  "Show up the entire roster of D6")
                .addField(config.prefix + "info", "Show up the bot info")
                .addField(config.prefix + "files", "Link all files that you will need")
                .addField(config.prefix + "adm", "Show up all managements commands (only for members on D6 - Management role)")
                .setColor(hexColor)
                .setThumbnail(guildIconURL)
            message.channel.sendEmbed(help);
            break;
        case "adm":
        var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            var adm = new Discord.RichEmbed()
                .setTitle("Management commands")
                .setDescription("Take care, my boi")
                .addField(config.prefix + "send [channel] [message to send]", "Send an message to an channel")
                .addField(config.prefix + "add [role] [name]", "Adds an member to the roster list.")
                .addField(config.prefix + "remove [role] [name]", "Removes an member from the roster list.")
                .addField(config.prefix + "update", "Updates the roster list")
                .addField(config.prefix + "phrases", "Show up all bot error messages")
                .addField(config.prefix + "addphrase [phrase]", "Adds an phrase to bot")
                .addField(config.prefix + "updatelink [file] [new link]", "Change the link of an file")
                .setColor(admHexColor)
                .setThumbnail(guildIconURL)
            if (message.member.roles.has(D6RoleID)) message.channel.sendEmbed(adm);
            else message.reply("You can't do that")
            break;

        /* FILES */
        case "files":
            if (args[1] == undefined){
            var files = new Discord.RichEmbed()
                .setTitle("Please, select one of files below")
                .setDescription("Or you can use " + config.prefix + "all to get all files")
                    for (var i = 0; i < othersData.linksNames.length; i++){
                        files.addField(othersData.linksTypes[i] + " file", config.prefix + othersData.linksTypes[i]);
                    }
                files.setColor(hexColor)
                files.setThumbnail(guildIconURL)
            message.channel.sendEmbed(files);
                }
            
            else if (args[1] == "add"){
                if (args[2] == undefined) {
                    message.channel.send("You need to put an file type") 
                    return;
                }
                if (args[3] == undefined) {
                    message.channel.send("You need to put an file nameType")
                    return;
                }
                if (args[4] == undefined) {
                        message.channel.send("You need to put an link")
                        return;
                }
                othersData.linksTypes.push(args[2])
                othersData.linksNames.push(args[3])
                othersData.links[args[3]] = args[4]
            }

            else if (args[1] == "remove"){
                if (args[2] == undefined){
                    message.channel.send("You need to put an file type")
                    return;
                }
                let index = othersData.linksTypes.indexOf(args[2])
                othersData.linksTypes.splice(index, 1)
                let index2 = othersData.linksNames[index]
                othersData.linksNames.splice(index, 1)
                delete othersData.links[index2]
                saveOthersJSON()
            }

            else {
                let index = othersData.linksTypes.indexOf(args[1]);
                message.reply("Here is the download link: " + othersData.links[othersData.linksNames[index]])
            }
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
            if (message.content == config.prefix) {
                message.channel.send("You need to put something after the **" + config.prefix + "** lol");
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
var c = schedule.scheduleJob('00 15 * * *', function(){
    queue("general");
});
*/
/*
var c = schedule.scheduleJob('30 * * * *', function(){
    var toSend = bot.channels.find("name", "general");
    toSend.send(latestVid());
});
*/

bot.login(config.token);
