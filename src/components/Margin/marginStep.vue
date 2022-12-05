<template>
  <div>
    <el-steps :active="active" finish-status="success" style="margin-left: 200px;margin-right: 200px">
      <el-step title="step1"></el-step>
      <el-step title="step2"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "marginStep",
  data(){
    return{
      active:1
    }
  }
}
</script>

<style scoped>

</style>
