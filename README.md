

# DynamicMapper

### A web service that supports creation of data specification for an external data, retrieval of data for providers, provider data management and more.


### Assumptions
** There are unique Data Providers (providerId). All providerId must be unique.

** **providerId** is of Number type.

** All creation data specification requests should contain at least one field. If there is fields key, there must be at least one item with a key.


### Running the app:
-> Clone this repository

-> Navigate into the root folder:
    ```cd project```

-> Install dependencies:
    ``npm install``

-> Run the app development server using npm:
    ```npm run dev```

-> Run the app development server using pm2:
```pm2 start```

-> Run tests:
    ```npm run test```


### Technologies Used

####Backend Language/Framework
######Javascript (NodeJS/ExpressJS)

#### Database
######MongoDB (No_SQL)

###Containerization
######Docker

### Test:
- jest
- supertest
- mongo-memory-server


### Test Coverage:
Test coverage was carried out but not completed due to time.
- Integration
- Unit


### API Documentation
[Postman Collection](https://www.getpostman.com/collections/f0d2d13b0b9f70d05309)

