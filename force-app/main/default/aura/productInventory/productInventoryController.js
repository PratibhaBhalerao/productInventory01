({
	/*getProductList : function(component, event, helper) {
		helper.fetchProduct(component, event, helper);
	},
*/    
     getProductList : function(component, event, helper){
        console.log("Entered... in getProductList"); 
        helper.fetchProductHelper(null, component);
        
    },
    
    searchProducts : function(component, event, helper){
        console.log("Entered... in Search");
        var searchValue = component.find("searchField").get("v.value");
        helper.fetchProductHelper(searchValue, component);
        
    },
   
	openModel: function(component, event, helper) {
        //console.log("Entered... in Open Model");
      component.set("v.isSave", true);
   },
    
    doCancel : function(component, event, helper) {
        //console.log("Entered... in Close Model");
        component.set("v.isSave", false);
         
    },   
    close : function(component, event, helper) {
        component.set("v.isEdit", false);    
    }, 
    
    add: function(component, event, helper){  
        
        //console.log("Entered...");
        var user = component.get("v.recordId");
        //console.log("User :",user);
        component.set('v.product.User__c', user);
        var pid = component.get("v.product.Id");
        console.log("Product Id : ",pid);
        if(pid == null)
        {
            var action = component.get("c.addRecord");
            action.setParams({
                'pro' : component.get("v.product")
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                console.log(state);
                if(state === 'SUCCESS')
                {
                    var productId = response.getReturnValue();
                    //console.log(productId);
                    component.set("v.isSave", false);
                    helper.fetchProductHelper(null, component);
                }
                else
                {
                    alert('Error In Inserting Data');
                }
            });
            $A.enqueueAction(action);
        }
        else
        {
            var action = component.get("c.editRecord");
            action.setParams({
                'pro' : component.get("v.product")
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                console.log(state);
                if(state === 'SUCCESS')
                {
                    var productId = response.getReturnValue();
                    //console.log(productId);
                    component.set("v.isSave", false);
                    helper.fetchProductHelper(null, component);
                }
                else
                {
                    alert('Error In Updating Data');
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    delete : function(component, event, helper){
		//console.log("Entered in delete functionality...");
    	var productid =  event.target.id;
    	console.log(productid);
    	var action = component.get("c.deleteProduct");
        action.setParams({
            'pid' : productid
        });
        
        action.setCallback(this, function(response){
                    var state = response.getState();
            		console.log(state);
        			if(state === 'SUCCESS')
                    {
                      	alert('Product deleted Successfully...');
                        helper.fetchProductHelper(null, component);
                    }
        			else
        			{
            			alert('Error In deleting product..');
        			}
               });
    		$A.enqueueAction(action);
	},
    
    /*handleLoad : function(component, event, helper) {
        //component.set("v.isEdit", true);
		console.log('handle handleLoad');
       
	},*/
        
    editForm : function(component, event, helper){
        var productid = event.target.id;
        component.set('v.proid', productid);
        //component.set("v.isEdit", true);
        var list = component.get("v.productList");
        if (list != null) {
            var listLength = list.length;
            for (var i=0; i < listLength; i++) {
                if(list[i].Id == productid)
                {
                    component.set("v.product.Id",list[i].Id);
                    component.set("v.product.Name", list[i].Name);
                    component.set("v.product.Price__c", list[i].Price__c);
                    component.set("v.product.Quantity__c", list[i].Quantity__c);
                    component.set("v.product.Product_Type__c", list[i].Product_Type__c);
                    component.set("v.product.Category__c", list[i].Category__c);
                    console.log(list[i].Name);
                }
            }
		}
        component.set("v.isSave", true);
	}
})