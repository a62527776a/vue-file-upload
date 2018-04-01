<template>
<div class="file-upload-file" 
     ref="file-upload-file" 
     @mouseleave="isDesc = false"
     :style="computedContainerStyle">
  <div class="progress-bar"
       :style="{ width: progress + '%' }"></div>
  <a class="ext-name">{{parseExt(file.name)}}</a>
  <div class="no-ext-name">{{file.name | filtersExt}}</div>
  <div class="oMask">
    <i class="material-icons" v-if="!isDesc" >delete_forever</i>
    <i class="material-icons" :class="{ 'openDescSearchIconActive' : isDesc }" @click="openDesc">{{ isDesc ? 'zoom_out' : 'zoom_in' }}</i>
    <i class="material-icons" v-if="progress === 0 && !isDesc" @click="fileUpload">file_upload</i>
    <i class="material-icons" v-else-if="progress === 100 && !isDesc" @click="fileDownLoad">file_download</i>
  </div>
</div>
</template>

<script>
import fetch from './util/fetch'
import ajax from './util/ajax'

export default {
  name: 'file-upload-file',
  props: {
    file: {
      type: File,
      default: () => {
        return new File(['0'], 'init-file-upload')
      }
    }
  },
  data () {
    return {
      fileInfo: {},
      isDesc: false,
      progress: 0
    }
  },
  methods: {
    parseFile () {
      if (/^image\//.test(this.file.type)) {
        this.readImgFile()
      }
    },
    /**
     * @method parseExt 根据传输的文件名称解析扩展名
     * @param { String } fileName 文件名
     * @var { String } entName 扩展名
     * @return { String | void } extName 扩展名
     */
    parseExt (fileName) {
      // 点开头的文件 不返回 Example: .gitignore
      if (fileName.indexOf('.') === 0) return
      let parseName = fileName.split('.')
      let extName = '.?'
      // 无扩展名的情况下 返回 '.?'
      if (parseName.length === 1) return extName
      extName = '.' + parseName[parseName.length - 1]
      return extName.toLocaleUpperCase()
    },
    readImgFile () {
      let reader = new FileReader()
      reader.onload = (result) => {
        let imgEl = document.createElement('img')
        imgEl.src = result.currentTarget.result
        imgEl.className = 'thumb-url'
        this.$refs['file-upload-file'].appendChild(imgEl)
      }
      reader.onprogress = (progress) => {
        console.log(progress)
      }
      reader.readAsDataURL(this.file)
    },
    readTextFile () {
      let reader = new FileReader()
      reader.onload = (result) => {
        console.log(result)
      }
      reader.onprogress = (progress) => {
        console.log(progress)
      }
      reader.readAsText(this.file)
    },
    openDesc () {
      // 查看详细信息
      if (/^image\//.test(this.file.type)) {
        this.isDesc = !this.isDesc
        return
      }
      this.readTextFile()
    },
    fileUpload () {
      let formData = new FormData()
      formData.append('file', this.file)
      let progress = (res) => {
        this.progress = (res.loaded / res.total) * 100
      }
      ajax('http://localhost:3000', '/api/user/avatar', formData, progress)
    },
    fileDownLoad () {

    }
  },
  computed: {
    computedContainerStyle () {
      return { 
        transform: this.isDesc ? 'scale(2, 2)' : 'scale(1, 1)',
        zIndex: this.isDesc ? 5 : 0
      }
    }
  },
  filters: {
    /**
     * @method filtersExt 过滤扩展名
     * @param { String } fileName 带扩展名的文件名
     * @return { String } 无扩展名的文件名
     */
    filtersExt (fileName) {
      // 点开头的文件 返回全名
      if (fileName.indexOf('.') === 0) return fileName
      let parseName = fileName.split('.')
      // 如果只有一个点 直接返回数组第一位
      if (parseName.length = 2) return parseName[0]
      // 如果有多个点 移除最后一位(后缀)并用点连接
      try {
        return parseName.pop(parseName[parseName.length - 1]).join('.')
      } catch (e) {
        return '未知'
      }
    }
  },
  created () {
    this.parseFile()
  }
}
</script>

<style lang="less">
@import './styles/index.less';

.file-upload-file {
  .file-upload-box();
  flex-direction: column;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  .oMask {
    position: absolute;
    height: 100%;
    z-index: 5;
    width: 100%;
    background: rgb(0, 0, 0);
    opacity: 0;
    transition: all .3s;
    .flex();
    justify-content: space-evenly;
    i {
      transition: all .3s;  
    }
  }
  .ext-name {
    font-size: 24px;
    font-style: italic;
    transform: translateY(-5px);
  }
  .thumb-url {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
.file-upload-file:hover {
  cursor: pointer;
}
.file-upload-file:hover .oMask {
  opacity: .6;
}
.no-ext-name {
  position: absolute;
  bottom: 0;
  height: 30%;
  font-size: 12px;
  margin: 5px;
}
.progress-bar {
  position: absolute;
  height: 3px;
  z-index: 4;
  transition: all .3s;
  background: @primaryColor;
  top: 0%;
  left: 0%;
  border-radius: 5px;
}
.openDescSearchIconActive {
  transform: translate3D(120%, -120%, 0) scale(.5, .5);
}
</style>
