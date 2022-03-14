import * as ws from 'ws';

export const wsTest = () => {
    var server = new ws.Server({ port: 5001 });

    // 接続時に呼ばれる
    server.on('connection', (ws: any) => {
        // クライアントからのデータ受信時に呼ばれる
        ws.on('message', (message: any) => {
            console.log(message.toString());

            // クライアントにデータを返信
            server.clients.forEach((client: any) => {
                client.send(message.toString());
            });
        });

        // 切断時に呼ばれる
        ws.on('close', () => {
            console.log('close');
        });
    });
}