import MatchGradeService from "../common/MatchGradeService/MatchGradeService";
import AddPrivilegeDialog from "./AddPrivilegeDialog";
import AlertDialog from "../dialog/AlertDialog";
import ThanksDialog from "../dialog/ThanksDialog";

export default class MatchServiceForRemode {
    static loadMatchNum(type, cb) {
        if (PaoYa.DataCenter.loginData.is_review) {
            cb && cb(type)
            return
        }
        PaoYa.Request.GET('get_match_type_count', {}, res => {
            let playNum = res.total + '';
            let gameReward = PaoYa.DataCenter.loginData.config_list.game.jsonconfig.game_reward
            let list = gameReward.split(";")
            this.isAlready = list.indexOf(playNum) != -1;
            this.selectDialog(type, cb)
        })
    }
    static selectDialog(type, cb) {
        Laya.Dialog.manager = null
        Laya.UIConfig.closeDialogOnSide = false;
        Laya.UIConfig.popupBgAlpha = 0.8
        if (this.isAlready && PaoYa.game.params.baseURL.indexOf('47.96.1.255:8080') == -1) {
            var _this = this
            let dialog = new ThanksDialog({
                confirmHandler() {
                    let params = {
                        onClose: function (res) {
                            cb && cb(type)
                        },
                        onError: function (res) {
                            let errorDialog = new AlertDialog({
                                title: "温馨提示",
                                message: res.errMsg
                            })
                            errorDialog.popup()
                        }
                    }
                    PaoYa.RewardedVideoAd.show(params);
                }
            })
            dialog.popup()
        } else {
            if (PaoYa.DataCenter.loginData.last_win == 1) {
                let dialog = new AddPrivilegeDialog({
                    mode: 0,
                    confirmHandler: function () {
                        /* 用于结果页豆子加成 */
                        PaoYa.DataCenter.showBeanPercent = 1
                        cb && cb(type)
                    },
                    cancelHandler: function () {
                        cb && cb(type)
                    }
                })
                dialog.popup()
            } else {
                let dialog = new AddPrivilegeDialog({
                    mode: 1,
                    confirmHandler: function () {
                        /* 用于转盘页积分加成显示 */
                        PaoYa.DataCenter.showIntegralPercent = 1
                        cb && cb(type)
                    },
                    cancelHandler: function () {
                        cb && cb(type)
                    }
                })
                dialog.popup()
            }
        }
        Laya.Dialog.manager = null
        Laya.UIConfig.closeDialogOnSide = true;
        Laya.UIConfig.popupBgAlpha = 0.5
    }
}