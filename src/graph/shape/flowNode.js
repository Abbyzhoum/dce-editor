import editorStyle from "@/config/defaultStyle";

const BaseOptions = {
  icon: null,
  iconStyle: {
    width: 12,
    height: 12,
    left: 2,
    top: 2,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#E7F7FE',
    stroke:'#1890FF',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#95D6FB',
    },
    hover: {
      // cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const NodeDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 20,
    height: 20,
    left: 2,
    top: 2,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#E8FEFA',
    stroke:'#13C2C2',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#8CE8DE',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const startDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 6,
    top: 6,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#FEF7E8',
    stroke:'#FA8C16',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#FCD49A',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const endDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 6,
    top: 6,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#EFF7E8',
    stroke:'#F5222D',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#CFD49A',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const TwoPointOption = {
  icon: null,
  iconStyle: {
    width: 16,
    height: 16,
    left: 4,
    top: 2,
  },
  titleStyle:{
    y: 2,
    x: 24,
    lineHeight: 10,
    // color: '#fff'
  },
  headerStyle:{
    x: 0,
    y: 0,
    width: TwoLengthWidth,
    height: 20
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#fff',
    stroke:'#fff',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#8CE8DE',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
}

const IfPointOption = {
  icon: null,
  iconStyle: {
    width: 16,
    height: 16,
    left: 4,
    top: 2,
  },
  titleStyle:{
    y: 2,
    x: 24,
    lineHeight: 10,
    // color: '#fff'
  },
  headerStyle:{
    x: 0,
    y: 0,
    width: TwoLengthWidth,
    height: 20
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#FEF7E8',
    stroke:'#FA8C16',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#FCD49A',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const TwoLengthHeight = 70;
const TwoLengthWidth = 120;


export default function(G6) {
  G6.registerNode('start-node', {
    shapeType: 'circle',
    labelPosition: 'bottom',
    options: {
      ...startDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [40, 30];
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...this.options.style,
      };
      if(cfg.hasOwnProperty('color')){
        style.fill = cfg.color
      }
      return style;
    },
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -6],
            ['L', 6, 0],
            ['L', -4, 6],
            ['Z'] // close
          ],
          fill: this.options.style.stroke,
          stroke: this.options.style.stroke,
        }
      });
    },
    getAnchorPoints() {
      return [
        [1, 0.5] // right
      ]
    }
  }, 'base-node');
  G6.registerNode('exit-node', {
    shapeType: 'circle',
    labelPosition: 'bottom',
    nodeType: 'basic',
    options: {
      ...endDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [40, 30];
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...this.options.style,
      };
      if(cfg.hasOwnProperty('color')){
        style.fill = cfg.color
      }
      return style;
    },
    afterDraw(cfg, group) {
      if(cfg.active) {

      }
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -4],
            ['L', 4, -4],
            ['L', 4, 4],
            ['L', -4, 4],
            ['Z'] // close
          ],
          fill: this.options.style.stroke,
          stroke: this.options.style.stroke,
        }
      });
    },
    getAnchorPoints() {
      return [
        [0, 0.5] // left
      ]
    }
  }, 'base-node');
  G6.registerNode('add-node', {
    shapeType: 'rect',
    nodeType: 'basic',
    options:{
      ...BaseOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [80, 44];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...this.options.style,
      };

      return style;
    }
  }, 'base-node');

  G6.registerNode('dnc-node',{
    nodeType: 'table',
    options:  G6.Util.deepMix({},TwoPointOption,{
      icon: require('@/assets/flow/Blacklist.svg'),
      style: {
        fill: '#fff',
        stroke: '#A9A9A9',
      },
      stateStyles: {
        selected: {
          fill: '#C0C0C0',
        },
      },
      headerStyle:{
        color: '#696969'
      },
      titleStyle:{
        color: '#fff'
      }
    }),
    getShapeStyle(cfg){
      console.log(cfg);
      
      cfg.size = [120, 80];
      const width = cfg.size[0];
      const height = cfg.size[1];
      
      const style = {
        width,
        height,
        x: 0 - width / 2,    // 有偏移
        y: 0 - height / 2,    // 有偏移
        r: 2,
        ...this.options.style,
      };

      return style;
    },
    getAnchorPoints() {
      return [
        [0, 0.6],
        [1, 0.45], 
        [1, 0.75]
      ]
    }
  },'add-node')

  G6.registerNode('ranking-node', {
    nodeType: 'table',
    options:  G6.Util.deepMix({},TwoPointOption,{
      icon: require('@/assets/flow/Ranking.svg'),
      style: {
        fill: '#F6FFED',
        stroke: '#73D13D',
      },
      stateStyles: {
        selected: {
          fill: '#D9F7BE',
        },
      },
      headerStyle:{
        color: '#D9F7BE'
      },
      titleStyle:{
        color: '#000'
      }
    }),
    getShapeStyle(cfg){
      cfg.size = [120, 80];
      const width = cfg.size[0];
      const height = cfg.size[1];
      
      const style = {
        width,
        height,
        x: 0 - width / 2,    // 有偏移
        y: 0 - height / 2,    // 有偏移
        ...this.options.style,
      };

      return style;
    },
    getAnchorPoints(){
       return [
        [0, 0.6],
        [1, 0.45], 
        [1, 0.75]
       ]
    }
  }, 'add-node');

  G6.registerNode('data-node', {
    nodeType: 'table',
    options:  G6.Util.deepMix({},TwoPointOption,{
      icon: require('@/assets/flow/data.svg'),
      style: {
        fill: '#E7F7FE',
        stroke: '#1E90FF',
      },
      stateStyles: {
        selected: {
          fill: '#95D6FB',
        },
      },
      headerStyle:{
        color: '#87CEFA'
      },
      titleStyle:{
        color: '#0000CD'
      }
    }),
    getShapeStyle(cfg){
      cfg.size = [120, 80];
      const width = cfg.size[0];
      const height = cfg.size[1];

      const style = {
        width,
        height,
        x: 0 - width / 2,    // 有偏移
        y: 0 - height / 2,    // 有偏移
        r: 2,
        ...this.options.style,
      };
      return style;
    },
    getAnchorPoints(){
      return [
        [0, 0.6],
        [1, 0.45], 
        [1, 0.75]
      ]
    }
  }, 'add-node');

  G6.registerNode('if-node', {  // 条件节点中 多个条件展示 list
    nodeType: 'table',
    options:  G6.Util.deepMix({},IfPointOption,{
      icon: require('@/assets/flow/if.svg'),
      style: {
        fill: '#FFF7E6',
        stroke: '#FFA940',
      },
      stateStyles: {
        selected: {
          fill: '#FFE7BA',
        }
      },
      headerStyle:{
        color: '#FF8C00'
      },
      titleStyle:{
        color: '#000'
      }
    }),
    getShapeStyle(cfg){
      cfg.size = [120, 55];
      const width = cfg.size[0];
      let height = cfg.size[1];

      if(cfg.conditionList && cfg.conditionList.length > 0){
        height = 55 + cfg.conditionList.length * 25
      }

      const style = {
        width,
        height,
        x: 0 - width / 2,    // 有偏移
        y: 0 - height / 2,    // 有偏移
        r: 2,
        ...this.options.style,
      };
      return style;
    },
    getAnchorPoints(cfg) {
      if(!cfg.conditionList || cfg.conditionList.length === 0){
        return [
          [0, 0.5],
          [1, 0.5]
        ]
      }

      var conditionList = JSON.parse(JSON.stringify(cfg.conditionList))

      conditionList.unshift(cfg.pointDesc[0]);
      const singleLength = 1 / (conditionList.length + 1);
      // const singleLength = 1 / (fields.length + 1 + 1);

      let position = [
        [0, 0.5],
        // ...fields.map((item, index) => {
        ...conditionList.map((item, index) => {
          return [1,  singleLength * (index + 1) + 0.06];
        })
      ]

      return position;
    }
  }, 'add-node');


  // 一个出口
  G6.registerNode('js-node', {
    options:  G6.Util.deepMix({},BaseOptions,{
      icon: require('@/assets/flow/js.svg'),
      style: {
        fill: '#EDF7ED',
        stroke: '#7BADEE',
      },
      stateStyles: {
        selected: {
          fill: '#CDE9E5',
        },
      }
    }),
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5]
      ]
    }
  }, 'add-node');

  G6.registerNode('prefix-node', {  // 中继，号码前缀
    options:  G6.Util.deepMix({},NodeDefaultOptions,{
      icon: require('@/assets/flow/Relay.svg'),
      style: {
        fill: '#F6FFED',
        stroke: '#73D13D',
      },
      stateStyles: {
        selected: {
          fill: '#D9F7BE',
        },
      }
    }),
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5]  // right
      ]
    }
  }, 'add-node');

  G6.registerNode('ani-node', {  // 外显号码
    options:  G6.Util.deepMix({},BaseOptions,{
      icon: require('@/assets/flow/externalNumber.svg'),
      style: {
        fill: '#E7F7FE',
        stroke: '#1890FF',
      },
      stateStyles: {
        selected: {
          fill: '#95D6FB',
        },
      }
    }),
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5]  // right
      ]
    }
  }, 'add-node');

  G6.registerNode('dnis-node', {  // 被叫
    options:  G6.Util.deepMix({},BaseOptions,{
      icon: require('@/assets/flow/dnis.svg'),
      style: {
        fill: '#E6E6FA',
        stroke: '#FF00FF',
      },
      stateStyles: {
        selected: {
          fill: '#D8BFD8',
        },
      }
    }),
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5]  // right
      ]
    }
  }, 'add-node');
  
  G6.registerNode('call-node', {  // 外呼
    options:  G6.Util.deepMix({},BaseOptions,{
      icon: require('@/assets/flow/calling.svg'),
      style: {
        fill: '#FFF7E6',
        stroke: '#FFA940',
      },
      stateStyles: {
        selected: {
          fill: '#FFE7BA',
        },
      }
    }),
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5]  // right
      ]
    }
  }, 'add-node');
  
  G6.registerNode('noCall-node', {  // 被叫
    options:  G6.Util.deepMix({},BaseOptions,{
      icon: require('@/assets/flow/noCall.svg'),
      style: {
        fill: '#FFF1F0',
        stroke: '#FF4D4F',
      },
      stateStyles: {
        selected: {
          fill: '#FFCCC7',
        },
      }
    }),
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5]  // right
      ]
    }
  }, 'add-node');
  



