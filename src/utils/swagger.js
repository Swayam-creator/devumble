import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition={
    openapi:'3.0.0',
    info:{
        title:'Devumble',
        version:'1.0.0',
        description:'Devumble - Api Documentation',
    },
    servers:{
        url:'http://localhost:8080',
    },
    components: {
  securitySchemes: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "token",
    },
  },
},

    };

    const options={
      swaggerDefinition,
      apis:['./src/routers/*.router*.js'],
    };

    const swaggerSpecDoc=swaggerJSDoc(options);

export default swaggerSpecDoc;
