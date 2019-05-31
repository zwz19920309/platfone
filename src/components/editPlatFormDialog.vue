<template>
  <el-dialog title="编辑" :visible.sync="dialogShow">
    <el-form :inline="true">
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称">
            <el-input placeholder="请填写平台名称" v-model="cPlatform.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item label="点差星级">
            <el-input placeholder="请填写点差星级" v-model="cPlatform.pips"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外汇品种星级">
            <el-input placeholder="请填写外汇品种星级" v-model="cPlatform.foreign_currency"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品品种星级">
            <el-input placeholder="请填写商品品种星级" v-model="cPlatform.range_level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="杠杆数星级">
            <el-input placeholder="请填写杠杆数星级" v-model="cPlatform.lows_level"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item label="外汇品种星级">
            <el-input placeholder="请填写外汇品种星级" v-model="cPlatform.lever_level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监管数星级">
            <el-input placeholder="请填写监管数星级" v-model="cPlatform.supervise_level"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true">
      <el-row>
        <el-col :span="4">平台简介</el-col>
        <el-col :span="20">
          <el-input v-model="cPlatform.cont" type="textarea" rows="4" style="width:300px"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" class="plat_icon">
      <el-row>
        <el-col :span="4">
          <el-form-item label="平台icon"></el-form-item>
        </el-col>
        <el-col :span="20">
          <div class="upload-img-warp">
            <span class="upload-btn">请上传</span>
            <upload-img :callBack="handleIcon"></upload-img>
          </div>
          <div class="icon" v-show="showIcon">
            <img ref="icon">
          </div>
        </el-col>
      </el-row>
    </el-form>

    <div class="pad10 t-right">
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {
    'upload-img': () => import('@/components/common/file/uploadImg.vue')
  },
  data() {
    return {
      showIcon: false,
      cPlatform: this.platform || { name: '' },
      dialogShow: false
    }
  },
  created() {
  },
  methods: {
    submit() {
      console.log('this.c: ', this.cPlatform)
      this.callBack && this.callBack(this.cPlatform)
    },
    handleIcon(file, e) {
      console.log('@this.icon: ', file)
      this.showIcon = true
      this.cPlatform.icon = file
      this.$refs.icon.src = e.target.result
    },
    open(params) {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
    }
  },
  props: ['platform', 'callBack'],
  watch: {
    'platform': function (newVal, oldVal) {
      if (newVal) {
        this.cPlatform = newVal
      }
    }
  }
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
.plat_icon {
  margin-top: 20px;
}
.upload-img-warp {
  width: 80px;
  height: 30px;
  background: #eee;
  border: 1px solid #aaa;
  border-radius: 3px;
  float: left;
  margin-left: 30px;
  margin-right: 40px;
  position: relative;
}
.upload-btn {
  position: absolute;
  width: 60px;
  line-height: 30px;
  left: 15px;
}
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
</style>