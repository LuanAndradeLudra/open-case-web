<template>
  <div class="roulete">
    <div v-if="!showDrop">
      <VueSlickCarousel class="slider" ref="slider" v-bind="settings">
        <div
          v-for="(weapon, index) in round.round"
          :key="index"
          class="carousel-item"
          :class="`item-${weapon.weapon.item_rarity}`"
        >
          <img
            :src="`${$config.env.storageUrl}weapons/${weapon.weapon.image.preview}`"
          />
          <div class="item-title">
            <div>{{ weapon.weapon.item_type }}</div>
            <div>{{ weapon.weapon.name }}</div>
          </div>
        </div>
      </VueSlickCarousel>
      <div class="side-arrow left">
        <img src="https://csgo.net/public/img/fx/case-frame.svg" alt="" />
      </div>
      <div class="side-arrow right">
        <img src="https://csgo.net/public/img/fx/case-frame.svg" alt="" />
      </div>
      <div class="shadow left"></div>
      <div class="shadow right"></div>
      <div class="marker"></div>
    </div>
    <casesDrop v-else :weapon="round.dropData" :box="box" @reopen="reopen()" />
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: { VueSlickCarousel },
  props: {
    round: {
      type: Object,
      default: {},
    },
    box: { type: Object, default: {} },
  },
  data() {
    return {
      showDrop: false,
      settings: {
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false,
        infinite: true,
        speed: 6000,
        slidesToShow: 5,
        slidesToScroll: 5,
        centerMode: true,
        centerPadding: "120px",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.slider.goTo(50);
    }, 800);
    setTimeout(() => {
      this.showDrop = true;
    }, 7500);
  },
  methods: {
    reopen() {
      this.showDrop = false;
      this.$emit("reopen");
    },
  },
};
</script>

<style lang="scss">
.roulete {
  position: relative;
  .marker {
    width: 3px;
    height: 100%;
    background: rgba(112, 112, 112, 0.678);
    position: absolute;
    top: 0;
    left: 50%;
  }
  .side-arrow {
    position: absolute;
    top: 0;
    img {
      height: 270px;
    }
    &.left {
      left: 0;
      transform: translateX(-100%);
    }
    &.right {
      right: 0;
      transform: translateX(100%) rotate(180deg);
    }
  }
  .shadow {
    position: absolute;
    top: 0;
    width: 120px;
    height: 268px;
    &.left {
      left: 0;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0) 0%,
        #0a0d1de3 50%
      );
    }
    &.right {
      right: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        #0a0d1de3 50%
      );
    }
  }
  .slider {
    .carousel-item {
      height: 270px;
      border: 2px solid #383f5e;
      background: radial-gradient(
        circle,
        rgba(49, 55, 84, 1) 0%,
        rgba(30, 35, 57, 1) 70%
      );
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 15px;
      img {
        width: 100%;
        pointer-events: none;
        object-fit: contain;
      }
      .item-title {
        text-align: center;
      }
    }
  }
}
</style>
