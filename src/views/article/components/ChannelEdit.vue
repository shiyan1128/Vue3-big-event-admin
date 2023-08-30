<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: 'fenl名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位字母或数字',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
// 根据编辑或添加，对表单数据进行验证，并发送请求修改或添加表格数据
const onSubmit = async () => {
  // 先对表单数据进行验证
  await formRef.value.validate()
  // 根据获取row或{}，判断是否有id，来判断是编辑还是添加
  const isEdit = formModel.value.id
  if (isEdit) {
    // 有id，为编辑，发送编辑请求，修改后台数据
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  // 关闭弹窗
  dialogVisible.value = false
  // 通知父级进行监听
  emit('success')
}

// 打开弹窗
const open = (row) => {
  dialogVisible.value = true
  // 将表格元素点击的一行赋值更新给formModel
  formModel.value = { ...row }
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑' : '添加'"
    width="30%"
  >
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
