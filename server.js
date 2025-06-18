const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let otpStore = {};

app.post('/send-otp', async(req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kappirilaharikrishna@gmail.com', // Replace with your Gmail
            pass: 'sbmp fipj iqbj hmnm'
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        html: `<h3>Your OTP is: ${otp}</h3>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'OTP sent!', otp }); // Don't expose OTP in production
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ message: 'OTP not found' });

    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: 'OTP expired' });
    }

    if (otp === record.otp) {
        delete otpStore[email];
        return res.json({ success: true, message: 'OTP Verified' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
});