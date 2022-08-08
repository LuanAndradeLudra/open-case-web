<template>
  <div class="weapons">
    <div
      v-for="(weapon, index) in weaponsBox"
      :key="index"
      class="weapon-item"
      :class="`item-${weapon.weapon.item_rarity}`"
    >
      <div class="weapon-rate">{{ weapon.drop_rate.toFixed(3) }} %</div>
      <img
        :src="`${$config.env.storageUrl}weapons/${weapon.weapon.image.preview}`"
      />
      <div class="weapon-info">
        <div>{{ weapon.weapon.item_type }}</div>
        <div>{{ weapon.weapon.name }}</div>
        <div class="weapon-price">
          R$ {{ weapon.weapon.item_price.factory_new }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weapons: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      weaponsBox: [],
    };
  },
  created() {
    this.organizer();
  },
  methods: {
    organizer() {
      const goldItems = this.weapons.filter(
        (item) => item.weapon.item_rarity === "bright-gold"
      );
      this.weaponsBox.push(...goldItems);
      const redItems = this.weapons.filter(
        (item) => item.weapon.item_rarity === "red"
      );
      this.weaponsBox.push(...redItems);
      const pinkItems = this.weapons.filter(
        (item) => item.weapon.item_rarity === "pink"
      );
      this.weaponsBox.push(...pinkItems);
      const purpleItems = this.weapons.filter(
        (item) => item.weapon.item_rarity === "purple"
      );
      this.weaponsBox.push(...purpleItems);
      const blueItems = this.weapons.filter(
        (item) => item.weapon.item_rarity === "blue"
      );
      this.weaponsBox.push(...blueItems);
    },
  },
};
</script>

<style lang="scss">
.weapons {
  margin-top: 60px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  .weapon-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid #383f5e;
    background: radial-gradient(
      circle,
      rgba(49, 55, 84, 1) 0%,
      rgba(30, 35, 57, 1) 70%
    );
    padding: 15px;
    color: rgb(183, 188, 219);
    img {
      width: 100%;
      transition: 0.2s;
    }
    img:hover {
      transform: scale(1.1);
    }
    .weapon-rate {
      text-align: right;
    }
    .weapon-info {
      font-size: 14px;
      font-weight: 700;
      .weapon-price {
        margin-top: 6px;
        font-size: 16px;
        color: white;
      }
    }
  }
}
</style>
