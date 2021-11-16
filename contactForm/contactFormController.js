({
    save : function(component, event, helper) {
        var allValid = component.find('formField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if (allValid) {
            helper.updateContact(component);
        }
    },
    
    methodClear : function(component, event, helper) {
        component.set('v.contactChild', null);
        
        var params = event.getParam('arguments');
        alert(params.text);
        alert(params.text2);
    },
    
    cancel : function(component, event, helper) {
        component.set('v.contactChild', null);
    }
})