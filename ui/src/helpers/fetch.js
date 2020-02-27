import logger from './logger';

class FetchAPI {
    constructor() {
        this.processRequest = this.processRequest.bind(this);
        this.authRequest = this.authRequest.bind(this);
    }

    async processRequest(inputData = {}, url = '', requestMethod = '', auth = '') {
        try {
            const response = await fetch(url,
                {
                    method: requestMethod,
                    body: JSON.stringify(inputData),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': auth,
                      },
                   
                });
            return response.json();
        } catch (error) {
            return logger.displayErrors(error);
        }
    }

    async authRequest(data = {}, url = '') {
        return this.processRequest(data, url, 'POST', null);
    }

}

const fetchAPI = new FetchAPI();
export default fetchAPI;
