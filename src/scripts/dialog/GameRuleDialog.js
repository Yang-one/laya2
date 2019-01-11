export default class GameRuleDialog extends PaoYa.Dialog {
    onOpened() {
        if (!PaoYa.DataCenter.ruleUrl) { console.warn('请指定规则资源地址') }
        var url = PaoYa.DataCenter.ruleUrl;
        if (url) {
            Laya.loader.load(url, Laya.Handler.create(this, () => {
                let texture = Laya.loader.getRes(url);
                let width = this.panel.width;
                let height = width * texture.height / texture.width;
                this.imageView.size(width, height);
                this.panel.height = Math.min(height, 850);
                if (height > 850) {
                    this.panel.vScrollBarSkin = '';
                }
                this.imageView.skin = url;
            }, null, false));
        }
    }
    closeHandler(){
        Laya.Dialog.manager = null
        UIConfig.closeDialogOnSide = false
    }
}