<script setup lang="ts">
import { ref } from 'vue';
import { getRegisterApiResponse } from '@/utils/calculatorUtils';
import router from '@/router';
import { useUsernameStore } from '@/stores/usernameStore';

const username = ref("");
const password = ref("");
const usernameStore = useUsernameStore();

async function handleRegisterClick() {
    let apiResponse;
    try {
        apiResponse = await getRegisterApiResponse(username.value, password.value);
    } catch(AxiosError) {
        alert("Register failed, try a new username")
        return;
    };

    if (apiResponse.status == 200) {
        router.push("/calculate");
        usernameStore.saveUsernameInStore(username.value);
    }
}
</script>

<template>
<div id="registerWrapper">
    <h1 id= "RegisterHeader" class="registerElement">Register</h1>
    <h3 class="registerElement">Username</h3>
    <input class="registerElement" v-model="username">
    <h3 class="registerElement">Password</h3>
    <input class="registerElement" v-model="password">
    <button class="registerElement" @click="handleRegisterClick" id="registerButton">Register</button>

</div>
</template>

<style scoped>
#registerWrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

#RegisterHeader {
    color:crimson;
}

h1, #registerButton{
    grid-column: span 2;
}

.registerElement {
    margin:5px;
}

</style>