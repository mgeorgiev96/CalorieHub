<template>
  <v-app>
    <v-main>
      <Navigation/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Navigation from './components/Navigation'


export default {
  name: "App",
  components: {Navigation}
};
</script>


<style>
#app{
  background: white;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>