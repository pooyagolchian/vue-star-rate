<template>
  <div class="vue-star-rate">
    <ul class="list">
      <li
        v-for="(star, index) in maxStars"
        :class="{ active: star <= stars }"
        class="star"
        :key="index"
        @click="rate(star)"
      >
        <v-icon
          :style="{ height: `${starHeight}px`, width: `${starWidth}px` }"
          :name="star <= stars ? 'star' : 'star'"
        />
      </li>
    </ul>
    <span v-if="hasCounter">{{ stars }} of {{ maxStars }}</span>
  </div>
</template>

<script>
import "vue-awesome/icons/star";
import Icon from "vue-awesome/components/Icon";
export default {
  props: {
    grade: {
      type: Number,
      required: false,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
    starHeight: {
      type: Number,
      default: 35,
    },
    starWidth: {
      type: Number,
      default: 35,
    },
    hasCounter: {
      type: Boolean,
      default: true,
    },
  },
  components: { "v-icon": Icon },
  name: "VueStarRate",
  data() {
    return {
      stars: this.grade || 0,
    };
  },
  computed: {
    counter() {
      return `${this.stars} of ${this.maxStars}`;
    },
  },
  methods: {
    rate(star) {
      if (Number(star) && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
      }
    },
  },
};
</script>
<style scoped="scss">
.vue-star-rate {
  font-size: 14px;
  color: #a7a8a8;
}
.list {
  margin: 0 0 5px 0;
  padding: 0;
  list-style-type: none;
}
.list:hover .star {
  color: #f3d23e;
}
.star {
  display: inline-block;
  cursor: pointer;
}
.star:hover ~ .star:not(.active) {
  color: inherit;
}
.active {
  color: #f3d23e;
}
</style>
