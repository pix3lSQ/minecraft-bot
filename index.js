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
    console.log("Bot spawned!")

    bot.chat("AFK bot online!")

    // random movement loop
    setInterval(() => {

      const actions = ['forward','back','left','right']
      const action = actions[Math.floor(Math.random()*actions.length)]

      bot.setControlState(action,true)

      setTimeout(()=>{
        bot.setControlState(action,false)
      },3000)

      // jump sometimes
      bot.setControlState('jump',true)
      setTimeout(()=>{
        bot.setControlState('jump',false)
      },500)

      // rotate camera randomly
      bot.look(
        Math.random()*Math.PI*2,
        Math.random()*Math.PI/2,
        true
      )

    },8000)

  })

  bot.on('kicked',(reason)=>{
    console.log("Kicked:",reason)
  })

  bot.on('error',(err)=>{
    console.log("Error:",err)
  })

  bot.on('end',()=>{
    console.log("Disconnected. Reconnecting in 10 seconds...")
    setTimeout(startBot,10000)
  })

}

startBot()
