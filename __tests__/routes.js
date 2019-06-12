const request = require('supertest')
const server = require('../index.js')

afterAll(() => {
  server.close();
  console.log('servidor finalizado')
})

describe('testando rotas', () => {
  test('GET /', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Index!');
  })

  test('GET /koa', async () => {
    const response = await request(server).get('/koa');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Koa!');
  })
})
