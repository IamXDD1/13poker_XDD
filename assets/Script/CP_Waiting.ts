/* eslint-disable camelcase */
import { _decorator, Button, Component, Node, Prefab } from 'cc';
import CP_GameManager from './CP_GameManager';
import { State } from './CP_Define';

const { ccclass, property } = _decorator;

@ccclass('CP_Waiting')
export default class CP_Waiting extends Component {
    @property({
        type: Button,
        tooltip: "Exit Waiting Room Button"
    })
    private m_exitWaitingRoomBtn: Button = null;

    @property({
        type: Node,
        tooltip: "Player Icon Parent Node"
    })
    private m_playerIconParentNode: Node = null;

    @property({
        type: Prefab,
        tooltip: "Player Icon Prefab"
    })
    private m_playerIconPrefab: Prefab = null;
    
    private m_gameManager: CP_GameManager = null;

    private m_waitingRoomBtnClickedEvent = () => {
        this.OnWaitingRoomBtnClicked();
    };

    public Start(gameManager: CP_GameManager) {
        this.m_gameManager = gameManager;
        
    }

    protected onEnable(): void {
        console.log('Waiting Room enable')
        this.m_exitWaitingRoomBtn.node.on(Button.EventType.CLICK, this.m_waitingRoomBtnClickedEvent, this);
    }

    protected onDisable(): void {
        console.log('Waiting Room disable')
        this.m_exitWaitingRoomBtn.node.off(Button.EventType.CLICK, this.m_waitingRoomBtnClickedEvent, this);
    }

    public OnWaitingRoomBtnClicked() {
        console.log('Exit Waiting Room Btn Clicked');
        this.m_gameManager.NextState(State.LOBBY);
        
        // let n = Math.random();
        // if (n < 0.334) {
        //     this.m_gameManager.NextState(State.LOBBY);
        //     console.log('State.LOBBY')
        // }
        // else if (n < 0.667) {
        //     this.m_gameManager.NextState(State.GAME_PLAY);
        //     console.log('State.GAME_PLAY')
        // }
        // else {
        //     this.m_gameManager.NextState(State.SORT_CARD);
        //     console.log('State.SORT_CARD')
        // }
    }

    public RefreshView(dt: number) {
        // 拿到其他玩家進入房間資料
    }
}


