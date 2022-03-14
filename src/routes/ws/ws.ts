import * as ws from 'ws';

const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const N = 8;

let standbyList: string[] = [];
let callList: string[] = [];

/*
data={
    action:'',
    {
        create
        add
        move-standby
        move-call
        delete
    }
    id: '',
    standbyList: [],
        callList:[],
        version: ''
}
*/

export const wsTest = () => {
    let server = new ws.Server({ port: 5001 });

    // 接続時に呼ばれる
    server.on('connection', (s: any) => {
        // クライアントからのデータ受信時に呼ばれる
        s.on('message', (message: any) => {

            const data = JSON.parse(message.toString());
            switch (data.action) {
                case 'create':
                    const id = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
                    standbyList.push(id);
                    const createdata = {
                        action: 'create',
                        id: id,
                        standbyList: standbyList,
                        callList: callList,
                        version: (new Date().toString())
                    }
                    //返信//個人
                    s.send(JSON.stringify(createdata));
                    break;
                case 'add':
                    standbyList.push(data.id);
                    break;
                case 'move-standby':
                    callList = callList.filter((element) => { return element !== data.id });
                    standbyList.push(data.id);
                    break;
                case 'move-call':
                    standbyList = standbyList.filter((element) => { return element !== data.id });
                    callList.push(data.id);
                    break;
                case 'delete':
                    standbyList = standbyList.filter((element) => { return element !== data.id });
                    callList = callList.filter((element) => { return element !== data.id });
                    break;
            }

            const senddata = {
                action: 'update',
                standbyList: standbyList,
                callList: callList,
                version: (new Date().toString())
            }
            // クライアントにデータを返信//全員に
            server.clients.forEach((client: any) => {
                client.send(JSON.stringify(senddata));
            });
        });

        // 切断時に呼ばれる
        s.on('close', () => {
            console.log('close');
        });
    });
}