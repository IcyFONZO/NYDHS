WHAT
This is a bot that puts a post on a specific channel of Discord into a specific list of Trello
Please use it when you want to aggregate and manage the remarks of a specific channel into Trello
HOW
Prepare the environment where Node.js works. .node_versionOnce v7.0.0Well maybe I have to v.6.0.0think and move, if later.
Please install a decent version.
Even nodebrew (for Mac users), ndenv (for anyone who wants to put all the env system together using anyenv) or nvm (for people who are simple to run on Linux) is fine.
Prepare a bot of Discord and acquire a token
Decide the channel to assign the bot of Discord
Get channel ID to monitor posts
Get Trello's API KEY and token
Retrieve the ID of the list to be posted
Create a file with each of the above tokens etc. as .env.deva template.env
.env.devPlease fill in all the items anyway ! ! !
npm install Install dependent libraries with
node ./index.js & Move the process in the background in
that's all ;)