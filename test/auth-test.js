'use strict'

import micro from 'micro'
import test from 'ava'
import listen from 'test-listen' // testear microservicios
import request from 'request-promise' // modulo para hacer http request haciendo promesas, cómo por ejemplo con fetch api pero en este caso, esto correrá en el servidor
import fixtures from './fixtures'
import auth  from '../auth'
import config from '../config'
import utils from '../lib/utils'


test.beforeEach(async t => {
  let srv = micro(auth)
  t.context.url = await listen(srv)
})

test ('success POST/', async t => {
  let user = fixtures.getUser()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    body: {
      username: user.username,
      password: user.password
    },
    json: true
  }

  let token = await request(options)

  let decoded = await utils.verifyToken(token, config.secret)

  t.is(decoded.username, user.username)
})