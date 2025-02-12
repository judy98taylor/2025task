import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'

// 获取 components 目录下所有 Vue 文件
const components = fs.readdirSync(resolve(__dirname, 'src/components'))
  .filter(file => file.endsWith('.vue'))
  .map(file => file.replace('.vue', ''))

// 生成入口配置
const inputEntries = {
  main: resolve(__dirname, 'index.html'),
}

// 为每个组件生成入口配置
components.forEach(component => {
  inputEntries[component] = resolve(__dirname, `pages/${component}.html`)
  
  // 自动创建对应的 HTML 文件
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${component}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { createApp } from 'vue'
      import ElementPlus from 'element-plus'
      import 'element-plus/dist/index.css'
      import '../src/theme.css'
      import Component from '../src/components/${component}.vue'
      
      const app = createApp(Component)
      app.use(ElementPlus)
      app.mount('#app')
    </script>
  </body>
</html>
  `.trim()

  // 创建 pages 目录（如果不存在）
  if (!fs.existsSync(resolve(__dirname, 'pages'))) {
    fs.mkdirSync(resolve(__dirname, 'pages'))
  }
  
  // 写入 HTML 文件
  fs.writeFileSync(
    resolve(__dirname, `pages/${component}.html`),
    htmlContent
  )
})

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: inputEntries
    }
  }
})