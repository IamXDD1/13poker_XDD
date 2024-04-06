/* eslint-disable camelcase */
import { _decorator, Component, Node } from 'cc';
import CP_Define from './CP_Define';
import CP_GameManager from './CP_GameManager';
const { ccclass, property } = _decorator;

enum SOCKET_STATE {
    NONE = 0,
    CONNECTING = 1,
    CONNECTED = 2
}

export enum CP_C2S_PROTOCOL {
    JOIN_LOBBY = 'join.lobby',
    EXIT_LOBBY = 'exit.lobby',
    JOIN_ROOM  = 'join.room',
    EXIT_ROOM  = 'exit.room',
    SET_CARD = 'set.catd',
}

export enum CP_S2C_PROTOCOL {
    LOCATION_MESSAGE = 'LocationMsg',
    ROOM_MESSAGE = 'RoomMsg',
    CARD_MESSAGE = 'CardMsg',
}

export interface Room {
    Name: string,
    Players: string[],
}

export interface S2C_DATA {
    Type: string,
    Location: number,
    Name: string,
    Rooms: Room[],
    Cards: number[][]
}

@ccclass('CP_Protocol')
export default class CP_Protocol extends Component {
    
    private m_socketState: number = SOCKET_STATE.NONE;

    private m_webSocket: WebSocket = null;

    private m_gameManager: CP_GameManager = null;

    constructor(serverUrl, gameManager) {
        super();
        this.ConnectServer(serverUrl);
        this.m_gameManager = gameManager;
    }
    
    private ConnectServer(url: string) {
        if (this.m_socketState === SOCKET_STATE.NONE) {
            this.m_socketState = SOCKET_STATE.CONNECTING;
            console.log('connecting server:', url);
            this.m_webSocket = new WebSocket(url);
            this.BindSocketEvent();
        }
    }

    private BindSocketEvent() {
        this.m_webSocket.addEventListener('message', this.OnReceiveCommand.bind(this));
    }

    public IsConnected(): boolean {
        return this.m_webSocket.readyState === WebSocket.OPEN;
    }

    public SendCommand(protocolType: CP_C2S_PROTOCOL, content: string | number[]) {
        let data: object = {};
        switch (protocolType) {
            case CP_C2S_PROTOCOL.JOIN_LOBBY:
                data = {
                    "Type": protocolType,   // Request type
                    "Name": content         // Player's nickname
                };
                break;
            case CP_C2S_PROTOCOL.EXIT_LOBBY:
                data = {
                    "Type": protocolType,   // Request type
                };
                break;
            case CP_C2S_PROTOCOL.JOIN_ROOM:
                data = {
                    "Type": protocolType,   // Request type
                    "Name": content         // Player's nickname
                };
                break;
            case CP_C2S_PROTOCOL.EXIT_ROOM:
                data = {
                    "Type": protocolType,   // Request type
                };
                break;
            case CP_C2S_PROTOCOL.SET_CARD:
                data = {
                    "Type": protocolType,   // Request type
                    "Cards": content
                };
                break;
            default:
                break;
        }
        console.log('Send Command:', data);
        this.m_webSocket.send(JSON.stringify(data));
    }

    public OnReceiveCommand(receivedData: string) {
        const data = JSON.parse(receivedData);
        console.log('Received Data:', data);
        this.m_gameManager.ReceiveAck(data);
    }
}


