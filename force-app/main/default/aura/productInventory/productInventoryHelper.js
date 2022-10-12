({
	/*fetchProduct : function(component, event, helper) {
		var sellerId = component.get("v.recordId");
        var action = component.get("c.getProduct");
        action.setParams({
            seller : sellerId
        });
        
        action.setCallback(this, function(response){
                    var state = response.getState();
        			if(state === 'SUCCESS')
                    {
                        var productList = response.getReturnValue();
                        console.log(productList);
                        component.set("v.productList", productList);
                       // console.log();
                    }
        			else
        			{
            			alert('Error In getting Data');
        			}
               });
    		$A.enqueueAction(action);
    },
    */
    fetchProductHelper : function(searchValue, component)
    {
        var sellerId = component.get("v.recordId");
        var action = component.get("c.getSearchProduct");
        action.setParams({
            "seller" : sellerId,
            "searchKeyword" : searchValue
        });
        
        action.setCallback(this, function(response){
                    var state = response.getState();
        			if(state === 'SUCCESS')
                    {
                        var productList = response.getReturnValue();
                        console.log(productList);
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