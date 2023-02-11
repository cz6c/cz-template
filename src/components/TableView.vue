<template>
  <el-table class="table-view" :data="tableData">
    <el-table-column
      v-for="item in columnList"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
      <!-- <template #header="{ column, $index }">
        <div style="display: flex; align-items: center"></div>
      </template> -->
      <template #default="{ row }">
        <div v-if="item.type === 'map'"></div>
        <div v-else>{{ row[item.prop] }}</div>
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  /> -->
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { TableJsonItem } from "../utils/public";
const props = defineProps<{
  tableData: Array<any>;
  columnList: Array<TableJsonItem>;
}>();
console.log(props);

// defineExpose({
//   submitForm,
//   initilaData,
// });
</script>

<style scoped lang="scss"></style>
