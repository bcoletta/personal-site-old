<template>
  <div class="ui middle aligned center aligned grid">
    <div class="admin column">
      <h2 class="ui header">Add a Movie Rating</h2>
      <form class="ui form">
        <div class="ui stacked segment">
          <div name="title" class="ui field">
            <label>Title</label>
            <MovieSelect @select="selectMovie"></MovieSelect>
          </div>
          <div name="entertainment" class="ui field">
            <label>Entertainment</label>
            <input type="number" v-model="entertainment"/>
          </div>
          <div name="story" class="ui field">
            <label>Story</label>
            <input type="number" v-model="story"/>
          </div>
          <div name="date" class="ui field">
            <label>Date Watched</label>
            <div class="ui calendar">
              <div class="ui input left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="Date watched" name="date" autocomplete="off"/>
              </div>
            </div>
          </div>
          <div name="review" class="ui field">
            <label>Review</label>
            <textarea v-model="review" rows="3"></textarea>
          </div>
          <button
            type="button"
            class="ui fluid primary button"
            :class="{ disabled: !valid }"
            @click="save"
          >Save
          </button>
        </div>
      </form>
      <div v-if="error" class="ui error message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import MovieSelect from '@/components/admin/MovieSelect';
import MovieService from '@/services/api/movie-service';

export default {
  name: 'AddMovie',
  components: {
    MovieSelect,
  },
  data() {
    return {
      tmdbId: null,
      title: '',
      date: '',
      entertainment: 0,
      story: 0,
      review: '',
      error: null,
    };
  },
  computed: {
    valid() {
      return (
        this.title.length > 0 &&
        this.entertainment > 0 &&
        this.entertainment <= 10 &&
        this.story > 0 &&
        this.story <= 10 &&
        this.review.length > 0
      );
    },
  },
  methods: {
    selectMovie(movie) {
      this.tmdbId = movie.val;
      this.title = movie.text;
    },
    save() {
      this.date = $('.ui.calendar').calendar('get date')[0];
      if (this.valid && this.date) {
        this.error = null;
        let body = {
          password: this.$store.getters.password,
          title: this.title,
          date: `${this.date.getMonth() +
          1}/${this.date.getDate()}/${this.date.getFullYear()}`,
          e: this.entertainment,
          s: this.story,
        };
        MovieService.addMovie(body);
      } else {
        this.error = 'Invalid form! Please fill out all fields before saving';
      }
    },
  },
  mounted() {
    $('.ui.form').form();
    $('.ui.calendar').calendar({
      type: 'date',
    });
  },
};
</script>

<style lang="less" scoped>
.admin.column {
  max-width: 450px;
}
</style>