//   G6.registerNode('blacklist-node', {
//     nodeType: 'table',
//     options:{
//       ...BaseOptions
//     },


//     drawShape: function drawShape(cfg, group) {
//       const color = '#000';
//       const r = 2;
//       const shape = group.addShape('rect', {
//         attrs: {
//           x: 0,
//           y: 0,
//           width: TwoLengthWidth,
//           height: TwoLengthHeight,
//           stroke: color,
//           radius: r,
//         },
//         // name: 'main-box',
//         draggable: true,
//       });

//       group.addShape('rect', {
//         attrs: {
//           x: 0,
//           y: 0,
//           width: TwoLengthWidth,
//           height: 20,
//           fill: color,
//           radius: [r, r, 0, 0],
//         },
//         // name: 'title-box',
//         draggable: true,
//       });

//       // left icon
//       group.addShape('image', {
//         attrs: {
//           x: 4,
//           y: 2,
//           height: 16,
//           width: 16,
//           cursor: 'pointer',
//           img: require('@/assets/flow/Blacklist.svg'),
//           stroke: '#F4664A',
//         },
//         // name: 'node-icon',
//       });

//       // title text
//       group.addShape('text', {
//         attrs: {
//           textBaseline: 'top',
//           y: 2,
//           x: 24,
//           lineHeight: 20,
//           text: cfg.label,
//           fill: '#fff'
//         },
//       });

//       group.addShape('text', {
//         attrs: {
//           textBaseline: 'top',
//           y: 28,
//           x: 24,
//           lineHeight: 20,
//           text: '属于黑名单',
//           fill: 'rgba(0,0,0, 0.4)',
//         }
//       });

//       // value text
//       group.addShape('text', {
//         attrs: {
//           textBaseline: 'top',
//           y: 25 + 30,
//           x: 24 ,
//           lineHeight: 20,
//           text: '不属于黑名单',
//           fill: '#595959',
//         }
//       });

//       return shape;
//     },
//   },
//   // 'add-node',
// );




}
