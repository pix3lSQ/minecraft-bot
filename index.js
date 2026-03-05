const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'grison.aternos.host:13422', // your server IP
  port: 13422, // your server port
  username: 'AFK_Bot',
  version: '1.20.2' // make sure this matches your server
})

// Log when bot joins
bot.on('login', () => {
  console.log("Bot joined the server!")
})

// Make the bot AFK safely after it spawns
bot.on('spawn', () => {
  bot.chat("Hello! I'm the AFK bot.")
  
  // Simple AFK movement inside spawn event
  bot.setControlState('jump', true) // keeps jumping
  setInterval(() => {
    bot.setControlState('forward', true) // moves forward constantly
  }, 1000)
})

// Handle kicks or errors gracefully
bot.on('kicked', (reason) => {
  console.log("Bot was kicked:", reason)
})

bot.on('error', (err) => {
  console.log("Bot error:", err)
})
