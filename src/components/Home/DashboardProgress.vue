<template>
  <div class="progress-box">
    <div class="progress-box__inner">
      <div class="progress-box__inner--no-data" v-show="!getCurrentOrder">
        0 Orders in Selected Month
      </div>
      <div
        class="progress-box__inner--value"
        id="primaryProgress"
        :title="
          getCurrentOrder && orderVolumePercentage
            ? `Order: ${
                getCurrentOrder.orderNumber
              }, ${orderVolumePercentage.toFixed(2)}%`
            : ''
        "
        v-show="getCurrentOrder"
      ></div>
      <div class="progress-box__inner--horizontal-line">
        <div class="value">
          {{ currentMonthTarget }}
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
// Vuex
import { mapGetters } from "vuex";

export default {
  name: "DashboardProgress",
  props: {
    date: String,
  },
  data() {
    return {
      value: 0,
      orderVolumePercentage: null,
    };
  },
  computed: {
    ...mapGetters("dashboard", [
      "getTargetSuccessData",
      "getOrderSuccessData",
      "getCurrentOrder",
    ]),
    currentMonthTarget() {
      if (this.getTargetSuccessData) {
        return this.getTargetSuccessData.values.find((el) =>
          el.includes(dayjs(new Date(this.date)).format("MMMM").toString())
        )[1];
      } else return "";
    },
  },
  methods: {
    animateProgress() {
      const targetNumber = +this.currentMonthTarget
        .replace(".", "")
        .replace(",", ".")
        .slice(0, -2);
      this.orderVolumePercentage =
        (this.getCurrentOrder.orderVolumeNumber / targetNumber) * 100;

      const animationKeyframe = [
        { width: "0%" },
        { width: `${this.orderVolumePercentage}%` },
      ];
      const timingOptions = {
        duration: 2000,
        iterations: 1,
        fill: "forwards",
      };
      document
        .getElementById("primaryProgress")
        .animate(animationKeyframe, timingOptions);
    },
  },
  watch: {
    getCurrentOrder: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v) {
          this.$nextTick(() => {
            this.animateProgress();
          });
        }
      },
    },
  },
  mounted() {
    if (this.getCurrentOrderNumber) {
      this.animateProgress();
    }
  },
};
</script>

<style scoped lang="scss">
.progress-box {
  padding: 0 36px 59px 36px;
  &__inner {
    width: 100%;
    height: 47px;
    background: $color--dark-gray;
    position: relative;
    z-index: 0;
    &--value {
      width: 0;
      height: 100%;
      background: $color--primary;
    }
    &--no-data {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      position: absolute;
      left: 40%;
      white-space: nowrap;
    }
    &--horizontal-line {
      position: absolute;
      top: -42px;
      right: 10%;
      .line {
        margin: 3.5px auto 0 auto;
        height: 79px;
        width: 6px;
        background: $text--light;
      }
      .value {
        margin-left: 15px;
        font-family: $font-roboto;
        font-size: 22px;
      }
    }
  }
}
</style>
