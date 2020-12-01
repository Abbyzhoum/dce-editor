const VarType = [{
    type: 'Integer',
    reg: /^([^0][0-9]+|0)$/,
    value: 0
  },{
    type: 'Double',
    reg: /^\d+\.\d+$/,
    value: 0.1
  },{
    type: 'String',
    reg: '',
    value: ''
  },{
    type: 'Json',
    reg: '',
    value: '{}'
  },{
    type: 'Boolean',
    reg: '',
    value: 'true'
  },{
    type: 'Array',
    reg: '',
    value: '[]'
  }]

const Compares = [{
  value: 'EQ',
  name: '相等'
}, {
  value: 'NEQ',
  name: '不相等'
}, {
  value: 'AS',
  name: '赋值'
}, {
  value: 'LT',
  name: '小于'
}, {
  value: 'GT',
  name: '大于'
}]


export {
    VarType,
    Compares
}