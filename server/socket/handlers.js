module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a room
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);
    });

    // Broadcast code changes to everyone in room
    socket.on('code-change', ({ roomId, code }) => {
      socket.to(roomId).emit('code-update', code);
    });

    // Broadcast new comment to room
    socket.on('new-comment', ({ roomId, comment }) => {
      socket.to(roomId).emit('comment-added', comment);
    });

    // Broadcast new reply to room
    socket.on('new-reply', ({ roomId, comment }) => {
      socket.to(roomId).emit('reply-added', comment);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};