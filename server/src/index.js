const express = require('express');

const app = express();

const cors = require('cors');

const SSEApi = require('./api/sse_api')

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/sse/streaming', SSEApi)

const server = app.listen(port, () => {
    const address = server.address();
    console.log('Node server on : ', { address });
});