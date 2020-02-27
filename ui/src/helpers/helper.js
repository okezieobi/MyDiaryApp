export default class Helper {
    constructor(){
        this.loadPage = this.loadPage.bind(this);
    }

    static loadPage(path = '') {
        return window.location = path;
    }
}