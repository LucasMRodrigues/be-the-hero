const connection = require('../database/connection');

module.exports = {
    async login(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            return res.status(400)
            .json({ error: 'No Ong found with id ' + id });
        }

        return res.json(ong);
    }
}