<template>
  <div class="ui orange segment">
    <h3 class="ui header">
      <img class="ui image" :src="data.poster" :alt="`Movie poster for ${data.title}`">
      <div class="content">
        {{ data.title }}
        <div class="sub header">{{ data.tagline }}</div>
      </div>
    </h3>
    <template v-if="!loading">
      <div class="ui grid">
        <div class="row">
          <div class="four wide computer four wide tablet eight wide mobile column">
            <h5 class="ui header">Entertainment:</h5>
            {{ data.e }}
          </div>
          <div class="four wide computer four wide tablet eight wide mobile column">
            <h5 class="ui header">Story:</h5>
            {{ data.s }}
          </div>
          <div class="four wide computer four wide tablet eight wide mobile column">
            <h5 class="ui header">Release Date:</h5>
            {{ data.release | formatDate }}
          </div>
          <div class="four wide computer four wide tablet eight wide mobile column">
            <h5 class="ui header">Watch Date:</h5>
            {{ data.date | formatDate }}
          </div>
        </div>
        <div class="row">
          <div class="eight wide computer sixteen wide tablet column">
            <h5 class="ui header">Top Billed Cast:</h5>
            <div class="ui horizontal list">
              <div class="item" v-for="c in data.cast" :key="c.id">
                <img v-if="c.profile_path"
                     :src="`https://www.themoviedb.org/t/p/w300_and_h300_bestv2${c.profile_path}`"
                     :alt="`${c.name}'s Profile Photo`" class="ui avatar image">
                <i v-else class="big middle aligned user circle icon"></i>
                <div class="content">
                  {{ c.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="eight wide computer sixteen wide tablet column">
            <h5 class="ui header">{{ data.directors.length === 1 ? 'Director' : 'Directors' }}:</h5>
            <div class="ui horizontal list">
              <div class="item" v-for="d in data.directors" :key="d.id">
                <img v-if="d.profile_path"
                     :src="`https://www.themoviedb.org/t/p/w300_and_h300_bestv2${d.profile_path}`"
                     :alt="`${d.name}'s Profile Photo`" class="ui avatar image">
                <i v-else class="big middle aligned user circle icon"></i>
                <div class="content">
                  {{ d.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="data.review">
          <div class="column">
            <h5 class="ui header">Two Sentence Review:</h5>
            {{ data.review }}
          </div>
        </div>
      </div>
    </template>
    <div class="ui active inline loader" v-else></div>
  </div>
</template>

<script>
import TMDB from '@/services/tmdb/tmdb-api-service';
import '@/utils/filters/date-filters';

export default {
  name: 'MovieDetails',
  props: [ 'movie' ],
  data() {
    return {
      loading: true,
      details: {
        genres: [],
        poster_path: '',
        release_date: '',
        tagline: '',
      },
      credits: { cast: [], crew: [] },
    }
  },
  computed: {
    id() {
      return this.movie.tmdbId;
    },
    data() {
      return {
        ...this.movie,
        genres: this.details.genres.map(g => g.name),
        poster: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.details.poster_path}`,
        release: this.details.release_date,
        tagline: this.details.tagline,
        directors: this.credits.crew.filter(c => c.job === 'Director'),
        cast: [ ...this.credits.cast ].sort((a, b) => b.order < a.order).slice(0, 4),
      }
    },
  },
  methods: {
    getMovieData() {
      this.loading = true;
      const promises = [];
      promises.push(TMDB.get(`movie/${this.id}`).then(res => {
        this.details = res;
      }));
      promises.push(TMDB.get(`movie/${this.id}/credits`).then(res => {
        this.credits = res;
      }));
      Promise.all(promises).then(() => {
        this.loading = false;
      })
    },
  },
  mounted() {
    this.getMovieData();
  },
  watch: {
    id(val, old) {
      if (val !== old) {
        this.getMovieData()
      }
    },
  },
}
</script>
