<script setup lang="ts">
import { ref } from 'vue';
import { roundNumber, getCalculationResponse, getLatestCalculationsResponse } from '../utils/calculatorUtils';
import { useUsernameStore } from '@/stores/usernameStore';

const usernameStore = useUsernameStore();
const display= ref("");
var log = ref("");
var latestCalculations = ref("");
const usernameSaved = ref("");

usernameSaved.value = usernameStore.username;

function appendToDisplay(event:Event) {
  const target = event.target as HTMLButtonElement;
  display.value += target.innerHTML;
}

async function get10LatestCalculations() {
  latestCalculations.value="";
  let result;
  try {
    let apiResponse = await getLatestCalculationsResponse(usernameSaved.value);
    result = apiResponse.data;
  }catch(error) {
    console.error(error);
    return;
  }
  for (let calculation of result) {
    latestCalculations.value += calculation["calculation"];
    latestCalculations.value += "\n";
  }
}

get10LatestCalculations();

function handleKeydownEvent(event:KeyboardEvent){
  event.preventDefault();
  let num = parseInt(event.key);
  if(!isNaN(num)) {
    display.value += num.toString();
  }
  if(event.key =="+"|| event.key =="-"||event.key =="*"|| event.key =="/" || event.key ==".") {
    display.value += event.key;
  }
  else if(event.key == ",") display.value += ".";
  else if (event.key =="Enter") calculateResult();
  else if (event.key == "Backspace") deleteLastCharacterInDisplay();
}

function clearTextArea() {
  display.value =""
}

function deleteLastCharacterInDisplay() {
  display.value = display.value.slice(0, display.value.length-1);
}

async function calculateResult() {
  const calculationAsString:string = display.value;
  
  let result;
  try {
    let apiResponse = await getCalculationResponse(calculationAsString, usernameSaved.value);
    result = apiResponse.data["result"];
  } catch (error) {
    alert("Invalid computation");
    return;
  }

  result = roundNumber(result, 2);//Round result to two decimal points
  let resultString = calculationAsString + " = " + result;
  log.value = resultString + "\n" + log.value;
  get10LatestCalculations();
}
</script>

<template>
  <div class="wrapper">
    <h1 class="Large-grid-item">Hello {{ usernameSaved }}</h1>
    <img class="Large-grid-item" src="../../public/calc.jpg" alt="Calculator" width="150" height="150">
    <h1 class="Large-grid-item">Calculator</h1>
    <textarea @keydown="handleKeydownEvent" v-model="display" class="Large-grid-item" width="200"></textarea>
    <button id="CButton" @click="clearTextArea">C</button>
    <button @click="deleteLastCharacterInDisplay">DEL</button>
    <button @click="appendToDisplay">+</button>
    <button @click="appendToDisplay">1</button>
    <button @click="appendToDisplay">2</button>
    <button @click="appendToDisplay">3</button>
    <button @click="appendToDisplay">-</button>
    <button @click="appendToDisplay">4</button>
    <button @click="appendToDisplay">5</button>
    <button @click="appendToDisplay">6</button>
    <button @click="appendToDisplay">*</button>
    <button @click="appendToDisplay">7</button>
    <button @click="appendToDisplay">8</button>
    <button @click="appendToDisplay">9</button>
    <button @click="appendToDisplay">/</button>
    <button @click="appendToDisplay"> </button>
    <button @click="appendToDisplay">0</button>
    <button @click="appendToDisplay">.</button>
    <button @click="calculateResult">=</button>
    <div id="log" class="Large-grid-item">
      <h3>Logg:</h3>
      <p>{{ log }}</p>
    </div>
  </div>
  <div id="earlierCalculations">
    <h3>10 latest calcualtions</h3>
    <p>{{ latestCalculations }}</p>
  </div>
</template>

<style scoped>
.Large-grid-item {
  grid-column: span 4;
  align-items: center;
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
}

#CButton {
  grid-column: span 2;
}

p {
  white-space: pre-line
}

#log {
  border: 2px solid black;
  margin:20px;
  width:auto;
}
</style>