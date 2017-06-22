'use strict'

import micro from 'micro'
import test from 'ava'
import uuid from 'uuid-base62'
import listen from 'test-listen' // testear microservicios
import request from 'request-promise' // modulo para hacer http request haciendo promesas, cómo por ejemplo con fetch api
import pictures from '../pictures'
import fixtures from './fixtures'

test('GET /:id', async t => {
  let image = fixtures.getImage()
  let srv = micro(pictures)
  let url = await listen(srv)

  let body = await request({ uri: `${url}/${image.publicId}`, json: true })
  t.deepEqual(body, image)
})

test.todo('POST /')
test.todo('POST /:id/like')
