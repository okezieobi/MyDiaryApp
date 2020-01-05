export default class Helpers {
    static async authRequest(inputData={}, url = '', requestMethod = '') {
        try {
            const response = await fetch(url,
                {
                    method: requestMethod,
                    body: JSON.stringify(inputData),
                    headers: {
                        'Content-Type': 'application/json'
                      },
                   
                });
            return response.json();
        } catch (error) {
            return { error };
        }
       
    }
}
