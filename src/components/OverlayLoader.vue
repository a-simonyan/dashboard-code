<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "OverlayLoader",
};
</script>

<style scoped lang="scss">
.loader {
  border: 6px solid transparent; /* Light grey */
  border-top: 6px solid $color--primary;
  border-right: 6px solid $color--primary;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
