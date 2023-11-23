<script>
export default{
  name: "toolbar-crisol",
};
</script>


<template>
  <pv-toolbar class="custom-toolbar">
    <template #start>
      <h1>Crisol</h1>
    </template>

    <template #center>
        <span>
          <i class="pi pi-comments" style="font-size: 1rem;" />
        </span>
      <h3>Users Comments</h3>
    </template>

    <template #end>
      <h3>Comments</h3>
    </template>
  </pv-toolbar>
</template>

<style>
.custom-toolbar {
  background: linear-gradient(to right,#3a6cc5, #f3f311, #3a6cc5, #f3f311,#3a6cc5)!important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-radius: 5px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
}

.custom-toolbar h1,
.custom-toolbar h3 {
  margin: 0;
  color: white;
}

.custom-toolbar h1 {
  font-size: 1.5rem;
}

.custom-toolbar h3 {
  font-size: 1.1rem;
}

.custom-toolbar span {
  margin-right: 10px;
  color: white;
}

</style>