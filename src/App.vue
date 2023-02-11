<template>
  <div id="app">
    <div class="pinia">
      <p>name:{{ auth.name }}</p>
      <p>newName:{{ auth.newName }}</p>
      <el-button type="primary" @click="getUserInfo">getUserInfo</el-button>
    </div>
    <div class="router">
      <router-link to="/form">Go to form</router-link>
      <router-link to="/table">Go to table</router-link>
      <div>-----------------------------</div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { authStore } from "./store/auth";
import { login } from "@/api/public/index";
console.log(import.meta.env);

const auth = authStore();
const getUserInfo = async () => {
  await auth.getUserInfo();
  await login();
};
</script>

<style></style>
