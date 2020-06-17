import socketio from 'socket.io';

interface IConnection {
  id: string;
  user_id: string;
}

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface ISendMessage {
  to: IConnection[];
  message: string;
  payment: IPayment;
}

let io: socketio.Server;

const connections: IConnection[] = [];

const setupWebSocket = (server: any): void => {
  io = socketio(server);

  io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connections.push({
      id: socket.id,
      user_id,
    });
  });
};

const findConnections = (user_id: string): IConnection[] => {
  return connections.filter(connection => connection.user_id === user_id);
};

const sendMessage = ({ to, message, payment }: ISendMessage): void => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, payment);
  });
};

export { setupWebSocket, sendMessage, findConnections };
