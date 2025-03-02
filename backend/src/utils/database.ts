import mongoose from 'mongoose';

export default function connectDB(){
    const DATABASE_URL = process.env.DATABASE_URL ?? 'mongodb://localhost:27017//dbBwaTicket';

    try{
        mongoose.connect(DATABASE_URL)
    }catch(error){
        console.error('Failed to connect to database')
        process.exit(1)
    }

    const dbConn = mongoose.connection;

    dbConn.on('open', () => {
        console.log(`Database connected: ${DATABASE_URL}`)
    })

    dbConn.on('error', (err) => {
        console.log(`Connection Error : ${err}`)
    })

}
