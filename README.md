# API for E-coleta project

## Description

This api was built in **TS** and serves the front-end application in [React](https://pt-br.reactjs.org/) (You can find it [here](https://github.com/ademarCardoso/front-ecoleta)), and also serves the mobile application that was built in [React Native](https://reactnative.dev/), which you can find in this [repo](https://github.com/ademarCardoso/mobile-ecoleta).

## How to run

To run this api, just clone this repo:

```bash
git clone https://github.com/ademarCardoso/back-ecoleta.git
```
And Then, install the dependencies of the API

```bash
npm install
```
To create tables as a database, run the command below

```bash
npm run knex:migrate
```
And to have some necessary information for the first requestes, let's populate some tables with some seeds, run the layer below
```bash
npm run knex:seed
```

Now, run the comamnd for start the api. This api runs in `port 3333`
```
npm run dev
```

## Routes

In order to test the routes, I recommend the use of [Insomnia](https://insomnia.rest/download/).

The base url is: `http://localhost:3333/`

### To list delivery points with filters: GET

This route must be accessed using the **GET** method, and we need to pass some queries, see the example using [axios](https://www.npmjs.com/package/axios)

```js
api.get('points', {
    params: {
    city: 'Name of city',
    uf: 'UF',
    items: [1,2] // These are the ids in the item database
    }
  })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))

```

### List specific delivery point: GET
This route uses the **GET** method and only needs an `id` in its own url, this wheel returns a specific collection point.

```js
api.get(`/points/${point_id}`)
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))
```

### List registered items: GET
To list all items registered in the database, use the **GET** method on the `items` route, this route returns an `array` with all items registered:

```js
api.get('items')
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))
```

### Create a collection point: POST
To create a collection point, make a **POST** request and send a `json` with the information in the body of the request, just like the example below

```json
{ 
  "name": "Name_of_Market",
  "email": "market@market.com",
  "whatsapp": "+55 211234-0987",
  "latitude": "-35.0394822",
  "longitude": "-27.0394822",
  "city": "Fake_City",
  "uf": "UF",
  "items": [ 1, 3, 6 ]
}
// The items in the penultimate line are the items referring to the collection materials, 
// they are the ids in the bank of each collection item
```