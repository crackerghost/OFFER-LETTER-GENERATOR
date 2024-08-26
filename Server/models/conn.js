const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://360forge:360forge123@cluster0.yrllh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

let isConnected = false; // State to track connection

const connectDB = async () => {
  if (!isConnected) {
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      isConnected = true; // Update the state after connection is successful
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
  return client;
};

// Optional: Function to close the connection when needed
const closeDB = async () => {
  if (isConnected) {
    try {
      await client.close();
      console.log('MongoDB connection closed');
      isConnected = false;
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
};

module.exports = { connectDB, closeDB };
