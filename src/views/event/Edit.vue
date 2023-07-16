<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>Edit events</p>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'EditEvent',
  props: ['event'],
  data: function () {
    return {
      unsavedChanges: true,
    };
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved changes'
      );

      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next(false);
    }
  },
};
</script>
