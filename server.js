const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const dotenv = require('dotenv');
// load env vars
dotenv.config({ path: './config/config.env' });

const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./config/db');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss}=require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');
const hpp=require('hpp');
const cors=require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


// connect to database
connectDB();

const app = express();
app.set('query parser', 'extended');

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: '_'
  })
);

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter=rateLimit({
  windowMs:10*60*1000,//10 mins
  max: 100
});
app.use('/api/v1', limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());


//Route file
const hospitals = require('./routes/hospitals')
const auth = require('./routes/auth');
const appointments =require('./routes/appointments');


app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments', appointments);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});

const swaggerOptions={
  swaggerDefinition:{
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express VacQ API'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis:['./routes/*.js'],
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));
