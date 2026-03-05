const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'picklebuter.aternos.me', // replace this with your server IP
  port: 13422,
  username: 'AFK_Bot'
})

bot.on('login', () => {
  console.log("Bot joined the server!")
})

bot.on('spawn', () => {
  bot.chat("Hello! I'm the AFK bot.")
})
// Simple AFK movement
bot.setControlState('jump', true) // bot keeps jumping
setInterval(() => {
  bot.setControlState('forward', true) // bot moves forward constantly
}, 1000)
