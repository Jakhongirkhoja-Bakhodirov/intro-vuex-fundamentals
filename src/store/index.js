import { createStore } from 'vuex';

export default createStore({
  state: { user: 'Jakhongir', events: [] },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {},
  modules: {},
});
