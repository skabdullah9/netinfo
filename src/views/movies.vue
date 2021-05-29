<template>
  <main v-if="loading" class="h-screen flex items-center justify-center">
    <div>
      <img src="@/assets/loading.gif" class="h-1/5 w-1/5 mx-auto" alt="" />
      <h1 class="text-gray-300 text-3xl font-mono">Working on it...</h1>
    </div>
  </main>
  <main
    v-if="errorMsg != ''"
    class="h-screen flex items-center flex-col justify-center"
  >
    <h1 class="text-5xl md:text-8xl text-gray-200 font-mono mb-8 animate-pulse">
      <i class="fa fa-exclamation-triangle"></i>
    </h1>
    <h1 class="text-3xl md:text-5xl text-gray-200 font-mono">{{ errorMsg }}</h1>
    <router-link
      to="/"
      class="bg-gray-700 text-white text-2xl text-xl px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-color my-10 border-none focus:outline-none"
    >
      <i
        class="fa fa-chevron-left text-base leading-8 transform text-green-500 -mt-4 inline-block"
      ></i>
      Go Back</router-link
    >
  </main>

  <main v-else class="pt-24 font-sans pb-16">
    <div v-if="!loading && !errorMsg" class="flex justify-center items-center">
      <h1
        class="text-gray-200 font-mono italic bg-gray-800 bg-opacity-40 p-3 rounded-lg text-2xl md:text-4xl ml-auto transform translate-x-1/4 mr-16"
      >
        "{{ search.search }} ({{ totalResults }})"
      </h1>

      <select
        v-model="filter"
        @change="filterResults"
        class="form-select cursor-pointer font-mono ml-auto bg-gray-800 text-gray-200 rounded-lg p-2 shadow-lg focus:outline-none"
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="game">Games</option>
        <option value="series">Series</option>
      </select>
    </div>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr pt-8"
    >
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        class="text-white p-1 pb-5 bg-gray-900 bg-opacity-70 rounded-lg relative cursor-pointer hover:bg-opacity-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      >
        <router-link
          :to="{ name: 'movieDetail', params: { id: movie.imdbID } }"
        >
          <img
            :src="movie.Poster"
            class="h-60 w-full object-cover mx-auto block rounded-t-lg bg-gray-700 bg-opacity-50 font-mono"
            alt="Poster unavailable"
            style="line-height: 230px"
          />
          <div class="info text-white">
            <p
              class="bg-green-600 absolute rounded top-1 right-1 py-1 px-2 text-base shadow-lg italic"
            >
              {{ movie.Year }}
            </p>
            <h3 class="my-2 italic text-bold text-xl">{{ movie.Title }}</h3>
            <h4 class="text-gray-400 italic">Type: {{ movie.Type }}</h4>
          </div>
        </router-link>
      </div>
    </section>
  </main>

  <button
    @click="next"
    v-if="!loading && !errorMsg && totalResults > 10 && resultsPerPage > 9"
    class="bg-gray-700 text-white text-2xl text-xl px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-color my-10 border-none focus:outline-none"
  >
    More
    <i
      class="fa fa-chevron-right text-base leading-8 transform text-green-500"
    ></i>
  </button>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import env from "@/env.js";
export default {
  name: "movies",
  props: ["search"],

  setup(search) {
    let movies = ref([]);
    let totalResults = ref(null);
    let page = ref(1);
    let resultsPerPage = ref(0);
    let loading = ref(true);
    let errorMsg = ref("");
    let filter = ref("");
    let moreBtnClicked = ref(false);

    const fetchResults = () => {
      if (search.search !== undefined) {
        fetch(
          `https://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.search}&page=${page.value}&type=${filter.value}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.Response == "False") {
              throw new Error("Search input is not valid");
            }
            moreBtnClicked.value
              ? movies.value.push(...data.Search)
              : (movies.value = data.Search);
            loading.value = false;
            totalResults.value = data.totalResults;
            resultsPerPage.value = data.Search.length;
          })
          .catch((err) => {
            loading.value = false;
            errorMsg.value = "Results not found";
          });
      }
    };
    onBeforeMount(fetchResults);
    const next = () => {
      moreBtnClicked.value = true;
      page.value++;
      fetchResults();
    };

    const filterResults = () => {
      moreBtnClicked.value = false;
      page.value = 1;
      fetchResults();
    };

    return {
      search,
      movies,
      page,
      next,
      loading,
      errorMsg,
      filter,
      filterResults,
      totalResults,
      resultsPerPage,
    };
  },
};
</script>
