let express = require('express')
let cors = require('cors')
let helmet = require('helmet')
const { PORT } = require('./config/env')
const authRoutes = require('./routes/authRoutes')

let app = express()

let corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}

// Middleware
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())

app.use('/api',authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is working on ${PORT} port`);
})