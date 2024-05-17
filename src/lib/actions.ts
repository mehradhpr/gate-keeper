"use server"


type typeFetchAPI = {
  endpoint: string,
  token: string,
  query?: string,
  method?: string,
  body?: any
}

// todo https://dummyjson.com/docs/auth use this api

export async function fetchAPI({endpoint, token, query, method, body}: typeFetchAPI) {
  const base = 'https://dummyjson.com/auth/login'

  console.log("body: ", body)

  const params = {
    method: method || 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  }
  let url = base;
  if (endpoint) url += endpoint;
  if (query) url += query;
  console.log('url', url, endpoint,)
  return await fetch(url, params)
}