import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/v1/parse', (req, res) => {

	if (req.body) {
		let str = req.body.data;
		var splitted = str.split("000", 3);
		var data =  { firstName: splitted[0].concat("000"),
					  lastName: (splitted[1].substring(1)).concat("0000"),
					  clientId: splitted[2]	
					};
	    res.send({
	    	statusCode: res.statusCode,
	    	data: data
	    });
	} else {
		res.sendStatus(200);
	}
});

app.post('/api/v2/parse', (req, res) => {

	if (req.body) {
		let str = req.body.data;
		var splitted = str.split("000", 3);
		var clientId = splitted[2].substring(0,3) + "-" + splitted[2].substring(3);
		var data =  { firstName: splitted[0],
					  lastName: splitted[1].substring(1),
					  clientId: clientId	
					};
	    res.send({
	    	statusCode: res.statusCode,
	    	data: data
	    });
	} else {
		res.sendStatus(200);
	}
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
