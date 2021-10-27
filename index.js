// Express server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000  // Default port we are setting as 3000

// Modules
const cron = require('node-cron');
const async = require('async')

// Imports
const { fetchYoutubeVideos } = require('./backend/services/youtubeService')
const { createUpdateVideo } = require('./backend/services/videoService')
const routes = require('./backend/route')


// 10 Sec cron job to fetch youtube 
cron.schedule('*/10 * * * * *', async () => {
    try {

        let youtubeData = await fetchYoutubeVideos(new Date(new Date(Date.now() - 1800000)).toISOString(), new Date(new Date(Date.now() - 1790000)).toISOString());   // fetch video btw (T - 30 mins) & (T - 30 mins + 10 sec) = 10 sec window

        async.each(youtubeData['items'], createUpdateVideo, (err, result) => { console.log(err, result) })

    } catch(err) {

        console.log(err);
    }
})

// Passing all api url requests to backend routes
app.use('/api', routes);

// Api to check system health
app.get('/ping', (req, res) => {
    res.send('Namaste !')
})

// Lifting app on a specific port
app.listen(port, (err, result) => {
    if (err) {
        console.log('Application fail to lift')
        console.log('Error :', err)
    } else {
        console.log(`Application is running on port ${port}`)
    }
})