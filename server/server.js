import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json()) // Middleware to parse JSON data from HTTP requests
app.use(cors()) // Middle to enable cross origin requests

app.get('/', (req, res) => {
    res.status(200).send(`
            <h1 style="text-align: center; margin-top: 50px">
                ✈️ On the Fly API
            </h1>
        `)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})