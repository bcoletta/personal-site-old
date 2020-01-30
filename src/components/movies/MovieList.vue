<template>
  <div class="ui basic segment">
    <div id="list-header">
      <div class="ui icon search input">
        <input placeholder="Search for a movie..." v-model="filter" />
        <i class="search icon"></i>
      </div>
      <div class="ui top right pointing icon dropdown button">
        <i class="sort icon"></i>
        <div class="menu">
          <div class="header">Sort by:</div>
          <div class="item" data-value="date">Date Watched</div>
          <div class="item" data-value="title">Title</div>
          <div class="item" data-value="e">Entertainment</div>
          <div class="item" data-value="s">Story</div>
        </div>
      </div>
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
          <h3 class="header">
            {{ movie.title }}
            <span class="ui sub header date">{{movie.date}}</span>
          </h3>
          <div class="description">Entertainment: {{ movie.e }}</div>
          <div class="description">Story: {{ movie.s }}</div>
        </div>
      </div>
      <div class="movie-list item" v-if="sortedData.length === 0">
        <div class="content">
          <div
            class="description"
          >The movie, {{ filter }}, doesn't exist. Perhaps the archives are incomplete.</div>
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
      sort: 'date',
    };
  },
  computed: {
    sortedData() {
      if (this.data) {
        return [ ...this.data, ].sort((a, b) => {
          if (this.sort === 'date') {
            return new Date(a.date) < new Date(b.date) ? 1 : -1;
          } else if (this.sort === 'title') {
            return a[this.sort] > b[this.sort] ? 1 : -1;
          } else {
            return a[this.sort] < b[this.sort] ? 1 : -1;
          }
        });
      }
      return [];
    },
  },
  methods: {
    emitData(val) {
      this.$emit('filtered', val);
    },
  },
  mounted() {
    var _this = this;
    $('.ui.dropdown').dropdown({
      onChange(val) {
        _this.$router.push({ query: { orderBy: val, }, });
      },
    });
  },
  watch: {
    filter: 'emitData',
    '$route.query.orderBy'(val) {
      this.sort = val;
    },
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
#list-header {
  display: flex;
  width: 100%;
  .ui.search.input {
    flex-grow: 1;
  }
  .ui.dropdown.button {
    margin-left: 0.5em;
  }
}
</style>