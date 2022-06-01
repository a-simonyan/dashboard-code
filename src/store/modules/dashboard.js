import axiosInstance from "@/main.js";

const state = {
  isLoadingOrders: false,
  orderSuccessData: null,
  orderErrorData: null,

  isLoadingTargets: false,
  targetSuccessData: null,
  targetErrorData: null,

  currentOrder: null,

  totalOrdersSum: null,
};

const getters = {
  getOrderSuccessData: (state) => state.orderSuccessData,
  getOrderErrorData: (state) => state.orderErrorData,
  getOrderProgress: (state) => state.isLoadingOrders,

  getTargetSuccessData: (state) => state.targetSuccessData,
  getTargetErrorData: (state) => state.targetErrorData,
  getTargetProgress: (state) => state.isLoadingOrders,

  getCurrentOrder: (state) => state.currentOrder,

  getTotalOrdersSum: (state) => state.totalOrdersSum,
};

const mutations = {
  GET_ORDERS_SUCCESS: (state, data) => {
    state.orderSuccessData = data;
  },
  GET_ORDERS_FAILURE: (state, data) => {
    state.orderErrorData = data;
  },
  GET_ORDERS_DATA_LOAD: (state, bool) => {
    state.isLoadingOrders = bool;
  },

  GET_TARGETS_DATA_LOAD: (state, bool) => {
    state.isLoadingTargets = bool;
  },
  GET_TARGETS_DATA_SUCCESS: (state, data) => {
    state.targetSuccessData = data;
  },
  GET_TARGETS_FAILURE: (state, data) => {
    state.targetErrorData = data;
  },

  SET_ORDER: (state, order) => {
    state.currentOrder = order;
  },

  SET_TOTAL_ORDERS_SUM: (state, sum) => {
    state.totalOrdersSum = sum;
  },
};

const actions = {
  getOrdersData({ commit }) {
    commit("GET_ORDERS_DATA_LOAD", true);
    axiosInstance
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/1La-EJVOrNt3AwWHYvhuCQ5SRtFE9h_kYjgx0dau1HN4/values/Orders?key=${process.env.VUE_APP_TEST_API_KEY}`
      )
      .then((response) => {
        commit("GET_ORDERS_SUCCESS", response.data);
      })
      .catch((e) => {
        commit("GET_ORDERS_FAILURE", e.response.data.error);
      })
      .finally(() => {
        commit("GET_ORDERS_DATA_LOAD", false);
      });
  },
  getTargetsData({ commit }) {
    commit("GET_TARGETS_DATA_LOAD", true);
    axiosInstance
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/1La-EJVOrNt3AwWHYvhuCQ5SRtFE9h_kYjgx0dau1HN4/values/Targets?key=${process.env.VUE_APP_TEST_API_KEY}`
      )
      .then((response) => {
        commit("GET_TARGETS_DATA_SUCCESS", response.data);
      })
      .catch((e) => {
        commit("GET_TARGETS_FAILURE", e.response.data.error);
      })
      .finally(() => {
        commit("GET_TARGETS_DATA_LOAD", false);
      });
  },
  setCurrentOrder({ commit }, order) {
    commit("SET_ORDER", order);
  },
  setTotalOrdersSum({ commit }, sum) {
    commit("SET_TOTAL_ORDERS_SUM", sum);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
