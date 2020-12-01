import editorStyle from '@/config/defaultStyle';
import Anchor from '../item/anchor';
import { fittingString } from '@/utils/tool'

const nodeDefinition = {
  options:{
    icon: null,
    iconStyle: {
      width: 14,
      height: 14,
      left: 0,
      top: 0,
    },
    style:{
      fill: '#f9f9f9',
      stroke:'#bbb',
      cursor: 'default',
    },
    stateStyles: {
      selected: {
        fill: '#eee',
      },
      hover: {
        cursor: editorStyle.cursor.hoverNode,
      }
    }
  },
  drawAnchor(cfg, group) {
    const bbox = group.get('children')[0].getBBox();

    this.getAnchorPoints(cfg).forEach((p, i) => {
      const anchorContainer = group.addGroup();
      const anchor = new Anchor({
        group: anchorContainer,
        index: i,
        model:{
          style:{
            x: bbox.minX + bbox.width * p[0],
            y: bbox.minY + bbox.height * p[1]
          }
        }
      });
      
      group.anchorShapes.push(anchorContainer);
    });
  },
  initAnchor(cfg, group){
    group.anchorShapes = [];
    group.showAnchor = () => {
      this.drawAnchor(cfg, group);
    };
    group.getAllAnchors = () => {
      return group.anchorShapes.map(c => {
        c.filter(a => a.isAnchor)
      })
    };
    group.getAnchor = (i) => {
      return group.anchorShapes.filter(a => a.get('index') === i)
    };
    group.clearAnchor = () => {
      group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
      group.anchorShapes = [];
    };
    group.clearHotpotActived = () => {
      group.anchorShapes && group.anchorShapes.forEach(a => {
        if (a.isAnchor)
          a.setHotspotActived(false);
      });
    };
  },
  drawShape(cfg, group) {
    group.clear()
    console.log('start draw', group);
    const shapeType = this.shapeType;   // 
    const nodeType =  this.nodeType;   // 区分 基本节点 、多出口节点
    let style = this.getShapeStyle(cfg);

    if(nodeType !== 'table'){
      cfg.label = fittingString(cfg.label, 90, 12)
    }

    const shape = group.addShape(shapeType, {
      attrs: {
        ...style
      }
    });

    this.drawIcon(nodeType, style, cfg,group)
    return shape;
  },
  drawIcon(nodeType, style, cfg,group){
    if(this.options.icon){
      let attrs = {
        x: style.x + this.options.iconStyle.left,
        y: style.y + this.options.iconStyle.top,
        width: this.options.iconStyle.width,
        height: this.options.iconStyle.height,
      };
      // if(this.shapeType === 'circle'){  // 一个出口的，基本方形 展示 
      if(nodeType === 'basic'){  // 一个出口的，基本方形 展示 
        attrs = {
          x: style.x + this.options.iconStyle.left,
          y: style.y + this.options.iconStyle.top,
          width: this.options.iconStyle.width,
          height: this.options.iconStyle.height,
        }
      // }else if(this.shapeType === 'path'){  // 多个出口的， table 展示
      }else if(nodeType === 'table'){  // 多个出口的， table 展示
        attrs = {
          x: this.options.iconStyle.left + style.x,
          y: this.options.iconStyle.top + style.y,
          width: this.options.iconStyle.width,
          height: this.options.iconStyle.height,
        }
      }

      group.icon = group.addShape('image', {
        attrs: {
          img:this.options.icon,
          ...attrs,
        },
        draggable: true,
      });
    }

    this.initAnchor(cfg,group);

    if(nodeType === 'table'){
      this.drawHeader(style, cfg,group)
    }

  },
  drawHeader(style, cfg,group){
    group.addShape('rect', {
       attrs: {
         x: style.x,
         y: style.y,
         width: style.width,
         height: this.options.headerStyle.height,
         fill: this.options.headerStyle.color,
       },
       draggable: true,
    })

    let str = fittingString(cfg.title, 100, 12);

    group.title = group.addShape('text', {
      attrs: {
        text: str,
        textBaseline: 'top',
        x: style.x + 10,
        y: style.y + 3,
        lineHeight: this.options.titleStyle.lineHeight,
        fill: this.options.titleStyle.color
      },
      draggable: true
    });

    this.drawPanel(style, cfg,group)
  },
  drawPanel(style, cfg,group){   // 固有的属性
    cfg.pointDesc.forEach((elem, index) => {
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: style.y + 30 + index * 25,   // 有偏移
          x: style.x + 15 ,
          lineHeight: 10,
          text: fittingString(elem.value, 80, 12),
          fill: '#595959',
        },
        draggable: true
      })
    });

    if(cfg.clazz === 'if' && cfg.conditionList && cfg.conditionList.length > 0){
      this.drawIfCondition(style, cfg,group)
    }
  },
  drawIfCondition(style, cfg,group){
    cfg.conditionList.forEach((elem, index) => {
      // console.log(elem, index);
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: style.y + 55 + index * 25,   // 有偏移
          x: style.x + 15 ,
          lineHeight: 10,
          text: fittingString(`${elem.left}${elem.operator}${elem.right}`, 80, 12),
          fill: '#595959',
        },
        name: 'condition-shape',
        draggable: true
      })
    });
  },
  setState(name, value, item) {
    const group = item.getContainer();
    
    if (name === 'show-anchor') {
      if (value) {
        group.showAnchor();
      } else {
        group.clearAnchor();
      }
    } else if (name === 'selected') {
      const rect = group.getChildByIndex(0);
      if (value) {
        rect.attr('fill', this.options.stateStyles.selected.fill);
      } else {
        rect.attr('fill', this.options.style.fill);
      }
    } else if (name === 'hover') {
      const rect = group.getChildByIndex(0);
      const text = group.getChildByIndex(1);
      if (value) {
        rect.attr('cursor', this.options.stateStyles.hover.cursor);
        if(text)
          text.attr('cursor', this.options.stateStyles.hover.cursor);
      } else {
        rect.attr('cursor', this.options.style.cursor);
        if(text)
          text.attr('cursor', this.options.style.cursor);
      }
    }
  },
  getAnchorPoints(cfg) {
    return [
      [0.5, 0], // top
      [1, 0.5], // right
      [0.5, 1], // bottom
      [0, 0.5], // left
    ]
  },
  update:undefined    // update 不存在时，默认重绘
  // updateDefaultLabel(cfg, node){
  //   const group = node.getContainer(); // 获取容器
  //   const shape = group.get('children')[2]; // 按照添加的顺序
  //   // shape.attr('text', cfg.label); // 更新title属性
  //   shape.attr('text', fittingString(cfg.label, 90, 12)); // 更新title属性
  // },
  // updateTwoPointTitle(cfg, node){
  //   const group = node.getContainer(); // 获取容器
  //   const shape = group.get('children')[3]; // 按照添加的顺序
  //   // shape.attr('text', cfg.title); // 更新title属性
  //   shape.attr('text', fittingString(cfg.title, 90, 12)); // 更新title属性
  // },
  // computedIfHeight(cfg){
  //   let height = cfg.size[1];
  //   if(cfg.conditionList && cfg.conditionList.length > 0){
  //     height = 55 + cfg.conditionList.length * 25
  //   }

  //   return height;
  // },
  // updateIfCompare(cfg, node){
  //   const group = node.getContainer(); // 获取容器
  //   const shape = group.get('children'); // 按照添加的顺序
    

  //   // shape.forEach(elem => {
  //   //   if(elem.cfg && elem.cfg.name){
  //   //     console.log('name: ', elem.cfg.name);
  //   //     group.removeChild(elem)
  //   //   }
  //   // });

  //  let text = group.findAll(item=>{
  //     return item.get('name') === 'condition-shape'
  //   })

  //   console.log(text);

  //   // group.clearAnchor()
  //   // group.clear()
  //   // this.drawShape(cfg, group)
  //   // group.showAnchor();
  //   // if(text.length > 0){
  //   //   text.
  //   // }

  //   // console.log(text);
  //   // console.log('shape', group.get('children'));
    

  //   let style = this.getShapeStyle(cfg);
  //   console.log('style and shape: ', style, shape);

  //   // shape[0].attr('height', this.computedIfHeight(cfg)); // 更新title属性
  //   // shape[3].attr('text', fittingString(cfg.title, 90, 12)); // 更新title属性

  //   // if(!cfg.conditionList || cfg.conditionList.length === 0){
  //   //   return 
  //   // }

  //   // this.drawIfCondition(style, cfg, group)

  //   // console.log('update', cfg, shape, group);
  // },

  // update(cfg, node) {
    // const group = node.getContainer(); // 获取容器
    // const shape = group.get('children'); // 按照添加的顺序
    // const style = {
    //   path: this.getPath(cfg),
    //   stroke: cfg.color,
    // };
    // shape.attr(style); // 更新属性
    // shape.attr('text', cfg.title);
    
    // const { clazz= 'js' } = cfg;

    // if(['js', 'prefix', 'ani', 'dnis', 'call', 'noCall'].includes(clazz)){
    //   this.updateDefaultLabel(cfg, node)
    // } else if(['ranking','dnc', 'data'].includes(clazz)){
    //   this.updateTwoPointTitle(cfg, node)
    // } else if(clazz === 'if'){
    //   this.updateIfCompare(cfg, node)   if 节点的不好处理因为还要处理 anchor
    // }



    // if(cfg.pointDesc.length > 0){
      // drawHeader

      // shape.forEach((elem,index) => {
      //   console.log('shape. forEach:', elem,index);
      // });

    // }

  // }
};

export default function(G6) {
  G6.registerNode('base-node', nodeDefinition, 'single-node');
}
