({
    /*getProductList : function(component, event, helper){
        //console.log("Entered... in getProductList"); 
        helper.fetchProductHelper(null, component);
        
    },*/
    
    searchProducts : function(component, event, helper){
        //console.log("Entered... in Search");
        var searchValue = component.find("searchField").get("v.value");
        helper.fetchProductHelper(searchValue, component);
    },
    
	getProduct : function(component, event, helper){ 
        var action = component.get("c.getProductList");
        action.setCallback(this, function(response){
                    var state = response.getState();
        			if(state === 'SUCCESS')
                    {
                        var productList = response.getReturnValue();
                        //console.log(productList);
                        component.set("v.productList", productList);
                       // console.log();	
                    }
        			else
        			{
            			alert('Error In getting Data');
        			}
               });
    		$A.enqueueAction(action);
    }
})