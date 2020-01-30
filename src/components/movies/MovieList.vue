<template>
  <div class="ui basic segment">
    <div class="ui fluid icon search input">
      <input placeholder="Search for a movie..." v-model="filter" />
      <i class="search icon"></i>
    </div>
    <div class="ui scrolling selection list">
      <div
        class="movie-list item"
        data-test="test"
        @click="() => {filter = movie.title}"
        v-for="(movie, i) in sortedData"
        :key="i"
        :id="movie.title"
      >
        <div class="content">
          <h3 class="header">{{ movie.title }}<span class="ui sub header date">{{movie.date}}</span></h3>
          <div class="description">Entertainment: {{ movie.e }}</div>
          <div class="description">Story: {{ movie.s }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: [ 'data', ],
  data() {
    return {
      filter: '',
    };
  },
  computed: {
    sortedData() {
      if (this.data) {
        return [...this.data].sort((a, b) => (new Date(a.date) < new Date(b.date)) ? 1 : -1);
      }
      return [];
    },
  },
  methods: {
    emitData(val) {
      this.$emit('filtered', val);
    },
  },
  watch: {
    'filter': 'emitData',
  },
};
</script>

<style lang="less" scoped>
.ui.scrolling.list {
  max-height: 70vh;
  overflow-y: scroll;
}
.date {
  float: right;
}
</style>