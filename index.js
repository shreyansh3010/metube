const express = require('express');
const app = express();
const port = process.env.PORT || 3000  // Default port we are setting as 3000



// Api to check system health
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