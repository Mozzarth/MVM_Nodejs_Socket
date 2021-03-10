import { Server } from "../backend/server";

const io = require("socket.io")(Server.getInstance().serverHttp);


io.on("connection", function (socket: any) {
    console.log("a user connected", socket);
});



export { io }


