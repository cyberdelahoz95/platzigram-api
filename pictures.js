'use strict'

import { send } from 'micro'
import HttpHash from 'http-hash'

const hash = HttpHash()

hash.set('GET /:id', async function getPicture (req, res, params) {
  send(res, 200, params)
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
