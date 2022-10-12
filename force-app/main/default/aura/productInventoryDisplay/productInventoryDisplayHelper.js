({
	fetchProductHelper : function(searchValue, component)
    {
        var action = component.get("c.getProductList1");
        action.setParams({
            "searchKeyword" : searchValue
        });
        console.log("Entered... Helper");
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