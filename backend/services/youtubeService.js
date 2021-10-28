
const util = require('util');

const redis = require('redis');
const redisClient = redis.createClient(6379);
redisClient.get = util.promisify(redisClient.get); // promisify the get function

const { google } = require('googleapis')

// Fetch youtube videos data based on time frame
const fetchYoutubeVideos = async (publishedAfter, publishedBefore) => {

    let apiKey = await redisClient.get('youtubeApiKey');

    let youtubeData = await google.youtube('v3').search.list({
        key : JSON.parse(apiKey)['key'],
        part : 'snippet',
        q : process.env.YOUTUBE_SEARCH_PARAM,
        relevanceLanguage: 'en',
        maxResults: 50,
        publishedAfter : publishedAfter,
        publishedBefore : publishedBefore
    })

    return youtubeData['data']

}

module.exports = {
    fetchYoutubeVideos : fetchYoutubeVideos
}