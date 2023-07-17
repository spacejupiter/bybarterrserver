function controllers(app, service) {
  try {
    app.post('/api/waitlist', (req, res) => {
      const email = req.body

      service.appendEmailDataToCsvFile(email)
      res.status(201).json('created')
    })
    app.post('/api/support', (req, res) => {
      console.log('request recieved')
      const data = req.body
      service.appendSupportDataToCsvFile(data)
      res.status(201).json('created')
    })
    console.log('controller started')
  } catch (error) {
    res.send(error)
  }

  // app.post('/api/waitlist', (req, res) => {})
}

module.exports = controllers
