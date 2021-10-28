const videoService = require('../services/videoService')

// Return list of videos data based on search & pagination
const fetchVideos = (req, res) => {

    let limit = req.query.limit ? req.query.limit : 10
    let page = req.query.page ? req.query.page : 1
    let find = req.query.find ? req.query.find : ''
    let sort = req.query.sort ? req.query.sort : 'desc'

    videoService.getVideos(limit, page, find, sort, (err, result) => {
        
        if (err) {
            return res.status(500).send({
                status : 'failure',
                message : err.message || 'Some thing went wrong'
            })
        }

        if (result.rowCount == 0) {
            return res.status(404).send({
                recordsTotal : 11,
                recordsFiltered : 11,
                data : result.rows
            })
        }

        videoService.getVideosCount((err, countData) => {

            if (err) {
                return res.status(500).send({
                    status : 'failure',
                    message : err.message || 'Some thing went wrong'
                })
            }
    
            res.send({
                recordsTotal : countData.rows[0].max,
                recordsFiltered : countData.rows[0].max,
                data : result.rows
            })
        })
    })

}

module.exports = {
    fetchVideos : fetchVideos
}