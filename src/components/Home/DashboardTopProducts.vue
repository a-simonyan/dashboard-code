<template>
  <div class="table-box">
    <table class="table-box__table" v-if="orderHistory.length">
      <thead>
        <tr class="table-box__header" colspan="3">
          <td class="table-box__header--col">Top 5 products</td>
        </tr>
      </thead>
      <tr class="separator" colspan="3"></tr>
      <tbody class="table-box__body">
        <tr
          v-for="(item, index) in topProducts"
          :key="`order-row_${index}`"
          class="table-box__body--row"
          height="35"
        >
          <td
            v-for="(col, idx) in getTableColData(item)"
            :key="`order-col_${idx}`"
            class="table-box__body--col"
            :class="{ 'last-col': idx === 'productVolume' }"
          >
            <div
              v-if="idx === 'percentage'"
              class="progress-bar"
              :style="{ width: `${col}%` }"
              :title="`Orders: ${item.orders.length},  ${col.toFixed(2)}%`"
            ></div>
            <span v-else-if="idx !== 'productVolume'">{{ col }}</span>
            <span v-else>{{ col }} €</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="table-box__no-data">No Data Available</div>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from "vuex";
// Mixin
import formatArrayToObject from "@/mixins/formatArrayToObject";
export default {
  name: "DashboardTopProducts",
  mixins: [formatArrayToObject],
  props: {
    date: String,
  },
  computed: {
    ...mapGetters("dashboard", ["getOrderSuccessData", "getTotalOrdersSum"]),
    orderHistory() {
      return this.formatOrders(this.getOrderSuccessData.values);
    },
    topProducts() {
      // Grouping orders by product names
      let data = [...this.orderHistory].reduce((reducer, e) => {
        let name = e.product.toLowerCase().replaceAll(" ", "");
        if (!reducer[name])
          reducer[name] = {
            productName: e.product,
            percentage: (e.orderVolumeNumber / this.getTotalOrdersSum) * 100,
            productVolume: e.orderVolumeNumber,
            orders: [e],
          };
        else {
          reducer[name].productVolume += e.orderVolumeNumber;
          (reducer[name].percentage +=
            (e.orderVolumeNumber / this.getTotalOrdersSum) * 100),
            reducer[name].orders.push(e);
        }
        return reducer;
      }, {});
      // Returning grouped orders in array
      const list = Object.values(data);
      // Sorting grouped orders by orders count and slicing to show first 5
      return list.sort((a, b) => b.orders.length - a.orders.length).slice(0, 5);
    },
  },
  methods: {
    getTableColData(item) {
      const obj = JSON.parse(JSON.stringify(item));
      delete obj.orders;
      return obj;
    },
  },
};
</script>

<style scoped lang="scss">
.table-box {
  height: 280px;
  background: $color--dark-primary;
  width: 55%;
  padding: 27px 35px 0 35px;
  padding-bottom: 30px;
  &__table {
    width: 100%;
    height: 100px;
    border-collapse: collapse;
    td {
      font-size: 20px;
    }
  }
  &__header {
    border-bottom: 2px solid $text--light;
    &--col {
      text-transform: uppercase;
      font-family: $font-source;
      color: $color--light;
      padding-bottom: 7px;
      &.last-col {
        font-weight: 400;
        text-align: right;
      }
    }
  }
  &__body {
    display: block;
    max-height: 180px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: block;
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: $color--dark-primary;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: $text--light;
    }
    &--col:first-child {
      width: 30%;
    }
    &--col:last-child {
      width: 15%;
    }
    &--col {
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 5px;
      font-weight: 500;
      .progress-bar {
        height: 18px;
        background-color: $color--primary;
      }
    }
    .last-col {
      text-align: right;
      font-weight: 700;
      padding-right: 8px;
      padding-left: 5px;
    }
  }
  &__header,
  &__body--row {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  &__no-data {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    place-items: center;
    align-content: center;
    place-content: center;
    font-size: 30px;
    font-weight: 700;
  }
  .separator {
    height: 20px;
  }
}
</style>
