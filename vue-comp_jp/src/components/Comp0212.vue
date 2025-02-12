<template>
  <el-table
    :data="tableData"
    row-key="id"
    default-expand-all
  >
    <el-table-column prop="key1" label="15項法規名称" />
    <el-table-column prop="key2" label="物質名称" />
    <el-table-column prop="key3" label="法令名称" />
    <el-table-column prop="key4" label="元素換算値係数" />
    <el-table-column label="Lock" width="120" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.locked" @change="handleCheckboxChange(scope.row)"/>
      </template>
    </el-table-column>

    <el-table-column label="備考欄" width="180">
      <template #default="scope">
        <el-input v-model="scope.row.remark" @blur="handleInputBlur(scope.row)"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
window.tableData = [
  {
    id: 1,
    key1: '法規名称1',
    key2: '物質名称1',
    key3: '法令名称1',
    key4: '元素換算値係数1',
    locked: false,
    remark: '备注1'
  },
  {
    id: 2,
    key1: '法規名称2',
    key2: '物質名称2',
    key3: '法令名称2',
    key4: '元素換算値係数2',
    children: [
      {
        id: 31,
        key1: '法規名称2-1',
        key2: '物質名称2-1',
        key3: '法令名称2-1',
        key4: '元素換算値係数2-1',
        locked: false,
        remark: '备注2-1'
      },
      {
        id: 32,
        key1: '法規名称2-2',
        key2: '物質名称2-2',
        key3: '法令名称2-2',
        key4: '元素換算値係数2-2',
        locked: false,
        remark: '备注2-2'
      },
    ],
    locked: false,
    remark: '备注2'
  },
]

const tableData = window.tableData;

const handleCheckboxChange = (row) => {
  console.log(row); // 打印选中行的详细信息
};
const handleInputBlur = (row) => {
  console.log(row); // 打印修改行的详细信息
};
</script>