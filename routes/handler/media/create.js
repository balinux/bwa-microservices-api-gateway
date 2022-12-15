const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_MEDIA
} = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
    console.log("  URL_SERVICE_MEDIA: ", URL_SERVICE_MEDIA);
    // console.log("api: ", api);
    try {
        console.log("try");
        const media = await api.post('/media', req.body);
        console.log("media: ", media);

        return res.json(media.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service for create media unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}