<template>
  <div class="table-box">
    <table class="table-box__table" v-if="orderHistory.length">
      <thead>
        <tr class="table-box__header">
          <td
            v-for="(item, index) in headers"
            :key="`header-col_${index}`"
            :width="item.width"
            class="table-box__header--col"
            :class="{ 'last-col': item.id === 'orderVolumeHtml' }"
          >
            {{ item.name }}
          </td>
        </tr>
      </thead>
      <tr class="separator" colspan="4"></tr>
      <tbody class="table-box__body">
        <tr
          v-for="(item, index) in orderHistory"
          :key="`order-row_${index}`"
          class="table-box__body--row"
          :class="{ selected: currentSelectedOrderNumber === item.orderNumber }"
          @click="setCurrentOrderRow(item)"
          height="35"
        >
          <td
            :title="col"
            v-for="(col, idx) in getTableColData(item)"
            :key="`order-col_${idx}`"
            class="table-box__body--col"
            :class="{ 'last-col': idx === 'orderVolumeHtml' }"
            :width="currentColWidth(idx)"
          >
            {{ col }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="table-box__no-data">No Data Available</div>
  </div>
</template>

<script>
// Mixin
import formatArrayToObject from "@/mixins/formatArrayToObject";
// Vuex
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DashboardOrderHistory",
  mixins: [formatArrayToObject],
  props: {
    date: String,
  },
  data() {
    return {
      headers: [
        { name: "nr", width: "10%", id: "orderNumber" },
        { name: "date", width: "16%", id: "orderDate" },
        { name: "product name", width: "37%", id: "product" },
        { name: "order volume", width: "18%", id: "orderVolumeHtml" },
      ],
      orderHistory: [],
      currentSelectedOrderNumber: null,
    };
  },
  computed: {
    ...mapGetters("dashboard", ["getOrderSuccessData"]),
    latestOrders() {
      return [...this.orderHistory]
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);
    },
  },
  methods: {
    ...mapActions("dashboard", ["setCurrentOrder"]),
    currentColWidth(key) {
      if (this.headers.find((el) => el.id === key)) {
        return this.headers.find(
          (el) => el.id.toLowerCase() === key.toLowerCase()
        ).width;
      } else return "";
    },
    getTableColData(item) {
      const obj = JSON.parse(JSON.stringify(item));
      delete obj.orderVolumeNumber;
      delete obj.orderVolumeCurrency;
      return obj;
    },
    setCurrentOrderRow(item) {
      this.currentSelectedOrderNumber = item.orderNumber;
      this.setCurrentOrder(item);
    },
  },
  watch: {
    date: {
      immediate: true,
      handler() {
        this.orderHistory = this.formatOrders(this.getOrderSuccessData.values);
        if (this.orderHistory.length) {
          this.currentSelectedOrderNumber = this.orderHistory[0].orderNumber;
          this.setCurrentOrder(this.orderHistory[0]);
        } else this.setCurrentOrder(null);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.table-box {
  height: 280px;
  background: $color--dark-primary;
  width: 45%;
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
    &--col {
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 5px;
      font-weight: 500;
      transition: 0.3s;
    }
    &--row.selected td {
      color: $color--primary;
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
