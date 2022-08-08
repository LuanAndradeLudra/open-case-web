<template>
  <div class="drop-item">
    <div class="drop-info">
      <span class="come-back" @click="back()"> Voltar</span>
      <div class="drop-title">
        <span v-if="weapon.statTrak">StatTrak - </span>
        {{ weapon.weapon.item_type }} {{ weapon.weapon.name }} - {{ getItemType(weapon.type) }}
      </div>
      <div class="drop-thumb">
        <img
          :src="`${$config.env.storageUrl}weapons/${weapon.weapon.image.preview}`"
        />
        <div class="side-arrow left">
          <img src="https://csgo.net/public/img/fx/case-frame.svg" alt="" />
        </div>
        <div class="side-arrow right">
          <img src="https://csgo.net/public/img/fx/case-frame.svg" alt="" />
        </div>
      </div>
      <div class="d-flex" style="gap: 16px">
        <button v-if="canOpen()" class="button-price" @click="openCase()">
          Abrir novamente por {{ getBoxPrice() }}</button
        ><button v-else class="button-price negate">
          Você precisa de {{ getBoxPrice() }}
        </button>
        <button
          v-if="!selled"
          class="button-price green"
          @click="loading ? null : sellDrop()"
        >
          <span v-if="loading"> <b-spinner label="Spinning"></b-spinner></span>
          <span v-else>Vender por R$ {{ getWeaponPrice() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weapon: {
      type: Object,
      default: {},
    },
    box: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      selled: false,
      loading: false,
    };
  },
  methods: {
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
    getWeaponPrice() {
      return this.weapon.weapon.item_price[this.weapon.type].toFixed(2);
    },
    async sellDrop() {
      try {
        this.loading = true;
        await this.$axios.get(`/games/selldrop/${this.weapon._id}`);
        await this.$auth.fetchUser();
        this.$toast.open({
          message: "Item vendido!",
          type: "success",
          position: "top-right",
          duration: 4000,
        });
        this.selled = true;
        this.loading = false;
      } catch (err) {
        this.$toast.open({
          message: "Houve um erro ao tentar vender o item",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    },
    getItemType(type) {
      switch (type) {
        case "factory_new":
          return "Factory New";
        case "factory_new_st":
          return "Factory New";
        case "minimal_wear":
          return "Minimal Wear";
        case "minimal_wear_st":
          return "Minimal Wear";
        case "field_tested":
          return "Field Tested";
        case "field_tested_st":
          return "Field Tested";
        case "well_worn":
          return "Well Worn";
        case "well_worn_st":
          return "Well Worn";
        case "battle_scarred":
          return "Battle Scarred";
        case "battle_scarred_st":
          return "Battle Scarred";
      }
    },
    openCase() {
      this.$emit("reopen");
    },
  },
};
</script>

<style lang="scss">
.drop-item {
  margin-bottom: 80px;
  .drop-info {
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
    .drop-title {
      font-size: 32px;
      font-weight: 700;
      margin: 16px 0;
    }
    .drop-thumb {
      position: relative;
      img {
        width: 546px;
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
      transition: 0.2s;
      padding: 16px;
      background: linear-gradient(
        15deg,
        rgba(8, 29, 46, 1) 0%,
        rgba(7, 11, 24, 1) 70%
      );
      border: 2px solid #13cdff;
      &.green {
        background: linear-gradient(15deg, #0e4812 0%, rgba(7, 11, 24, 1) 70%);
        border: 2px solid #9bfb4d;
      }
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
