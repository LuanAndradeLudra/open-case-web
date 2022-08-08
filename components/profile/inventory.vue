<template>
  <div class="inventory" :key="key">
    <b-overlay :show="overlay" rounded="sm" variant="transparent">
      <div class="inventory-menu">
        <div class="menu-item active">SEUS ITENS {{ drops.length }}</div>
      </div>
      <button
        v-if="drops.length"
        class="blue-button"
        @click="loading ? null : sellAll()"
      >
        <b-spinner v-if="loading" label="Spinning" small></b-spinner
        ><span v-else>Vender tudo</span>
      </button>
      <div class="items">
        <div
          v-for="(drop, index) in drops"
          :key="index"
          class="item"
          :class="`item-${drop.weapon.item_rarity}`"
        >
          <div class="item_type">
            <span v-if="drop.statTrak">StatTrak - </span
            >{{ getItemType(drop.type) }}
          </div>
          <img
            :src="`${$config.env.storageUrl}weapons/${drop.weapon.image.preview}`"
          />
          <div class="weapon-info">
            {{ drop.weapon.item_type }} <br />
            {{ drop.weapon.name }}
          </div>
          <button @click="drop.loading ? null : sellDrop(drop._id, index)">
            <span v-if="drop.loading">
              <b-spinner label="Spinning" small></b-spinner></span
            ><span v-else>R$ {{ drop.weapon.item_price[drop.type].toFixed(2) }}</span>
          </button>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      overlay: true,
      drops: [],
      key: 0,
    };
  },
  created() {
    this.loadInventory();
  },
  methods: {
    async loadInventory() {
      try {
        const inventoryData = await this.$axios.get("/users/inventory");
        this.drops = inventoryData.data.data.drops;
        this.overlay = false;
      } catch (err) {
        this.overlay = false;
        this.$toast.open({
          message: "Houve um erro ao carregar o inventário",
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
    async sellAll() {
      try {
        this.loading = true;
        this.overlay = true;
        for (let i = 0; i < this.drops.length; i++) {
          await this.$axios.get(`/games/selldrop/${this.drops[i]._id}`);
        }
        await this.$auth.fetchUser();
        await this.loadInventory();
        this.$toast.open({
          message: "Todos os itens foram vendidos!",
          type: "success",
          position: "top-right",
          duration: 4000,
        });
        this.loading = false;
        this.overlay = false;
      } catch (err) {
        this.overlay = false;
        this.$toast.open({
          message: "Houve um erro ao tentar vender o item",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    },
    async sellDrop(id, index) {
      try {
        this.drops[index].loading = true;
        this.key++;
        await this.$axios.get(`/games/selldrop/${id}`);
        await this.$auth.fetchUser();
        await this.loadInventory();
        this.$toast.open({
          message: "Item vendido!",
          type: "success",
          position: "top-right",
          duration: 4000,
        });
      } catch (err) {
        this.$toast.open({
          message: "Houve um erro ao tentar vender o item",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.inventory {
  margin-top: 64px;
  margin-bottom: 32px;
  .inventory-menu {
    display: flex;
    margin: 32px 0;
    width: 100%;
    border-bottom: 2px solid rgba(173, 173, 173, 0.445);
    .menu-item {
      padding: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid #13cdff;
      }
    }
  }
  .blue-button {
    color: white;
    padding: 10px;
    background: linear-gradient(
      15deg,
      rgba(8, 29, 46, 1) 0%,
      rgba(7, 11, 24, 1) 70%
    );
    border: 2px solid #13cdff;
    margin-bottom: 24px;
  }
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 26px;
    .item {
      position: relative;
      padding: 12px;
      min-height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: radial-gradient(
        circle,
        rgba(49, 55, 84, 1) 0%,
        rgba(30, 35, 57, 1) 70%
      );
      font-size: 14px;
      color: rgb(201, 201, 201);
      .item_type {
        text-align: right;
      }
      img {
        width: 100%;
      height: 155px;
      object-fit: contain;
      transition: 0.2s;
      }
      button {
        position: absolute;
        top: 12px;
        left: -12px;
        padding: 4px;
        color: white;
        background: #213b0c;
        border: 2px solid #9bfb4d;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}
</style>
