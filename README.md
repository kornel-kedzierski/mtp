# mtp

Production environment is hosted by heroku free dynos. Heroku disables free application if they are idle. To enable them call single request to each of them.

Example benchamark is @ ./benchmark/run.js

To run apps locally, create ./setEnvironment.js file:
```javascript
'use strict';

process.env.MONGODB_URI = 'mongodb://localhost/mtp';
process.env.REDIS_URI = 'redis://localhost:6379';
process.env.RABBITMQ_URI = 'amqp://localhost:5672/mtp';
```

Api
```javascript
http://cf-mtp-api.herokuapp.com/api/v1/trades/messages
```

Processor status
```javascript
http://cf-mtp-processor.herokuapp.com/
```

Frontend app
```javascript
http://cf-mtp-frontend.herokuapp.com/
```
