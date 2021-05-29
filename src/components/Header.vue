<template>
  <div class="header-wrapper fixed  z-50 w-full">
  <header class="bg-gray-800 py-5 shadow-lg sticky top-0 font-mono flex items-center justify-between px-5 md:px-10">
    <div class="goBack h-10 w-10">
      <button v-if="$route.name != 'Home'" class="focus:outline-none"  @click="$router.back()">
    <i
      class="fa fa-arrow-left text-2xl md:text-3xl text-gray-200 "
    ></i>
  </button>
    </div>
    
    <router-link to="/">
      <h1 class="font-bold text-3xl md:text-5xl text-gray-300 font-sans italic"><span class="text-green-600 tracking-wider" >NET</span><span class="border-b border-green-700">info</span></h1>
    </router-link>
     <router-link to="/"><i class="fa fa-search text-2xl md:text-3xl text-gray-200  md:right-8 hover:text-gray-100 "></i></router-link>

  </header>
  </div>
</template>

<script>
export default {
    name: "Header"
}
</script>
