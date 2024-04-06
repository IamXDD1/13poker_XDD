/* eslint-disable camelcase */
import { _decorator, Component, Label, Node } from 'cc';
import { State } from './CP_Define';
import CP_Login from './CP_Login';
import CP_Lobby from './CP_Lobby';
import CP_GamePlay from './CP_GamePlay';
import CP_SortCard from './CP_SortCard';
import CP_Waiting from './CP_Waiting';
import { CP_S2C_PROTOCOL, S2C_DATA } from './CP_Protocol';

const { ccclass, property } = _decorator;

@ccclass('CP_GameManager')
export default class CP_GameManager extends Component {
    
    @property({
        type: CP_Login,
        tooltip: "Login"
    })
    private m_login: CP_Login = null;
    
    @property({
        type: CP_Lobby,
        tooltip: "Lobby"
    })
    private m_lobby: CP_Lobby = null;
    
    @property({
        type: CP_Waiting,
        tooltip: "Waiting"
    })
    private m_waiting: CP_Waiting = null;
    
    @property({
        type: CP_GamePlay,
        tooltip: "GamePlay"
    })
    private m_gamePlay: CP_GamePlay = null;
    
    @property({
        type: CP_SortCard,
        tooltip: "SortCard"
    })
    private m_sortCard: CP_SortCard = null;

    @property({
        type: Label,
        tooltip: "Username Label"
    })
    private m_usernameLbl: Label = null;

    public get Username(): string {
        return this.m_usernameLbl.string;
    }

    public set Username(name: string) {
        this.m_usernameLbl.string = name;
    }
    
    /** Login Root Node */
    private m_loginNode: Node = null;
    
    /** Lobby Root Node */
    private m_lobbyNode: Node = null;
    
    /** Waiting Room Root Node */
    private m_waitingRoomNode: Node = null;
    
    /** In Game Root Node */
    private m_gamePlayNode: Node = null;
    
    /** Sort Card Root Node */
    private m_sortCardNode: Node = null;
    
    /** 目前狀態 */
    private m_state: State = State.LOGIN;
    
    /** Server */
    private m_serverUrl: string = "";

    public get ServerUrl(): string {
        return this.m_serverUrl;
    }

    public set ServerUrl(url: string) {
        this.m_serverUrl = url;
    }

    /** 自己在哪一個房間 */
    private m_roomId: number = 0;

    public get RoomID(): number {
        return this.m_roomId;
    }

    public set RoomID(id: number) {
        this.m_roomId = id;
    }


    onLoad() {
        this.Init();
        this.m_login.Start(this);
        this.m_lobby.Start(this);
        this.m_gamePlay.Start(this);
        this.m_waiting.Start(this);

        console.log('GM start')
    }

    update(dt: number) {
        switch (this.m_state) {
            case State.LOGIN:
                // this.m_login.RefreshView(dt);
                break;
            case State.LOBBY:
                this.m_lobby.RefreshView(dt);
                break;
            case State.WAITING:
                this.m_waiting.RefreshView(dt);
                break;
            case State.GAME_PLAY:
                this.m_gamePlay.RefreshView(dt);
                break;
            case State.SORT_CARD:
                this.m_sortCard.RefreshView(dt);
                break;
        
            default:
                break;
        }
    }

    private Init() {
        this.m_loginNode = this.m_login.node;
        this.m_lobbyNode = this.m_lobby.node;
        this.m_waitingRoomNode = this.m_waiting.node;
        this.m_gamePlayNode = this.m_gamePlay.node;
        this.m_sortCardNode = this.m_sortCard.node;
        
        this.m_loginNode.active = true;
        this.m_lobbyNode.active = false;
        this.m_waitingRoomNode.active = false;
        this.m_gamePlayNode.active = false;
        this.m_sortCardNode.active = false;
        this.m_usernameLbl.node.active = false;
    }

    public NextState(state: State) {
        this.EndState(this.m_state);
        this.StartState(state);
        this.m_state = state;
    }

    private StartState(state: State) {
        switch (state) {
            case State.LOGIN:
                this.m_usernameLbl.node.active = false;
                this.m_loginNode.active = true;
                break;
            case State.LOBBY:
                this.m_lobbyNode.active = true;
                break;
            case State.WAITING:
                this.m_lobby.JoinRoom(0);
                this.m_waitingRoomNode.active = true;
                break;
            case State.GAME_PLAY:
                this.m_gamePlayNode.active = true;
                break;
            case State.SORT_CARD:
                this.m_gamePlayNode.active = true;
                this.m_sortCardNode.active = true;
                break;
            default:
                break;
        }
    }

    private EndState(state: State) {
        switch (state) {
            case State.LOGIN:
                this.m_loginNode.active = false;
                break;
            case State.LOBBY:
                this.m_usernameLbl.node.active = true;
                this.m_lobbyNode.active = false;
                break;
            case State.WAITING:
                this.m_usernameLbl.node.active = true;
                this.m_waitingRoomNode.active = false;
                break;
            case State.GAME_PLAY:
                this.m_usernameLbl.node.active = true;
                this.m_gamePlayNode.active = false;
                break;
            case State.SORT_CARD:
                this.m_sortCardNode.active = false;
                break;
            default:
                break;
        }
    }

    public ReceiveAck(data: S2C_DATA) {
        switch (data.Type) {
            case CP_S2C_PROTOCOL.ROOM_MESSAGE:
                this.m_lobby.SetRoomsInfo(data.Rooms);
                break;
            case CP_S2C_PROTOCOL.LOCATION_MESSAGE:
                // GM用，判斷玩家STATE
                break;
            case CP_S2C_PROTOCOL.CARD_MESSAGE:
                this.m_gamePlay.SetCardInfo(data.Cards);
                break;
            default:
                break;
        }
    }
    
    

}


