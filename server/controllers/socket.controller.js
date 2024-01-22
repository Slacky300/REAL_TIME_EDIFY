import { getDocThroughSocket } from "./doc.controller.js";
import DocumentModel from "../models/documents.model.js";
const roomUsers = {};

export const socketCtrl = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.id;
    handleConnection(socket, io, userId);
  });
};

const handleConnection = async (socket, io, userId) => {
  socket.on('joinRoom', (data, callback) => {
    try {
      socket.join(data.roomId);

      if (!roomUsers[data.roomId]) {
        roomUsers[data.roomId] = [];
      }

      roomUsers[data.roomId].push({ username: data.username });


      io.to(data.roomId).emit('someoneJoined', {
        username: data.username,
        roomUsers: roomUsers[data.roomId],
      });

      callback(null);
    } catch (error) {
      console.error('Error in joinRoom:', error);
      callback('Error joining room');
    }
  });

  socket.on('leaveRoom', (data, callback) => {
    try {
      socket.leave(data.roomId);

      if (roomUsers[data.roomId]) {
        roomUsers[data.roomId] = roomUsers[data.roomId].filter(
          (user) => user.username !== data.username
        );

        io.to(data.roomId).emit('someoneLeft', {
          username: data.username,
          roomUsers: roomUsers[data.roomId],
        });
      }

      callback(null);
    } catch (error) {
      console.error('Error in leaveRoom:', error);
      callback('Error leaving room');
    }
  });

  socket.on('send-changes', (data, callback) => {
    try {
      io.to(data.roomId).emit('receive-changes', { delta: data.delta, username: data.username })
    } catch (error) {
      console.error('Error in send-changes:', error);
      callback('Error sending changes');
    } 
  });


  socket.on('get-doc', async (data, callback) => {
    try {
      const curr_doc = await getDocThroughSocket(data.docId);
      let content = curr_doc.content;

      if (!content) {
        content = '';
      }

      io.emit('load-document', content);
      callback(null);
    } catch (error) {
      console.error('Error in get-doc:', error);
      callback('Error sending doc');
    }
   

  });


 
  
  
  socket.on('save-doc', async (data, callback) => {
    try {

      if (!data.data) return;
      await DocumentModel.findByIdAndUpdate(data?.docId?.toString(), { content: data?.data });



      callback(null);
    } catch (error) {
      console.error('Error in save-doc:', error);
      callback('Error saving doc');
    }
  });
};
