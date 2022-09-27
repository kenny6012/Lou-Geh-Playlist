<template>
  <div class>
    <b-card class="c-card">
    <Music/>
    </b-card>
  </div>
</template>

<script>
import Music from "~/components/Music.vue";

export default {
  layout: "Sidebar",
  components: {
    Music,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>