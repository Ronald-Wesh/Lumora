import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const app = express()
app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())

const requests = []

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

app.post('/api/requests', (req, res) => {
  const { name, email, project } = req.body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required.' })
  }
  if (typeof email !== 'string' || !isEmail(email)) {
    return res.status(400).json({ message: 'A valid email is required.' })
  }
  if (typeof project !== 'string' || !project.trim()) {
    return res.status(400).json({ message: 'Project details are required.' })
  }

  const entry = {
    id: requests.length + 1,
    name: name.trim(),
    email: email.trim(),
    project: project.trim(),
    receivedAt: new Date().toISOString(),
  }
  requests.push(entry)

  res.status(201).json({ id: entry.id, receivedAt: entry.receivedAt })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong.' })
})

app.listen(PORT, () => {
  console.log(`Lumora API listening on http://localhost:${PORT}`)
})
