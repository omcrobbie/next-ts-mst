const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './src/common', dev })
const express = require('express')
const handle = app.getRequestHandler()
const mobx = require('mobx-react');

mobx.useStaticRendering(true);

app.prepare()
.then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
