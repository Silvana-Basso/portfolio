//`Vue.config.devtools=true;`
//Menú toggle
const nav= document.getElementById('navegador');
const menu_bar=document.querySelector('#navegador .menu-bar');
menu_bar.addEventListener('click',function(){
    nav.classList.toggle('active')
});

 //efecto scroll en el menú
  window.addEventListener("scroll", function () {
      const header = document.getElementById("navegador");
     
      //const menu_bar = document.querySelector("#nav .menu-bar");
      const scrollYY = window.scrollY;
    
      if (scrollYY > 50) {
        header.classList.add("scrolled");
        menu_bar.classList.add("scrolled");
       // menu_bar.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
        menu_bar.classList.remove("scrolled");
       // menu_bar.classList.remove("scrolled");
      }
    });
//borde con scroll
window.addEventListener("scroll", function () {
    const titulo = document.querySelector(".titulo");
    const scrollY = window.scrollY;
  
    if (scrollY > 10) {
      titulo.classList.add("scrollGradient");
    } else {
      titulo.classList.remove("scrollGradient");
    }
  });
 

//card 

Vue.component("card",{
    template:`
    <div class="card-wrap" @mousemove = "handleMouseMove" @mouseenter= "handleMouseEnter" @mouseleave= "handleMouseLeave" ref="card">
    

    <div class="card" :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform,cardBgImage]"></div>
        <div class="card-info">
            <slot name="header"></slot>

           
            <slot name="content"></slot>
          
           

        </div>


      
    </div>
 </div>
    `,
    mounted(){
        this.width= this.$refs.card.offsetWidth;
        this.height= this.$refs.card.offsetHeight;
    },
    props:['dataImage'],
    data:()=>({
        width:0,
        height:0,
        mouseX:0,
        mouseY:0,
        mouseLeaveDelay:null
    }),
    computed:{
        mousePX(){
            return this.mouseX / this.width;
        },
        mousePY(){
            return this.mouseY / this.height;
        },
        cardStyle(){
            const rX= this.mousePX * 25;
            const rY= this.mousePY * -25;
            return{
                transform: `rotateY(${rX}deg)rotateX(${rY}deg)`
            };
        },
        cardBgTransform(){
            const tX= this.mousePX * 50;
            const tY= this.mousePY * -50;
            return{
                transform:`translateX(${tX}px)translateY(${tY}px)`
            };
        },
        cardBgImage(){
            return{
                backgroundImage: `url(${this.dataImage})`,};
        }
    },

    methods:{
        handleMouseMove(e){
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width /2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height /2;

        },
        handleMouseEnter(){
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave(){
            this.mouseLeaveDelay = setTimeout(()=>{
                this.mouseX = 0;
                this.mouseY = 0;
            },300);
        }
    }
});
const app= new Vue({
    el:'#app'
});
//efecto scroll en los section
let animado=document.querySelectorAll('.scrollImg');
function mostrarScroll(){
    let scrollTop=document.documentElement.scrollTop;//mide alto de pantalla
    for(var i=0;i<animado.length;i++){
        let alturaAnimado=animado[i].offsetTop;//mide altura de pantalla hasta los elementos
        if(alturaAnimado - 300 < scrollTop){
            animado[i].style.opacity=1;
           
        }
    }
}
window.addEventListener('scroll',mostrarScroll);


//scroll en los links

      document.addEventListener("DOMContentLoaded", function() {
        const links = document.querySelectorAll('.smooth-scroll');
      
        for (const link of links) {
          link.addEventListener('click', smoothScroll);
        }
      
        function smoothScroll(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scroll({
              top: offsetTop,
              behavior: 'smooth' // Esta propiedad realiza el desplazamiento suave
            });
      
            // Actualiza la navegación en función de la sección visible
            const menuLinks = document.querySelectorAll('#navegador a[href^="#"]');
            for (const menuLink of menuLinks) {
              menuLink.classList.remove("selected");
            }
            this.classList.add("selected");
          }
        }
      });
      
      const menuLinks = document.querySelectorAll('#navegador a[href^="#"]');
      const menu = document.getElementById('navegador');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`#navegador a[href="#${id}"]`);
          });
        },
        { rootMargin: "-30% 0px -70% 0px" }
      );
      
      menuLinks.forEach((menuLink) => {
        menuLink.addEventListener("click", function () {
          menu.classList.remove("active");
        });
      
        const hash = menuLink.getAttribute("href");
        const target = document.querySelector(hash);
        if (target) {
          observer.observe(target);
        }
      });
      
