const apiAdapter = require('../../apiAdapters');
const jwt = require('jsonwebtoken');

const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    // console.log("api: ", api);
    try {
        const user = await api.post('/users/login', req.body);
        const { data } = user.data;

        // generate access token
        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

        // generate refresh token
        const refresh_token = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

        // store refreh token
        await api.post('/refresh-token', { refresh_token, user_id: data.id });

        return res.json({
            status: 'success',
            data: {
                token,
                refresh_token
            }
        });
        // return res.json(user.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service for create media unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}