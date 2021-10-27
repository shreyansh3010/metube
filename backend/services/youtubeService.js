const { google } = require('googleapis')

// Fetch youtube videos data based on time frame
const fetchYoutubeVideos = async (publishedAfter, publishedBefore) => {

    let youtubeData = await google.youtube('v3').search.list({
        key : process.env.GOOGLE_API_KEY,
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