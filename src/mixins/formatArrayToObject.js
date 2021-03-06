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
          dayjs(
            new Date(
              `${el.orderDate.split(".")[1]}/${el.orderDate.split(".")[0]}/${
                el.orderDate.split(".")[2]
              }`
            )
          )
            .format("MM-YYYY")
            .toString() === dayjs(this.date).format("MM-YYYY").toString()
      );
      return currentMonthOrders;
    },
  },
};
