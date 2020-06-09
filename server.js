const pg = require('pg');


const http = require('http');

const password = process.env.POSTGRES_PASSWORD || "topsecure";
const user = process.env.POSTGRES_USER || "postgres";
const host = process.env.POSTGRES_HOST || "localhost:5432";
const dbname = process.env.POSTGRES_DBNAME || "api";
const port = 1337;

const requestHandler = (request, response) => {
  console.log(request.url);
  const cs = 'postgres://' + user + ':' + password + '@' + host + '/' + dbname;

  const client = new pg.Client(cs);
  client.connect();


  client.query('SELECT * FROM users').then(res => {

    const data = res.rows;

    console.log('all data');
    data.forEach(row => {
      console.log(`Id: ${row.id} Name: ${row.name} Email: ${row.email}`);
    })
    response.end('Hello Node.js Server! read ' + data.length + " entries from db")
  }).finally(() => {
      client.end()
      response.end()
  });

};


// we create the server
const server = http.createServer(requestHandler);

// we create a sock listen on PORT
server.listen(port, (err) => {
  if (err) {
    // if something went wrong binding to the port
    return console.log('something bad happened', err)
  }
  // a notification that the server is up and on which port it's running on can be checked inside ~/.pm2/logs/* if started via pm2
  console.log(`server is listening on ${port}`)
});

