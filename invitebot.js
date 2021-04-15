//Bot Token, you can find it through the https://discord.com/developers/applications click on the bot you want the ID for and then click on the Bot from the menu and you will see token
const token = "BotTokenHere";

// Owner ID, it's set to Giulia so that only she can create the invites, you can get the user ID by right clicking them on discord and click Copy ID
var OwnerID = "774176076284690433";




// to interact with Discord
const Discord = require('discord.js');


// initialize the bot
const bot = new Discord.Client();
if (!token) {
    console.log("settings.properties file is missing a 'token = <your token>' line. Check README if you don't know how to get your token.");
    process.exit(1);
};


bot.on('ready', () => {
	console.log(' -- LOADED -- ');
		
});


//If the bot recieved a message
bot.on('message', message => {

//Checks if the user entered ^invite and then number, it also checks if the user is the admin
if (message.author.id == OwnerID && message.content.toLowerCase().startsWith('^invite')){

		    var amount = message.content.split(" ")[1]; 
			amount = parseInt(amount);
			//Checks if the iput value is in fact a number
			if( isNaN(amount) || amount < 1)
			message.channel.send("Please enter a valid number.");
			else{
				message.channel.send("creating "+amount+" invites, it will take time, don't worry I am working on it");
				replyWithInvite(message,amount);
				  //replyWithInviteMulti(message,amount);	Another way to create links which should be faster but I don't think it is			
			}
			
			
			
	}

});

//Logs in yes.
bot.login(token);


//Function to create the invites.
async function replyWithInvite(message,amount) {
	var listofinvites="";
	for (i = 0; i < amount; i++) {

  let invite = await message.channel.createInvite(
  {
    //maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
    maxUses: 1, // maximum times it can be used
	temporary: false, // if temporary invite which means they are kicked off discord once they leave/disconnect
	unique: true, //to give different ID
  },
)
.catch(console.log);

  listofinvites+=invite+"\n";
}
  message.channel.send("Here you go "+amount+" invites \n"+listofinvites);
 
}




//Another way to create links which should be faster however I don't think it is.

 function createinvite(message){
	
	  let invite =  message.channel.createInvite(
  {
    //maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
    maxUses: 1, // maximum times it can be used
	temporary: false, // if temporary invite which means they are kicked off discord once they leave/disconnect
	unique: true, //to give different ID
  },
)
.catch(console.log);

return invite;
	
}


function replyWithInviteMulti(message,amount) {
       const promises = [];
       
       for (let i = 0; i < amount; ++i) {
           promises.push(createinvite(message));
       }
       
       Promise.all(promises)
           .then((results) => {
               console.log("All done", results);
			   var invites = String(results).split(',').join("\n"); 
			     message.channel.send("Here you go "+amount+" invites \n"+invites);

           })
           .catch((e) => {
               // Handle errors here
           });
   }

			

	
	