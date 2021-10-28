// Express server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000  // Default port we are setting as 3000

// Modules
const cron = require('node-cron');
const async = require('async');
const util = require('util');

// Redis cache
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST,{});
redisClient.get = util.promisify(redisClient.get); // promisify the get function
redisClient.set = util.promisify(redisClient.set); // promisify the set function

// Imports
const { fetchYoutubeVideos } = require('./backend/services/youtubeService')
const { createUpdateVideo } = require('./backend/services/videoService')
const routes = require('./backend/route')

const youtubeApiKeys = process.env.GOOGLE_API_KEYS.split('|') // Creating api key array

app.set('view engine', 'ejs');


/*
    Saving first key from array to cache
    {
        key : current active key
        index : current active key indexs
    }
*/ 

(async () => {

    let newKey = await redisClient.set('youtubeApiKey', JSON.stringify({
        key : youtubeApiKeys[0],
        index : 0
    }))

})()

// 10 Sec cron job to fetch youtube 
cron.schedule('*/10 * * * * *', async () => {
    try {

        let youtubeData = await fetchYoutubeVideos(new Date(new Date(Date.now() - 1800000)).toISOString(), new Date(new Date(Date.now() - 1790000)).toISOString());   // fetch video btw (T - 30 mins) & (T - 30 mins + 10 sec) = 10 sec window

        async.each(youtubeData['items'], createUpdateVideo, (err, result) => { console.log(err, result) })

    } catch(err) {
        
        console.log(err);

        if (err.errors && err.errors.length > 0 && err.errors[0]['reason'] == 'quotaExceeded') {

            let expiredKey = await redisClient.get('youtubeApiKey')

            expiredKey = JSON.parse(expiredKey)

            let currentKeyIndex = expiredKey.index
 
            if (expiredKey.index <= youtubeApiKeys.length - 2) {

                // Updating the key with next available key in the array
                let newKey = await redisClient.set('youtubeApiKey', JSON.stringify({
                    key : youtubeApiKeys[currentKeyIndex + 1],
                    index : currentKeyIndex + 1 
                })) 

                console.log('Key Changed');

            } else {
                
                // If expired key is the last one in the array adding 
                let newKey = await redisClient.set('youtubeApiKey', JSON.stringify({
                    key : youtubeApiKeys[0],
                    index : 0
                }))

                console.log('All keys are exhausted !');

                // We can add sentry or slack channel alert to notify developer 

            }
        }

    }
})

// Passing all api url requests to backend routes
app.use('/api', routes);

// Video list view
app.get('/', (req, res) => {
    res.render('index', {
        req: req
    });
})

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