<template>
  <div class="header">
    <div class="header__left">
      <div class="header__left--title">Order Dashboard</div>
      <div class="header__left--date">
        <div class="header__left--date__name">
          {{ currentDashboardFormattedDate }}
        </div>
        <div class="header__left--date__actions">
          <button class="action prev" @click="onMonthChange('prev')">
            <img src="@/assets/images/icons/chevron.svg" alt="P" />
          </button>
          <button class="action next" @click="onMonthChange('next')">
            <img src="@/assets/images/icons/chevron.svg" alt="N" />
          </button>
        </div>
      </div>
    </div>
    <div class="header__right">
      Refresh in
      <span class="header__right--seconds">{{
        refreshReheaderingSeconds
      }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DashboardHeader",
  data() {
    return {
      refreshReheaderingSeconds: 60,
      reheaderingSecondsInterval: null,
      currentDashboardDate: new Date(),
    };
  },
  computed: {
    currentDashboardFormattedDate() {
      return moment(this.currentDashboardDate).format("MMMM YYYY");
    },
  },
  methods: {
    updateReheaderingSeconds() {
      if (this.refreshReheaderingSeconds === 1) {
        this.refreshReheaderingSeconds = 60;
        this.$emit("refresh");
        return;
      }
      this.refreshReheaderingSeconds -= 1;
    },
    onMonthChange(action) {
      if (action === "prev") {
        this.currentDashboardDate = moment(
          this.currentDashboardFormattedDate
        ).subtract(1, "month");
      } else
        this.currentDashboardDate = moment(
          this.currentDashboardFormattedDate
        ).add(1, "month");

      this.$emit("dateChange", this.currentDashboardDate);
    },
  },
  created() {
    this.reheaderingSecondsInterval = setInterval(
      this.updateReheaderingSeconds,
      1000
    );
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 40px 36px;
  display: flex;
  justify-content: space-between;
  &__left {
    &--title {
      color: $text--light;
      font-size: 20px;
      line-height: 25.06px;
      font-family: $font-source;
    }
    &--date {
      display: flex;
      align-items: center;
      width: 445px;
      justify-content: space-between;
      gap: 0 50px;
      &__name {
        font-size: 30px;
        font-weight: 700;
      }
      &__actions {
        display: flex;
        gap: 0 9px;
        .action {
          width: 53px;
          height: 53px;
          border-radius: 5px;
          outline: none;
          background: $color--dark-primary;
          border: none;
          &:hover {
            border: 1px solid $color--primary;
          }
          &.next img {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  &__right {
    color: $text--light;
    font-size: 20px;
    &--seconds {
      color: white;
      font-weight: 700;
    }
  }
}
</style>
