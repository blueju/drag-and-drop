// 定义全局可用变量
let MoveTimer
let realTimePosition = {
  x: 0,
  y: 0
}
let globalData = {}


/**
 * 
 * @param {*} drapTarget 鼠标拖动的元素
 * @param {*} draggedTarget 跟着被拖动的元素
 */
function CanMoveDialog(drapTarget, draggedTarget) {
  // 数据存储
  let data = {
    drapTarget,
    draggedTarget
  }

  drapTarget.addEventListener('mousedown', (e) => {
    console.log('鼠标按下', e);

    // 鼠标坐标
    data.mouseX = e.clientX
    data.mouseY = e.clientY

    // 弹窗坐标
    data.dialogX = draggedTarget.offsetLeft
    data.dialogY = draggedTarget.offsetTop

    // 移动差值（鼠标坐标-弹窗坐标）
    data.deviationValueX = data.mouseX - data.dialogX
    data.deviationValueY = data.mouseY - data.dialogY

    mousedown_in_designateArea = true
    globalData = data

    MoveTimer = setInterval(computedDialogPosition, 10)

  })
}

// 原型方法
function computedDialogPosition() {
  // console.log('in')
  // debugger
  // 判断是否在指定区域按下了鼠标
  if (mousedown_in_designateArea) {

    let maxX = document.documentElement.clientWidth - globalData.draggedTarget.clientWidth;
    let maxY = document.documentElement.clientHeight - globalData.draggedTarget.clientHeight;

    let finalPositionX = Math.min(Math.max(0, realTimePosition.x - globalData.deviationValueX), maxX) + 'px'
    let finalPositionY = Math.min(Math.max(0, realTimePosition.y - globalData.deviationValueY), maxY) + 'px'

    globalData.draggedTarget.style.left = finalPositionX
    globalData.draggedTarget.style.top = finalPositionY
  }
}


document.documentElement.addEventListener('mousemove', (e) => {
  // 判断是否在指定区域按下了鼠标
  // if (mousedown_in_designateArea) {
  // debugger
  realTimePosition.x = e.clientX
  realTimePosition.y = e.clientY
  // }
})


document.documentElement.addEventListener('mouseup', (e) => {
  mousedown_in_designateArea = false
  globalData = null
  clearInterval(MoveTimer)
})




let dragTarget = document.getElementById('dialog')
let draggedTarget = document.getElementById('dialog')
console.log(dragTarget);
CanMoveDialog(dragTarget, draggedTarget)