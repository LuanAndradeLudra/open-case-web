<template>
  <div class="menu-items">
    <div class="links">
      <div class="item" :class="{active: page === '/cases/list'}" @click="changePage('/cases/list')">Caixas</div>
      <div class="item" @click="changePage('/profile')">Perfil</div>
    </div>
    <div class="person">
      <span class="money"> R$ {{$auth.user.inventory.wallet.toFixed(2).replace(".", ",")}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: String,
    default: '',
  },
  methods: {
    changePage(page) {
      this.$emit("page", { page });
    },
  },
};
</script>

<style lang="scss">
.menu-items {
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  align-items: center;
  margin: 22px 0;
  background-color: #070b18;
  .links {
    display: flex;
    .item {
      cursor: pointer;
      padding: 24px 32px;
      min-height: 70px;
      background: transparent;
      border-bottom: 2px solid transparent;
      &:hover,
      &.active {
        background: linear-gradient(
          15deg,
          rgba(8, 29, 46, 1) 0%,
          rgba(7, 11, 24, 1) 70%
        );
        border-bottom: 2px solid #13cdff;
      }
      font-size: 19px;
      font-weight: 700;
    }
  }
  .person {
    .money {
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      padding: 24px 32px;
      background: linear-gradient(15deg, #0e4812 0%, rgba(7, 11, 24, 1) 70%);
      border: 2px solid #9bfb4d;
    }
  }
}
</style>
