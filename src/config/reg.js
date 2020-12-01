export default {
   required: [{
        trigger: 'blur', required: true, message: '该项为必填项',
   }],
   flowNum: [{ // 流程号
        trigger: 'blur', required: true, pattern: /^8\d{3}$/, message: '该项为必填项',
   }],
   number: [{
      trigger: 'blur', type: 'number', required: true, message: '请填写数字类型'
   }]

}