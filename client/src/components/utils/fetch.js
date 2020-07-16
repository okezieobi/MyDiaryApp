export default async (inputData = {}, url = '', requestMethod = '', auth = '') => {
  try {
    const response = await fetch(url,
      {
        method: requestMethod,
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json',
          token: auth,
        },
      });
    return response.json();
  } catch (error) {
    return error;
  }
};
