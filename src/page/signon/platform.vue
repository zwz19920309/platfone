<template>
  <div class="fillcontain">
    <div class="mar10">
      <el-menu
        background-color="#f5f5f5"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">平台管理</el-menu-item>
      </el-menu>
      <div class="mar10 pad10">
        <el-row>
          <el-col :span="12">
            <div>
              <el-input
                style="width:200px"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="search.name"
              ></el-input>
              <el-button type="primary" @click="initData">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="ot-count-injectbtns t-home-btngroup t-right">
              <span class="down-load-btn">
                <i class="el-icon-download"></i>导入
                <input
                  id="excel-upload-input"
                  ref="fileInput"
                  type="file"
                  v-on:change="upload"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                >
              </span>
              <el-button type="primary" size="mini" @click="newPlatForm">
                <i class="el-icon-circle-plus-outline"></i>&nbsp;新增
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="mar10">
        <platform-list
          :selectChange="selectChange"
          :platFormList="platFormList"
          :callBack="initData"
        ></platform-list>
      </div>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfo.pageSize"
          layout="sizes, prev, pager, next, total"
          :total="pageInfo.total"
        ></el-pagination>
      </div>
    </div>
    <div class="mar10 pad10 t-right">
      <el-button type="danger" @click="bulkDeletePlatForm">批量删除</el-button>
    </div>
    <edit-platform-dialog :platform="platform" :callBack="addPlatform" ref="platform"></edit-platform-dialog>
  </div>
</template>

<script>
import { addPlatForm, getPlatFormList, bulkAddPlatForm, bulkDeletePlatForm } from '@/api/getData'
export default {
  data() {
    return {
      search: { name: '' },
      activeIndex: '1',
      isEdit: true,
      platform: { name: '', pips: '', foreign_currency: '', range_level: '', lows_level: '', lever_level: '', supervise_level: '', cont: '', icon: '' },
      platFormRows: [],
      platFormList: [],
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  components: {
    'edit-platform-dialog': () => import('@/components/editPlatFormDialog.vue'),
    'platform-list': () => import('@/components/platFormList.vue')
  },
  created() {
    this.initData({})
  },
  methods: {
    async initData() {
      let res = await getPlatFormList({ page: this.pageInfo.page, size: this.pageInfo.pageSize, name: this.search.name })
      if ((res.status === 200)) {
        this.platFormList = res.data.list
        this.pageInfo.total = res.data.total
      }
    },
    selectChange(data) {
      this.platFormRows = data
    },
    async handleSizeChange(data) {
      this.pageInfo.pageSize = data
      this.initData()
    },
    async handleCurrentChange(data) {
      this.pageInfo.page = data
      this.initData()
    },
    async upload() {
      let fileData = new FormData();
      fileData.append('platform', this.$refs.fileInput.files[0])
      let data = await bulkAddPlatForm(fileData)
      if (data.status === 200) {
        this.$message({ type: 'success', message: '上传成功!' })
        this.initData()
      } else {
        this.$message({ type: 'error', message: data.message })
      }
    },
    async addPlatform(data) {
      let fileData = new FormData()
      fileData.append('name', data.name)
      fileData.append('pips', data.pips)
      fileData.append('currency', data.foreign_currency)
      fileData.append('range', data.range_level)
      fileData.append('lows', data.lows_level)
      fileData.append('lever', data.lever_level)
      fileData.append('supervise', data.supervise_level)
      fileData.append('cont', data.cont)
      fileData.append('icon', data.icon)
      let res = await addPlatForm(fileData)
      if (res.status === 200) {
        this.$refs.platform.close()
        this.$message({ type: 'success', message: '新增成功!' })
        this.initData()
      } else {
        this.$message.error(res.message)
      }
    },
    async bulkDeletePlatForm() {
      if (!(this.platFormRows && this.platFormRows.length)) {
        this.$message({ type: 'warning', message: '请选择数据!' })
        return;
      }
      let ids = []
      this.platFormRows.forEach(data => {
        ids.push(data.id)
      })
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await bulkDeletePlatForm({ ids: ids })
        if (res.status === 200) {
          this.$message({ type: 'success', message: '删除成功!' })
          this.initData()
        } else {
          this.$message.error(res.message)
        }
      }).catch((err) => {
      })
    },
    newPlatForm() {
      this.$refs.platform.open()
    }
  }
}
</script>
<style>
.ot-count-injectbtns {
  margin-left: 30px;
  height: 35px;
  line-height: 35px;
}
.down-load-btn {
  display: inline-block;
  position: relative;
  padding: 0 12px;
  height: 27px;
  line-height: 27px;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  background: #409eff;
  cursor: pointer;
}
.down-load-btn i {
  padding: 0 4px;
}
.down-load-btn input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 70px;
  height: 32px;
  line-height: 32px;
  opacity: 0;
  cursor: pointer;
}
</style>
