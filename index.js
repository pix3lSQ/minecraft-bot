const mineflayer = require('mineflayer')

// Your server info
const SERVER_HOST = 'grison.aternos.host' // only the domain, no :port
const SERVER_PORT = 13422                  // port from Aternos
const SERVER_VERSION = '1.20.2'           // match your server version
const BOT_USERNAME = 'AFK_Bot'            // bot name

// Function to create the bot
function createBot() {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_USERNAME,
    version: SERVER_VERSION
  })

  bot.on('login', () => {
    console.log("Bot joined the server!")
  })

  bot.on('spawn', () => {
    bot.chat("Hello! I'm the AFK bot.")

    // Anti-AFK movement
    bot.setControlState('jump', true)
    setInterval(() => bot.setControlState('forward', true), 1000)
  })

  // If kicked or disconnected, try to reconnect after 10 seconds
  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 10 seconds...")
    setTimeout(createBot, 10000)
  })

  bot.on('kicked', (reason) => {
    console.log("Bot was kicked:", reason)
  })

  bot.on('error', (err) => {
    console.log("Bot error:", err)
  })
}

// Start the bot
createBot()
