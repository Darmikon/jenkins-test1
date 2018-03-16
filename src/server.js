const http = require('http');
const port = 3002;
const os = require('os');
const pg = require('./postgres');
const redis = require('./redis');

const requestHandler = async (req, res) => {
  res.setHeader('content-type', 'text/html');
  try{
	const sqlResponse = await pg.findUserByUname();
	const redisResponse = await redis.getAsync('test');
  
	res.end(`
		Hello Node.js Server! <br /><pre>${os.platform()}</pre>
		<br/ >
		<code><pre>${JSON.stringify( os.cpus(), null, 4)}</pre></code>
		Postgres test - OMG It's alive (.)(.)!!!<br />
		<code><pre>${JSON.stringify( sqlResponse, null, 4)}</pre></code>
		---- Redis ----
		<br />
		<code>${redisResponse}</code>
		
	`);
  }catch(e){
	  res.end(`
	  ERROR ${e}
		<code><pre>${JSON.stringify( e, null, 4)}</pre></code>
	`)
  }

}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})