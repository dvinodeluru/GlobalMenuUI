/* 
    
    Savage Menu App
    Version 1.0

*/

"use strict";

var menuNamespaceCreator = function () {
    //private properties
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
        tilesWithoutSubgroups = document.querySelectorAll('.sv-menu-tile:not(.sv-menu-subgroup)'),
        tileItem = document.querySelectorAll('.sv-menu-subgroup'),
        touchevent = '';

    //Burger Menu event
    savageclose.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!this.classList.contains('back')) {
            this.classList.toggle('open');
            savageMenuSlider.classList.toggle('open');
            quicklinkbar.classList.remove('open');
            svQuickLink.classList.toggle('off');
            document.body.classList.toggle('scrolloff');
            svQuickLink.classList.remove('on');
            document.body.style.paddingTop = savageMenuSlider.offsetHeight + 'px';
            tilegroup.classList.toggle('anim');
        } else {
            
            this.classList.remove('back');
            tilegroup.style.left = 0;
            this.setAttribute('data-label', 'Menu');
        }
    });

    //user control dropdown
    svuserbox.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('open');
    });

    //quick link
    svQuickLink.addEventListener('click', function (e) {
        e.stopPropagation();
        quicklinkbar.classList.toggle('open');
        this.classList.toggle('on');
        document.body.style.paddingTop = savageMenuSlider.offsetHeight + 'px';
    });

    //Close the user control dropdown menu if the user clicks outside of it
    document.onclick = function (event) {
        if (!event.target.matches('.sv-welcomeusr')) {
            //console.log(event.target);
            menudropdown.forEach(function (openDropdown) {      
                svuserbox.classList.contains('open') && svuserbox.classList.remove('open');
            });
        }
        if (!event.target.matches('.sv-menu-tile')) {
            //console.log(event.target);
            for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); tileItem[i].querySelector('.sv-menu-dropbox').removeAttribute('style'); tileItem[i].parentElement.classList.remove('tileOn');}
        }
    };

    //Responsive events
    this.onResizing = function (event) {
        var winW = window.innerWidth;
        savageclose.classList.remove('back');        
        tilegroup.removeAttribute('style');
        if (winW <= 991) {
            document.body.style.paddingTop = savageMenuSlider.offsetHeight + 'px';
            tilegroup.appendChild(svuserbox);
            tilegroup.style.width = winW;      
        } else {
            document.body.style.paddingTop = savageMenuSlider.offsetHeight + 'px';
            svusrctrl.appendChild(svuserbox, svusrctrl.childNodes[0]);
            //remove previous opend tile dropdowns
            hideAllTiles(event);
        }
    }

    // Turn off all dropdown when hovering over items with no drowpdownsOnly Click Event
    // for (var i = 0; i < tilesWithoutSubgroups.length; i++) {
    //     tilesWithoutSubgroups[i].addEventListener("mouseover", hideAllTiles, false);
    // }

    //Only Click Event
    for (var i = 0; i < tileItem.length; i++) {
    //    tileItem[i].addEventListener("mouseover", hideAllTiles, false);
        tileItem[i].addEventListener("click", showTile, false);
    }

    function hideAllTiles(e){
        e.stopPropagation();
        for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); tileItem[i].querySelector('.sv-menu-dropbox').removeAttribute('style'); tileItem[i].parentElement.classList.remove('tileOn'); }
    }

    function showTile(e) {
        e.stopPropagation();
        var winW = window.innerWidth;
        
        // // ignore mousover on small devices [no longer needed -- no longer using mouseover]
        // if(winW <= 991 && e.type == "mouseover"){
        //     return;
        // }
        //remove previous opend tile dropdowns for Click only event
        //hideAllTiles(e);
        if (!this.classList.contains("open")) {
            for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); tileItem[i].querySelector('.sv-menu-dropbox').removeAttribute('style'); tileItem[i].parentElement.classList.remove('tileOn'); }
            this.classList.add("open");
        } else {
            this.classList.remove("open");
        }
        
        
        var childElm = this.children[1], childsgl = this.querySelectorAll('.sv-tile-subgroup').length,
            childPos = childElm.getBoundingClientRect(),
            thisPos = this.getBoundingClientRect(),
                tileOffset = 20 + 'px';

        if (winW <= 991) {
            //Slide menu in mobile
            var dataLabel = this.querySelectorAll('[data-label]');        
            savageclose.classList.add('back');
            savageclose.setAttribute('data-label', dataLabel[0].getAttribute('data-label'));
            this.parentElement.style.left = - winW + 'px';
            this.querySelector('.sv-menu-dropbox').removeAttribute('style');
        } else {
            //Show hide dropdown in Desktop
            this.parentElement.classList.add('tileOn');
            // recalculate position of tile after tile is selected (account for addition of scrollbar)
            thisPos = this.getBoundingClientRect();
            childPos = childElm.getBoundingClientRect();
            this.parentElement.style.left = 0;        
            (savageMenuSlider.classList.contains('scrollOn')) ? childElm.style.top = thisPos.top + 88 + 'px' : childElm.style.top = thisPos.top + 58 + 'px';
            if (this.offsetLeft < (tilegroup.clientWidth / 3)) {
                childElm.style.left = (childsgl < 5) ? this.offsetLeft + 'px' : childElm.style.left = childElm.style.right = tileOffset;
            } else if (thisPos.right < (tilegroup.clientWidth / 3)) {
                // assign last third tiles
                childElm.style.right = (childsgl < 5) ? (tilegroup.clientWidth - (this.offsetLeft + thisPos.width)) - tileOffset : childElm.style.left = childElm.style.right = tileOffset;
            } else {
                // assign 2nd third tiles
                childElm.style.left = (childsgl < 5) ? ((this.offsetLeft + (thisPos.width / 2)) - (childPos.width / 2)) + 'px' : childElm.style.left = childElm.style.right = tileOffset;
            }
        }    
    }
   
    this.onScroll = function () {
        var scrollpos = document.documentElement.scrollTop || document.body.scrollTop, bodyTop = savageMenuSlider.offsetHeight; console.log(scrollpos + ' ' + bodyTop + ' ' + bodyTop > scrollpos);
        (scrollpos > bodyTop) ? savageMenuSlider.classList.add('scrollOn') : savageMenuSlider.classList.remove('scrollOn');
    }
}

var transloadMenu = transloadMenu || {};
menuNamespaceCreator.call(transloadMenu);

window.onload = transloadMenu.onResizing
window.onresize = transloadMenu.onResizing;
window.onscroll = transloadMenu.onScroll;


