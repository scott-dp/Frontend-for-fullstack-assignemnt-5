<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';
import { useTokenStore } from '@/stores/tokenStore';

const username = ref("");
const password = ref("");
const tokenStore = useTokenStore();

async function handleLoginClick() {
    await tokenStore.getTokenAndSaveInStore(username.value, password.value);
    if (tokenStore.jwtToken != "") {
        router.push("/calculate");
    } else {
        alert("login failed");
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