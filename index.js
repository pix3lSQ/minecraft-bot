const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'YOUR_SERVER_IP', // replace this with your server IP
  port: 25565,
  username: 'AFK_Bot'
})

bot.on('login', () => {
  console.log("Bot joined the server!")
})

bot.on('spawn', () => {
  bot.chat("Hello! I'm the AFK bot.")
})
