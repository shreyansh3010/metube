
const { db } = require('../config/datastore');

// Create or update the video details based on youtube video id
const createUpdateVideo = (videoData, callback) =>{

    let snippet = videoData.snippet;
    let ids = videoData.id
    
    db.query(
            `INSERT INTO video (title, description, thumbnail, channel_id, published_at, video_id) VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (video_id) DO UPDATE
            SET title = $1, description = $2, thumbnail = $3,  channel_id = $4, published_at = $5`,
            [snippet.title, snippet.description, snippet.thumbnails.medium.url, snippet.channelId, snippet.publishedAt, ids.videoId], 
            callback)
}

module.exports = {
    createUpdateVideo : createUpdateVideo
}