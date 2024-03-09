const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/send-mail', async (req, res) => {
    const { name, email, reason, phone } = req.body;

    // Nodemailer setup (consider using OAuth2 for security)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'swathigaddampally13@gmail.com', // Your Gmail address
            pass: '13daddy10$', // Your Gmail password or App Password
        },
    });

    let mailOptions = {
        from: 'swathigaddampally13@gmail.com',
        to: 'swathigaddampally@gmail.com', // Destination email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nReason: ${reason}\nPhone: ${phone}`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send({ message: 'Error sending email', error: error });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



