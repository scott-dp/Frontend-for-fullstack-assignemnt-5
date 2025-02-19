import axios from 'axios';
export async function getCalculationResponse(calculationAsString:string, username:string) {
  console.log("Username " + username);
  let apiResponse = await axios.post("http://localhost:8080/calculate", {
    "calculation" : calculationAsString,
    "username" : username
  });
  return apiResponse;
}
  
export function roundNumber(number:number, numDecimalPoints:number) {
    return Math.round(number * (10**numDecimalPoints)) / (10**numDecimalPoints);
}

export async function getLoginApiResponse(username:string, password:string) {
  let apiResponse = await axios.post("http://localhost:8080/login", {
    "username": username,
    "password":password
  })
  return apiResponse;

}


export async function getRegisterApiResponse(username:string, password:string) {
  let apiResponse = await axios.post("http://localhost:8080/register", {
    "username": username,
    "password":password
  })
  return apiResponse;
}

export async function getLatestCalculationsResponse(username:string) {
  let apiResponse = await axios.get("http://localhost:8080/calculations/" + username);
  return apiResponse;
}