const axios = require("axios").default;

const readAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTMyMjc1M2MxOTgzOWRlZTUxOGJhNjkyN2Q4Zjk2YSIsInN1YiI6IjYxYjE1ZmIxNTgwMGM0MDAxOTlhMGQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VZC3BOQSiAR4sQY0axoNID0byNXGlrouNz6AuP4z5Zk";

export const headers = {
    "Authorization": `Bearer ${readAccessToken}`
};

export const requestParams = {
    params: {
      api_key: "9e322753c19839dee518ba6927d8f96a",
    }
  }

export const movieFetch = axios.create({
    baseURL: `https://api.themoviedb.org/3`,
    headers: headers,
    timeout: 1000,
})