
export const socketCtrl = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.id;
    handleConnection(socket, io, userId);
  });
};


const handleConnection = async (socket, io, userId) => {

    console.log(`user with ${userId} connected`);
}
