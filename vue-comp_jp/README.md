
# DynamicTable 组件

`DynamicTable` 是一个用于展示和管理数据表格的 Vue 组件。它支持分页、排序、搜索和选择功能，适用于需要动态展示数据的场景。

## 特性

- **动态数据**：支持通过 props 动态传入表头和数据项。
- **分页**：通过 `v-model:page` 实现分页功能。
- **排序**：支持对表格数据进行排序。
- **搜索**：可以根据用户输入的搜索条件过滤数据。
- **选择**：支持选择特定项进行操作。
- **自定义高度**：可以通过 `:table-height` 属性设置表格的高度。

## 安装

确保你已经安装了 Vue 3 和相关依赖。然后在你的项目中引入 `DynamicTable` 组件。

```javascript
import DynamicTable from './components/DynamicTable.vue';
```

## 使用示例

在你的 Vue 组件中使用 `DynamicTable`：

```vue
<template>
  <DynamicTable
    :headers="headers"
    :items="items"
    :total-items="total"
    v-model:page="currentPage"
    @sort="handleSort"
    @search="handleSearch"
    @select="handleSelect"
    @reset="handleReset"
    :table-height="tableHeight"
  />
</template>

<script setup>
import { ref } from 'vue';
import DynamicTable from './components/DynamicTable.vue';

const headers = ref([...]); // 定义表头
const items = ref([...]); // 定义数据项
const total = ref(0); // 数据总数
const currentPage = ref(1); // 当前页码
const tableHeight = ref('auto'); // 表格高度

// 处理排序、搜索、选择和重置的函数
const handleSort = (sortInfo) => { /* ... */ };
const handleSearch = (searchInfo) => { /* ... */ };
const handleSelect = (selectInfo) => { /* ... */ };
const handleReset = () => { /* ... */ };
</script>
```

## Props

| 属性          | 类型          | 默认值 | 描述                       |
|---------------|---------------|--------|----------------------------|
| `headers`     | Array         | `[]`   | 表格的列头信息            |
| `items`       | Array         | `[]`   | 表格的数据项              |
| `total-items` | Number        | `0`    | 数据总数                  |
| `v-model:page`| Number        | `1`    | 当前页码                  |
| `table-height`      | String        | `'auto'` | 表格的高度               |

## 事件

| 事件名      | 描述                     |
|-------------|--------------------------|
| `sort`      | 当排序发生时触发        |
| `search`    | 当搜索发生时触发        |
| `select`    | 当选择发生时触发        |
| `reset`     | 当重置发生时触发        |
