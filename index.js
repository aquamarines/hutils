const dateFormat = (params={
  date:'',
  val:1,
  format:''
}) => {
  if(!params.date){
      return '';
  }
  if(params.val > 1){
      params.date = new Date(params.date * params.val);
  }
  if(Array.isArray(params.date)){
  
      let start = getNowDate(params.date[0]);
      let end = getNowDate(params.date[1]);
      return params.format === 'Y-M-D h:m:s' ? start.yh + ' - ' + end.yh : start.y + ' - ' + end.y;
  }else{
      let result = getNowDate(params.date);
      return params.format === 'Y-M-D h:m:s' ? result.yh : result.y;
  }
};
const getNowDate = (date) => {
  date = date || new Date();
  if(!(date instanceof Date)){
      date = new Date(date);
  }
  let Y = date.getFullYear();
  let M = showTime(date.getMonth() + 1);
  let D = showTime(date.getDate());

  let h = showTime(date.getHours());
  let m = showTime(date.getMinutes());
  let s = showTime(date.getSeconds());
  return {
      Y, M, D, h, m, s,
      yh: Y + '-' + M + '-' + D + ' ' + h + ':' + m + ":" + s,
      y: Y + '-' + M + '-' + D
  }
};
const showTime = (date) => {
  let time;
  time = date >= 10 ? date : '0' + date;
  return time;
};
// 防抖
let timer;
const debounce = (calc, time = 500,args=[]) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
        calc(...args);
    }, time)
};
const copytext = (val) => {
  try{    
      let input = document.createElement("input");
      input.value = val; // 修改文本框的内容
      document.body.appendChild(input);
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      document.body.removeChild(input);
      ElMessage.success('复制成功');
  }catch(e){
      ElMessage.error('复制失败');
  }
};
const formatSizeUnits = (originalSize, targetUnit, decimal_digits = 2) => {
  const reg = /^(\d+(\.\d+)?)\s*(b|kb|mb|gb|tb|pb|eb|zb|yb)$/i;
  
  if (!reg.test(originalSize)) {
      throw new Error('请输入正确的格式');
  } else {
      const matchResult = originalSize.match(reg);
      const original_num = parseFloat(matchResult[1]);
      const original_unit = matchResult[3].toUpperCase();
      targetUnit = targetUnit.toUpperCase();
      
      const units_arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const target_unit_index = units_arr.indexOf(targetUnit);
      const original_unit_index = units_arr.indexOf(original_unit);
      
      const result = original_num * Math.pow(1024, original_unit_index - target_unit_index);
      return parseFloat(result.toFixed(decimal_digits)) + targetUnit;
  }
};
const getStyle = (obj, name) => {
  if (window.getComputedStyle) {
      //正常浏览器的方式，具有getComputedStyle()方法
      return getComputedStyle(obj, null)[name];
  } else {
      //IE8的方式，没有getComputedStyle()方法
      return obj.currentStyle[name];
  }
}