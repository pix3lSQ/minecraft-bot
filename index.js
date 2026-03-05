const mineflayer = require('mineflayer')
const dns = require('dns')

const HOSTNAMES = ['picklebuter.aternos.me', 'wrasse.aternos.host']
const PORT = 13422
const USERNAME = 'PickleWickleBotter'
const VERSION = '1.20.4'

let bot = null

async function resolveServer() {
  for (const host of HOSTNAMES) {
    try {
      const ip = await new Promise((res, rej) => dns.lookup(host, (err, address) => err ? rej(err) : res(address)))
      console.log(`Resolved ${host} → ${ip}`)
      return ip
    } catch (err) {
      console.log(`Failed to resolve ${host}, trying next...`)
    }
  }
  return null
}

async function createBot() {
  if (bot) return
  const ip = await resolveServer()
  if (!ip) {
    console.log('Could not resolve any host, retrying in 30s...')
    setTimeout(createBot, 30000)
    return
  }

  console.log('Starting bot...')

  bot = mineflayer.createBot({
    host: ip,
    port: PORT,
    username: USERNAME,
    version: VERSION
  })

  bot.on('login', () => console.log('Bot logged in'))
  bot.on('spawn', () => {
    console.log('Bot spawned')
    setInterval(() => {
      const actions = ['forward','back','left','right']
      const action = actions[Math.floor(Math.random()*actions.length)]
      bot.setControlState(action,true)
      setTimeout(()=>bot.setControlState(action,false),2000)
      bot.setControlState('jump',true)
      setTimeout(()=>bot.setControlState('jump',false),500)
    },7000)
  })

  bot.on('kicked', reason => console.log('Kicked:', reason))
  bot.on('error', err => console.log('Error:', err.code))
  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 30 seconds...')
    bot = null
    setTimeout(createBot, 30000)
  })
}

createBot()
