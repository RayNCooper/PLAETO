<template>
  <div id="app">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Stream' }">Stream</router-link>
    <router-view />
  </div>
</template>

<style></style>
