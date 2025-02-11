<template>
  <div class="dynamic-table" style="width: 100%">
    <el-table :data="tableData" style="width: 100%" stripe :height="props.tableHeight">
      <el-table-column type="index" width="60" align="center" fixed>
        <template #header>
            <el-button
              type="primary"
              size="small"
              @click="handleHeaderButtonClick"
            >
              重置
            </el-button>
        </template>
      </el-table-column>
      
      <el-table-column
        v-for="(column, index) in tableColumns"
        :key="index"
        :prop="column.key"
        :label="column.text"
        :width="column.width"
      >
        <template #header="scope" style="background-color: aquamarine;">
          <div class="custom-header">
            <span @click="handleSort(column.key)">
              {{ column.text }}
              <el-icon v-if="sortColumn === column.key">
                <component :is="sortOrder === 'ascending' ? 'CaretTop' : 'CaretBottom'" />
              </el-icon>
            </span>
            <div class="search-input">
              <el-input
                v-if="column.filterType === 'text'"
                v-model="searchValues[column.key]"
                placeholder="搜索..."
                @blur="handleSearch(column.key)"
              />
              <el-select
                v-else-if="column.filterType === 'select'"
                v-model="searchValues[column.key]"
                placeholder="选择..."
                @change="handleSelect(column.key)"
              >
                <el-option
                  v-for="option in column.options"
                  :key="option"
                  :label="option"
                  :value="option"
                />
              </el-select>
            </div>
          </div>
        </template>
        <template #default="scope">
          <div v-html="scope.row[column.key]"></div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-block" v-show="tableColumns.length">
      <el-pagination
        v-model:current-page="page"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, toRefs } from 'vue'
import { ElTable, ElTableColumn, ElInput, ElSelect, ElOption, ElIcon, ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  totalItems: {
    type: Number,
    default: 0
  },
  tableHeight: {  
    type: [String, Number],
    default: 'auto'
  }
})

const { headers, items, totalItems } = toRefs(props)
const emit = defineEmits(['update:page', 'sort', 'search', 'select', 'reset'])

const tableColumns = ref([])
const tableData = ref([])
const searchValues = ref({})
const sortColumn = ref('')
const sortOrder = ref('ascending')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 使用 watchEffect 替代多个 watch
watchEffect(() => {
  // 处理 headers 变化
  tableColumns.value = headers.value
  // 初始化搜索值
  headers.value?.forEach(column => {
    searchValues.value[column.key] = ''
  })

  // 处理 items 变化
  tableData.value = items.value

  // 处理 total 变化
  total.value = totalItems.value
})

const handleSort = (prop) => {
  if (sortColumn.value === prop) {
    sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : 'ascending'
  } else {
    sortColumn.value = prop
    sortOrder.value = 'ascending'
  }
  emit('sort', { column: prop, order: sortOrder.value })
}

const handleSearch = (prop) => {
  const searchValue = searchValues.value[prop]
  emit('search', { column: prop, value: searchValue })
}

const handleSelect = (prop) => {
  const selectValue = searchValues.value[prop]
  emit('select', { column: prop, value: selectValue })
}

const handleCurrentChange = (val) => {
  page.value = val
  emit('update:page', val)
}

const handleHeaderButtonClick = () => {
  // 重置所有搜索值
  Object.keys(searchValues.value).forEach(key => {
    searchValues.value[key] = ''
  })
  emit('reset')
}

onMounted(() => {
  // 初始化组件时触发一次数据加载
  emit('update:page', page.value)
})
</script>

<style scoped>
.custom-header {
  display: flex;
  flex-direction: column;
}

.custom-header span {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.search-input {
  margin-top: 8px;
}

.pagination-block {
  margin-top: 16px;
  width: 100%;
}

/* 添加表头背景色 */
:deep(.el-table__header-wrapper th) {
  background-color: #f0f8ff !important; /* 淡蓝色 */
  color: #409eff !important; /* 淡蓝色 */
}

/* 确保鼠标悬停时保持相同的背景色 */
:deep(.el-table__header-wrapper th.is-hover) {
  background-color: #f0f8ff !important;
}
</style>