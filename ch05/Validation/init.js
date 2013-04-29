$(document).ready(function() {		
	
	/*
	 * Form Validation
	 */

	// Set Defaults
	jQuery.validator.setDefaults({ 
		errorElement: "em",
		success: function(label) {
			label.addClass("valid");
		},
		showErrors: function(errorMap, errorList) {
			var numErrors = this.numberOfInvalids(),
				errorContainerVisible = errorContainer.is(':visible');
				
			this.defaultShowErrors();
			
			if (numErrors && errorContainerVisible) {
				errorContainer
					.html("Your form contains " + numErrors + " error" + ((numErrors == 1) ? '' : "s") + " that must be corrected before continuing")
					.show();
				$(this.currentForm).removeClass('valid');
			}
			else if (errorContainerVisible) {
				errorContainer
					.text('All errors have been corrected, please continue')
					.show();
				$(this.currentForm).addClass('valid');
			}
			else {
				errorContainer.hide();
			}
		},
	 	errorPlacement: function(error, element) {
	 		// Listed elements
			if ( (element.attr("type") == "radio") || (element.attr("type") == "checkbox") ) {
				error.insertAfter($(element).parents("ul").eq(0)).wrap("<span class=\"type-list\"></span>");
			}
			
			// Select elments
			else if (element.is("select") && $(element).parent("div.group-date").size()) {
				// Insert after last select element
				error.insertAfter($("select:last", element.parent("div.group-date")));
			}
			// All other
			else {
				error.insertAfter(element);
			}
		},
		focusInvalid: false
	});
	
	// Add a placeholder for form messages
	errorContainer = $('<div id="form-messages"></div>').hide();
	errorContainer.insertBefore('div.semantic-form');
		
	// Bind event to invalid form submission
	$("div.semantic-form").parent("form").bind("invalid-form.validate", function(e, validator) {
		errorContainer.show();
		$('html,body').animate( 
			{scrollTop: $("div#form-messages").offset().top}, 1000
		);
	});
	
	// Validate on hide conditional section event
	$("div.semantic-form").parent("form").bind("clearConditionalSection", function (event, conditionalSection) {
		if ($("#form-messages:visible").size()) {
			$(this).valid();
		}
	});
	
	// Override default messages
	$.extend($.validator.messages, {  
		required : '<img src="#" alt="Error" />This information is required',
		requiredDate : "This information is required ",
		digits : "Please enter a numeric value",
	});
	
	/*
	* Initiate Validation Plugin
	*/
	$('form').validate({		 
		rules: {
		/* -- Section 1 -- */
		
			// Sample Text
			'sample-form-item-text' : {
				required : true
			},
			// Sample Radio
			'sample-form-item-radio' : {
				required: true
			},
			
			/* -- Conditional Section -- */
				// Sample Text 2
				'sample-form-item-text-2' : {
					required: true
				},
				
		/* -- Matrix fields -- */
		
			// Date of Birth
			'q31318:q4value[d]' : {
				requiredDate: true
			},
			
			// File Upload - Existing
			'sample-file-upload-existing' : {
				requiredFile: true
			}
		}		
	});
});