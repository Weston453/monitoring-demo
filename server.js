const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

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

//Student stuff --------------------------------------------------------------

const studentArr = []

app.post('/api/students', (req, res)=>{
    const {name} = req.body
    studentArr.push(name)

    rollbar.log('Student successfully added!')
    res.status(200).send(studentArr)
})



const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log(`Pikachu use Thunderbolt on port: ${port}!`))
