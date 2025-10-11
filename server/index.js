const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.post('/api/contact', (req, res) => {
  console.log('Received contact form:', req.body)
  // Simulate processing delay
  setTimeout(() => res.json({ ok: true }), 600)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Mock API listening on http://localhost:${port}`))
