<template>
  <div class="min-h-screen bg-gray-900" id="app">
    <Header />
    <div class="gradient h-full w-full  ">
       <div class="container ">
      <router-view/>
    </div>
    </div>
   
  </div>
  
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background:linear-gradient(45deg, rgba(255, 0, 0, 0.8), rgba(0, 0, 255, 0.8)), url('./assets/hero-banner.jpg');
  background-repeat: repeat;
  background-size:210vh;
  min-height: 100vh;

  background-position: 0 100%;
  
}

</style>
