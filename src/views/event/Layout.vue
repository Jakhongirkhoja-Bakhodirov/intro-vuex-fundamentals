<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
    </div>
    <router-view :event="GStore.event"></router-view>
  </div>
</template>

<script>
// import EventService from '@/services/EventService';
export default {
  inject: ['GStore'],
  // name: 'EventLayout',
  // props: ['id'],
  // data() {
  //   return {
  //     event: null,
  //   };
  // },
  // created() {},
};
</script>
