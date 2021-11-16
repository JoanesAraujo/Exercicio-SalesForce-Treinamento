({
	updateContact : function(component) {
        var action = component.get("c.updateContact");
		action.setParams({
			contactToUpdate: component.get('v.contactChild')
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
                
                var helloLightningEvt = component.getEvent("helloLightningEvt");
                helloLightningEvt.setParams({
                    'showSpinnerCustom': true,
                    'texto': 'Ok'
                });
                helloLightningEvt.fire();
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
	}
})