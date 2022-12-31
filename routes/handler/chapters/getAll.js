const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_COURSE, HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        console.log("try");
        const chapters = await api.get('/api/chapters', {
            params: {
                ...req.query
            }
        });

        return res.json(chapters.data);


        // const chaptersData = chapters.data;

        // // mengambil  data firstpage dari json
        // const firstPage = chaptersData.data.first_page_url.split('?').pop();
        // const lastPage = chaptersData.data.last_page_url.split('?').pop();

        // // menginject data baru dengan menggunakan hostname api gateway dan mendapatkan parameter terakhir
        // chaptersData.data.first_page_url = `${HOSTNAME}/chapters?${firstPage}`
        // chaptersData.data.last_page_url = `${HOSTNAME}/chapters?${lastPage}`

        // // mengubah next_page_url
        // if (chaptersData.data.next_page_url) {
        //     const nextPage = chaptersData.data.next_page_url.split('?').pop();
        //     chaptersData.data.next_page_url = `${  HOSTNAME}/chapters?${nextPage}`
        // }

        // // mengubah prev_page_url
        // if (chaptersData.data.prev_page_url) {
        //     const prevPage = chaptersData.data.prev_page_url.split('?').pop();
        //     chaptersData.data.prev_page_url = `${HOSTNAME}/chapters?${prevPage}`
        // }

        // chaptersData.data.path = `${HOSTNAME}/chapters`

        // return res.json(chaptersData);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service course unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}