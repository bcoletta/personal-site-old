<template>
  <div class="ui basic container segment">
    <form class="ui form" @submit.prevent="submit">
      <div class="ui field">
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>
      <button
        type="submit"
        class="ui fluid primary button"
        :class="{ disabled: !valid }"
      >Submit</button>
    </form>
    <div class="ui error message" v-if="error">Invalid password</div>
  </div>
</template>

<script>
import UserService from '@/services/api/user-service';

export default {
  name: 'Password',
  data() {
    return {
      password: '',
      error: false,
    };
  },
  computed: {
    valid() {
      return this.password && this.password.length > 0;
    },
  },
  methods: {
    submit() {
      UserService.validateUser(this.password).then(res => {
        if (!res.valid) {
          this.error = true;
        } else {
          this.error = false;
          this.$store.commit('setPassword', this.password);
          this.$emit('validated');
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ui.container.segment {
  max-width: 450px;
}
</style>
