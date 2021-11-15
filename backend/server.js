const express = require('express')
const fetch = require('node-fetch')

const app = express();

app.use(express.json())

app.post('/upload', (req, res) => {
  try {
    if (!(req.body.image && req.body.caption)) {
      res.status(400)
    } else {
      fetch('https://imagehasbeenverified.example.endpoint/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res.body),
      })
      .then(response => response.json())
      .then(data => {
        res.status(201)
      })
      .catch((error) => {
        res.status(400)
      });
    }

  } catch (error) {
    // console.log('error', error)
    res.status(400)
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
