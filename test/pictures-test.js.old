'use strict'

import micro from 'micro'
import test from 'ava'
import uuid from 'uuid-base62'
import listen from 'test-listen' // testear microservicios
import request from 'request-promise' // modulo para hacer http request haciendo promesas, cómo por ejemplo con fetch api

test('GET /:id', async t => {
  let id = uuid.v4()

  let srv = micro(async (req, res) => {
    micro.send(res, 200, { id: id })
  })

  let url = await listen(srv)
  let body = await request({ uri: url, json: true }) // se le pasa la url a la cual va a llamar y el tipo de respuesta que se espera, en este caso se va a esperar un JSON
  t.deepEqual(body, { id: id }) // se valida q el body retornado es igual al objecto que contiene el id
})

test.todo('POST /')
test.todo('POST /:id/like')
