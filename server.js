const express = require('express')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: '7a5a8aa055c043c48247fa4f80b42722',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info('Html was served successfully!')
})



const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log(`Pikachu use Thunderbolt on port: ${port}!`))
