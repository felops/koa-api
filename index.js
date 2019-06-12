const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()

mongoose.connect('mongodb://localhost:27017/koa', { useNewUrlParser: true })

const Pessoa = mongoose.model("Pessoa", new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  idade: { type: Number, required: false },
  criado_em: { type: Date, default: Date.now }
}))

router.get('/', (ctx, next) => {
  ctx.body = 'Index!'
})

router.get('/koa', (ctx, next) => {
  ctx.body = 'Koa!'
})

router.get('/pessoa', async (ctx, next) => {
  try {
    await Pessoa.find({}, (err, response) => {
      let nomes = response.map(r => r.nome + ' ' + r.sobrenome)
      ctx.body = nomes.join(', ')
    })
  } catch(e) {
    console.log(e)
  }
})

router.get('/pessoa/ultimo', async (ctx, next) => {
  try {
    await Pessoa.findOne({}, {}, { sort: { 'criado_em' : -1 } }, (err, response) => {
      ctx.body = 'Último cadastro: ' + response.nome + ' ' + response.sobrenome
    })
  } catch(e) {
    console.log(e)
  }
})

router.post('/pessoa', async (ctx, next) => {
  try {
    let body = ctx.request.body

    await Pessoa({
      nome: body.nome,
      sobrenome: body.sobrenome,
      idade: 23
    })
      .save()
      .then(data => ctx.body = data ? 'Salvo!' : 'Erro!')
  } catch(e) {
    console.log(e)
  }
})

app.use(koaBody({ multipart: true }))
app.use(router.routes())

const server = module.exports = {
  app: app.listen(3000),
  mongoose,
  Pessoa
}
