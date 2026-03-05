const mineflayer = require('mineflayer')

function startBot() {

  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: 'YOURSERVER.aternos.host', // change this
    port: 12345,                     // change this
    username: 'AFK_Bot',
    version: false                   // auto detect version
  })

  bot.on('login', () => {
    console.log("Bot logged in!")
  })

  bot.on('spawn', () => {
    console.log("Bot spawned in the server!")

    bot.chat("AFK Bot is now online!")

    // Random movement so server doesn't kick it
    setInterval(() => {
      const actions = ['forward', 'back', 'left', 'right']

      const action = actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)

      setTimeout(() => {
        bot.setControlState(action, false)
      }, 2000)

      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)

    }, 10000)
  })

  bot.on('kicked', (reason) => {
    console.log("Bot was kicked:", reason)
  })

  bot.on('error', (err) => {
    console.log("Error:", err)
  })

  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 15 seconds...")
    setTimeout(startBot, 15000)
  })
}

startBot()
