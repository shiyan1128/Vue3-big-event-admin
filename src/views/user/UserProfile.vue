<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const {
  user: { email, nickname, id, username },
  getUser
} = useUserStore()
const formModel = ref({
  id,
  username,
  nickname,
  email
})

const rules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度在2-10个字符之间' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
})

const formRef = ref()
// 提交修改
const submitForm = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(formModel.value)
  getUser()
  ElMessage.success('修改成功')
}
</script>
<template>
  <page-container title="基本资料">
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="登录名称">
        <el-input v-model="formModel.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
