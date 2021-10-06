<template>
  <div class="vue-star-rate">
    <ul class="list">
      <li
        v-for="(icon, index) in maxIcon"
        :class="{ active: icon <= stars }"
        :key="index"
        :style="styleObject"
        class="star"
        @click="rate(icon)"
      >
        <v-icon
          :style="{
            height: `${iconHeight}px`,
            width: `${iconWidth}px`,
            padding: `0px 2px`,
          }"
          :name="icon <= stars ? iconShape : iconShape"
        />
      </li>
    </ul>
    <span v-if="hasCounter">{{ stars }} of {{ maxIcon }}</span>
  </div>
</template>

<script>
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
export default {
  name: "VueStarRate",
  props: {
    rateRange: {
      type: Number,
      default: 3,
      required: false,
    },
    maxIcon: {
      type: Number,
      default: 5,
    },
    iconHeight: {
      type: Number,
      default: 25,
    },
    iconWidth: {
      type: Number,
      default: 25,
    },
    hasCounter: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: "#f3d23e",
    },
    iconColorHover: {
      type: String,
      default: "#f3d23e",
    },
    iconShape: {
      type: String,
      default: "star",
    },
  },
  components: { "v-icon": Icon },
  data() {
    return {
      stars: this.rateRange || 0,
    };
  },
  computed: {
    counter() {
      return `${this.stars} of ${this.maxIcon}`;
    },
    styleObject() {
      return {
        "--icon-color": this.iconColor,
        "--icon-color-hover": this.iconColorHover,
      };
    },
  },
  methods: {
    rate(icon) {
      if (Number(icon) && icon <= this.maxIcon && icon >= 0) {
        this.stars = this.stars === icon ? icon - 1 : icon;
        this.$emit('ratingSet', this.stars);
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
  color: var(--icon-color);
}
.star {
  display: inline-block;
  cursor: pointer;
}
.star:hover ~ .star:not(.active) {
  color: inherit;
}
.active {
  color: var(--icon-color-hover);
}
</style>
