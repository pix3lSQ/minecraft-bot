const mineflayer = require('mineflayer')

// --- SERVER CONFIG ---
const HOST = 'grison.aternos.host'  // your server IP / host
const PORT = 13422                  // your server port
const USERNAME = 'AFK_Bot'          // bot name
const VERSION = '1.21.1'            // match server version exactly

function startBot() {
  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION
  })

  bot.once('login', () => console.log("Bot logged in"))
  bot.once('spawn', () => {
    console.log("Bot spawned in the world")
    bot.chat("AFK bot online!")

    // Anti-AFK random movement every 5 seconds
    setInterval(() => {
      const actions = ['forward','back','left','right','jump']
      const action = actions[Math.floor(Math.random() * actions.length)]
      bot.setControlState(action, true)
      setTimeout(() => bot.clearControlStates(), 500)
    }, 5000)
  })

  // Log kicks and errors
  bot.on('kicked', (reason) => console.log("Kicked:", reason))
  bot.on('error', (err) => console.log("Error:", err.message))

  // Reconnect after 15 seconds if disconnected
  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 15 seconds...")
    setTimeout(startBot, 15000)
  })
}

startBot()
