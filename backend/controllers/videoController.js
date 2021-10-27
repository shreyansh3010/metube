const videoService = require('../services/videoService')

// Return list of videos data based on search & pagination
const fetchVideos = (req, res) => {

    let limit = req.query.limit ? req.query.limit : 10
    let page = req.query.page ? req.query.page : 1

    videoService.getVideos(limit, page, 0, (err, result) => {
        
        if (err) {
            return res.status(500).send({
                status : 'failure',
                message : err.message || 'Some thing went wrong'
            })
        }

        if (result.rowCount == 0) {
            return res.status(404).send([])
        }

        res.send(result.rows)
    })

}

module.exports = {
    fetchVideos : fetchVideos
}