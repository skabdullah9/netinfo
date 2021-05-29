<template>
  <div class="bg-gray-900" id="app">
    <Header />
    <div class="gradient h-full w-full backdrop-filter backdrop-blur-sm">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(45deg, rgba(255, 0, 0, 0.8), rgba(0, 0, 255, 0.8)),
    url("./assets/hero-banner.jpg");
  background-repeat: repeat;
  background-size: 250vh;
  min-height: 100vh;
  background-position: 100% 100%;
}
</style>
