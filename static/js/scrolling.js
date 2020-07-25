
document.body.addEventListener('load',function(){
    window.scrollY = 0;
})
document.body.addEventListener('reload',function(){
    window.scrollY = 0;
})
var logo = document.querySelector('.logo');
var logoWidth = logo.getAttribute('width');
var logoheight = logo.getAttribute('height');
var smallWH = [165,64];
var scrollImageMax = 160;
var bigWH = [496,192]

var diff = logoWidth - smallWH[0];
var pps = diff/scrollImageMax;


window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var links = document.querySelectorAll('.nav-link');
    var activeLink = document.querySelector('.nav-active');
    console.log(window.scrollY);
    if (window.scrollY >= 50){
        logo.setAttribute('width',smallWH[0]);
        logo.setAttribute('height',smallWH[1]);
        logo.style.webkitFilter = 'invert(1) sepia(100%) saturate(300%) brightness(70%) hue-rotate(140deg)';
        logo.style.paddingTop = '10px';
        header.style.boxShadow = "10px 10px 9px 0px rgba(0,0,0,0.04)";
        header.style.background = '#fff';
        activeLink.style.color = '#9BB8D2';
        activeLink.style.borderColor = '#9BB8D2';
        links.forEach(element => {
            element.style.color = '#9BB8D2';
        });
        


    } else{
        logo.setAttribute('width',bigWH[0]);
        logo.setAttribute('height',bigWH[1]);
        logo.style.webkitFilter = 'invert(1)';
        logo.style.paddingTop = '25px';
        header.style.boxShadow = "10px 10px 9px 0px rgba(0,0,0,0)";
        header.style.background = '#9BB8D2';
        activeLink.style.color = '#fff';
        activeLink.style.borderColor = '#fff';
        links.forEach(element => {
            element.style.color = '#fff';
 
        });
    }

});



function Loc(){
    window.scrollTo(0,1080);
    var menu = document.querySelectorAll('.nav-item');
    menu.forEach(menuitem => {
       menuitem.children[0].setAttribute('class','nav-link');
       
    });
    document.getElementById('location').setAttribute('class','nav-active');

}

function Home(){
    window.scrollTo(0,0);
    var menu = document.querySelectorAll('.nav-item');
    menu.forEach(menuitem => {
       menuitem.children[0].setAttribute('class','nav-link');
       
    });
    document.getElementById('home').setAttribute('class','nav-active');

}

function Threats(){
    window.scrollTo(0,1936);
    var menu = document.querySelectorAll('.nav-item');
    menu.forEach(menuitem => {
       menuitem.children[0].setAttribute('class','nav-link');
       
    });
    document.getElementById('threat').setAttribute('class','nav-active');
}

function HowHelp(){
    window.scrollTo(0,3189);
    var menu = document.querySelectorAll('.nav-item');
    menu.forEach(menuitem => {
       menuitem.children[0].setAttribute('class','nav-link');
       
    });
    document.getElementById('hcih').setAttribute('class','nav-active');
}

