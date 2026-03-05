const mineflayer = require('mineflayer')

let bot

function startBot() {

  if (bot) return

  console.log("Starting bot...")

  bot = mineflayer.createBot({
    host: 'wrasse.aternos.host',
    port: 13422,
    username: 'PickleBot',
    version: '1.20.4'
  })

  bot.on('login', () => {
    console.log("Bot logged in!")
  })

  bot.on('spawn', () => {
    console.log("Bot spawned!")
    bot.chat("PickleBot is online!")

    setInterval(() => {

      const actions = ['forward','back','left','right']
      const action = actions[Math.floor(Math.random()*actions.length)]

      bot.setControlState(action,true)

      setTimeout(()=>{
        bot.setControlState(action,false)
      },3000)

      bot.setControlState('jump',true)

      setTimeout(()=>{
        bot.setControlState('jump',false)
      },500)

    },8000)

  })

  bot.on('kicked', (reason) => {
    console.log("Kicked:", reason)
  })

  bot.on('end', () => {
    console.log("Disconnected. Reconnecting in 15 seconds...")
    bot = null
    setTimeout(startBot,15000)
  })

  bot.on('error', (err) => {
    console.log("Error:", err)
  })

}

startBot()
