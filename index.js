const mineflayer = require('mineflayer')

const HOST = 'grison.aternos.host' // your server address
const PORT = 13422                 // your server port
const VERSION = false              // auto-detect version
const USERNAME = 'AFK_Bot'

function startBot() {

  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION
  })

  bot.once('login', () => {
    console.log("Bot logged in")
  })

  bot.once('spawn', () => {
    console.log("Bot spawned in world")

    bot.chat("AFK bot online")

    // anti AFK movement
    setInterval(() => {

      const actions = ['forward','back','left','right','jump']
      const action = actions[Math.floor(Math.random()*actions.length)]

      bot.setControlState(action, true)

      setTimeout(()=>{
        bot.clearControlStates()
      }, 500)

    }, 5000)

  })

  bot.on('kicked', (reason) => {
    console.log("Kicked:", reason)
  })

  bot.on('error', (err) => {
    console.log("Error:", err.message)
  })

  bot.on('end', () => {
    console.log("Disconnected. Reconnecting in 15 seconds...")
    setTimeout(startBot,15000)
  })

}

startBot()
