import express from 'express'
import knex from './database/connection'

const routes = express.Router()

routes.get('/items',async (req, res) => {
  const items = await knex('items').select('*')

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      name: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`
    }
  })

  return res.json(serializedItems)
})

routes.post('/points', async (req, res) => {
  const { 
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
   } = req.body

  const trx = await knex.transaction()
  const point = {
    image: 'https://s2.glbimg.com/vmo9jpOdJ51CkO8NMtjPK5RNIHg=/512x320/smart/e.glbimg.com/og/ed/f/original/2018/10/11/como-gastar-menos-no-mercado.jpg',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  }

  const insertedIds = await trx('points').insert(point)

  const point_id = insertedIds[0]

   const pointItems = items.map((item_id: number) => {
     return {
       item_id,
       point_id
     }
   })

   await trx('point_items').insert(pointItems)

   await trx.commit()

   return res.json({ 
    id: point_id, 
    ...point
    })
})

routes.get('/points/:id', async (req, res) => {
  const { id } = req.params

  const point = await knex('points').where('id', id).first()

  if(!point) {
    return res.status(400).json({ message: 'Point not found.' })
  }

  const items = await knex('items')
    .join('point_items', 'items.id', '=', 'point_items.item_id')
    .where('point_items.point_id', id)
    .select('items.title')
  
  return res.json({
    point,
    items
  })
})

routes.get('/points', async (req, res) => {
  const { city, uf, items } = req.query

  const parserItems = String(items).split(',').map(item => Number(item.trim()))

  const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parserItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*')

  if (points.length > 0) {
    return res.json(points)
  }

  return res.json({message: 'Not found'})
})

export default routes