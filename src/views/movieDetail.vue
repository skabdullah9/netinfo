<template>
  <main v-if="!loading" class="py-28 text-gray-200 font-sans">
    <h1 class="text-2xl md:text-4xl font-mono">
      {{ movie.Title }} ({{ movie.Year }})
    </h1>
    <div v-if="movie.Poster != 'N/A'" class="relative inline-block mx-auto">
      <img
        :src="movie.Poster"
        class="mx-auto my-4 border-4 border-opacity-60 shadow-lg border-gray-900"
        alt=""
      />
      <p class="bg-green-600 absolute top-5 right-1 py-1 px-2 italic uppercase">
        {{ movie.Type }}
      </p>
    </div>
    <div>
      <h2
        v-if="movie.Released != 'N/A'"
        class="italic text-gray-200 text-xl inline-block border-2 border-pink-600 border-opacity-50 py-2 px-4 shadow-xl rounded-full my-2"
      >
        Released: {{ movie.Released }}
      </h2>
    </div>
    <h2 v-if="movie.imdbRating != 'N/A'" class="text-2xl my-2">
      IMDB:
      <span class="text-yellow-400">
        <i class="fa fa-star"></i> {{ movie.imdbRating }}
      </span>
    </h2>
    <p v-if="movie.Plot != 'N/A'" class="max-w-4xl mx-auto text-xl">
      {{ movie.Plot }}
    </p>
    <div
      class="flex justify-center items-start flex-col md:flex-row my-5 text-base"
    >
      <p
        v-if="movie.Genre != 'N/A'"
        class="border-2 border-pink-600 border-opacity-50 py-2 px-4 shadow-lg rounded-full mr-5 mb-3"
      >
        Genre: <span class="text-yellow-400 italic">"{{ movie.Genre }}"</span>
      </p>
      <p
        v-if="movie.Language != 'N/A'"
        class="border-2 border-pink-600 border-opacity-50 py-2 px-4 shadow-lg rounded-full"
      >
        Language:
        <span class="text-yellow-400 italic">"{{ movie.Language }}"</span>
      </p>
    </div>
    <h2
      v-if="movie.Actors != 'N/A'"
      class="text-xl mt-5 flex justify-center flex-wrap"
    >
      Cast:
      <span
        class="bg-pink-600 rounded-full px-3 m-1 text-base shadow-lg"
        v-for="actor in movie.Actors"
        :key="actor"
        >{{ actor }}</span
      >
    </h2>

    <div
      class="mt-6 bg-gray-800 bg-opacity-40 rounded-lg inline-block py-3 px-6 font-mono"
    >
      <h2 class="text-gray-200 py-1">
        Runtime: <span class="text-yellow-400">{{ movie.Runtime }}</span>
      </h2>
      <h2 class="text-gray-200 py-1">
        Box Office: <span class="text-yellow-400">{{ movie.BoxOffice }}</span>
      </h2>
    </div>
  </main>
  <main v-else class="h-screen flex items-center justify-center">
    <div>
      <img src="@/assets/loading.gif" class="h-1/5 w-1/5 mx-auto" alt="" />
      <h1 class="text-gray-300 text-3xl font-mono">Working on it...</h1>
    </div>
  </main>
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
      fetch(
        `https://www.omdbapi.com/?apikey=${env.apiKey}&i=${id.id}&plot=full`
      )
        .then((res) => res.json())
        .then((data) => {
          movie.value = data;
          loading.value = false;
          movie.value.Actors = movie.value.Actors.split(", ");
        });
    });

    return { movie, loading };
  },
};
</script>

