const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_USER
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        // return res.json(req.user);
        const { id } = req.user.data;

        const user = await api.put(`/users/${id}`, req.body);

        return res.json(user.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service for create media unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
        // return res.status(400).json(error);
    }
}