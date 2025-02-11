<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import DynamicTable from './components/DynamicTable.vue'
import { ref, onMounted } from 'vue'

const headers = ref([])
const items = ref([])
const total = ref(0)
const currentPage = ref(1)
// const tableHeight = ref('auto')
const tableHeight = ref(300)

// 模拟API请求获取表格数据
const fetchTableData = async (page = 1, sortInfo = null, searchInfo = null, type=null) => {
  // 这里替换为实际的API调用
  const mockItems = Array.from({ length: 123 }, (_, i) => ({
    title: `文章${i + 1}`,
    status: ['已发布', '草稿', '待审核'][i % 3],
    author: ['张三', '李四', '王五'][i % 3],
    category: ['技术', '生活', '工作', '其他'][i % 4],
    views: Math.floor(Math.random() * 2000),
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    createTime: `2024-03-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
    updateTime: `2024-03-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
    tags: ['前端', '后端', '设计', 'DevOps', '测试'][i % 5]
  }))

  const pageSize = 50
  const response = {
    headers: [
      {
        text: '标题',
        key: 'title',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 200
      },
      {
        text: '状态',
        key: 'status',
        sortable: true,
        filterable: true,
        filterType: 'select',
        options: ['已发布', '草稿', '待审核'],
        width: 100
      },
      {
        text: '作者',
        key: 'author',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 100
      },
      {
        text: '分类',
        key: 'category',
        sortable: true,
        filterable: true,
        filterType: 'select',
        options: ['技术', '生活', '工作', '其他'],
        width: 100
      },
      {
        text: '阅读量',
        key: 'views',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 100
      },
      {
        text: '点赞数',
        key: 'likes',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 100
      },
      {
        text: '评论数',
        key: 'comments',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 100
      },
      {
        text: '创建时间',
        key: 'createTime',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 150
      },
      {
        text: '更新时间',
        key: 'updateTime',
        sortable: true,
        filterable: true,
        filterType: 'text',
        width: 150
      },
      {
        text: '标签',
        key: 'tags',
        sortable: true,
        filterable: true,
        filterType: 'select',
        options: ['前端', '后端', '设计', 'DevOps', '测试'],
        width: 120
      }
    ],
    items: mockItems.slice((page - 1) * pageSize, page * pageSize),
    total: mockItems.length
  }


  headers.value = response.headers
  items.value = response.items
  total.value = response.total
}

// 处理页码变化
const handlePageChange = async (page) => {
  currentPage.value = page
  // 参数再议！
  await fetchTableData(page)
}

// 处理排序
const handleSort = async (sortInfo) => {
  // 参数再议！
  await fetchTableData(currentPage.value, sortInfo)
}

// 处理搜索
const handleSearch = async (searchInfo) => {
  // 参数再议！
  await fetchTableData(currentPage.value, null, searchInfo)
}

// 处理重置
const handleReset = async () => {
  currentPage.value = 1
  // 参数再议！
  await fetchTableData(1)
}

// 处理选择
const handleSelect = async (selectInfo) => {
  // 参数再议！
  await fetchTableData(currentPage.value, null, null, selectInfo)
}

onMounted(async () => {
  await fetchTableData()
})
</script>

<template>
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <DynamicTable
    :table-height="tableHeight"
    :headers="headers"
    :items="items"
    :total-items="total"
    v-model:page="currentPage"
    @sort="handleSort"
    @search="handleSearch"
    @select="handleSelect"
    @reset="handleReset"
  />
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
