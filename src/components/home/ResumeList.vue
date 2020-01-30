<template>
  <div class="ui vertical stripe segment">
    <div class="ui middle aligned grid container">
      <div class="row">
        <h2 class="ui header">{{ listTitle }}</h2>
      </div>
      <template v-for="(item, index) in list">
        <ResumeItem :key="item.title" :item="item"></ResumeItem>
        <div
          class="ui divider"
          :key="item.title"
          v-if="index !== list.length - 1"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import ResumeItem from './ResumeItem.vue';

export default {
  name: 'ResumeList',
  props: [ 'list', 'listTitle', ],
  components: {
    ResumeItem,
  },
};
</script>