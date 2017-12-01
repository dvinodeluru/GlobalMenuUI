var menuDataDecorator = new function(){
    this.menuData = {
        tile: {
            label: "Quick Links",
            imageUrl: "images/bolt-outline.svg",
            megamenu: {
                subgroup: {
                    label: "Inventory",
                    links: {
                        link :{
                            label: "Inventory Adjusment",
                            linkUrl: "#/inventoryAdjustmentList"    
                        },
                        link :{
                            label: "Transfer Order",
                            linkUrl: "#/transferOrderList"    
                        }
                    }
                }
            }
        },
        tile: {
            label: "Equipment",
            imageUrl: "images/images/runs.svg",
            megamenu: {
                subgroup: {
                    label: "n/a",
                    links: {
                        link :{
                            label: "Equipment",
                            linkUrl: "#/equipmentList"    
                        },
                        link :{
                            label: "Equipment Trip",
                            linkUrl: "#/equipmentTripList"    
                        }
                    }
                }
            }
        }
    }

    this.loadData = function(){
        loadMenu;
        loadQuickLinks;
    }
    
    function loadMenu(){}
    function loadQuickLinks(){}

}

var transloadMenu = transloadMenu || {};
menuDataDecorator.call(transloadMenu);
menuDataDecorator.loadData();