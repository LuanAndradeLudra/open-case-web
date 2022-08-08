<template>
  <div class="profile-data">
    <img :src="`${$config.env.storageUrl}users/${$auth.user.image.preview}`" />
    <div class="info">
        {{$auth.user.name}} <br />
        <span class="id">ID: {{$auth.user._id}}</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.profile-data {
  display: flex;
  align-items: center;
  img {
    width: 150px;
  }
  .info{
    margin-left: 24px;
    font-size: 22px;
    font-weight: 700;
    .id{
        font-size: 16px;
        color: rgb(179, 179, 179);
    }
  }
}
</style>
