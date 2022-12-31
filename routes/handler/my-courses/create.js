const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {

        const { id } = req.user.data;
        const { course_id } = req.body

        const myCourse = await api.post(`/api/my-courses`, {
            user_id: id,
            course_id
        });

        return res.json(myCourse.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service my course unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}