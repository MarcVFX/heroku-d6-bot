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
const phrases = ["",
    "Sorry, I can't recognize this command", 
    "Sorry, I don't speak retardish", 
    "Are you speaking english?", 
    "Illiterate", 
    "WTF is that m8?", 
    "Trolololo", 
    "Don't do this again", 
    "I speak english, you know?", 
    "Type something useful", 
    "Retard", 
    "i'm not your father", 
    "ReferenceError: cannot send `null` to `null`"
];

const guildChannels = [
    "general",
    "portuguese_channel",
    "only-members",
    "upload-queue",
    "links",
    "d6-management",
    "esports-d6",
    "bot_in_your_ass"
];

var date = new Date()
var hours = date.getUTCHours()
var minutes = date.getUTCMinutes()
var day = date.getUTCDate()
var month = date.getUTCMonth()
var year = date.getUTCFullYear()


/* ROSTER */
const D1 = ["Nothing", "Viega", "Zaad"];
const D2 = ["Wolf", "Ghost", "Vitor Vieira"];
const D3 = ["Ladd", "Derpedits", "Srczm", "Vlawed"];
const D4 = ["Talxnts"];
const D5 = ["Lela"];
const D6 = ["BNX", "Marc", "Glace", "Duffin"];
const districts = [D1, D2, D3, D4, D5, D6]
const rosterUpdate = "Roster updated at 07/09/2017"


/* EMBED VARIABLES */
const hexColor = "2EA319"
const guildIconURL = "https://cdn.discordapp.com/icons/346767747226664971/beaf3e96dc6fe20fc00f76c212a6c116.webp"

/*  FILES */
const logoAI = "https://mega.nz/#!98oUDCzZ!tdHVDsLVXX_gLRZVeCXvJNwANZK4MHJRwy47jTsWvwY";
const logoPNG = "https://mega.nz/#!Q8AlUb4Y!9jarfBmRVOwa9oBhTAVN2U96F4cwd4RS1hcdiz9B41A";
const logoPSD = "https://mega.nz/#!R042BKDI!xPQh3GCBKHgqcae3Ig8qDdTR4pQwUOT26eN_wIZCWPk";
const logoC4D = "https://mega.nz/#!xxYilRza!y2P1AanSGej0X1YWm6LGl1fYxpcgziaVsLCHoCKxjFw";
const logoAll = "https://mega.nz/#!RoZmXQza!dyoT4cufuCxye-2Mbt2xVoSdNa3R2HJp75Qq0Ntum7g";
const logoAVI = "https://mega.nz/#!J8wTxZqK!9QNwYG7zfSPlpJJVuFpD21ZVrWofbKGT-pfY_nFpUD8";

/* SOCIAL MEDIAS */
const yt = "https://www.youtube.com/channel/UCrjxT16pynjv80PevE16ueQ";
const tt = "@District6Arts"

/* FUNCTIONS */
function saveJSON(){
    month > 11 ? month = month : month = month + 1
    rosterData["rosterUpdate"] = day +"/"+ (month > 10 ? month : "0" + month) +"/"+ year + " at " + (hours >= 10 ? hours : "0" + hours) +":"+ (minutes >= 10 ? minutes : "0" + minutes) + " (UTC Time)"
    fs.writeFile("./roster.json", JSON.stringify(rosterData), (err) => {
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
                saveJSON()
                message.reply("Sucessfully added " + args[2] + " to the roster")
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
                saveJSON()
                message.reply("Sucessfully removed " + args[2] + " from the roster")
            }
            else {
                message.reply("You must be on the management role to do that bro :v")
            }
        break;
        case "update":
            var D6RoleID = message.guild.roles.find('name', 'D6 - Management').id
            if (message.member.roles.has(D6RoleID)) saveJSON()
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
                .addField(prefix + "send", "Send an message to an channel. Usage > " + prefix + "send [channel] [message to send]")
                .addField(prefix + "add", "Adds an member to the roster list. Usage > " + prefix + "add [D + role number] [people name]")
                .addField(prefix + "remove", "Removes an member from the roster list. Usage > " + prefix + "remove [D + role number] [people name]")
                .addField(prefix + "update", "Updates the roster list")
                .setColor("#c10d0d")
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
            message.reply("Here is the download link: " + logoAI);
            break;
        case "png":
            message.reply("Here is the download link: " + logoPNG);
            break;
        case "psd":
            message.reply("Here is the download link: " + logoPSD);
            break;
        case "c4d":
            message.reply("Here is the download link: " + logoC4D);
            break;
        case "avi":
            message.reply("Here is the download link: " + logoAVI);
            break;
        case "all":
            message.reply("Here is the download link: " + logoAll);
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
                    for (var i = 0; i < guildChannels.length; i++){
                        if (guildChannels[i] == args[1]){
                            var toSendCnl= bot.channels.find("name", guildChannels[i]);
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
                        else if (guildChannels.length - 1 == i){
                            message.reply("This channel don't exists or I can't send an message to this channel");
                            return
                        }
                    }
                }
            break;

        case "token":
            message.reply("Nah, just kidding");
            break;
        
        case "test":
            message.reply()
            break;

            
        /* invalid command message */
        default:
            if (message.content == prefix) {
                message.channel.send("You need to put something after the **" + prefix + "** lol");
                return;
            }
            message.channel.send(phrases[Math.floor(Math.random()* phrases.length)]);
            break;


    }


});
/* SCHEDULED MESSAGE */
var a = schedule.scheduleJob('00 20 * * *', function(){
    reminder("general");
    queue("general");
});
var b = schedule.scheduleJob('00 7 * * *', function(){
    goodMorning("general");
    queue("general");
});
var c = schedule.scheduleJob('00 15 * * *', function(){
    queue("general");
});
/*
var c = schedule.scheduleJob('30 * * * *', function(){
    var toSend = bot.channels.find("name", "general");
    toSend.send(latestVid());
});
*/

bot.login(process.env.BOT_TOKEN);
