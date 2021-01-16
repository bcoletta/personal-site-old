 <template>
  <div>
    <div class="ui inverted vertical masthead center aligned segment">
      <div class="ui container">
        <h2 class="ui inverted header">Movie Rankings</h2>
        <h5 class="header">
          All of 2019 I have been keeping track of movies that I've been
          watching and recently I started rating them based on their
          entertainment value and their story. I will update this as I watch
          movies which so check back every now and then to find new reasons to
          argue with me about movies.
        </h5>
        <div class="italic">
          Disclaimer: I am not in any way qualified to be ranking movies and I
          have terrible taste. Don't believe me? Two of my favorite movies of
          all time are Accepted and Hot Rod.
        </div>
      </div>
    </div>
    <div class="ui basic segment">
      <div class="ui container">
        <div class="ui active orange loader" v-if="loading"></div>
        <MovieDetails v-if="selectedMovie" :movie="selectedMovie"></MovieDetails>
        <div class="ui grid" v-if="!loading">
          <div class="ui row">
            <div class="sixteen wide mobile ten wide computer column">
              <MovieChart ref="movieChart" :data="displayMovies"></MovieChart>
            </div>
            <div class="sixteen wide mobile six wide computer column">
              <MovieList :data="displayMovies" @filtered="filterData" @select="movie => { selectedMovie = movie }"></MovieList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieChart from '@/components/movies/MovieChart.vue';
import MovieDetails from '@/components/movies/MovieDetails.vue';
import MovieList from '@/components/movies/MovieList.vue';

export default {
  name: 'movies',
  components: {
    MovieChart,
    MovieDetails,
    MovieList,
  },
  data() {
    return {
      movies: [],
      displayMovies: [],
      loading: true,
      selectedMovie: null,
    };
  },
  methods: {
    filterData(val) {
      if (val !== '') {
        this.displayMovies = this.movies.filter(d => d.title.toLowerCase().includes(val.toLowerCase()));
      } else {
        this.displayMovies = [ ...this.movies ];
      }
    },
    getData() {
      this.loading = true;
      this.$store.dispatch('getMovies').then(data => {
        this.movies = data;
        this.displayMovies = data;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.description {
  margin-bottom: 10px;
}
.italic {
  font-style: italic;
}
</style>