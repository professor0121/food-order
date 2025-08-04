export default function locationSocket(io) {

  io.on('connection', (socket) => {
    socket.on('send-location',(data)=>{
        io.emit('receive-location',{id:socket.id, ...data});
    });
    console.log(`Socket connected`);
  });
}
