<template>
  <div class="row">
    <div class="four wide column">
      <h3 class="ui primary header">
        {{ item.title }}
        <div class="sub header">{{ item.position }}</div>
        <div class="sub header">{{ item.dates }}</div>
      </h3>
    </div>
    <div class="twelve wide column">
      <div class="ui list">
        <div class="item" v-for="(point, index) in item.points" :key="index">
          <i class="right triangle icon"></i>
          <div class="content">
            <div class="header" v-if="point.header">{{ point.header }}</div>
            <div class="description" v-if="point.description">{{ point.description }}</div>
            <span v-if="!point.header && !point.description">{{ point }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeItem',
  props: [ 'item' ],
};
</script>