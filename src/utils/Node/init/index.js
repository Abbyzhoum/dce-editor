// dce --> G6

// const data = {
//   nodes: [
//     {
//       id: "node4",
//       x: 150,
//       y: 100,
//       label: "node4",
//       type: "table",
//       headers: [
//         { fieldName: "chname" },
//         { fieldName: "name" },
//         { fieldName: "type" }
//       ],
//       anchorPoints: [[0, 0]],
//       fields: [
//         { name: "version", type: "int", chname: "版本" },
//         { name: "date", type: "date", chname: "日期" },
//         { name: "date", type: "date", chname: "日期" }
//       ]
//     }
//   ]
// };

// G6.registerNode("table", {
//   draw(cfg, group) {
//     // 如果 cfg 中定义了 style 需要同这里的属性进行融合
//     let anchorPoints = [];
//     let title;
//     let titleBox;
//     let width = (cfg.size && cfg.size[0]) || 100;
//     let height = (cfg.size && cfg.size[1]) || 100;
//     let leftPoints = [];
//     let rightPoints = [];
//     const lineHeight = 20;
//     const fields = cfg.fields || [];
//     const l = fields.length;
//     const headerGroup = {};
//     const headerBox = {};
//     // 按顺序初始化列名
//     var headers = cfg.headers;
//     const calWidth = 60 * headers.length;
//     const calHeight = (l + 1) * lineHeight;
//     const realWidth = calWidth > width ? calWidth : width;
//     const realHeight = calHeight > height ? calHeight : height;
//     const keyShape = group.addShape("rect", {
//       attrs: {
//         x: 0,
//         y: 0,
//         width: realWidth,
//         height: realHeight,
//         stroke: "blue",
//         fill: "#5D616A"
//       },
//       name: "keyShape",
//       draggable: true
//     });
//     title = group.addShape("text", {
//       attrs: {
//         x: realWidth / 2,
//         y: 10,
//         lineHeight: 20,
//         textBaseline: "middle",
//         textAlign: "center",
//         text: cfg.label,
//         fill: "#1D95E2"
//       },
//       draggable: true
//     });

    
//     Box = title.getBBox();
//     const realLineHeight =
//       (realHeight && (realHeight - titleBox.height) / l) || 20;

//     splitLine = group.addShape("line", {
//       attrs: {
//         x1: 0,
//         y1: lineHeight,
//         x2: realWidth,
//         y2: lineHeight,
//         stroke: "#4D5157"
//       }
//     });
//     headers.forEach((header) => {
//       if (group) {
//         headerGroup[header.fieldName] = group.addGroup();
//       }
//     });
//     $.each(fields, function (index, field) {
//       // 绘制每一行
//       let fieldY = lineHeight * (index + 1);
//       Object.keys(headerGroup).forEach(function (fieldName, i) {
//         headerGroup[fieldName].addShape("text", {
//           attrs: {
//             x: 5 + 60 * i,
//             y: fieldY,
//             lineHeight: 20,
//             fieldIndex: index,
//             text: field[fieldName],
//             fill: "#C5C6C5",
//             textBaseline: "top"
//           },
//           draggable: true
//         });
//       });
//       const firstGroup = headerGroup[Object.keys(headerGroup)[0]];
//       const firstGroupBox = firstGroup.get("children")[0].getBBox();
//       const textHeight = firstGroupBox.height;
//       // 绘制左右连接点
//       const l = group.addShape("circle", {
//         attrs: {
//           id: "l_" + index,
//           r: 4,
//           x: 0,
//           y: fieldY + textHeight / 2,
//           fill: "#1D95E2",
//           opacity: 1
//         },
//         name: "linkPoint"
//       });
//       anchorPoints.push([0, l.attrs.y / realHeight]);
//       leftPoints.push(l);
//       const r = group.addShape("circle", {
//         attrs: {
//           id: "r_" + index,
//           r: 4,
//           x: realWidth,
//           y: fieldY + textHeight / 2,
//           fill: "#1D95E2",
//           opacity: 1
//         },
//         name: "linkPoint"
//       });
//       anchorPoints.push([1, r.attrs.y / realHeight]);
//       rightPoints.push(r);
//     });
//     // 按顺序初始化列Box
//     headers.forEach((header) => {
//       headerBox[header.fieldName] = headerGroup[header.fieldName].getBBox();
//     });
//     cfg.anchorPoints = anchorPoints;
//     return keyShape;
//   },
//   getAnchorPoints(cfg, group) {
//     return cfg.anchorPoints;
//   }
// });
