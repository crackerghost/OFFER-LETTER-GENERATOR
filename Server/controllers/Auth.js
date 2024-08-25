const express = require('express')
const mail = require('nodemailer')

let otp = ''
let attempt = 3

const router = express.Router()

let transporter = mail.createTransport({
 service : 'gmail',
 auth : {
    user : "360forge@gmail.com",
    pass : "oyppbijsxrijyxdn"
 }
})



router.get('/',(req,res)=>{
            
    res.status(200).send({data:"working"})
})

router.post('/sendEmailOtp',async(req,res)=>{
    const {email} = req.body
    otp = Math.floor(1000 + Math.random() * 9000).toString();

    let mailOptions = {
        from: '360forge@gmail.com',  // Sender address
        to: email,   // List of recipients
        subject: 'Otp For Verifying Your Email', // Subject line
        html: `
        <p>Your Otp is</p><br>
        <b>${otp}</b>`    // HTML body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send({error : error})  
          return console.log('Error occurred:', error);
        }
        attempt = 3
        res.status(200).send({data : "otp sended"})
        
      });


})

router.post('/verifyOtp', (req, res) => {
    const { code } = req.body;
  
    if (!code) {
      return res.status(400).send({ error: 'Code is required' });
    }
  
    if (attempt > 0) {
      if (code === otp) {
        otp = ''; 
        attempt = 3; 
        res.status(200).send({ data: 'success' });
      } else {
        attempt--;
        if (attempt <= 0) {
          otp = ''; 
          return res.status(500).send({ error: 'No attempts left' });
        }
        res.status(400).send({ error: 'Incorrect code', attempts: attempt });
      }
    } else {
      res.status(500).send({ error: 'No attempts left' });
    }
  });
  
module.exports = {router}