import axios from 'axios';
export async function getCalculationResponse(calculationAsString:string) {
  let apiResponse = await axios.post("http://localhost:8080/calculate", {
    "calculation" : calculationAsString
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