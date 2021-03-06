const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(() => {
        connection.destroy();
    });

    it('Should be able to create a new ONG Object', async () => {
        const response = await request(app)
        .post('/ongs')
        // .set('Authorization', 'asdasd')
        .send({
            name: 'ONG DOIDA',
            email: 'contato@doida.com',
            whatsapp: '51987654321',
            city: 'Porto Alegre',
            uf: 'RS'
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});