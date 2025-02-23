import express from 'express'

const app = express();

app.use(express.urlencoded( { extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const guestbook = [];

const PORT = 3000;

app.get('/', (req, res) => {
    res.render(`home`);
});

app.post('/submit', (req, res) => {
    function isValid(field) {
        return field.trim() !== "";
    }

    const page = {
        fname: req.body.fname,
        lname: req.body.lname,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        mailing_list: req.body.mailing_list,
        format: req.body.format,
        timestamp: new Date()
    };

    if(!isValid(page.fname) || !isValid(page.lname) || !isValid(page.email)) {
        const invalid = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body class="invalid">
            <h1>Invalid Input!</h1><br>
            <p>Return home and try again?</p><br>
            <button id="confirmbutton" onclick="window.location.href='/'">Home</button>
            <button id="confirmbutton" onclick="window.location.href='/admin'">Admin</button>
        </body>
        </html>`;
        res.send(invalid);
        return;
    }

    guestbook.push(page);
    console.log(page);

    res.render('thank-you', { page });
});

app.get('/admin', (req, res) => {
    res.render('admin', { guestbook });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:3000`);
})