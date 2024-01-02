const mongoose = require('mongoose')

async function connectDB() {
 try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CustomerDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connection Succeeded')
 } catch (err) {
    console.log('Connection Failed ' + err)
 }
}

connectDB()
require('./customer.model')