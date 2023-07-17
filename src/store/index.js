import { createStore } from 'vuex';
import EventService from '@/services/EventService';
export default createStore({
  state: { user: 'Jakhongir', events: [], event: {} },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
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
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then((response) => {
          commit('SET_EVENTS', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchEvent({ commit, state }, id) {
      console.log('events', state.events);
      const existingEvent = state.events.find((event) => event.id === id);
      console.log('existingEvent', existingEvent, id);
      if (existingEvent) {
        commit('SET_EVENT', existingEvent);
      } else {
        console.log('api call');
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  modules: {},
});
