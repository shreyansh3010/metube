const express = require('express');
const router = express.Router();

const videoController = require('./controllers/videoController')

// Api to fetch list of video data
router.get('/v1/videos', (req,res)=>{
    videoController.fetchVideos(req, res)
});

module.exports = router