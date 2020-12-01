<template>
 <div>
           <!-- @ok="() => addNodes"
      @cancel="() => addNodes(false)" -->
    <a-modal
      title="添加节点"
      :dialog-style="{ top: '50px' }"
      :visible="visible"
      ok-text="确认"
      cancel-text="取消"
       @cancel="() => { $emit('create', false) }"
       @ok="() => { $emit('create', true) }"

    >
      <a-form layout='vertical' :form="form">
      <a-form-item label="节点ID">
        <a-input  v-decorator="[
            'nodeId',
            {
              rules: [{ required: true, message: '请填写节点Id', whitespace: true }],
            },
          ]"  placeholder="必须是英文字母开头，可以包含数字，不能和已有节点id重复"  :max-length="4">
           <a-tooltip slot="suffix" title="">
             <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
           </a-tooltip>
        </a-input>
      </a-form-item>
      <a-form-item label="选择节点类别">
         <a-radio-group v-decorator="[
          'nodeType',
          { rules: [{ required: true, message: '请选择节点类别' }] },
          ]">
           <a-radio :style="radioStyle" value="if-node"> 
                <img :src="require('../assets/flow/if.svg')" style="width:35px;height:20px" />
                <span>条件节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="js-node"> 
                <img :src="require('../assets/flow/js.svg')" style="width:35px;height:20px" />
                <span>js节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="relay-node"> 
                <img :src="require('../assets/flow/Relay.svg')" style="width:35px;height:20px" />
                <span>中继选择节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="externalNumber-node"> 
                <img :src="require('../assets/flow/externalNumber.svg')" style="width:35px;height:20px" />
                <span>外显号码选择节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="dnis-node"> 
                <img :src="require('../assets/flow/dnis.svg')" style="width:35px;height:20px" />
                <span>被叫号码改写节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="blacklist-node"> 
                <img :src="require('../assets/flow/Blacklist.svg')" style="width:35px;height:20px" />
                <span>黑名单节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="ranking-node"> 
                <img :src="require('../assets/flow/Ranking.svg')" style="width:35px;height:20px" />
                <span>排重节点</span>
           </a-radio>
           <a-radio :style="radioStyle" value="data-node"> 
                <img :src="require('../assets/flow/data.svg')" style="width:35px;height:20px" />
                <span>接口调用节点</span>
           </a-radio>
         </a-radio-group>
      </a-form-item>
     </a-form>
    </a-modal>
 </div>
</template>

<script>
export default {
    name: 'nodes',
    inject: ['i18n'],
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'add_Node' });
    },
    props: ['visible'],
    data(){
        return{
    //         nodesTypes:[
    //             { label: 'ifEvent', value: 'if-node', icon: '../assets/flow/if.svg' },
    //             { label: 'jsEvent', value: 'js-node', icon: '@/assets/flow/js.svg' },
    //             { label: 'RelayEvent', value: 'relay-node', icon: '@/assets/flow/Relay.svg' },
    //             { label: 'externalNumberEvent', value: 'externalNumber-node', icon: '@/assets/flow/externalNumber.svg' },
    //             { label: 'dnisEvent', value: 'dnis-node', icon: '@/assets/flow/dnis.svg' },
    //             { label: 'BlacklistEvent', value: 'blacklist-node', icon: '@/assets/flow/Blacklist.svg' },
    //             { label: 'RankingEvent', value: 'ranking-node', icon: '@/assets/flow/Ranking.svg' },
    //             { label: 'dataEvent', value: 'data-node', icon: '@/assets/flow/data.svg' },
    //         ]
          radioStyle: {
             display: 'block',
             height: '30px',
             lineHeight: '40px',
           },
        }
    }
}
</script>
