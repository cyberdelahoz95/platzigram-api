'use strict'

import micro from 'micro'
import test from 'ava'
import listen from 'test-listen' // testear microservicios
import request from 'request-promise' // modulo para hacer http request haciendo promesas, cómo por ejemplo con fetch api pero en este caso, esto correrá en el servidor
import fixtures from './fixtures'
import users  from '../users'

test.beforeEach(async t => {
  let srv = micro(users)
  t.context.url = await listen(srv)
})

test('POST /', async t => {
  let user = fixtures.getUser()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body: {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email
    },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  delete user.email // mediante eliminar email y password en el test, estamos garantizando que la implementación de la API deberá encargarse de NO retornar dichos valores criticos en terminos de seguridad, si se retornan , constituiría un riesgo de seguridad
  delete user.password

  t.is(response.statusCode, 201) // 201 significa que el objeto fue creado
  t.deepEqual(response.body, user)



})

test('GET /:username', async t => {
  let user = fixtures.getUser()
  let url = t.context.url

  let options = {
    method: 'GET',
    uri: `${url}/${user.username}`,
    json: true
  }

  let body = await request(options)

  delete user.email
  delete user.password

  t.deepEqual(body, user)
})

