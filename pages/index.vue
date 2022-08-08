<template>
  <div class="layout-default">
    <b-overlay :show="overlay" rounded="sm" variant="transparent">
      <template #overlay>
        <div class="text-center">
          <div class="position-absolute" style="top: 200px">
            <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
            <p id="cancel-label">Please wait...</p>
          </div>
        </div>
      </template>

      <Menu :page="page" @page="changePage" />
      <div v-if="!overlay">
        <div class="side-content" cols="10">
          <casesList v-if="page === '/cases/list'" @page="changePage" />
          <casesCase v-if="page === '/case'" :box="param" @page="changePage" />
          <profile v-if="page === '/profile'" />
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      page: "/cases/list",
      overlay: false,
      param: "",
    };
  },
  methods: {
    async changePage(event) {
      this.overlay = true;
      try {
         await this.$auth.fetchUser();
        this.page = "/";
        setTimeout(() => {
          this.param = "";
          if (event.param) this.param = event.param;
          this.page = event.page;
          this.overlay = false;
        }, 100);
      } catch (e) {
          this.$auth.logout();
      }
    },
  },
};
</script>

<style lang="scss">
.layout-default {
  .side-button {
    width: 2em;
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    margin-bottom: 14px;
    .hamburguer {
      width: 2em;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.671);
    }
  }
  .side-content {
    width: 100%;
  }
}
</style>
