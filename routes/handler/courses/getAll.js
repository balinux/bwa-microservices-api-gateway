const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_COURSE, HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        console.log("try");
        const courses = await api.get('/api/courses', {
            params: {
                ...req.query,
                status: 'published'
            }
        });

        const coursesData = courses.data;

        // mengambil  data firstpage dari json
        const firstPage = coursesData.data.first_page_url.split('?').pop();
        const lastPage = coursesData.data.last_page_url.split('?').pop();

        // menginject data baru dengan menggunakan hostname api gateway dan mendapatkan parameter terakhir
        coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`
        coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`

        // mengubah next_page_url
        if (coursesData.data.next_page_url) {
            const nextPage = coursesData.data.next_page_url.split('?').pop();
            coursesData.data.next_page_url = `${  HOSTNAME}/courses?${nextPage}`
        }
        
        // mengubah prev_page_url
        if (coursesData.data.prev_page_url) {
            const prevPage = coursesData.data.prev_page_url.split('?').pop();
            coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`
        }

        coursesData.data.path = `${HOSTNAME}/courses`

        return res.json(coursesData);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service course unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}