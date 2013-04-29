/*
 * 
 * jQuery PassRoids - Password strength meter and match verifier
 * http://www.thecreativeoutfit.com
 * 
 */

jQuery.fn.passroids = function(o) { 
  
  // Defaults ######################################################################
  var o = jQuery.extend( {
	  main: '#password',
	  verify: null,
	  button: null,
	  minimum: 0
  },o);
  
  // Create containers #############################################################
  jQuery(o.main).after('<div id="psr_score"></div>');
  
  if (o.verify!=null){ jQuery(o.verify).after('<div id="psr_verify"></div>'); }
  if (o.button!=null){ jQuery(o.button).after('<div id="psr_strength_notice"></div>'); }
  
  // Check to disable button initially #############################################
  if(o.button!=null){
	  jQuery(o.button).attr('disabled','true');
  }
  
  // Check Function ################################################################
  function testPass(v){
	  	var s = 0
		// PASSWORD LENGTH ~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    // Length of 4 or less
		if (v.length<5){ s = (s+3);	}
	    // Length between 5 and 7
		else if (v.length>4 && v.length<8){ s = (s+6); }
	    // Length between 8 and 15
		else if (v.length>7 && v.length<16){ s = (s+12); }
	    // Length of 16 or more
		else if (v.length>15){ s = (s+18); }	
		// LETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    // At least one lower case letter
		if (v.match(/[a-z]/)){ s = (s+1); }
		// At least one upper case letter
		if (v.match(/[A-Z]/)){ s = (s+5); }
		// NUMBERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// At least one number
		if (v.match(/\d+/)){ s = (s+5); }
		// At least three numbers
		if (v.match(/(.*[0-9].*[0-9].*[0-9])/)){ s = (s+5);	}
		// SPECIAL CHARACTERS ~~~~~~~~~~~~~~~~~~~~~~~~
		// At least one special character
		if (v.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){ s = (s+5); }
		// At least two special characters
		if (v.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ s = (s+5); }
		// COMBOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Both upper and lower case
		if (v.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ s = (s+4); }
		// Both letters and numbers
		if (v.match(/([a-zA-Z])/) && v.match(/([0-9])/)){ s = (s+4); }
		// Letters, numbers, and special characters
		if (v.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)){ s = (s+7); }
		// Return the score ~~~~~~~~~~~~~~~~~~~~~~~~~~
		return s;
  }
  
  // Evaluate score ################################################################
  function evalScore(s){	  
	var strength = 0;
	switch(true){
	case s<=13:
		strength = 0;
		break;
	case s>=14 && s<=27:
		strength = 1;
		break;
	case s>=28 && s<=40:
		strength = 2;
		break;
	case s>=41:
		strength = 3;
		break;
	}
	return strength;
  }
  
  // Change button state ###########################################################
  function changeButtonState(v){
	  var val = jQuery(o.main).val();
	  var s = testPass(val);
	  var strength = evalScore(s);
	  if (o.button!=null){
		  	if(v==1 && strength>=o.minimum){
		  		jQuery(o.button).attr('disabled','');
		  		jQuery('#psr_strength_notice').html('');
		  	}
		  	else{
		  		jQuery(o.button).attr('disabled','true');
		  		if (strength<o.minimum){
		  			jQuery('#psr_strength_notice').html('Please choose a stronger password.')
		  		}
		  	}
	  }
  }
  
  
  // Main functionality ############################################################ 
  return this.each(function() {
  	    // Check password strength ~~~~~~~~~~~~~~~~~~~~~
		    jQuery(o.main).keyup(function(){
	  		// Get field value
	  		var val = jQuery(o.main).val();
	  		// Get score
	  		var s = 0;
	  		if (val!=''){ var s = testPass(val); }
	  		// Evaluate
	  		var levels=new Array();
	  		levels[0]="Weak";
	  		levels[1]="Medium";
	  		levels[2]="Strong";
	  		levels[3]="Excellent";
	  		var strength = evalScore(s);	
	  		// Display Score
	  		jQuery('#psr_score').html('<span class="psr_' + levels[strength] + '"><strong>Strength:</strong> ' + levels[strength] + '</span>');	
	    });
	  
  	// Check for verification ~~~~~~~~~~~~~~~~~~~~~~~~
	if(o.verify!=null){
		// Clear message (on keyup)
		jQuery(o.verify).keyup(function(){
			var main = jQuery(o.main).val();
			var verify = jQuery(o.verify).val();
			if(main==verify){
				jQuery('#psr_verify').html('');
				changeButtonState(1);
			}
		});
		
		// Check verify
		jQuery(o.verify).blur(function(){
		   var main = jQuery(o.main).val();
		   var verify = jQuery(o.verify).val();
		   if(main!=verify){
			   jQuery('#psr_verify').html('Passwords do not match');
			   changeButtonState(0);
		   }
		});
	}
  }); 
};