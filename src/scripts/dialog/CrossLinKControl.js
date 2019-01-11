import Utils from "../utils/utils";
import MatchGradeService from "../common/MatchGradeService/MatchGradeService";

export default class CrossLinkControl extends PaoYa.Component {
    onAwake() {
        if (this.owner.params) { this.gameType = this.owner.params.type; }
        this.GET('game_whole_list', (res) => {
            let promise = new Promise((resolve, reject) => {
                Utils.loadOtherGameList(8, resolve)
            });
            promise.then((data) => {
                this.spineInfo = data
                this.setData(res)
            });
        })
    }
    onThrottleClick(e) {
        if (e.target.name == 'again') {
            this.againHandler();
        }
    }
    setData(res) {
        let list = []
        res.forEach(element => {
            for (let i = 0; i < 8; i++) {
                if (element.appId == this.spineInfo[i]) {
                    list.push({ name: element.name, icon: `https://res.xingqiu123.com/img/xcx/gameHall_2.0/home/game_icon_${element.id}.png`, id: element.id, appId: element.appId, image: element.qr_img })
                }
            }
        });
        this.owner.setListData(list)
    }
    gameClick(data, index) {
        this.POST('point_log_record', { point_name: `play00${index + 1}`, point_extra: data.id, point_type: 'crossLink' }, (res) => {
        })
        Utils.navigateToMiniProgram({
            appId: data.appId,
            images: [data.image],
            extraData: {
                jType: 'crossLink',
                fid: PaoYa.DataCenter.loginData.config_list.game.id
            }
        })
    }
    againHandler() {
        PaoYa.DataCenter.showBeanPercent = 0
        this.GET("update_chips", (data) => {
            this.owner.close()
            PaoYa.DataCenter.user.gold = data.pao_gold;
            if (this.gameType == PaoYa.GameEntryType.Match) {//重新走匹配
                let type = MatchGradeService.type;
                MatchGradeService.checkIfMatch(type);
            }
        })
    }
}