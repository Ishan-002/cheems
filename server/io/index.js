const { saveMessage, getMostRecentMessages } = require('../io/utils');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('join', (params, callback) => {
      socket.join(params.teamId);
      console.log('join here too');
      callback();
    });

    socket.on('createdMessage', (data) => {
      console.log('inside createMesaage');
      saveMessage(io, data);
      socket.broadcast().to(socket.room).emit('newMessage', data);
    });

    socket.on('disconnect', () => {
      console.log('Diconected');
    });
  });
};
