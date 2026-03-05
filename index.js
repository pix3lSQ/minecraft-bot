const mineflayer = require('mineflayer')
const dns = require('dns')

// Your server info
const HOSTNAMES = ['picklebuter.aternos.me', 'wrasse.aternos.host']
const PORT = 13422
const USERNAME = 'PickleWickleBotter'
const VERSION = '1.20.4'

let bot = null

// Resolve a hostname to IP
function resolveHost(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address) => {
      if (err) reject(err)
      else resolve(address)
    })
  })
}

async function createBot() {
  if (bot) return

  let ip = null
  for (const host of HOSTNAMES) {
    try {
      ip = await resolveHost(host)
      console.log(`Resolved ${host} → ${ip}`)
      break
    } catch (err) {
      console.log(`Failed to resolve ${host}, trying next...`)
    }
  }

  if (!ip) {
    console.log('Could not resolve any hostname, retrying in 20 seconds...')
    setTimeout(createBot, 20000)
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

    // AFK movements to avoid being kicked
    setInterval(() => {
      const actions = ['forward','back','left','right']
      const action = actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)
      setTimeout(() => bot.setControlState(action, false), 2000)

      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 7000)
  })

  bot.on('kicked', (reason) => console.log('Kicked:', reason))
  bot.on('error', (err) => console.log('Error:', err.code))

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 20 seconds...')
    bot = null
    setTimeout(createBot, 20000)
  })
}

// Start bot
createBot()
