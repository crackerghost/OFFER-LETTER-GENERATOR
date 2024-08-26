const { connectDB } = require('../models/conn');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '360forge123'; // Replace with your actual secret key

const userCheck = async (email, res) => {
  try {
    const client = await connectDB();
    const db = client.db('offerletter');
    const collection = db.collection('users');

    // Check if the email exists in the collection
    const user = await collection.findOne({ email });

    if (user) {
      // If user exists, generate JWT token
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '6h' });
      return res.status(200).send({ message: 'User verified and logged in', token: token });
    } else {
      // If user does not exist, insert a new user and generate JWT token
      const result = await collection.insertOne({ email });
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '6h' });
      return res.status(201).send({ message: 'New user created and logged in', token: token });
    }
  } catch (error) {
    console.error('Error during user check:', error);
    return res.status(500).send({ error: 'Error checking user' });
  }
};

module.exports = {
  userCheck
};
