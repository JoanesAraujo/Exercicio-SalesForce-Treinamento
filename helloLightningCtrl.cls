public class helloLightningCtrl {
    
    @AuraEnabled
    public static User getUserSession() {
        
        return [select Id, Name, FirstName, LastName, Email from User where Id = :UserInfo.getUserId() ];
        
    }
    
    @AuraEnabled
    public static Contact getFirstContact() {
        
        return [select Id, Name, FirstName, LastName, Email from Contact limit 1];
        
    }
    
    @AuraEnabled
    public static List<Contact> listContacts(String firstName, String lastName) {
        List<Contact> contacts;
        
        String firstNameTemp = String.valueOf(firstName);
        String lastNameTemp = String.valueOf(lastName);
        
        if (String.isNotBlank(firstName) || String.isNotBlank(lastName)) {
            firstNameTemp = '%' + firstNameTemp + '%';
            lastNameTemp = '%' + lastNameTemp + '%';
            
            if (String.isNotBlank(firstName) && String.isNotBlank(lastName)) {
                contacts = [select Id, Name, FirstName, LastName, Email, Phone from Contact where FirstName like :firstNameTemp and LastName like :lastNameTemp order by Name];
            } else if (String.isNotBlank(firstName)) {
                contacts = [select Id, Name, FirstName, LastName, Email, Phone from Contact where FirstName like :firstNameTemp order by Name];
            } else if (String.isNotBlank(lastName)) {
                contacts = [select Id, Name, FirstName, LastName, Email, Phone from Contact where LastName like :lastNameTemp order by Name];
            }
        } else {
            contacts = [select Id, Name, FirstName, LastName, Email, Phone from Contact order by Name];
        }
        
        return contacts;
    }
    
    @AuraEnabled
    public static Void updateContact(Contact contactToUpdate) {
        
        upsert contactToUpdate;
        
    }
    
    @AuraEnabled
    public static Void deleteContact(Contact contactToUpdate) {
        
        delete contactToUpdate;
        
    }
    
}