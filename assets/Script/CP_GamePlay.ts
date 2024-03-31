/* eslint-disable camelcase */
import { _decorator, Component, Button, Label, Prefab, Node } from 'cc';
import { State } from './CP_Define';
import CP_GameManager from './CP_GameManager';
import CP_SortCard from './CP_SortCard';

const { ccclass, property } = _decorator;

@ccclass('CP_GamePlay')
export default class CP_GamePlay extends Component {
    @property({
        type: Button,
        tooltip: "Exit Game Button"
    })
    private m_exitGameBtn = null;
    
    @property({
        type: Label,
        tooltip: "Announcement Label"
    })
    private m_announcementLbl: Label = null;
    
    @property({
        type: Prefab,
        tooltip: "Final Sets Prefab"
    })
    private m_finalSetsPrefab: Prefab = null;
    
    @property({
        type: Node,
        tooltip: "Players Final Sets Parent Node (P1~P4)"
    })
    private m_playersFinalSetsParentNode: Node[] = [];
    
    @property({
        type: CP_SortCard,
        tooltip: "Sort Card"
    })
    private m_sortCard: CP_SortCard = null;
    
    private m_gameManager: CP_GameManager = null;

    public Start(gameManager: CP_GameManager) {
        this.m_gameManager = gameManager;
        this.m_sortCard.Start(gameManager);
    }

    protected onEnable(): void {
        console.log('Game Play enable')
        this.m_exitGameBtn.node.on(Button.EventType.CLICK, () => {
            this.OnExitGameBtnClicked();
        }, this);
    }

    protected onDisable(): void {
        console.log('Game Play disable')
        this.m_exitGameBtn.node.off(Button.EventType.CLICK, () => {
            console.log('Exit Game Btn Off');
        }, this);
    }

    public OnExitGameBtnClicked() {
        console.log('Exit Game Btn Clicked');
        this.m_gameManager.NextState(State.LOBBY);
    }

    public RefreshView(dt: number) {
        // 遊玩畫面
    }
}


