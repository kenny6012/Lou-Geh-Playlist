<template>
  <div class>
    <b-card class="c-card">
    <Playlist/>
    </b-card>
  </div>
</template>

<script>
import Playlist from "~/components/Playlist.vue";

export default {
  layout: "Sidebar",
  components: {
    Playlist,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>