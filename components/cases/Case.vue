<template>
  <div class="case containered">
    <div v-if="!spin" class="box-info">
      <span class="come-back" @click="back()"> Voltar</span>
      <div class="box-title">
        {{ box.name }}
      </div>
      <div class="box-thumb">
        <img :src="`${$config.env.storageUrl}box/${box.image.preview}`" />
        <div class="side-arrow left">
          <img src="https://csgo.net/public/img/fx/case-frame.svg" alt="" />
        </div>
        <div class="side-arrow right">
          <img src="https://csgo.net/public/img/fx/case-frame.svg" alt="" />
        </div>
      </div>
      <button v-if="canOpen()" class="button-price" @click="spin = true">
        Abrir por {{ getBoxPrice() }}
      </button>
      <button v-else class="button-price negate">
        Você precisa de {{ getBoxPrice() }}
      </button>
    </div>
    <div v-else>
      <casesSpin />
    </div>
    <casesWeapons :weapons="box.weapons" />
  </div>
</template>

<script>
export default {
  props: {
    box: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      spin: false,
    };
  },
  methods: {
    back() {
      this.$emit("page", { page: "/cases/list" });
    },
    getBoxPrice() {
      if (this.box.discount) {
        const discount = (this.box.price / 100) * this.box.discount;
        return `R$ ${(this.box.price - discount).toFixed(2).replace(".", ",")}`;
      } else return `R$ ${this.box.price.toFixed(2).replace(".", ",")}`;
    },
    canOpen() {
      if (this.box.discount) {
        const discount = (this.box.price / 100) * this.box.discount;
        return this.box.price - discount < this.$auth.user.inventory.wallet;
      } else return this.box.price < this.$auth.user.inventory.wallet;
    },
  },
};
</script>

<style lang="scss">
.case {
  padding: 24px 0;
  .box-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .come-back {
      font-size: 17px;
      color: rgb(189, 189, 189);
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        transform: scale(1.2);
        color: white;
      }
    }
    .box-title {
      font-size: 32px;
      font-weight: 700;
      margin: 16px 0;
    }
    .box-thumb {
      position: relative;
      img {
        width: 356px;
      }
      .side-arrow {
        position: absolute;
        top: 0;
        img {
          height: 280px;
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
    }
    .button-price {
      margin-top: 32px;
      min-width: 200px;
      min-height: 50px;
      color: white;
      font-size: 19px;
      font-weight: 700;
      background: linear-gradient(15deg, #0e4812 0%, rgba(7, 11, 24, 1) 70%);
      border: 2px solid #9bfb4d;
      transition: 0.2s;
      padding: 16px;
      &.negate {
        background: linear-gradient(15deg, #4b1722 0%, rgba(7, 11, 24, 1) 70%);
        border: 2px solid #ff3030;
      }
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
