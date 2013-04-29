$(document).ready(function() {		

	/*
	 * Enhancements
	 */
	
	// Password Strength
	if ($('#sign-up').size()) {
		$.getScript(
			'js/jquery.passroids.min.js',
			function() {
				$('form').passroids({
					main : "#password"
				});
			}
		);
	}
	
	// Selectbox styling
	if ($('form select').size()) {
		$.getScript(
			'js/jquery.selectbox.min.js',
			function() {
				$('select').selectbox();
				// Wrap inputs with styling helper
				$('input.selectbox').each(function() {
					$(this).wrap('<span id="wrapper_' + $(this).attr('id') + '" class="selectbox-input-wrapper"></span>');
				});
			}
		);
	}
	
	/*
	 * Form Validation
	 */
	 
	// Set Defaults
	jQuery.validator.setDefaults({
		errorElement : 'a',
		wrapper : 'li',
		errorLabelContainer : '#form-messages ul',
		focusInvalid: false,
		onfocusout: false,
		highlight: function(element, errorClass) {
			var errorContainer = $(element).parents('div').eq(0),
				existingIcon = $('img.icon', errorContainer);
				
			// Account for groups of questions
			if ($(element).parents('.group').size()) {
				errorContainer = $(element).parents('.group');
			}
			
			// Replace any existing icon with error icon
			if (existingIcon.size()) {
				existingIcon.replaceWith('<img src="images/icon-error.gif" alt="error" class="icon" />');
			}
			// Otherwise append to container
			else {
				errorContainer.append('<img src="images/icon-error.gif" alt="error" class="icon" />');
			}
			
			// Highlight field
			$(element).addClass(errorClass);

		},
		unhighlight: function(element, errorClass) {
			var errorContainer = $(element).parents('div').eq(0);
			
			// Account for groups of questions
			if ($(element).parents('.group').size()) {
				errorContainer = $(element).parents('.group');
			}
			
			// Replace icon with that of success
			if ($(':input.error', errorContainer).size() <= 1) {
				$('img.icon', errorContainer).replaceWith('<img src="images/icon-valid.gif" alt="Valid" class="icon" />');
			}
			
			// Unhighlight field
			$(element).removeClass(errorClass);
		},	
		showErrors: function(errorMap, errorList) {		
			var numErrors = this.numberOfInvalids();
				
			this.defaultShowErrors();
			
			// Populate/update error message
			if (!$('h2', errorContainer).size()) {
				errorContainer.prepend('<h2></h2>');
			}
			if (numErrors) {
				$('h2', errorContainer).html('<strong>Oops!</strong> Your form contains ' + numErrors + " error" + ((numErrors == 1) ? '' : 's') + ':');
				$(this.currentForm).removeClass('valid');
			}
			// Success is ours!
			else {
				$('h2', errorContainer).text('All errors have been corrected, please continue');
				$(this.currentForm).addClass('valid');
			}
			// Setup links
			$('a', errorContainer).each( function() {
				var el = $(this),
					fieldID = el.attr('htmlfor'),
					field = $('#' + fieldID);
				
				// Add href attribute to linsk
				el.attr('href', '#' + fieldID);
				
				// Focus on click
				el.bind('click', function() {
					field.trigger('focus');
					$('html,body').animate( 
						{scrollTop: field.offset().top - 20}, 100
					);
					return false;
				});
			});
		},	
		submitHandler: function(form) {
			$(form).hide();
			$('<p class="introduction">Thank you for signing up. Please check your email for further instructions.</p>')
				.insertBefore(form)
				.show();
			$('html,body').animate( 
				{scrollTop: $("div#form-messages").offset().top}, 1000
			);
		}
	});
	
	// Add a placeholder for form messages
	var errorContainer = $('<div id="form-messages"><ul></ul></div>').hide();
	errorContainer.insertBefore('fieldset div:first');
		
	// Bind event to invalid form submission
	$("form").bind("invalid-form.validate", function(e, validator) {
		errorContainer.show();
		$('html,body').animate( 
			{scrollTop: errorContainer.offset().top - 20}, 100
		);		

		errorContainer.focus();
	});
	
	// Override default messages
	$.extend($.validator.messages, {  
		required : "This field is required",
		email : "Please enter a valid email",
		digits : "Please enter a numeric value"
	});
	
	
	/*
	* Initiate Validation Plugin
	*/
	$('#sign-up form').validate({		 
		rules : {
			// Email
			'email' : {
				required : true,
				email: true
			},
			// Password
			'password' : {
				required : true
			},
			// Password Confirmation
			'password_confirmation' : {
				required : true,
				equalTo : '#password'
			},
			// Profile Link
			'profile_link' : {
				required : true
			},
			// Terms of Service
			'agree_tos' : {
				required : true
			}
		},
		messages : {
			'email' : {
				required : 'Enter your email address',
				email : 'Enter a valid email address, for example user@example.com'
			},
			'password' : {
				required : 'Ensure your passwords match'
			},
			'password_confirmation' : {
				required : 'Confirm your password',
				equalTo : 'Ensure your passwords match'
			},
			'profile_link' : {
				required : 'Enter a link for your profile'
			},
			'agree_tos' : {
				required : 'You must agree to the terms of service'
			}
		}
	});
	
	$('#feedback form').validate({		 
	rules : {
		// Name
		'name' : {
			required : true
		},
		// Email
		'email' : {
			required : true,
			email: true
		},
		// Comments
		'comment' : {
			required : true
		}
	}
});

});