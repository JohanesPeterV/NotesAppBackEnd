const notes = require('./notes.js')
const uuid = require('uuid');

class NoteRoutes{
    /**
     *
     * @param {string}basePath
     */
    static getPath(basePath) {
        return '/notes' + basePath;
    }
    /**
     *
     * @param {Server}server
     */
    static initIndex(server) {
        server.route({
            method: 'GET',
            path: this.getPath(''),
            handler: (req, h) => {
                return h.response({
                    status: "success",
                    data: {
                        notes: notes
                    }
                }).code(200);
            }
        })
    }

    /**
     *
     * @param {Server}server
     */
    static initRemove(server) {
        server.route({
            method: 'DELETE',
            path: this.getPath('/{id}'),
            handler: (req, h) => {
                const noteIndex = notes.findIndex((currNote) => {
                    return currNote.id === req.params.id
                })
                if (noteIndex===-1) {
                    return h.response({
                        status: 'fail',
                        message: 'Catatan gagal dihapus. Id catatan tidak ditemukan'
                    }).code(404)
                }
                notes.splice(noteIndex, 1);
                return h.response({
                    status: 'success',
                    message: ' Catatan berhasil dihapus'
                }).code(201)
            }
        })
    }

    /**
     *
     * @param {Server}server
     */
    static initUpdate(server) {
        server.route({
            method: 'PUT',
            path: this.getPath('/{id}'),
            handler: (req, h) => {
                const note = notes.find((currNote) => {
                    return currNote.id === req.params.id
                })
                if (!note) {
                    return h.response({
                        status: 'fail',
                        message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan'
                    }).code(404)
                }
                if (req.payload.title) note.title = req.payload.title;
                if (req.payload.tags) note.tags = req.payload.tags
                if (req.payload.body) note.body = req.payload.body
                return h.response({
                    status: 'success',
                    message: ' Catatan berhasil diperbarui'
                }).code(201)
            }
        })
    }

    /**
     *
     * @param {Server}server
     */
    static initGetDetail(server) {
        server.route({
            method: 'GET',
            path: this.getPath('/{id}'),
            handler: (req, h) => {
                const note = notes.find((currNote) => {
                    return currNote.id === req.params.id
                })
                if (!note) {
                    return h.response({
                        status: 'fail',
                        message: 'Catatan tidak ditemukan',
                    }).code(404)
                }
                return h.response({
                    status: 'success',
                    data: {
                        note: note
                    }
                }).code(201)
            }
        })
    }


    /**
     *
     * @param {Server}server
     */
    static initAdd(server) {
        server.route({
            method: 'POST',
            path: this.getPath(''),
            handler: (req, h) => {
                const noteId = uuid.v4();
                const note = {
                    id: noteId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ...req.payload
                }
                notes.push(note)
                return h.response({
                    status: 'success', message: 'Catatan berhasil ditambahkan', data: {
                        noteId: noteId
                    }
                }).code(201)
            }
        })
    }


    /**
     *
     * @param {Server}server
     */
    static init(server) {
        this.initAdd(server);
        this.initIndex(server);
        this.initRemove(server);
        this.initUpdate(server);
        this.initGetDetail(server);
    }
}

class Routes {
    /**
     *
     * @param {Server}server
     */
    static init(server){
        NoteRoutes.init(server);
    }
}

module.exports = Routes
