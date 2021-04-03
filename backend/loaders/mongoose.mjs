import mongoose from 'mongoose'
import database from '../config/database.js'

export default async () => {
    const connection = await mongoose.connect(database.url)
    return connection.connection.db;
}