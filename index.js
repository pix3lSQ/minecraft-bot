const mineflayer = require('mineflayer')

function startBot() {

  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: 'wrasse.aternos.host',
    port: 13422,
    username: 'AFK_Bot',
    version: '1.20.4'
  })

  bot.on('login', () => {
    console.log("Bot logged in!")
  })

  bot.on('spawn', () => {
    console.log("Bot spawned in the server!")

    bot.chat("AFK Bot online!")

    // anti-AFK movement
    setInterval(() => {

      const actions = ['forward','back','left','right']
      const action = actions[Math.floor(Math.random()*actions.length)]

      bot.setControlState(action,true)

      setTimeout(()=>{
        bot.setControlState(action,false)
      },2000)

      bot.setControlState('jump',true)

      setTimeout(()=>{
        bot.setControlState('jump',false)
      },500)

    },10000)

  })

  bot.on('kicked',(reason)=>{
    console.log("Kicked:",reason)
  })

  bot.on('error',(err)=>{
    console.log("Error:",err)
  })

  bot.on('end',()=>{
    console.log("Disconnected. Reconnecting in 15 seconds...")
    setTimeout(startBot,15000)
  })

}

startBot()
