import { serve } from '@hono/node-server';
import { Hono } from 'hono';            
import { prettyJSON } from 'hono/pretty-json';         
import { serveStatic } from '@hono/node-server/serve-static';
// import { sendMail } from '../services/mail.js';                                                 
import jwt from 'jsonwebtoken';                
import dotenv from 'dotenv'                            
import { auth } from 'hono/utils/basic-auth';                

dotenv.config();          
                    
const app = new Hono()              
app.use("*", prettyJSON());
// app.use("./static/*", serveStatic({root:'./'}));            

const payload = { name : "tony" , age : "27"};
const secretKey = process.env.SECRET_KEY;                 
const token = jwt.sign(payload, secretKey, {expiresIn : '1h'});


const data = { 
  "name" : "tony",
  "age" : 23
}

app.get('/', (c) => {
  return c.text('Hello Hono! ');
})

// custom middleware to check user name is tony or not
app.use('/users/*', async (c, next) => {
	const name = c.req.query("name");
	if(name != "raj")	{
		return c.text("unquthorized", 401);
	}
	await next();
})

app.get("/users", (c) => {
	return c.json(data);           
})


app.get("/users/:id", (c) => {
	const id = c.req.param("id");
	const name = c.req.query("name");
	return c.json({
		your_id_is  : id,
		name : name,
	});
});

// // created base path reusable or easily understand route JWT  
const jwtAuth = app.basePath('/auth/jwt');

jwtAuth.get('/token', (c) => {
	return c.text(token);
})

jwtAuth.post('/verify-token', (c) => {

	const authHeader = c.req.header('Authorization');

	if( !authHeader || !authHeader.startsWith("Bearer "))	{
		return c.json({message : 'Access Denied, Unauthorized'}, 401);
	}

	const token = authHeader.split(' ')[1];
	const decoded = jwt.verify(token, secretKey);

	if(decoded)	{
		const isExpired = Date.now() / 1000 ;
		console.log("expiry : ", isExpired , " " , decoded.exp , " " , new Date(decoded.exp/1000 * 1000));
	}

	console.log("token", token);
	console.log("deocded", decoded);

	return c.text("works well");
})

// created base path reusable or easily understand route Email
const emailAuth = app.basePath('/auth/email');
let otp:number;

emailAuth.get('/', async (c) => {
	const email = c.req.query('email');
	 otp = Math.ceil(100000 + Math.random() * 900000);
	// await sendMail('tejasshinde7077@gmail.com');
	console.log(email, "otp", otp);
	return c.json({message : "check your email for OTP"},200);
});

emailAuth.post('/',  (c) => {
	const email = c.req.json()
	// const otp = Math.ceil(100000 + Math.random() * 900000);
	console.log("eamil : ", email);
	// await sendMail(email,otp)
		return c.json({"message" : "OTP is sent to email"},200);

})

emailAuth.get('/verify-otp', (c) => {
	console.log(otp);
	const userOtp = c.req.query('otp');
	if(otp != Number(userOtp))	{
		return c.json({message:"OTP is not correct."});
	}
	return c.json({message:'OTP is valid'});
});

serve({
  fetch: app.fetch,  // says use my app to response any incomming request
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
