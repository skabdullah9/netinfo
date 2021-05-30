<template>
  <div class="home flex justify-center flex-col items-center h-screen">
    <h1 class="text-white mb-6 text-opacity-50">
      <i class="fa fa-photo-video text-5xl md:text-6xl xl:text-7xl mr-8"></i>
      <i class="fa fa-gamepad text-6xl md:text-7xl xl:text-8xl"></i>
    </h1>
    <h1
      class="text-center text-white text-3xl md:text-4xl mb-2 uppercase font-mono max-w-3xl"
    >
      get relevant info for your search<span class="text-pink-600">.</span>
    </h1>
    <p class="mb-6 font-normal italic text-gray-300 font-sans">
      MOVIES | GAMES | TV SHOWS | WEB SERIES
    </p>
    <div class="relative mt-5">
      <div class="absolute top-4 left-3">
        <i
          class="fa fa-search text-gray-400 z-20 hover:text-gray-500 ml-3 md:ml-0"
        ></i>
      </div>
      <input
        type="text"
        required
        v-model="search"
        @keyup.enter="$router.push({ name: 'movies', params: { search } })"
        class="h-14 w-11/12 md:w-96 border-2 pl-10 pr-20 rounded-lg z-0 focus:shadow-2xl focus:border-pink-500 focus:outline-none text-xl bg-opacity-80"
        placeholder="Search anything..."
      />
      <div class="absolute top-2 right-2">
        <router-link
          v-if="search !== ''"
          :to="{ name: 'movies', params: { search } }"
          ><button
            class="h-10 w-20 text-white rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none mr-3 md:mr-0"
          >
            Search
          </button></router-link
        >
      </div>
    </div>
    <h6 class="font-mono text-xl text-gray-200 mt-8 mb-2">Popular Search:</h6>
    <h2 class="flex flex-wrap items-start justify-center">
      <router-link
        v-for="search in popurlarSearches"
        :key="search"
        :to="{ name: 'movies', params: { search } }"
        class="bg-pink-600 font-sans rounded-full px-3 m-1 text-base text-gray-200 shadow-lg cursor-pointer hover:bg-pink-700"
        >{{ search }}</router-link
      >
    </h2>
  </div>
  <div class="relative">
    <p
    class="text-gray-200 font-mono absolute bottom-2 text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap"
  >
    Made with <i class="fa fa-heart text-yellow-500"></i> by Abdullah
  </p>
  </div>
  
</template>

<script>
import { ref } from "vue";
import VueRouter, { Route } from 'vue-router'
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  setup() {
    let search = ref("");
    let popurlarSearches = ref([
      "Avengers",
      "Minecraft",
      "Batman",
      "Friends",
      "Money Heist",
    ]);

    return { search, popurlarSearches };
  },
};
</script>
