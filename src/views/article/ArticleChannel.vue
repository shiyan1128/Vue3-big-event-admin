<script setup>
import { ref } from 'vue'
import { artGetChannelService, artDelChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  channelList.value =
    res.data.data.length > 0 ? res.data.data : channelList.value
  loading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  // 打开弹窗
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认有删除该分类吗', '温馨提示', {
    type: 'waring',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 删除请求
  // console.log(row)
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
// 添加
const onAddChannel = () => {
  dialog.value.open({})
}
// 修改或添加成功后要重新渲染数据
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            :icon="Edit"
            circle
            plain
            type="primary"
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            :icon="Delete"
            circle
            plain
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
