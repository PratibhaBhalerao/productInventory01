public class ProductList {

    @AuraEnabled
    public static List<Product2> getProduct(Id pid)
    {
        List<Product2> products = [select Id, Name, Quantity__c, Product_Type__c, User__c, Category__c, Price__c from Product2 where Id =: pid];
        return products;
    }
    @AuraEnabled
    public static List<Product2> getSearchProduct(List<Id> seller, String searchKeyword)
    {
        List<Product2> products = new List<Product2>();
        
        String searchkey = String.isBlank(searchKeyword)?'%%':'%'+searchKeyword+'%';
        System.debug('Value of Search .... '+ searchkey);
        products = [select Id, Name, Quantity__c, Product_Type__c, User__c, Category__c, Price__c from Product2 where User__c in : seller AND Name Like :searchkey];
        return products;
    }
    
    @AuraEnabled
    public static String addRecord(Product2 pro)
    {
        System.debug('Yaaaahooo I am in server');
        System.debug(pro);
        insert pro;
        return pro.id;
    }
    
    @AuraEnabled
    public static String editRecord(Product2 pro)
    {
        System.debug(pro);
        update pro;
        return pro.id;
    }
    
    @AuraEnabled
    public static void deleteProduct(Id pid)
    {
        Product2[] delpro = [SELECT Id FROM Product2 WHERE Id = : pid]; 
		delete delpro;
    }
    
    @AuraEnabled
    public static List<Product2> getProductList()
    {
        
        return [select Id, Name, Quantity__c, Product_Type__c, User__c, Category__c, Price__c from Product2 where Category__c != null];
    }
    @AuraEnabled
    public static List<Product2> getProductList1(String searchKeyword)
    {
        String searchkey = String.isBlank(searchKeyword)?'%%':searchKeyword+'%';
        System.debug('Value of Search .... '+ searchkey);
        return [select Id, Name, Quantity__c, Product_Type__c, User__c, Category__c, Price__c from Product2 where Category__c != null AND Name Like :searchkey];
    }
}