/* eslint-disable camelcase */
import { _decorator, Component } from 'cc';

const { ccclass } = _decorator;

export enum State {
  LOGIN,
  LOBBY,
  WAITING,
  GAME_PLAY,
  SORT_CARD
}

@ccclass('CP_Define')
export default class CP_Define extends Component {
  static SETTING = {
    IN_GAME: {
      // 玩家節點位置 (自己開始，逆時針排序)
      PLAYER_POS: [
        [0, -80],
        [300, 0],
        [0, 130],
        [-300, 0],
      ],
      // 每個玩家放手排的節點設置
      SETS: {
        SCALE: 0.8,
        CARD_INTERVAL: -40,
      },
      // 1~10的圖案會偏移，JQK不用動
      CARD: {
        ANCHOR_X: 1.3,
        ANCHOR_Y: 0.2,
      },
    },
  };

  static DEFAULT_SERVER_URL = '13poker.garbagedee.edu.kg:2345';
}
