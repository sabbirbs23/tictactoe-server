const request = require('supertest');
const app = require('../server');

describe('Testing API', () => {
    it('should have response ok', async () => {
        const res = await request(app)
            .get('/');
        //console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Ok');
    });

    it('should be able to create a game', async () => {
        const res = await request(app)
            .post('/api/create-game/');
        //console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('success');
        expect(res.body.data.gameId).toBeTruthy();
    });
});
