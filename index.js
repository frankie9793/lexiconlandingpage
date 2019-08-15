const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

//View engine setup 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder 
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('main');
})

app.post('/send', (req, res) => {
    console.log(req.body);
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.from}</li>
        </ul>
    `;
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        service: 'Gmail',
        auth: {
          user: 'frankie9793@gmail.com', // generated ethereal user
          pass: '448360149aA!' // generated ethereal password
        }
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Admin Wobble App" <frankie9793@gmail.com>', // sender address
        to: "wobbleapp2019@gmail.com", // list of receivers
        subject: "Interested user", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      }, (error, info) => {
        if(error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.render('main', {msg: 'Thank you for your interest!'});
      });
    
      
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started...'));