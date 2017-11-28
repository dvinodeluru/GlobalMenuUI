/* 
    
    Savage Menu App
    Version 1.0

*/

"use strict";
var savageclose = document.getElementById('sv-menu-control'),
    svmenubox = document.getElementById('sv-menu-box'),
    svuserbox = document.getElementById('sv-welcomeusr'),
    savageMenuSlider = document.getElementById('savage-header-bar'),
    quicklinkbar = document.getElementById('sv-quicklink-bar'),
    svQuickLink = document.getElementById('sv-quicklink'),
    svmenuslider = document.getElementById('sv-menu-slider'),
    svusrctrl = document.getElementById('sv-user-control'),
    menudropdown = document.querySelectorAll('.sv-menu-dropbox'),
    tiledropdown = document.querySelectorAll('.sv-tile-drop'),
    tilegroup = document.getElementById('sv-menu-tilegroup'),
    tileMenu = document.querySelectorAll('.sv-menu-tile'),
    tileItem = document.querySelectorAll('.sv-menu-subgroup'),
    touchevent = '';

//Burger Menu event
savageclose.addEventListener('click', function () {
    console.log(this.classList.contains('back'));
    if (!this.classList.contains('back')) {
        this.classList.toggle('open');
        savageMenuSlider.classList.toggle('open');
        quicklinkbar.classList.remove('open');
        svQuickLink.classList.toggle('off');
        document.body.classList.toggle('scrolloff');
        svQuickLink.classList.remove('on');
    } else {
        this.classList.remove('back');
        tilegroup.style.left = 0;
        this.setAttribute('data-label', 'Menu');
    }
});

//user control dropdown
svuserbox.addEventListener('click', function (event) {
    this.classList.toggle('open');
});

//quick link
svQuickLink.addEventListener('click', function () {
    quicklinkbar.classList.toggle('open');
    this.classList.toggle('on');
});

//Close the user control dropdown menu if the user clicks outside of it
document.onclick = function (event) {
    if (!event.target.matches('.sv-welcomeusr')) {
        //console.log(event.target);
        menudropdown.forEach(function (openDropdown) {      
            svuserbox.classList.contains('open') && svuserbox.classList.remove('open');
        });
    }
    if (!event.target.matches('.sv-tile-title')) {
        //console.log(event.target);
        for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); tileItem[i].querySelector('.sv-menu-dropbox').removeAttribute('style'); }
    }
};

//Responsive events
var onResizing = function (event) {
    var winW = window.innerWidth;
    savageclose.classList.remove('back');
    tilegroup.removeAttribute('style');
    if (winW <= 991) {
        tilegroup.appendChild(svuserbox);
        tilegroup.style.width = winW;      
    } else {
        svusrctrl.insertBefore(svuserbox, svusrctrl.childNodes[0]);       
    }
}
window.onload = onResizing
window.onresize = onResizing;

//Only Click Event
for (var i = 0; i < tileItem.length; i++) {
    tileItem[i].addEventListener("click", showTile, false);
}

function showTile(e) {
    e.stopPropagation();
    var winW = window.innerWidth;
    //remove previous opend tile dropdowns for Click only event
    for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); tileItem[i].querySelector('.sv-menu-dropbox').removeAttribute('style'); }
    console.log(winW);
    this.classList.add("open");
    
    var childElm = this.children[1], childsgl = this.querySelectorAll('.sv-tile-subgroup').length,
        childPos = childElm.getBoundingClientRect(),
        thisPos = this.getBoundingClientRect();

    if (winW <= 991) {
        //Slide menu in mobile
        var dataLabel = this.querySelectorAll('[data-label]');        
        savageclose.classList.add('back');
        savageclose.setAttribute('data-label', dataLabel[0].getAttribute('data-label'));
        this.parentElement.style.left = - winW + 'px';
        this.querySelector('.sv-menu-dropbox').removeAttribute('style');
    } else {
        //Show hide dropdown in Desktop
        this.parentElement.style.left = 0;        
        childElm.style.top = thisPos.top + 45 + 'px';
        if (this.offsetLeft < (tilegroup.clientWidth / 3)) {
            childElm.style.left = (childsgl < 5) ? this.offsetLeft + 'px' : childElm.style.left = childElm.style.right = 40 + 'px';
        } else if (thisPos.right < (tilegroup.clientWidth / 3)) {
            childElm.style.right = (childsgl < 5) ? (tilegroup.clientWidth - (this.offsetLeft + thisPos.width)) - 40 + 'px' : childElm.style.left = childElm.style.right = 40 + 'px';
        } else {
            childElm.style.left = (childsgl < 5) ? ((this.offsetLeft + (thisPos.width / 2)) - (childPos.width / 2)) + 'px' : childElm.style.left = childElm.style.right = 40 + 'px';
        }
    }    
}

