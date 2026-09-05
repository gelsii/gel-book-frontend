import axios from "axios";

const UseAxios = async ({ url, method, data, headers, additonally }) => {
  const response = await axios({
    url: url,
    method: method,
    data: data,
    headers: headers,
    ...additonally,
  });

  const dataResponse = await response.data;

  return dataResponse;
};

export default UseAxios;
