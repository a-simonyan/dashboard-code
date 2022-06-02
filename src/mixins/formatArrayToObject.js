import dayjs from "dayjs";
export default {
  methods: {
    formatOrders(data) {
      const values = [...data].splice(1);
      const groupedValues = [];
      values.forEach((item) => {
        groupedValues.push({
          orderNumber: item[0],
          orderDate: item[1],
          product: item[2],
          orderVolumeHtml: item[3],
          orderVolumeNumber: +item[3]
            .replace(".", "")
            .replace(",", ".")
            .slice(0, -2),
          orderVolumeCurrency: item[3].slice(-1),
        });
      });
      const currentMonthOrders = groupedValues.filter(
        (el) =>
          dayjs(new Date(el.orderDate)).format("MM-DD-YYYY").toString() ===
          dayjs(new Date(this.date)).format("MM-DD-YYYY").toString()
      );
      return currentMonthOrders;
    },
  },
};
