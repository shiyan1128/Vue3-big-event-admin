/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 1.如果安装了prettier插件，请禁用 ， format on save 关闭
    // 2.安装Eslint插件，并配置保存是自动修复
    // 3.在设置中setting中配置
    // 当保存的时候，eslint自动帮我们修复错误
    // "editor.codeActionsOnSave": {
    //   "source.fixAll": true
    // }
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度最多80字符
        trailingComma: 'none', // 不加对象 | 数组最后逗号
        endOfLine: 'auto' // 换行符号不限制 （win mac 不一致）
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭props解构的校验
    // 添加未定义变量错误提示， create-vue@3.6.3 关闭，这里了加上是为了下个章节演示
    'no-undef': 'error' // off 关闭  error 报错提示
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}
