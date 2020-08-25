<template>
  <div class="ui basic segment">
    <Password v-if="!validated" @validated="() => { validated = true }" />
    <AddMovie v-else />
  </div>
</template>

<script>
import Password from '@/components/admin/Password';
import AddMovie from '@/components/admin/AddMovie';

export default {
  name: 'Admin',
  components: {
    Password,
    AddMovie,
  },
  data() {
    return {
      validated: false,
    };
  },
};
</script>
