'use strict'

import micro from 'micro'
import test from 'ava'
import listen from 'test-listen' // testear microservicios
import request from 'request-promise' // modulo para hacer http request haciendo promesas, cómo por ejemplo con fetch api pero en este caso, esto correrá en el servidor
import pictures from '../pictures'
import utils from '../lib/utils'
import fixtures from './fixtures'
import config from '../config'

test.beforeEach(async t => {
  let srv = micro(pictures)
  t.context.url = await listen(srv)
})

test('GET /list', async t => {
  let images = fixtures.getImages()
  let url = t.context.url
  let options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true
  }

  let body = await request(options)
  t.deepEqual(body, images)
})

test('GET /:id', async t => {
  let image = fixtures.getImage()

  let url = t.context.url

  let body = await request({ uri: `${url}/${image.publicId}`, json: true })
  t.deepEqual(body, image)
})

/*
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
})*/

test('POST /:id/like', async t => {
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

test('GET /tag/:tag', async t => {
  let images = fixtures.getImagesByTag()
  let url = t.context.url

  let options = {
    method: 'GET',
    uri: `${url}/tag/awesome`,
    json: true
  }

  let body = await request(options)
  t.deepEqual(body, images)
})

test('POST WITHOUT JWT /', async t =>  {
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

  await t.throws(request(options), /invalid token/)
})

test('POST WITH JWT /', async t =>  {
  let image = fixtures.getImage()
  let url = t.context.url
  let token = await utils.signToken({userId:image.userId}, config.secret)

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body:{
      description: image.description,
      src: image.src,
      userId: image.userId
    },
   headers: {
     'Authorization': `Bearer ${token}`
   },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, image)
})