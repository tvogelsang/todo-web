import axios from "axios";

interface DataProps {
  url: string;
  data?: any;
  params?: { [key: string]: string };
  headers?: { [key: string]: string };
}

export const deleteData = async ({ url, params, headers }: DataProps) => {
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      ...headers,
    },
    params,
  });

  return response.data;
};

export const getData = async ({ url, params, headers }: DataProps) => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      ...headers,
    },
    params,
  });

  return response.data;
};

export const postData = async ({ url, data, params, headers }: DataProps) => {
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      ...headers,
    },
    params,
  });

  return response.data;
};

export const putData = async ({ url, data, params, headers }: DataProps) => {
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      ...headers,
    },
    params,
  });

  return response.data;
};
