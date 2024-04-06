/* eslint-disable camelcase */
import { _decorator, Component, Button, Node, EditBox, Prefab, NodePool } from 'cc';
import CP_GameManager from './CP_GameManager';
import { State } from './CP_Define';
import { Room } from './CP_Protocol';
const { ccclass, property } = _decorator;

@ccclass('CP_Lobby')
export default class CP_Lobby extends Component {
    @property({
        type: Button,
        tooltip: "Create Room Button"
    })
    private m_createRoomBtn: Button = null;
    
    @property({
        type: Node,
        tooltip: "Room Parent Node"
    })
    private m_roomParentNode: Node = null;
    
    @property({
        type: EditBox,
        tooltip: "Room Name Editbox"
    })
    private m_roomNameEditbox: EditBox = null;
    
    @property({
        type: Prefab,
        tooltip: "Room Prefab"
    })
    private m_roomPrefab: Prefab = null;
    
    /** 房間NodePool */
    private m_roomPool: NodePool = null;

    /** 房間 List */
    private m_roomList: Node[] = [];

    private m_roomInfo: Room[] = [];

    /** 存想加入房間的ID */
    private m_joinRoomId: number = -1;
    
    private m_gameManager: CP_GameManager = null;

    /** 創建房間按鈕點擊事件 */
    private m_createRoomBtnClickedEvent = () => {
        this.OnCreateRoomBtnClicked();
    };
    
    /** 加入房間按鈕點擊事件，需要用parent名稱判斷index */
    private m_joinRoomBtnClickedEvent = (btn: Button) => {
        this.OnJoinRoomBtnClicked(Number(btn.node.parent.name));
        console.log(btn.node.parent.name)
    };

    public Start(gameManager: CP_GameManager) {
        this.m_gameManager = gameManager;
    }

    protected onEnable(): void {
        console.log('Lobby enable')
        this.m_createRoomBtn.node.on(Button.EventType.CLICK, this.m_createRoomBtnClickedEvent, this);

        this.m_roomParentNode.children.forEach((child) => {
            child.getChildByName('JoinBtn').on(Button.EventType.CLICK, this.m_joinRoomBtnClickedEvent, this);
        });
    }

    protected onDisable(): void {
        console.log('Lobby disable')
        this.m_createRoomBtn.node.off(Button.EventType.CLICK, this.m_createRoomBtnClickedEvent, this);

        this.m_roomParentNode.children.forEach((child) => {
            child.getChildByName('JoinBtn').off(Button.EventType.CLICK, this.m_joinRoomBtnClickedEvent, this);
        });
    }

    public OnCreateRoomBtnClicked() {
        console.log('Create Room Btn Clicked');
        if (this.m_roomNameEditbox.string) {
            this.m_gameManager.NextState(State.WAITING);
        }
        else {
            console.warn('room name is empty.')
        }
    }

    public OnJoinRoomBtnClicked(roomIndex: number) {
        console.log('Join Room Btn Clicked');
        this.m_joinRoomId = roomIndex;
        this.m_gameManager.NextState(State.WAITING);
    }
    
    public JoinRoom(id: number) {
        // room ID?
        // record all players?
        // 因為是local GM，所以waiting那邊只要記錄自己在哪個房間(GM紀錄)、場面上有甚麼房間(Lobby紀錄)就好 (應該)
        this.m_gameManager.RoomID = id;
    }

    public RefreshView(dt: number) {
        // 如果拿到的房間數量不同要更新

        // 滿房也要顯示、按鈕變成灰色不可按
    }

    public SetRoomsInfo(info: Room[]) {
        this.m_roomInfo = info
    }
}


