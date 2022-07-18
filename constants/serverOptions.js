const serverOptions={
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes:{
        cors:{
            origin:['*']
        }
    }
}
module.exports=serverOptions
