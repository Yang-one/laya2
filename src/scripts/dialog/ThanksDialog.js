export default class ThanksDialog extends PaoYa.Dialog {
    //强制弹框必须看广告
    constructor(params) {
        super()
        this.params = params
        this.setView()
    }
    setView() {
        let imgBg = new Laya.Image('remote/crossLink/image_letter.png')
        imgBg.size(750, 706)
        this.addChild(imgBg)
        let btnOk = new Laya.Button('remote/crossLink/btn_support.png')
        btnOk.pos(198, 452)
        btnOk.stateNum = 1
        this.addChild(btnOk)
        btnOk.on(Laya.Event.CLICK, this, () => {
            this.params.confirmHandler && this.params.confirmHandler()
            this.close()
        })
    }
}