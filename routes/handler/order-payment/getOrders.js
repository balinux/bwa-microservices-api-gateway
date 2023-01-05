const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_ORDER_PAYMENT
} = process.env;

const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
    try {

        const { id } = req.user.data;
        const order = await api.get(`/api/orders`, {
            params: {
                user_id: id
            }
        });

        return res.json(order.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service order unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}