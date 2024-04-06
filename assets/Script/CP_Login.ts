/* eslint-disable camelcase */
import { _decorator, Component, Button, Game, EditBox } from 'cc';
import CP_Define, { State } from './CP_Define';
import CP_GameManager from './CP_GameManager';

const { ccclass, property } = _decorator;

@ccclass('CP_Login')
export default class CP_Login extends Component {
    
    @property({
        type: Button,
        tooltip: "Login Button"
    })
    private m_loginBtn: Button = null;

    @property({
        type: EditBox,
        tooltip: "Username EditBox"
    })
    private m_usernameEditbox: EditBox = null;

    @property({
        type: EditBox,
        tooltip: "Server Link EditBox"
    })
    private m_serverLinkEditbox: EditBox = null;

    private m_gameManager: CP_GameManager = null;

    private m_loginBtnClickedEvent = () => {
        this.OnLoginBtnClicked();
    };

    public Start(gameManager: CP_GameManager) {
        this.m_gameManager = gameManager;
    }

    protected onEnable(): void {
        console.log('Login enable')
        this.m_loginBtn.node.on(Button.EventType.CLICK, this.m_loginBtnClickedEvent, this);
    }

    protected onDisable(): void {
        console.log('Login disable')
        this.m_loginBtn.node.off(Button.EventType.CLICK, this.m_loginBtnClickedEvent, this);
    }

    /** Login按下後動作 */
    public OnLoginBtnClicked() {
        /** TODO
         *  connect server
         */
        console.log('Login Btn Clicked');
        this.m_gameManager.ServerUrl = (this.m_serverLinkEditbox.string) ? this.m_serverLinkEditbox.string : CP_Define.DEFAULT_SERVER_URL;
        
        if (this.m_usernameEditbox.string) {
            this.m_gameManager.Username = this.m_usernameEditbox.string;
            this.m_gameManager.NextState(State.LOBBY);
        }
        else {
            console.warn('Username is empty.')
        }
    }

    public RefreshView(dt: number) {
        // 如果拿到的房間數量不同要更新
    }
}


