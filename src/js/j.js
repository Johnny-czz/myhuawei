// 放大镜
const oBox = document.querySelector('.box');
const setAmplify = new Amplify(oBox, arr);
setAmplify.init();

class Amplify{
  constructor(ele){
      this.ele = ele;

      // 获取标签对象
      this.show = ele.querySelector('.show');
      this.mask = ele.querySelector('.mask');
      this.glass = ele.querySelector('.glass');
      this.img = this.show.querySelector('img');
  }
  init(){
      this.overOut();
      this.move();
  }
  // 鼠标移入移出
  overOut(){
      this.show.addEventListener('mouseover', ()=>{
          this.mask.style.display = 'block'; 
          this.glass.style.display = 'block'; 
      })
      this.show.addEventListener('mouseout', ()=>{
          this.mask.style.display = 'none'; 
          this.glass.style.display = 'none'; 
      })
  }

  // 鼠标移动效果
  move(){
      this.show.addEventListener('mousemove', (e)=>{
          let x = e.clientX - this.ele.offsetLeft - this.ele.clientLeft - this.mask.clientWidth/2;
          let y = e.clientY - this.ele.offsetTop - this.ele.clientTop - this.mask.clientHeight/2 ;
          if(x < 0){
              x = 0;
          }
          if(y < 0){
              y = 0
          }
          if(x > this.show.clientWidth - this.mask.clientWidth){
              x = this.show.clientWidth - this.mask.clientWidth;
          }
          if(y > this.show.clientHeight - this.mask.clientHeight){
              y = this.show.clientHeight - this.mask.clientHeight;
          }
          this.mask.style.left = x + 'px';
          this.mask.style.top = y + 'px';
          let bx = 1600*x/400;
          let by = 1600*y/400;
          this.glass.style.backgroundPosition = `-${bx}px -${by}px`;
      })
  }
}