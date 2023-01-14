const apiAdapter = require('../../apiAdapters');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const { refresh_token, email } = req.body;

        // pengecekan body yanf dibutuhkan
        if (!refresh_token || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'invalid refresh token and email'
            })
        }

        // proses pengecekan apakah refresh token ada di database
        await api.get('/refresh-token', { params: { refresh_token: refresh_token } });

        // verifikasi refresh token apakah valid dan tidak kadaluarsa
        jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                })
            }

            // pengecekan apakah email valid
            if (email !== decoded.data.email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'invalid email'
                })
            }

            // create new token
            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
            return res.json({
                status: 'success',
                data: {
                    token
                }
            });

        });

    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service user unavailable' });
        }

        const { status, data } = error.response;
        // return res.status(400).json(error);
        return res.status(status).json(data);
    }
}