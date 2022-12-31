const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_COURSE, HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const lessons = await api.get('/api/lessons', {
            params: {
                ...req.query
            }
        });

        return res.json(lessons.data);


        // const lessonsData = lessons.data;

        // // mengambil  data firstpage dari json
        // const firstPage = lessonsData.data.first_page_url.split('?').pop();
        // const lastPage = lessonsData.data.last_page_url.split('?').pop();

        // // menginject data baru dengan menggunakan hostname api gateway dan mendapatkan parameter terakhir
        // lessonsData.data.first_page_url = `${HOSTNAME}/lessons?${firstPage}`
        // lessonsData.data.last_page_url = `${HOSTNAME}/lessons?${lastPage}`

        // // mengubah next_page_url
        // if (lessonsData.data.next_page_url) {
        //     const nextPage = lessonsData.data.next_page_url.split('?').pop();
        //     lessonsData.data.next_page_url = `${  HOSTNAME}/lessons?${nextPage}`
        // }
        
        // // mengubah prev_page_url
        // if (lessonsData.data.prev_page_url) {
        //     const prevPage = lessonsData.data.prev_page_url.split('?').pop();
        //     lessonsData.data.prev_page_url = `${HOSTNAME}/lessons?${prevPage}`
        // }

        // lessonsData.data.path = `${HOSTNAME}/lessons`

        // return res.json(lessonsData);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service course unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}