import { createStore } from 'vuex';
import EventService from '@/services/EventService';
export default createStore({
  state: { user: 'Jakhongir', events: [] },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
