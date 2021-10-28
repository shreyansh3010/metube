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

        videoService.getVideosCountBySearch(find, (err, countData) => {

            if (err) {
                return res.status(500).send({
                    status : 'failure',
                    message : err.message || 'Some thing went wrong'
                })
            }
    
            res.send({
                recordsTotal : countData.rows[0].count,
                recordsFiltered : countData.rows[0].count,
                data : result.rows
            })
        })
    })

}

module.exports = {
    fetchVideos : fetchVideos
}