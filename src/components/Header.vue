<template>
  <div class="header-wrapper fixed z-50 w-full">
    <header
      class="bg-gray-800 pt-3 pb-6 shadow-lg sticky top-0 font-mono flex items-center justify-between px-4 md:px-10"
    >
      <div class="goBack h-7 w-7">
        <button
          v-if="$route.name != 'Home'"
          class="focus:outline-none"
          @click="$router.back()"
        >
          <i
            class="fa fa-arrow-left text-2xl md:text-3xl text-gray-200 hover:text-green-500"
          ></i>
        </button>
      </div>

      <router-link to="/">
        <h1
          class="font-bold text-3xl md:text-5xl text-gray-300 font-sans italic"
        >
          <span class="text-green-600 tracking-wider">NET</span
          ><span class="border-b border-green-600">info</span>
        </h1>
      </router-link>
      <div class="search h-7 w-7">
        <router-link to="/" v-if="$route.name != 'Home'"
          ><i
            class="fa fa-search text-2xl md:text-3xl text-gray-200 md:right-8 hover:text-green-500"
          ></i
        ></router-link>
      </div>
    </header>
  </div>
</template>

<script>
import VueRouter, { Route } from 'vue-router'
export default {
  name: "Header",
};
</script>
