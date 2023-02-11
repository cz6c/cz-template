<template>
  <TableView ref="tableView" :tableData="tableData" :columnList="columnList" :listQuery="listQuery" />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import TableView from "@coms/TableView.vue";
import { TableJsonItem } from "@utils/public";

const columnList: TableJsonItem[] = reactive([
  {
    prop: "date",
    label: "date",
  },
  {
    prop: "name",
    label: "name",
  },
  {
    prop: "address",
    label: "address",
  },
]);
const tableData = reactive([
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
const listQuery: any = reactive({
  page: 1,
  limit: 15,
  total: 100,
});
</script>

<style></style>
