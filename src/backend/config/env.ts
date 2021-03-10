import dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV != "production") {
    const con = dotenv.config({ path: path.join(__dirname, "../../.env") })
    if (con.error) {
        console.error("La configuración de las variables de entorno fallo")
        process.exit(1)
    }
}



export const CONFIG = {
    PORT: process.env.NODE_PORT || 0,
}