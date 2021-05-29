<template>
 <main v-if="loading" class="h-screen flex items-center justify-center ">
   <div>
      <img src="@/assets/loading.gif" class="h-1/5 w-1/5 mx-auto" alt="">
      <h1 class="text-gray-300 text-3xl font-mono">Working on it...</h1>
  </div>
  </main>
  <main v-if="errorMsg" class="h-screen flex items-center flex-col justify-center">
    <h1 class="text-5xl md:text-8xl text-gray-200 font-mono mb-8 animate-pulse"><i class="fa fa-exclamation-triangle"></i></h1>
    <h1 class="text-3xl md:text-5xl text-gray-200 font-mono">{{errorMsg}}</h1>
     <router-link to="/" class="bg-gray-700 text-white text-2xl text-xl px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-color my-10 border-none focus:outline-none"> <i class="fa fa-chevron-left text-base leading-8 transform text-green-500 -mt-4 inline-block"></i> Go Back</router-link>
  </main>
 
  <main v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr pt-28 font-sans">
    <div
      v-for="movie in movies"
      :key="movie.imdbID"
      class="text-white p-1 pb-5 bg-gray-900 bg-opacity-70 rounded-lg relative cursor-pointer hover:bg-opacity-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <router-link :to="{name: 'movieDetail', params: {id: movie.imdbID}}">
        <img
          :src="movie.Poster"
          class="h-60 w-full object-cover mx-auto block rounded-t-lg"
          alt="Poster unavailable"
        />
        <div class="info text-white">
          <p
            class="bg-green-600 absolute top-1 right-1 py-1 px-2 rounded italic"
          >
            {{ movie.Year }}
          </p>
          <h3 class="my-2 italic text-bold text-xl">{{ movie.Title }}</h3>
          <h4 class="text-gray-400 italic">Type: {{ movie.Type }}</h4>
        </div>
      </router-link>
    </div>
  </main>
  

    <button @click="next" v-if="!loading && !errorMsg && movies.length >= 10" class="bg-gray-700 text-white text-2xl text-xl px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-color my-10 border-none focus:outline-none">More <i class="fa fa-chevron-right text-base leading-8 transform text-green-500"></i></button>
   
    
</template>

<script>
import { onBeforeMount, ref } from "vue";
import env from "@/env.js";
export default {
  name: "movies",
  props: ["search"],
  
  
  setup(search) {
    let movies = ref([]);
    let page = ref(1);
    let loading = ref(true)
    let errorMsg = ref('')
   
    const fetchResults = () => {
      if(search.search !== undefined) {
         fetch(`https://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.search}&page=${page.value}`)
        .then((res) =>res.json())
        .then((data) => {
          // if(!data.Response) throw new Error('Search input is not valid')
          movies.value.push(...data.Search);
         loading.value = false
         
        })
        .catch(err=> {
          loading.value = false
          errorMsg.value = 'Search input is not valid';
        })
      }
     
    }
    onBeforeMount(fetchResults);
    const next = () => {
      
      page.value++
      fetchResults()
    }
    
    return { movies, page, next, loading, errorMsg };
  },
};
</script>
