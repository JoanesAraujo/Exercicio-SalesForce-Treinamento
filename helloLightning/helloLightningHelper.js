({
	loadUser : function(component) {
        var action = component.get("c.getUserSession");
        
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				var response = response.getReturnValue();
                component.set('v.userSession', response);
            } else {
                var toastEvent = $A.get("e.force:showToast");
				toastEvent.setParams({
					'title': 'Erro!',
					'type': 'error',
					'message': 'Ocorreu um erro. Favor entrar em contato com o administrador.'
				});
				toastEvent.fire();
            }
		});

		$A.enqueueAction(action);
    },
    
    loadContacts : function(component) {
        component.set('v.showSpinner', true);
        
		var action = component.get("c.listContacts");
        
        var firstName = component.get('v.firstName');
        var lastName = component.get('v.lastName');
        var params = {};
        
        if (firstName != '') {
            params.firstName = firstName;
        }
        if (lastName != '') {
            params.lastName = lastName;
        }
        
        action.setParams(params);
        
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				var response = response.getReturnValue();
                console.log(response);
                component.set('v.contacts', response);
                component.set('v.contactsBackup', response);
                
                window.setTimeout(
                    $A.getCallback(function() {
                        component.set('v.showUpdated', false);
                    }), 2000
                );
            } else {
                var toastEvent = $A.get("e.force:showToast");
				toastEvent.setParams({
					'title': 'Erro!',
					'type': 'error',
					'message': 'Ocorreu um erro. Favor entrar em contato com o administrador.'
				});
				toastEvent.fire();
            }
            
            component.set('v.showSpinner', false);
            component.set('v.showSpinnerCustom', false);
		});

		$A.enqueueAction(action);
	},
    
    updateContact : function(component) {
        component.set('v.showSpinner', true);
        
		var action = component.get("c.updateContact");
		action.setParams({
			contactToUpdate: component.get('v.contact')
		});
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				var response = response.getReturnValue();
				var toastEvent = $A.get("e.force:showToast");
				toastEvent.setParams({
					'title': 'Sucesso!',
					'type': 'success',
					'message': 'Contato atualizado com sucesso.'
				});
				toastEvent.fire();
                
                this.loadContacts(component);
			} else {
				var toastEvent = $A.get("e.force:showToast");
				toastEvent.setParams({
					'title': 'Erro!',
					'type': 'error',
					'message': 'Ocorreu um erro. Favor entrar em contato com o administrador.'
				});
				toastEvent.fire();
			}
            
		});

		$A.enqueueAction(action);
	},
    
    deleteContact : function(component, contact) {
        component.set('v.showSpinner', true);
        
		var action = component.get("c.deleteContact");
		action.setParams({
			contactToUpdate: contact
		});
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				var response = response.getReturnValue();
				var toastEvent = $A.get("e.force:showToast");
				toastEvent.setParams({
					'title': 'Sucesso!',
					'type': 'success',
					'message': 'Contato apagado com sucesso.'
				});
				toastEvent.fire();
                
                this.loadContacts(component);
			} else {
				var toastEvent = $A.get("e.force:showToast");
				toastEvent.setParams({
					'title': 'Erro!',
					'type': 'error',
					'message': 'Ocorreu um erro. Favor entrar em contato com o administrador.'
				});
				toastEvent.fire();
			}
            
            component.set('v.showSpinner', false);
		});

		$A.enqueueAction(action);
	}
})