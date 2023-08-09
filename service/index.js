const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

module.exports = {
  sendEmail: (
    senderEmail,
    senderPassword,
    recipientEmail,
    subject,
    content,
  ) => {
    // Create a transporter using the provided SMTP configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    })

    // Define the email options
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: subject,
      text: content,
    }

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error)
      } else {
        console.log('Email sent:', info.response)
      }
    })
  },

  appendEmailDataToCsvFile: (data) => {
    const filePath = path.join(__dirname, 'email.csv')
    if (data === undefined) {
      throw Error('email data is expected')
    }
    fs.readFile(filePath, 'utf8', (error, fileContent) => {
      if (error) {
        console.error('Error reading the CSV file:', error)
        return
      }

      let existingData = []
      if (fileContent.length > 0) {
        existingData = fileContent.split('\n').slice(1)
      }

      const { email } = data

      if (email && existingData.length > 0) {
        console.log('Appending email to the CSV file.')

        const csvWriter = createCsvWriter({
          path: filePath,
          header: [{ id: 'email', title: 'Email Address' }],
          append: true,
        })

        const record = { email }

        csvWriter
          .writeRecords([record])
          .then(() => {
            return 'Email appended to the CSV file.'
          })
          .catch((error) => {
            console.error('Error appending data to the CSV file:', error)
          })
      } else {
        console.log('No email to append. Creating a new CSV file.')

        const csvWriter = createCsvWriter({
          path: filePath,
          header: [{ id: 'email', title: 'Email Address' }],
        })

        const records = [{ email }]

        csvWriter
          .writeRecords(records)
          .then(() => {
            console.log('New CSV file created.')
          })
          .catch((error) => {
            console.error('Error creating new CSV file:', error)
          })
      }
    })
  },
  appendSupportDataToCsvFile: (data) => {
    const csvFilePath = path.join(__dirname, 'support.csv') //get the filepath

    fs.readFile(csvFilePath, 'utf8', (error, fileContent) => {
      //read the file from the path * only reads, because file is created
      if (error) {
        console.error('Error reading the CSV file:', error)
        return
      }

      let existingData = []
      if (fileContent.length > 0) {
        existingData = fileContent.split('\n').slice(1)
      }

      const { name, email, message } = data

      if (name && email && message) {
        console.log('Appending support data to the CSV file.')

        const csvWriter = createCsvWriter({
          path: csvFilePath,
          header: [
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            { id: 'message', title: 'Message' },
          ],
          append: existingData.length > 0, // Append only if the file exists
        })

        const record = { name, email, message }

        csvWriter
          .writeRecords([record])
          .then(() => {
            console.log('Support data appended to the CSV file.')
          })
          .catch((error) => {
            console.error(
              'Error appending support data to the CSV file:',
              error,
            )
          })
      } else {
        console.log('Missing support data. Unable to append to CSV file.')
      }
    })
  },
}
