import { message } from 'ant-design-vue';

export function errorHandler(err){
    if(err && err.response && err.response.data && err.response.data.errorMessage){
      return  message.error(err.response.data.errorMessage)
    }

    message.error('服务器正忙, 请稍后再试');
    
}

export function ErrorNotify (msg){
   message.error(msg);
}

export function successNotify(msg){
  message.success(msg)
}

export function fittingString(str, maxWidth, fontSize){  // node ID 过长则显示...
  var fontWidth = fontSize * 1.3; //字号+边距
    maxWidth = maxWidth * 2; // 需要根据自己项目调整
    var width = calcStrLen(str) * fontWidth;
    var ellipsis = '…';
    if (width > maxWidth) {
      var actualLen = Math.floor((maxWidth - 10) / fontWidth);
      var result = str.substring(0, actualLen) + ellipsis;
      return result;
    }
    return str;
}

function calcStrLen(str) {   // 判断nideId 字段的长度
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
}