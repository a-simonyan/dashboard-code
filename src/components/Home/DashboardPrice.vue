<template>
  <div class="price">{{ currentMonthPrice(currentNumber.toFixed(2)) }} €</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// Mixin
import formatArrayToObject from "@/mixins/formatArrayToObject";
export default {
  name: "DashboardPrice",
  mixins: [formatArrayToObject],
  props: {
    date: Date,
  },
  data() {
    return {
      currentNumber: 0,
      interval: null,
    };
  },
  computed: {
    ...mapGetters("dashboard", ["getOrderSuccessData"]),
    sumForDate() {
      const currentMonthOrders = this.formatOrders(
        this.getOrderSuccessData.values
      );
      if (!currentMonthOrders.length) {
        return 0;
      } else {
        let sum = 0;
        currentMonthOrders.forEach((el) => [(sum += el.orderVolumeNumber)]);
        return sum;
      }
    },
  },
  methods: {
    ...mapActions("dashboard", ["setTotalOrdersSum"]),
    currentMonthPrice(price) {
      return price
        .toString()
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    animateNumbers() {
      clearInterval(this.interval);
      if (this.sumForDate) {
        this.interval = setInterval(() => {
          this.currentNumber += 100;
          if (this.currentNumber + 160 >= this.sumForDate) {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
              this.currentNumber += 5;
              if (this.currentNumber >= this.sumForDate) {
                this.currentNumber = this.sumForDate;
                clearInterval(this.interval);
              }
            }, 50);
          }
        }, 0);
      }
      this.setTotalOrdersSum(this.sumForDate);
    },
  },
  watch: {
    sumForDate() {
      this.currentNumber = 0;
      this.animateNumbers();
    },
  },
  mounted() {
    this.animateNumbers();
  },
};
</script>

<style scoped lang="scss">
.price {
  padding: 159px 36px;
  font-size: 192px;
  font-weight: 700;
  font-family: $font-roboto;
}
</style>
