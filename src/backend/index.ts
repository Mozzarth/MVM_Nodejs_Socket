import { FileSystemChangeDetectedEmit as FileSystemChangeDetected } from '../libs/fileSystemChanges'
import { Server } from './server'
import * as io from '../Socket/io'
import path from 'path'

const server = Server.getInstance()


server.start()
const test = new FileSystemChangeDetected(path.join(__dirname, '../public/prueba.txt'))
test.listenChanges.bind(test)()
    .then(a => console.log("listen file"))
    .catch(ex => console.log("Error",ex))