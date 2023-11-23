<script>
import ToolbarCrisol from "@/public/pages/toolbar.component.vue";
import FooterCrisol from "@/public/pages/footer.component.vue";
import CommentsCrisol from "@/comments/pages/comment-list.component.vue";

export default {
  name: "app",
  components: {CommentsCrisol, FooterCrisol, ToolbarCrisol},
};
</script>

<template>
  <div id="app">
    <toolbar-crisol></toolbar-crisol>
    <comments-crisol></comments-crisol>
    <footer-crisol></footer-crisol>
  </div>
</template>

<style>
#app {
  background: linear-gradient(to right, #1E1E1E, #363636, #1E1E1E);
  min-height: 100vh;
  padding: 20px;
}
toolbar-crisol,
comments-crisol,
footer-crisol {
  background-color: #fff;
}

</style>