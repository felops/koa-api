const request = require('supertest')
const server = require('../index.js')

beforeAll(() => server.Pessoa.remove())

afterAll(() => {
  server.Pessoa.remove()
  server.app.close()
})

describe('testando rotas', () => {
  test('GET /', async () => {
    const response = await request(server.app).get('/')
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Index!')
  })

  test('GET /koa', async () => {
    const response = await request(server.app).get('/koa')
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Koa!')
  })

  test('POST /pessoa (1)', async () => {
    const response = await request(server.app).post('/pessoa').send({ nome: 'Felipe', sobrenome: 'Lopes' })
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Salvo!')
  })

  test('POST /pessoa (2)', async () => {
    const response = await request(server.app).post('/pessoa').send({ nome: 'Bill', sobrenome: 'Gates' })
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Salvo!')
  })

  test('GET /pessoa', async () => {
    const response = await request(server.app).get('/pessoa')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Felipe Lopes, Bill Gates')
  })

  test('GET /pessoa/ultimo', async () => {
    const response = await request(server.app).get('/pessoa/ultimo')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Último cadastro: Bill Gates')
  })
})
