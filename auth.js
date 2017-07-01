'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import Db from 'platzigram-db'
import DbStub from './test/stub/db'
import config from './config'
import utils from './lib/utils'

const env = process.env.NODE_ENV || 'production'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = HttpHash()

hash.set('POST /', async function authenticate (req, res, params) {
  let credentials = await json(req)
  await db.connect()
  let auth = await db.authenticate(credentials.username, credentials.password)

  if(!auth) {
    return send( res, 401, {error: 'invalidad credentials'})
  }

  let token = await utils.signToken({
    username: credentials.username
  }, config.secret)

  send(res, 201, token)
})


export default async function main (req, res) {
  let { method, url } = req

  let match = hash.get(`${method.toUpperCase()} ${url}`) // if there is a matching url that was set previousle, this function returns an object with a function that handlers such url

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, { error: 'route not found' })
  }
}
