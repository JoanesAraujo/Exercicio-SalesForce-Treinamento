({
	doInit : function(component, event, helper) {
        helper.loadContacts(component);
        helper.loadUser(component);
	},
    
    searchContacts : function(component, event, helper) {
        helper.loadContacts(component);
	},
    
    detalhes : function(component, event, helper) {
        var index = event.currentTarget.dataset.index;
        
        var contacts = component.get('v.contacts');
        var contactModal = contacts[index];
        
        component.set('v.contactModal', contactModal);
	},
    
    closeModal : function(component, event, helper) {
        component.set('v.contactModal', null);
    },
    
    searchContactsCustom : function(component, event, helper) {
        var showSpinnerCustom = event.getParam('showSpinnerCustom');
        component.set('v.showSpinnerCustom', showSpinnerCustom);
        
        alert(event.getParam('texto'));
        
        component.set('v.showUpdated', true);
        
        helper.loadContacts(component);
	},
    
    searchName : function(component, event, helper) {
        var firstName = component.get('v.firstName');
        var lastName = component.get('v.lastName');
        
        var contacts = component.get('v.contactsBackup');
        var newList = [];
        
        for (var i in contacts) {
            var regexFirst = new RegExp(firstName);
            var testFirst = regexFirst.test(contacts[i].FirstName);
            
            var regexLast = new RegExp(lastName);
            var testLast = regexLast.test(contacts[i].LastName);
            
            console.log(testFirst);
            
            if (testFirst && testLast) {
				 newList.push(contacts[i]);               
            }
        }
        
        component.set('v.contacts', newList);
    },
    
    newContact : function(component, event, helper) {
        component.set('v.contact', {sobjectType: 'Contact'});
	},
    
    actionContact : function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        selectedMenuItemValue = selectedMenuItemValue.split(';');
        
        var action = selectedMenuItemValue[0];
        var index = parseInt(selectedMenuItemValue[1]);
        
        component.set('v.indexContact', index);
        
        var contacts = component.get('v.contacts');
        var contact = contacts[index];
        
        console.log(contact);
        
        if (action == 'edit') {
            component.set('v.contact', contact);
        } else if (action == 'delete') {
            helper.deleteContact(component, contact);
        }
	},
    
    updateName : function(component, event, helper) {
        var allValid = component.find('formField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
         }, true);
        
         if (allValid) {
             helper.updateContact(component);
         }
	},
    
    save : function(component, event, helper) {
        var allValid = component.find('formField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
         }, true);
        
         if (allValid) {
             helper.updateContact(component);
         }
	},
    
    clear : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/lightning/n/Metadata_Utils"
        });
        urlEvent.fire();
	},
    
    cancel : function(component, event, helper) {
        component.set('v.contact', null);
	}
})