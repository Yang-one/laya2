import MatchGradeService from "./MatchGradeService";
import Utils from "../../utils/utils";
export default class MatchGradeControl extends PaoYa.Component {
    constructor() { super(); }
    onAwake() {
        this.GET('get_match_type_count', function (res) {
            MatchGradeService.roundLimit = res.round_limit||0
        })
    }
    onThrottleClick(e) {
        let name = e.target.name
        if (name.indexOf('box') > -1) {
            Utils.recordPoint('button006', 'click')
            let type = PaoYa.DataCenter.config.game.match_type[Number(name.substr(3,1))]
            MatchGradeService.checkIfMatch(type);
        } else if (name == 'quickMatch') {
            MatchGradeService.startQuickMatch()
        }
    }
}