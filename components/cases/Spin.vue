<template>
  <div class="roulete">
    <VueSlickCarousel class="slider" ref="slider" v-bind="settings">
      <div
        v-for="(item, index) in 50"
        :key="index"
        class="carousel-item item-red"
      >
        <img
          src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09K_k4ifgP7nO4Tdn2xZ_Ishib2Urd33jQTt_xZuMT30J4THJ1U_aQ2CrgDqw7johMS9vJzBmCRhpGB8sq3xhCxI/184fx138f/image.png"
        />
        <div class="item-title">
          <div>AK-47</div>
          <div>Nightwish</div>
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
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false,
        infinite: true,
        speed: 8000,
        slidesToShow: 5,
        slidesToScroll: 5,
        centerMode: true,
        centerPadding: "120px",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.slider.goTo(25);
    }, 600);
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
