import axios from 'axios';

export async function getCalculationResponse(calculationAsString:string, username:string, token:string) {
  const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization" : "Bearer " + token
    },
  };

  let apiResponse = await axios.post("http://localhost:8080/calculate", {
    "calculation" : calculationAsString,
    "username" : username
  }, config);
  return apiResponse;
}
  
export function roundNumber(number:number, numDecimalPoints:number) {
    return Math.round(number * (10**numDecimalPoints)) / (10**numDecimalPoints);
}

export async function getLatestCalculationsResponse(username:string, token:string) {
  //For any API call this is needed to authorize every api call
  const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization" : "Bearer " + token
    },
  };

  return await axios.get("http://localhost:8080/calculations/" + username, config);
}

export async function getJwtToken(username:string, password:string) {
  return await axios.post("http://localhost:8080/token", {
    "username":username,
    "password":password
  })
}

export async function getUserInfo(username:string, token:string) {
  const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization" : "Bearer " + token
    },
  };
  return axios.get("http://localhost:8080/users/"+username, config);

}