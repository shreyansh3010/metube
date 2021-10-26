const express = require('express');
const app = express();
const port = process.env.PORT || 3000


app.get('/ping', (req, res) => {
    res.send('Namaste !')
})

app.listen(port, (err, result) => {
    if (err) {
        console.log('Application fail to lift')
        console.log('Error :', err)
    } else {
        console.log(`Application is running on port ${port}`)
    }
})