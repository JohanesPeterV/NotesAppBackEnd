const Hapi = require('@hapi/hapi')
const NotePathInitializer = require('./routes.js')
const serverOptions=require('../constants/serverOptions.js')

const init = async () => {
    const server = Hapi.server(serverOptions);
    NotePathInitializer.init(server);
    await server.start();
}

init().then(()=>{
    console.log('Server initialized'+serverOptions.host+'/'+serverOptions.port)
});


