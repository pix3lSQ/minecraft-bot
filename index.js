const mineflayer = require('mineflayer')

function createBot() {

  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: "picklebuter.aternos.me", // your Aternos static IP
    port: 13422,
    username: "PickleWickleBotter",
    version: "1.20.4"
  })

  bot.on('login', () => {
    console.log("Bot logged in")
  })

  bot.on('spawn', () => {
    console.log("Bot spawned")
    // NO chat messages sent
    // The bot just moves to avoid AFK kicks
    setInterval(() => {
      const actions = ['forward','back','left','right']
      const action = actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)

      setTimeout(() => {
        bot.setControlState(action, false)
      }, 2000)

      bot.setControlState('jump', true)
      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)

    }, 7000)
  })

  bot.on('end', () => {
    console.log("Disconnected. Reconnecting in 30 seconds...")
    setTimeout(createBot, 30000) // slower reconnect to prevent duplicate login
  })

  bot.on('error', err => {
    console.log("Error:", err.code)
  })

}

createBot()
