/* BOT VARIABLES/CONSTANTS */
const Discord = require("discord.js");
const schedule = require('node-schedule');
const fs = require("fs");
var bot = new Discord.Client();
var rosterData = JSON.parse(fs.readFileSync("./roster.json", "utf8"));
var othersData = JSON.parse(fs.readFileSync("./others.json", "utf8"));
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
var ids = JSON.parse(fs.readFileSync("./IDs.json", "utf8"));

/* DATE VARIABLES */
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

/* SOCIAL MEDIAS */
const yt = "https://www.youtube.com/channel/UCrjxT16pynjv80PevE16ueQ";
const tt = "@District6Arts"
const website = "https://www.district6arts.co.uk/"
const port = "http://d6arts.carbonmade.com/"

/* ===================================
            JSON - FUNCTIONS
   =================================== */    
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
function saveIDS(){
    fs.writeFile("./IDs.json", JSON.stringify(ids), (err) => {
        if (err) console.error(err)
    });
}

/* ===================================
            ROSTER - LINE
   =================================== */    
function rosterText(role){
    var toRoll = "";
    if (role[0] == undefined) return "This role is empty";
    else{
        for (var i = 0; i < role.length - 1; i ++) {
            var toRoll = toRoll + role[i] + ", ";
        }
    
    }

/* ===================================
            NEED AND - FUNCTION
   =================================== */    
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


/* ===================================
            REMIND - FUNCTION
   =================================== */    
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
/* ===================================
            GOOD MORNING - FUNCTION
   =================================== */    
function goodMorning(channel){
    var toSend = bot.channels.find("name", channel);
    toSend.send("Good morning, team!");
};






/* ===================================
            NEW - MEMBER
   =================================== */    
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






/* ===================================
            BOT - READY
   =================================== */    
bot.on('ready', function(){
    bot.user.setPresence({ game: { name: "d!help", type: 0 } });
    console.log("ready and running");
});
bot.on("message", function(message){


if(message.channel.type == Discord.DMChannel){
    bot.fetchUser(ids["District Marc "]).then(user => {user.send("`" + message.author.username + "`" + " " + "`" + "sent to me:" + "` " + message)})
    
}


/* ===================================
            ADD IDS - TO JSON
   =================================== */   
if (!ids[message.author.username + " "]){
    ids[message.author.username + " "] = message.author.id
    saveIDS()
}


/* ===================================
            HASROLE - FUNCTION
   =================================== */    
    function hasRole(){
        var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
        if (message.member.roles.has(D6RoleID)){
            return true;
        }
        else {
            message.reply("You must be on the management role to do that bro :v")
            return false;
        }
    }

/* ===================================
            NOT LINK - ON UPLOAD-QUEUE
   =================================== */    
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

/* ===================================
            YT - YOUTUBE
   =================================== */    
        case "youtube":
            message.channel.send("Our official YouTube channel is " + yt);
            break;
        case "yt":
            message.channel.send("Our official YouTube channel is " + yt);
            break;
        
/* ===================================
            TT - TWITTER
   =================================== */    
        case "twitter":
            message.channel.send("Our official Twitter is " + tt);
            break;
        case "tt":
            message.channel.send("Our official Twitter is " + tt);
            break;

/* ===================================
            SITE - WEBSITE
   =================================== */    
        case "site":
            message.channel.send("Our official website is " + website);
            break;
        case "website":
            message.channel.send("Our official website is " + website);
            break;
        
/* ===================================
            PORT - PORTFOLIO
   =================================== */    
        case "portfolio":
            message.channel.send("Our official portfolio is " + port)
            break;
        case "port":
            message.channel.send("Our official portfolio is " + port)
            break;

       
/* ===================================
            ROSTER - EMBED
   =================================== */    
        case "roster":
            if (args[1] == "add"){
                if (hasRole()){
                    rosterData[args[1]].push(args[2])
                    saveRosterJSON()
                    message.reply("Sucessfully added " + "`" + args[2] + "`" + " to the roster")
                }
            }
            else if (args[1] == "remove"){
                if (hasRole()){
                    let index = rosterData[args[1]].indexOf(args[2])
                    rosterData[args[1]].splice(index, 1)
                    saveRosterJSON()
                    message.reply("Sucessfully removed " + "`" + args[2]+ "`" + " from the roster")
                }
            }
            else if (args[1] == "update"){
                if (hasRole()) saveRosterJSON()
            }
            else{         
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
            }
            break;
        
/* ===================================
            INFO - EMBED
   =================================== */    
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

/* ===================================
            HELP - EMBED
   =================================== */    
        case "help":
            var help = new Discord.RichEmbed()
                .setTitle("Help commands")
                .addField(config.prefix + "ping", "Pong!")
                .addField(config.prefix + "twitter or tt", "Send the twitter @ of our team")
                .addField(config.prefix + "youtube or yt", "Send our channel's link")
                .addField(config.prefix + "roster",  "Show up the entire roster of D6")
                .addField(config.prefix + "info", "Show up the bot info")
                .addField(config.prefix + "files", "Link all files that you will need")
                .addField(config.prefix + "portfolio or port", "Link our portfolio")
                .addField(config.prefix + "website or site", "Link our website")
                .addField(config.prefix + "adm", "Show up all managements commands (only for members on D6 - Management role)")
                .setColor(hexColor)
                .setThumbnail(guildIconURL)
            message.channel.sendEmbed(help);
            break;

/* ===================================
            ADM - EMBED
   =================================== */    
        case "adm":
            var adm = new Discord.RichEmbed()
                .setTitle("Management commands")
                .setDescription("Take care, my boi")
                .addField(config.prefix + "send [channel] [message to send]", "Send an message to an channel")
                .addField(config.prefix + "roster add [role] [name]", "Adds an member to the roster list.")
                .addField(config.prefix + "roster remove [role] [name]", "Removes an member from the roster list.")
                .addField(config.prefix + "roster update", "Updates the roster list")
                .addField(config.prefix + "phrases", "Show up all bot error messages")
                .addField(config.prefix + "phrases add [phrase]", "Adds an phrase to bot")
                .addField(config.prefix + "phrases remove [phrase]", "Adds an phrase to bot")
                .addField(config.prefix + "files update [file] [new link]", "Change the link of an file")
                .addField(config.prefix + "files [add] [type] [typeName] [url]", "Adds files to the files list")
                .addField(config.prefix + "files [remove] [type]", "Remove files from the files list")
                .addField(config.prefix + "dm [full nickname] : [message]", "Sends an DM message for an specific member")
                .setColor(admHexColor)
                .setThumbnail(guildIconURL)
            if (hasRole()) message.author.sendEmbed(adm);
            break;

/* ===================================
            FILES - FILES
   =================================== */    
        case "files":
            if (args[1] == undefined){
            var files = new Discord.RichEmbed()
                .setTitle("Please, select one of files below")
                .setDescription("Or you can use " + config.prefix + "all to get all files")
                    for (var i = 0; i < othersData.linksNames.length; i++){
                        files.addField(othersData.linksTypes[i].toUpperCase() + " file", config.prefix + "files " + othersData.linksTypes[i]);
                    }
                files.setColor(hexColor)
                files.setThumbnail(guildIconURL)
            message.channel.sendEmbed(files);
                }
            
            /* ADD */
            else if (args[1] == "add"){
                if (hasRole()){
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
            }}

            /* REMOVE */
            else if (args[1] == "remove"){
                if (hasRole()){
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
            }}

            /* UPDATE */
            else if (args[1] == "update"){
                if (hasRole()){
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
            }

            else {
                let index = othersData.linksTypes.indexOf(args[1]);
                message.reply("Here is the download link: " + othersData.links[othersData.linksNames[index]])
            }
            break;


/* ===================================
            SEND - SEND
   =================================== */    
        case "send":
            message.delete();
            if (hasRole()) channelCheck()

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

/* ===================================
            PHRASES - PHRASES
   =================================== */         
            case "phrases":
            if (hasRole()){
            /* ADD */
                if (args[1] == "add"){
                    if (hasRole()){
                            if (!args[2] == undefined){
                            othersData.phrases.push(toRoll())
                            message.channel.send("`" + toRoll() + "`" + " successfully added")
                            saveOthersJSON();
                            function toRoll(){
                                var toSend = ""
                                for (var i = 2; i < args.length; i++){
                                    toSend = toSend + args[i] + " ";
                                }
                                return toSend;
                            }
                        }
                        else {
                            message.channel.send("You must need to put the message")
                        }
                    }
                }

                /* REMOVE */
                else if (args[1] == "remove"){
                    if(hasRole()){
                        if (!args[2] == undefined){
                            let index = othersData.phrases.indexOf(args[2])
                            message.channel.send("`" + othersData.phrases[index] + "`" + " successfully removed")
                            othersData.phrases.splice(index, 1)
                            saveOthersJSON();
                        }
                        else {
                            message.channel.send("You must need to put the message")
                        }
                    }
                }
                else {
                    var phrasesEmbed = new Discord.RichEmbed()
                        .setTitle("These are my error messages")
                        .setColor(admHexColor)
                        .setThumbnail(guildIconURL)
                    
                    var phrases = " "
                    for (var i = 0; i < othersData.phrases.length; i ++){
                        phrases = phrases + "`" + othersData.phrases[i] + "`" + "**" + " --- " + "**"
                    }
                    phrasesEmbed.addField("||", phrases)
                    message.channel.sendEmbed(phrasesEmbed)
                }
            }
                break;

/* ===================================
            CHANNELS - CHANNELS
   =================================== */    
            case "channels":
                if (hasRole()){

                    /* ADD */
                    if (args[1] == "add"){
                        if (args[2] != undefined){
                            othersData.channels.push(args[2])
                            message.channel.send("`" + args[2] + "`" + " added to channels list")
                            saveOthersJSON()
                            return;
                        }
                        else{
                            message.channel.send("You must need to put the channel name")
                            return;
                        }
                    }

                    /* REMOVE */
                    else if (args[1] == "remove"){
                        if (args[2] != undefined){
                            var index = othersData.channels.indexOf(args[2])
                            othersData.channels.splice(index, 1)
                            message.channel.send("`" + args[2] + "`" + " removed from channels list")
                            saveOthersJSON()
                        }
                        else {
                            message.channel.send("You must need to put the channel name")
                            return;
                        }
                    }
                    else{
                        var messagesEmbed = new Discord.RichEmbed()
                            .setTitle("These are the channels that I can send messages")
                            .setColor(admHexColor)
                            .setThumbnail(guildIconURL)
                        let channels = " "
                        for (var i = 0; i < othersData.channels.length; i++){
                            channels = channels + "`" + othersData.channels[i] + "`" + "**" + " --- " + "**"
                        }
                        messagesEmbed.addField("||", channels)
                        message.channel.sendEmbed(messagesEmbed)
                    }
                }
                break;

/* ===================================
            DM - MESSAGE
   =================================== */   
        case "dm":
            if(hasRole()){
                if (args[1] == undefined){
                    message.channel.send("You must need to put an nickname")
                }
                else {
                    var reached = false
                    var nickName = ""
                    var messageToSend = ""
                    for (var i = 1; i < args.length; i++){
                        if (args[i] != ":" && !reached){
                            nickName = nickName + args[i] + " "
                        }
                        else if (args[i] == ":"){
                            reached = true
                        }
                        else if (reached){
                            messageToSend = messageToSend + args[i] + " "
                        }
                        else{
                            message.reply("Something is wrong")
                            message.channel.send("`" + "Nickname: " +  "`" + nickName)
                            message.channel.send("`" + "Reached: " +  "`" + reached)
                            message.channel.send("`" + "Message: " +  "`" + messageToSend)
                        }
                    }
            }

                var id = ids[nickName]
                bot.fetchUser(id)
                .then(user => {user.send("`" + message.author.username + "`" + " " + "`" + "sent to you:" + "`" + " " + messageToSend)})
            }
            break;

/* ===================================
            OTHERS - OTHERS
   =================================== */    

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

bot.login(config.token);