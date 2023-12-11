import { Server as SocketIoServer, Socket } from 'socket.io';
import cron from 'node-cron';
import NotificationService from '@services/notification.service';
import scrapServices from '@services/scrap.service';
import * as dotenv from 'dotenv'
import { createFileInPublic } from './fileHelper';
dotenv.config()

export function setupWebSocket(server: any, notificationService: NotificationService): SocketIoServer {
  const io: SocketIoServer = new SocketIoServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Schedule cron job
  cron.schedule('*/5 * * * *', async () => {
    let logFile = 'notificatio.log'
    await scrapServices.scrapAndSave();
    const result = await notificationService.checkAndSendNotifications();
    io.emit('notification', { type: 'notification', message: result.data });
    const logMessage = `Timestamp: ${new Date().toISOString()} - Message: ${result.data}\n`;
    createFileInPublic(logFile, logMessage + '\n');

  });

  return io;
}
