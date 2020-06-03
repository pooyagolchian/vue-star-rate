<script>
import Vue from 'vue';
import VueStarRate from '@/vue-star-rate.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueStarRate
  }
});
</script>

<template>
  <div id="app">
    <vue-star-rate />
  </div>
</template>
