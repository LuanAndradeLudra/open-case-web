<template>
  <div class="cases-list containered">
    <b-overlay :show="overlay" rounded="sm" variant="transparent">
      <div
        v-for="(category, index) in categories"
        :key="`category${index}`"
        class="category"
      >
        <div class="title">
          <div class="title-main">{{ category.name }}</div>
        </div>
        <div class="boxes">
          <div
            v-for="(box, index) in category.boxes"
            :key="`box${index}`"
            class="box-item"
            @click="toBox(box)"
          >
            <img :src="`${$config.env.storageUrl}box/${box.image.preview}`" />
            <div class="box-name">{{ box.name }}</div>
            <div class="box-price">
              <span class="default-price" :class="{ discount: box.discount }"
                >R$ {{ box.price.toFixed(2).replace(".", ",") }}</span
              >
              <span v-if="box.discount" class="ml-2 discount-price"
                >R$ {{ getBoxPrice(box) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlay: true,
      categories: [],
    };
  },
  created() {
    this.loadBoxes();
  },
  methods: {
    async loadBoxes() {
      try {
        const boxResponse = await this.$axios.get("/categories/listbox");
        this.categories = boxResponse.data.data;
        this.overlay = false;
      } catch (err) {
        this.$toast.open({
          message:
            err.response.data.error ?? "Houve um erro ao carregar as caixas",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    },
    getBoxPrice(box) {
      const discount = (box.price / 100) * box.discount;
      return (box.price - discount).toFixed(2).replace(".", ",");
    },
    toBox(box) {
      this.$emit("page", { page: "/case", param: box });
    },
  },
};
</script>

<style lang="scss">
.cases-list {
  margin-top: 32px;
  .category {
    margin-bottom: 18px;
    .title {
      position: relative;
      width: 100%;
      display: flex;
      .title-main {
        flex: none;
        order: 1;
        padding-left: 12px;
        font-size: 19px;
        font-weight: 700;
        letter-spacing: 1.5px;
      }
      &::before {
        content: "";
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 3px;
        height: 24px;
        background-color: #13cdff;
        transform: skewX(-14deg);
        transition: 0.08s ease;
      }
      &::after {
        content: "";
        width: 100%;
        height: 2px;
        margin: auto 16px 0;
        background-color: #1e2339;
        order: 2;
      }
    }
    .boxes {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 20px;
      padding: 18px 0;
      .box-item {
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          transform: scale(1.04);
          .box-name {
            color: white;
          }
        }
        img {
          width: 100%;
          height: 200px;
        }
        .box-name {
          text-align: center;
          color: rgba(255, 255, 255, 0.678);
        }
        .box-price {
          margin-top: 12px;
          width: 100%;
          min-height: 40px;
          background: url("https://csgo.net/public/img/fx/case-price-accent.svg?v=2");
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          .default-price {
            color: white;
            &.discount {
              color: rgba(255, 255, 255, 0.678);
              font-size: 15px;
              text-decoration: line-through;
            }
          }
          .discount-price {
            color: #a00d1d;
          }
        }
      }
    }
  }
}
</style>
