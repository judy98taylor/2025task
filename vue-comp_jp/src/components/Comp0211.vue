<template>
  <el-table :data="tableData" border style="width: 780px;">
    <el-table-column prop="key" label="対象国" width="180" />

    <el-table-column label="収載" width="120" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.selected" @change="handleCheckboxChange(scope.row)" />
      </template>
    </el-table-column>

    <el-table-column label="value" width="180">
      <template #default="scope">
        <el-input v-model="scope.row.value" @blur="handleInputBlur(scope.row)" />
      </template>
    </el-table-column>

    <el-table-column label="Lock" width="120" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.locked" @change="handleCheckboxChange(scope.row)" />
      </template>
    </el-table-column>

    <el-table-column label="備考欄" width="180">
      <template #default="scope">
        <el-input v-model="scope.row.remark" @blur="handleInputBlur(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

window.tableData = [
  {
    key: '配置项1',
    selected: true,
    value: '值1',
    locked: false,
    remark: '备注1'
  },
  {
    key: '配置项2',
    selected: false,
    value: '值2',
    locked: true,
    remark: '备注2'
  },
  {
    key: '配置项3',
    selected: true,
    value: '值3',
    locked: false,
    remark: '备注3'
  }
]
const tableData = ref(window.tableData)

const handleCheckboxChange = (row) => {
  window?.handleCheckboxChange(row);
  console.log(row); // 打印选中行的详细信息
};
const handleInputBlur = (row) => {
  window?.handleCheckboxChange(row);
  console.log(row); // 打印修改行的详细信息
};
</script>