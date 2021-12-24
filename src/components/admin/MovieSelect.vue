<template>
  <div id="movie-select" class="ui fluid search selection dropdown">
    <input type="hidden" name="title" />
    <i class="dropdown icon"></i>
    <input type="text" class="search" />
    <div class="default text">Enter a title...</div>
    <div class="menu"></div>
  </div>
</template>

<script>
import TMDBService from '@/services/tmdb/tmdb-api-service';

export default {
  name: 'MovieSelect',
  methods: {
    initDropdown() {
      const _this = this;
      $('#movie-select').dropdown({
        saveRemoteData: false,
        apiSettings: {
          url: TMDBService.searchUrl,
          urlData: {
            query: $('#multi-select .search').val(),
          },
          onResponse(res) {
            return {
              success: true,
              results: res.results.map((m) => {
                return {
                  name: m.title,
                  value: m.id,
                  text: m.title,
                  image: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${m.poster_path}`,
                };
              }),
            };
          },
        },
        onChange(val, text) {
          _this.$emit('select', { val, text });
        },
      });
    },
  },
  mounted() {
    this.initDropdown();
  },
  updated() {
    this.initDropdown();
  },
};
</script>
