'use strict'

import micro from 'micro'
import test from 'ava'
import listen from 'test-listen' // testear microservicios
import request from 'request-promise' // modulo para hacer http request haciendo promesas, cómo por ejemplo con fetch api pero en este caso, esto correrá en el servidor
import pictures from '../pictures'

import fixtures from './fixtures'

test.beforeEach(async t => {
  let srv = micro(pictures)
  t.context.url = await listen(srv)
})

test('GET /:id', async t => {
  let image = fixtures.getImage()

  let url = t.context.url

  let body = await request({ uri: `${url}/${image.publicId}`, json: true })
  t.deepEqual(body, image)
})

test('POST /', async t =>  {
  let image = fixtures.getImage()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body:{
      description: image.description,
      src: image.src,
      userId: image.userId
    },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  //el atributo resolveWithFullResponse nos permite tener acceso a todo el objeto de respuesta, ya q por defecto requesto promise solo devuelve el atributo body

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, image)
})

test.test('POST /:id/like', async t => {
  let image = fixtures.getImage()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: `${url}/${image.id}/like`,
    json: true
  }

  let body = await request(options)
  let imageNew =  JSON.parse(JSON.stringify(image))
  imageNew.liked = true
  imageNew.likes = 1

  t.deepEqual(body, imageNew)
})

