const mineflayer = require('mineflayer')

function createBot() {

  console.log("Starting bot...")

  const bot = mineflayer.createBot({
    host: "picklebuter.aternos.me",
    port: 13422,
    username: "PickleBot",
    version: "1.20.4"
  })

  bot.on("login", () => {
    console.log("Bot logged in")
  })

  bot.on("spawn", () => {
    console.log("Bot spawned")
    bot.chat("PickleBot online!")

    setInterval(() => {

      const actions = ["forward","back","left","right"]
      const action = actions[Math.floor(Math.random()*actions.length)]

      bot.setControlState(action,true)

      setTimeout(()=>{
        bot.setControlState(action,false)
      },2000)

      bot.setControlState("jump",true)

      setTimeout(()=>{
        bot.setControlState("jump",false)
      },500)

    },7000)

  })

  bot.on("end", () => {
    console.log("Disconnected. Reconnecting in 20 seconds...")
    setTimeout(createBot,20000)
  })

  bot.on("error", (err) => {
    console.log("Error:", err.code)
  })

}

createBot()
