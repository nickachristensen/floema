require('dotenv').config()

const express = require('express')
const errorHandler = require('errorhandler')
const app = express()
const path = require('path')
const port = 3000

const Prismic = require('prismic-javascript')
const PrismicDOM = require('prismic-dom')
const { errorMonitor } = require('events')

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  })
}

const handleLinkResolver = doc => {
  // Define the url depending on the document type

  if (doc.type === 'page') {
    return '/page/' + doc.uid
  } else if (doc.type === 'blog_post') {
    return '/blog/' + doc.uid
  }

  // Default to homepage

  return '/'
}

app.use(errorHandler())

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver
  }

  res.locals.PrismicDOM = PrismicDOM

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('pages/home')
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const meta = await api.getSingle('meta')
  const about = await api.getSingle('about')

  res.render('pages/about', {
    about,
    meta
  })
})

app.get('/detail/:uid', async (req, res) => {
  const api = await initApi(req)
  const meta = await api.getSingle('meta')
  const product = await api.getByUID('product', req.params.uid)

  console.log(product)

  res.render('pages/detail', {
    meta,
    product
  })
})

app.get('/collections', (req, res) => {
  res.render('pages/collections')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
