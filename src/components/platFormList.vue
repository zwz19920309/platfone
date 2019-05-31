<template>
  <div class="fillcontain">
    <div class="mar10">
      <el-table
        border
        :data="cPlatFormList"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.name }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.name" placeholder="平台名称"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="点差星级">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.pips }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.pips" placeholder="点差星级"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="外汇品种星级">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.foreign_currency }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.foreign_currency" placeholder="外汇品种星级"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品品种星级">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.range_level }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.range_level" placeholder="商品品种星级"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最低入金星级">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.lows_level }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.lows_level" placeholder="最低入金星级"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="杠杆数星级">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.lever_level }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.lever_level" placeholder="杠杆数星级"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="监管数星级">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.supervise_level }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.supervise_level" placeholder="监管数星级"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="总星级">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.stars }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="平台简介">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.cont }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.cont" placeholder="平台简介"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="平台简介">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <div class="icon">
                <img :src="scope.row.icon">
              </div>
            </div>
            <div v-else>
              <span class="upload" v-if="scope.row.editing">请上传</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="操作" width="200">
          <template slot-scope="scope">
            <div class="operate-groups">
              <el-button
                type="primary"
                size="mini"
                v-if="!scope.row.editing"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                v-if="scope.row.editing"
                icon="el-icon-success"
                @click="handleSave(scope.$index, scope.row)"
              >保存</el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="!scope.row.editing"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="warning"
                v-if="scope.row.editing"
                icon="el-icon-warning"
                @click="handleCancel(scope.$index, scope.row)"
              >取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div></div>
  </div>
</template>

<script>
import { updatePlatForm, addPlatForm, bulkDeletePlatForm } from '@/api/getData'
export default {
  data() {
    let that = this
    return {
      platForm: {},
      newPlatForm: { name: '' },
      cPlatFormList: this.platFormList || []
    }
  },
  methods: {
    async handleSelectionChange(data) {
      this.selectChange && this.selectChange(data)
    },
    // 编辑
    handleEdit($index, row) {
      this.$set(this.cPlatFormList[$index], 'editing', true)
    },
    // 保存
    async handleSave($index, row) {
      let data = { name: row.name, pips: row.pips, currency: row.foreign_currency, range: row.range_level, lows: row.lows_level, lever: row.lever_level, supervise: row.supervise_level, cont: row.cont, id: row.id }
      let res = await updatePlatForm(data)
      if (res.status === 200) {
        this.$set(this.cPlatFormList[$index], 'editing', false)
        this.callBack && this.callBack()
      } else {
        this.$message.error(res.message)
      }
    },
    // 取消
    async handleCancel($index, row) {
      this.$set(this.cPlatFormList[$index], 'editing', false)
    },
    // 删除
    async handleDelete($index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let ids = [row.id]
        let res = await bulkDeletePlatForm({ ids: ids })
        if (res.status === 200) {
          this.$message({ type: 'success', message: '删除成功!' })
          this.callBack && this.callBack()
        } else {
          this.$message.error(data.message)
        }
      }).catch((err) => {
      })
    }
  },
  props: ['platFormList', 'callBack', 'selectChange'], // isEdit false: 只显示：true: 可操作
  watch: {
    'platFormList': function (newVal, oldVal) {
      this.cPlatFormList = newVal
    }
  }
}
</script>
 <style lang="less">
.icon {
  width: 100px;
  height: 100px;
  float: left;
  img {
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
  }
}
.pos-rel {
  position: relative;
}
.pos-abs {
  position: absolute;
}
.upload {
  text-decoration: underline;
  cursor: pointer;
  color: #409eff;
}
</style>

