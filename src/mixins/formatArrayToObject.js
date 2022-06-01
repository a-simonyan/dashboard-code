import moment from "moment";
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
        (el) => moment(new Date(el.orderDate)).format("MMMM YYYY") === this.date
      );
      return currentMonthOrders;
    },
  },
};