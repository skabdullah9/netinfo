<template>
  <main v-if="!loading" class="grid grid-cols-4 gap-5 auto-rows-fr items-start min-h-screen pt-28 font-sans">
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
  <main v-else class="h-screen flex items-center justify-center">
    <div>
      <img src="@/assets/loading.gif" class="h-1/4 w-1/4 mx-auto filter contrast-200 invert-1" alt="">

    </div>
  </main>

    <button @click="next" class="bg-gray-700 text-white text-2xl text-xl px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-color my-10 border-none focus:outline-none">More <i class="fa fa-chevron-right text-base leading-8 transform text-green-500"></i></button>
    <router-link to="/"><i class="fa fa-search text-3xl text-gray-200 absolute top-28 rigth-2 md:right-8 hover:text-gray-100 animate-bounce"></i></router-link>
    
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
   
    const fetchResults = () => {
      if(search.search !== undefined) {
         fetch(`https://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.search}&page=${page.value}`)
        .then((res) => res.json())
        .then((data) => {
          
          movies.value.push(...data.Search);
         loading.value = false
         console.log(loading.value);
        });
      }
     
    }
    onBeforeMount(fetchResults);
    const next = () => {
      
      page.value++
      fetchResults()
      console.log(search.search !== undefined);
    }
    
    return { movies, page, next, loading };
  },
};
</script>
