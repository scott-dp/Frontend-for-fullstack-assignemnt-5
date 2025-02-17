<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { getLoginApiResponse } from '@/utils/calculatorUtils';
import router from '@/router';
const username = ref("");
const password = ref("");

async function handleLoginClick() {
    let apiResponse = await getLoginApiResponse(username.value, password.value);
    if (apiResponse.status == 200) {
        router.push("/calculate");
    } else {
        alert("Login failed");
    }
}
</script>

<template>
<div id="loginWrapper">
    <h1 class="loginElement">Login</h1>
    <h3 class="loginElement">Username</h3>
    <input class="loginElement" v-model="username">
    <h3 class="loginElement">Password</h3>
    <input class="loginElement" v-model="password">
    <button class="loginElement" @click="handleLoginClick" id="loginButton">Login</button>
</div>
<RouterLink to="/register">Dont have an account? Register here</RouterLink>
</template>

<style scoped>
#loginWrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

h1, #loginButton{
    grid-column: span 2;
}

.loginElement {
    margin:5px;
}

</style>