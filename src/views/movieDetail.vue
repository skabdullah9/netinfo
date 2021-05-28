<template>
  <main v-if="!loading" class="py-28 text-gray-200 font-sans">
    <h1 class="text-5xl font-mono">{{ movie.Title }} ({{ movie.Year }})</h1>
    <div class="relative inline-block mx-auto">
      <img
        :src="movie.Poster"
        class="mx-auto my-4 border-4 shadow-lg border-gray-900"
        alt=""
      />
      <p class="bg-green-600 absolute top-5 right-1  py-1 px-2 rounded italic uppercase ">
        {{ movie.Type }}
      </p>
    </div>
    <div>
    <h2
      class="italic text-gray-300 text-xl inline-block border-2 border-pink-600 border-opacity-50 py-2 px-4 shadow-xl rounded-full my-1"
    >
      Released: {{ movie.Released }}
    </h2>
    </div>
    <h2 class="text-2xl my-2">
      IMDB:
      <span class="text-yellow-400">
        <i class="fa fa-star"></i> {{ movie.imdbRating }}
      </span>
    </h2>
    <p class="max-w-4xl mx-auto text-xl">{{ movie.Plot }}</p>
    <div class="flex justify-center my-5 text-base ">
    <p class="border-2 border-pink-600 border-opacity-50 py-2 px-4 shadow-lg rounded-full mr-5">Genre: <span class="text-yellow-400 italic">"{{movie.Genre}}"</span> </p>
    <p class="border-2 border-pink-600 border-opacity-50 py-2 px-4 shadow-lg rounded-full">Language: <span class="text-yellow-400 italic">"{{movie.Language}}"</span></p>

    </div>
    <h2 class="text-xl mt-8 ">Cast: <span class="bg-green-700 rounded-full py-2 px-3 m-1 text-base" v-for="actor in movie.Actors">{{actor}}</span></h2>
  </main>
  <main v-else class="h-screen flex items-center justify-center">
    <div>
      <img src="@/assets/loading.gif" class="h-1/3 w-1/3 mx-auto" alt="" />
    </div>
  </main>
  <button @click="$router.go(-1)">
    <i
      class="fa fa-arrow-left text-3xl text-gray-200 absolute top-28 left-8"
    ></i>
  </button>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import env from "@/env.js";
export default {
  name: "movieDetail",
  props: ["id"],

  setup(id) {
    let movie = ref({});
    let loading = ref(true);
    onBeforeMount(() => {
      fetch(`http://www.omdbapi.com/?apikey=${env.apiKey}&i=${id.id}&plot=full`)
        .then((res) => res.json())
        .then((data) => {
          movie.value = data;
          loading.value = false;
          console.log(movie.value);
          movie.value.Actors = movie.value.Actors.split(', ');
          console.log(movie.value.Actors);
        });
    });

    return { movie, loading };
  },
};
</script>

