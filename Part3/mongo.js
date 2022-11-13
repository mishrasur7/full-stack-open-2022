import mongoose from "mongoose";

if (process.argv.length < 3) {
    console.log('Please provide the password, name and phone number as an argument: node mongo.js <password> <name> <phnumber>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.kjlnuld.mongodb.net/phoneApp?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const PhoneBook = mongoose.model('PhoneBook', phoneSchema)

mongoose
    .connect(url)
    .then(result => {
        console.log(result)
        console.log('Connected to database')
        const phoneBookInfo = new PhoneBook({
            name: name,
            number: phNumber
        })
        return phoneBookInfo.save()
    })
    .then(() => {
        console.log(`added ${name} number ${phNumber} to phonebook`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))

// mongoose
//     .connect(url)
//     .then(() => PhoneBook.find({}))
//     .then(result => {
//         result.forEach(phoneInfo => console.log(phoneInfo))
//         mongoose.connection.close()
//     })
//     .catch(err => console.log(err))