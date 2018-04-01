<template>
  <div class="file-upload-container">
    <input ref="file" multiple @change="getFiles" type="file" />
    <div class="file-upload-title">
      <a>文件管理</a>
      <i class="material-icons cursor-point">cloud_upload</i>
    </div>
    <div class="file-upload-content">
      <div class="file-upload-box" @click="focusInput">
        <i class="material-icons">add</i>
      </div>
      <file-upload-file
        v-for="(file, idx) in files"
        :file="file"
        :key="idx" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'file-upload-container',
  data () {
    return {
      files: [new File(['example'], 'example.txt')]
    }
  },
  methods: {
    focusInput: function () {
      this.$refs.file.click()
    },
    getFiles: function (e) {
      for (let i = 0; i < e.target.files.length; i++) {
        this.files.push(e.target.files[i])
      }
      e.target.value = ''
    }
  }
}
</script>

<style lang="less">
@import './styles/index.less';


.file-upload-box {
  .file-upload-box();
}

.file-upload-box:hover {
  cursor: pointer
}

.file-upload-container {
  user-select: none;
  .border-radius;
  border: 1px solid #eee;
  display: inline-block;
  .file-upload-title {
    color: white;
    padding: 5px 7px;
    background: @primaryColor;
    .flex();
    justify-content: space-between
  }
  .file-upload-content {
    padding: 5px 5px;
    padding-right: 0;
    min-width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 500px;
    flex-wrap: wrap;
  }
}
</style>