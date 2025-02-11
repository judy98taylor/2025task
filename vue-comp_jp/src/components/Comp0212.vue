<template>
  <el-table
    :data="tableData"
    row-key="id"
    default-expand-all
  >
    <el-table-column prop="date" label="15項法規名称" />
    <el-table-column prop="name" label="物質名称" />
    <el-table-column prop="name" label="法令名称" />
    <el-table-column prop="address" label="元素換算値係数" />
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
const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    locked: false,
    remark: '备注1'
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        locked: false,
        remark: '备注1'
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        locked: false,
        remark: '备注1'
      },
    ],
    locked: false,
    remark: '备注1'
  },
]

// 从window对象中获取tableData
// window.tableData=[];
// const tableData = window.tableData;

const handleCheckboxChange = (row) => {
  console.log(row); // 打印选中行的详细信息
};
const handleInputBlur = (row) => {
  console.log(row); // 打印修改行的详细信息
};
</script>