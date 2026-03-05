const mineflayer = require('mineflayer')

function startBot() {

  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: 'grison.aternos.host', // your host
    port: 13422,                 // your port
    username: 'AFK_Bot',
    version: false
  })

  bot.on('login', () => {
    console.log("Bot logged in!")
  })

  bot.on('spawn', () => {
    console.log("Bot spawned!")

    bot.chat("AFK Bot online!")

    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 10000)
  })

  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 15 seconds...")
    setTimeout(startBot, 15000)
  })

  bot.on('error', (err) => {
    console.log("Error:", err)
  })
}

startBot()
