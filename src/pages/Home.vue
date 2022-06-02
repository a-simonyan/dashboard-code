<template>
  <div class="main">
    <DashboardHeader @dateChange="onDateChange" @refresh="refreshData" />
    <transition name="fade">
      <div
        class="main__content"
        v-if="
          !getOrderProgress &&
          !getTargetProgress &&
          !getOrderErrorData &&
          !getTargetErrorData
        "
      >
        <DashboardPrice :date="currentSelectedDate" />
        <DashboardProgress :date="currentSelectedDate" />
        <div class="main__footer">
          <DashboardOrderHistory :date="currentSelectedDate" />
          <DashboardTopProducts :date="currentSelectedDate" />
        </div>
      </div>
    </transition>
    <div
      v-if="
        getOrderProgress &&
        getTargetProgress &&
        !getOrderErrorData &&
        !getTargetErrorData
      "
      class="main__loader"
    >
      <OverlayLoader />
    </div>
  </div>
</template>

<script>
// Components
import DashboardHeader from "@/components/Home/DashboardHeader";
import DashboardPrice from "@/components/Home/DashboardPrice";
import DashboardProgress from "@/components/Home/DashboardProgress";
import DashboardOrderHistory from "@/components/Home/DashboardOrderHistory";
import DashboardTopProducts from "@/components/Home/DashboardTopProducts";
import OverlayLoader from "@/components/OverlayLoader";
// Vuex
import { mapActions, mapGetters } from "vuex";
import dayjs from "dayjs";

export default {
  name: "IndexPage",
  components: {
    DashboardHeader,
    DashboardPrice,
    DashboardProgress,
    DashboardOrderHistory,
    DashboardTopProducts,
    OverlayLoader,
  },
  data() {
    return {
      currentSelectedDate: dayjs(new Date()).format("MMMM YYYY").toString(),
    };
  },
  computed: {
    ...mapGetters("dashboard", [
      "getOrderErrorData",
      "getOrderProgress",
      "getTargetErrorData",
      "getTargetProgress",
    ]),
  },
  methods: {
    ...mapActions("dashboard", ["getOrdersData", "getTargetsData"]),
    openToast(data) {
      this.$toast.open({
        message: `<strong>ERROR ${data.code}</strong>: ${data.message} <br /> <strong>STATUS</strong>: ${data.status}`,
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    },
    refreshData() {
      this.getOrdersData();
      this.getTargetsData();
    },
    onDateChange(date) {
      this.currentSelectedDate = dayjs(new Date(date))
        .format("MMMM YYYY")
        .toString();
    },
  },
  watch: {
    getOrderErrorData(data) {
      this.openToast(data);
    },
    getTargetErrorData: {
      deep: true,
      handler(data) {
        this.openToast(data);
      },
    },
  },
  created() {
    this.refreshData();
  },
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.fade-enter {
  opacity: 0;
  transform: scale(0.94);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
.main {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: black;
  background-image: url("../assets/images/dashboard-background.svg");
  background-repeat: no-repeat;
  background-position: right top;

  &__footer {
    margin-bottom: 35px;
    display: flex;
    gap: 0 17px;
  }
  &__loader {
    width: 100%;
    height: calc(100vh - 317px);
    display: grid;
    align-items: center;
    align-content: center;
    place-items: center;
    place-content: center;
  }
}
</style>
