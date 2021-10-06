<script>
import Vue from 'vue';
import VueStarRate from '@/vue-star-rate.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueStarRate
  },
  methods: {
    rated(rating) {
      console.log("You rated: " + rating)
    }
  }
});
</script>

<template>
  <div id="app">
    <vue-star-rate v-on:ratingSet="rated" />
  </div>
</template>
