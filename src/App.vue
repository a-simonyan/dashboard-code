<template>
  <div id="app" @mousedown="onPageClick('down')" @mouseup="onPageClick('up')">
    <div
      v-if="mouseX && mouseY"
      class="cursor-circle"
      :style="{ left: `${xp}px`, top: `${yp}px`, background: cursorBackground }"
    ></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      xp: 0,
      yp: 0,
      cursorBackground: "rgba(255, 255, 255, 0.7)",
    };
  },
  methods: {
    onMouseMove(e) {
      this.mouseX = e.pageX - 20;
      this.mouseY = e.pageY - 20;
      setInterval(() => {
        this.xp += (this.mouseX - this.xp) / 6;
        this.yp += (this.mouseY - this.yp) / 6;
      }, 20);
    },
    onPageClick(action) {
      if (action === "down") {
        this.cursorBackground = "rgba(255, 255, 255, 0.4)";
      } else this.cursorBackground = "rgba(255, 255, 255, 0.7)";
    },
  },
  created() {
    document.addEventListener("mousemove", this.onMouseMove);
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cursor-circle {
  content: "";
  position: fixed;
  width: 50px;
  height: 50px;
  border: 1px solid white;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 99999;
  pointer-events: none;
}
</style>
