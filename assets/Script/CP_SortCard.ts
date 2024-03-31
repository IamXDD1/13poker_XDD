/* eslint-disable camelcase */
import { _decorator, Button, Component, Label, Node, Prefab } from 'cc';
import CP_GameManager from './CP_GameManager';
import { State } from './CP_Define';

const { ccclass, property } = _decorator;

@ccclass('CP_SortCard')
export default class CP_SortCard extends Component {

    @property({
        type: Node,
        tooltip: "Sort Card Parent Node (Set under 123)"
    })
    private m_sortCardParentNode: Node[] = [];
    
    @property({
        type: Label,
        tooltip: "Time Label"
    })
    private m_timeLabel: Label = null;
    
    @property({
        type: Node,
        tooltip: "Hand Card Parent Node"
    })
    private m_handCardParentNode: Node = null;
    
    @property({
        type: Button,
        tooltip: "Extend Time Button"
    })
    private m_extendTimeBtn = null;

    @property({
        type: Button,
        tooltip: "Auto Sort Button"
    })
    private m_autoSortBtn = null;

    @property({
        type: Button,
        tooltip: "Finish Button"
    })
    private m_finishBtn = null;

    @property({
        type: Node,
        tooltip: "Choice Parent Node"
    })
    private m_choiceParentNode: Node = null;    
    
    @property({
        type: Prefab,
        tooltip: "Choice Prefab"
    })
    private m_choicePrefab: Prefab = null;
    

    
    /** Card Type Button List */
    private m_cardTypeBtnList: Button[] = [];
    
    private m_gameManager: CP_GameManager = null;

    public Start(gameManager: CP_GameManager) {
        this.m_gameManager = gameManager;
    }

    protected onEnable(): void {
        console.log('Sort Card enable')
        this.m_extendTimeBtn.node.on(Button.EventType.CLICK, () => {
            this.OnExtendTimeBtnClicked();
        }, this);

        this.m_finishBtn.node.on(Button.EventType.CLICK, () => {
            this.OnFinishBtnClicked();
        }, this);

        this.m_autoSortBtn.node.on(Button.EventType.CLICK, () => {
            this.OnAutoSortBtnClicked();
        }, this);
    }

    protected onDisable(): void {
        console.log('Sort Card disable')
        this.m_extendTimeBtn.node.off(Button.EventType.CLICK, () => {
            console.log('Extend Time Btn Off');
        }, this);

        this.m_finishBtn.node.off(Button.EventType.CLICK, () => {
            console.log('Finish Btn Off');
        }, this);

        this.m_autoSortBtn.node.off(Button.EventType.CLICK, () => {
            console.log('Auto Sort Btn Off');
        }, this);
    }

    public OnExtendTimeBtnClicked() {
        console.log('Extend Time Btn Clicked');

    }

    public OnFinishBtnClicked() {
        console.log('Finish Btn Clicked');

    }

    public OnAutoSortBtnClicked() {
        console.log('Auto Sort Btn Clicked');

    }

    public RefreshView(dt: number) {
        if (this.IsTimeOut()) {
            this.m_gameManager.NextState(State.GAME_PLAY);
        }
        // 刷新時間

    }

    private IsTimeOut(): boolean {
        // 拿 server 時間資料?
        return false;
    }
}


