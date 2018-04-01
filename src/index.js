import fileUploadContainer from './file-upload-container.vue'
import fileUploadFile from './file-upload-file.vue'

const install = (Vue) => {
  Vue.component(fileUploadContainer.name, fileUploadContainer)
  Vue.component(fileUploadFile.name, fileUploadFile)
}

export default install
