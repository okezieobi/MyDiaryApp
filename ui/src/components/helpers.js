export default class Helpers {
    static async sendRequest(formId, url = '', requestMethod = '') {
        const requestData = new FormData(document.querySelector(formId));
        return await fetch(url, { method: requestMethod, body: requestData });
    }
}
