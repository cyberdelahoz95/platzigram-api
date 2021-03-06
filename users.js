'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import Db from 'platzigram-db'
import DbStub from './test/stub/db'
import config from './config'
import gravatar from 'gravatar'

const env = process.env.NODE_ENV || 'production'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = HttpHash()

hash.set('POST /', async function saveUser (req, res, params) {
  let user = await json(req)
  await db.connect()
  let created = await db.saveUser(user)
  await db.disconnect()

  delete created.email
  delete created.password

  send(res, 201, created)
})

hash.set('GET /:username', async function getUser (req, res, params){
  let username = params.username
  await db.connect()
  let user = await db.getUser(username)
  user.avatar = gravatar.url(user.email)

  let images = await db.getImagesByUser(username)
  user.pictures = images

  delete user.email
  delete user.password

  send(res, 200, user)
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
