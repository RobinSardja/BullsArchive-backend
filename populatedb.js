const mongoose = require('mongoose')
const Course = require('./models/course')
const fs = require('fs')
const config = require('./utils/config')

// MongoDB Connection
console.log('Connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

fs.readFile('my_courses.json', 'utf8', (err, data) => {
  if (err) throw err

  const courses = JSON.parse(data)
  courses.forEach(course => {
    const { name, number } = course
    const newCourse = new Course({
      name,
      number
    })

    newCourse.save()
      .then(() => {
        console.log('Item Saved to Database')
      })
      .catch(err => {
        console.error(err)
      })
  })
})

