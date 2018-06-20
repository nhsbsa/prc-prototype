/* global $ */

var $errorLayer = $('.form-group'),
$errSummary = $('.error-summary'),
$errMessage = $('.error-message');

function displayPageErrors(errorMessageClass) {
    $errSummary.removeClass('display-none');
    if(errorMessageClass){
        // $('.'+errorMessageClass).removeClass('display-none').parents('.form-group').addClass('error');
        $('.'+errorMessageClass).removeClass('display-none');
    } else {
        $errMessage.removeClass('display-none');
        // $errorLayer.addClass('error');
    }
}

function removePageErrors(errorMessageClassName) {
    if (errorMessageClassName) {
        $('.'+errorMessageClassName).addClass('display-none');
    }
}

function displayFieldError($inputField) {
    var i;
    var $errorLayer = $inputField.parents('.form-group');
    var $radioField;
    $errorLayer.addClass('error');
    if ($radioField = $($inputField)) { // [array]
        for (i = 0; i < $radioField.length; i++){
            $radioField.addClass('form-control-error'); // FIC amends for radio error-styles
        };
    };
    $('.error-message', $errorLayer).removeClass('display-none');
    $($inputField[0].parentElement.parentElement.previousElementSibling).removeClass('js-hidden');
}

function clearFormErrors($form){
    $('.form-group', $form).removeClass('error');
    $('.form-control-error').removeClass('form-control-error'); // FIC amends for input error-styles
    $('.error-message', $form).addClass('display-none');
    $('.error-summary').addClass('display-none');
}

$(document).ready(function() {
    // GOVUK.toggle.init();
    // The following JavaScript code is just for demo purposes.
    // Not For Production, please remove when developing the real thing.
    if($('.add-search').length > 0){
        $('.phase-banner').append($('<a href="login" class="log-out-link">Search again</a>'));
    }
    if($('.add-log-out').length > 0){
        $('.service-header').prepend($('<a href="login" class="log-out-link" id="logout-link">Logout</a>'));
    }
    
    // for cleaner urls after using form navigation
    var $jumpForm = $('.jump-form');
    $jumpForm.on('submit', function (evt) {
        evt.preventDefault();
        location.assign($jumpForm.attr('action'));
    });
    
    // radio type input fields
    var $formWithRadioButtons = $('.demo-validation-radio');
    if($formWithRadioButtons.length > 0){
        $formWithRadioButtons.on('submit', function (evt) {
            evt.preventDefault();
            if($('input:checked').length < 1){
                displayPageErrors();
            } else {
                location.assign($formWithRadioButtons.attr('action'));
            }
        });
    }
    
    // text type input fields
    var $demoValidationInputsForm = $('.demo-validation-input');
    if($demoValidationInputsForm.length > 0){
        $demoValidationInputsForm.on('submit', function (evt) {
            evt.preventDefault();
            var isValid = true;
            $('input', $demoValidationInputsForm).each(function() {
                if($(this).val() == ""){
                    isValid = false;
                }
            });
            if(isValid){
                location.assign($demoValidationInputsForm.attr('action'));
            } else {
                displayPageErrors();
            }
        });
    }
    
    // general and used for multiple forms
    var $formToValidated = $('.form-to-validate');
    var messages = {
        "exists" : "An account using this email address already exists.",
        "unmatched" : "We could not match the information you provided."
    };
    
    if($formToValidated.length > 0){
        $formToValidated.on('submit', function (evt) {
            evt.preventDefault();
            
            // clears error displays, resets error flag
            clearFormErrors($formToValidated);
            var isValid = true;
            var submitFormIfValid = function(){
                if(isValid){
                    location.assign($formToValidated.attr('action'));
                } else {
                    $('.error-summary').removeClass('display-none');
                    $('html, body').animate({ scrollTop: 0 }, 'fast');
                }
            };
            
            // validates text input fields
            $('.validate-text-input', $formToValidated).each(function() {
                if($.trim($(this).val()) == ""){
                    displayFieldError($(this));
                    isValid = false;
                }
            });
            
            // validates radio button via group name
            $('.validate-radio-input', $formToValidated).each(function() {
                var radioGroupName = $(this).attr('data-validate-radio-input');
                var radioGroupValue = $("input[name='" + radioGroupName + "']:checked").val();
                if(radioGroupValue == undefined){
                    displayFieldError($(this));
                    isValid = false;
                }
            });

            // login - prc //
            if ($formToValidated.attr('id') == 'login-form'){
                // change location based on input
                var loginEmail = $('#username', $formToValidated).val();
                if (loginEmail == 'a') {
                    location.assign('homepage');
                    return false;
                }
                submitFormIfValid();
            }
            
            // definitoryquestions - prc //
            if ($formToValidated.attr('id') == 'questions-form') {
                var isValid;
                var applyingFor = $("input[name='radio-inline-group']:checked").val() || false; // false if undefined
                var s1Registered = $("input[name='registred2']:checked").val() || false; // false if undefined

                if (applyingFor == false) {
                    displayPageErrors("error1");
                }
                if (applyingFor != false) {
                    removePageErrors("error1");
                }
                if (s1Registered == false) {
                    displayPageErrors("error2");
                }
                if (s1Registered != false) {
                    removePageErrors("error2");
                }
                if (applyingFor != false && s1Registered != false) {
                    if (s1Registered == 'Yes') {
                        $("#questions-form").attr("action", "/prc2/registerpersons1");
                    }
                    isValid = true;
                }
                submitFormIfValid();
            }

            // registerperson - prc //
            else if ($formToValidated.attr('id') == 'register1-form') {
                var isValid;
                var appFirstName = $('#reference-number-1', $formToValidated).val() || false;
                var appLastName = $('#reference-number-2', $formToValidated).val() || false;
                var appDateOfBirth = $('#reference-number-3', $formToValidated).val() || false;
                var appPostcode = $('#reference-number-4', $formToValidated).val() || false;
                var appS1Country = $('#country-of-treatment', $formToValidated).val() || false;
                var tickboxed = $("input[name='ukResident']:checked").val();
                var dependant = $(".dependent");
                var errSumm1 = $("#bcd");
                var errSumm2 = $("#cde");
                var depFirstName = $('#reference-number-5', $formToValidated).val() || false;
                var depLastName = $('#reference-number-6', $formToValidated).val() || false;
                var depDateOfBirth = $('#reference-number-7', $formToValidated).val() || false;

                if (appFirstName == false) {
                    errSumm1.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error1");
                }
                if (appFirstName != false) {
                    removePageErrors("error1");
                }

                if (appLastName == false) {
                    errSumm1.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error2");
                }
                if (appLastName != false) {
                    removePageErrors("error2");
                }

                if (appDateOfBirth == false) {
                    errSumm1.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error3");
                }
                if (appDateOfBirth != false) {
                    removePageErrors("error3");
                }

                if (appPostcode == false) {
                    errSumm1.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error4");
                }
                if (appPostcode != false) {
                    removePageErrors("error4");
                }

                if (appS1Country == false) {
                    errSumm1.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error8");
                }
                if (appS1Country != false) {
                    removePageErrors("error8");
                }

                if (dependant.hasClass("visually-hidden") == false && depFirstName == false) {
                    errSumm2.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error5");
                }
                if (dependant.hasClass("visually-hidden") == false && depFirstName != false) {
                    // errSumm2.removeClass("display-none").addClass("error-summary");
                    removePageErrors("error5");
                }

                if (dependant.hasClass("visually-hidden") == false && depLastName == false) {
                    errSumm2.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error6");
                }
                if (dependant.hasClass("visually-hidden") == false && depLastName != false) {
                    // errSumm2.removeClass("display-none").addClass("error-summary");
                    removePageErrors("error6");
                }

                if (dependant.hasClass("visually-hidden") == false && depDateOfBirth == false) {
                    errSumm2.removeClass("display-none").addClass("error-summary");
                    displayPageErrors("error7");
                }
                if (dependant.hasClass("visually-hidden") == false && depDateOfBirth != false) {
                    // errSumm2.removeClass("display-none").addClass("error-summary");
                    removePageErrors("error7");
                }

                if (!document.location.href.includes("registerpersons1")) {
                    // removes error-summary with no errors //
                    if (dependant.hasClass("visually-hidden") == false 
                        && appFirstName != false && appLastName != false && appDateOfBirth != false && appPostcode != false) {
                            errSumm1.addClass("display-none").removeClass("error-summary");
                    }
                    if (dependant.hasClass("visually-hidden") == false 
                        && depFirstName != false && depLastName != false && depDateOfBirth != false) {
                            errSumm2.addClass("display-none").removeClass("error-summary");
                    }
                    // end //

                    if (appFirstName != false && appLastName != false && appDateOfBirth != false && appPostcode != false
                        && dependant.hasClass("visually-hidden") == true) {
                            if (tickboxed == 'Yes') {
                                $("#register1-form").attr("action", "/prc2/notukresident");
                            } else {
                                location.assign($formToValidated.attr('action'));
                            }
                            isValid = true;
                    } else if (appFirstName != false && appLastName != false && appDateOfBirth != false && appPostcode != false
                        && dependant.hasClass("visually-hidden") == false
                        && depFirstName != false && depLastName != false && depDateOfBirth != false) {
                            if (tickboxed == 'Yes') {
                                $("#register1-form").attr("action", "/prc2/notukresident");
                            } else {
                                location.assign($formToValidated.attr('action'));
                            }
                            isValid = true;
                    } else {
                        return false;
                    }
                    submitFormIfValid();

                } else if (document.location.href.includes("registerpersons1")) {
                    // removes error-summary with no errors //
                    if (dependant.hasClass("visually-hidden") == false 
                        && appFirstName != false && appLastName != false && appDateOfBirth != false && appPostcode != false && appS1Country != false) {
                            errSumm1.addClass("display-none").removeClass("error-summary");
                    }
                    if (dependant.hasClass("visually-hidden") == false 
                        && depFirstName != false && depLastName != false && depDateOfBirth != false) {
                            errSumm2.addClass("display-none").removeClass("error-summary");
                    }
                    // end //

                    if (appFirstName != false && appLastName != false && appDateOfBirth != false && appPostcode != false && appS1Country != false
                        && dependant.hasClass("visually-hidden") == true) {
                            isValid = true;
                    } else if (appFirstName != false && appLastName != false && appDateOfBirth != false && appPostcode != false && appS1Country != false
                        && dependant.hasClass("visually-hidden") == false
                        && depFirstName != false && depLastName != false && depDateOfBirth != false) {
                            isValid = true;
                    } else {
                        return false;
                    }
                    submitFormIfValid();

                } else {
                    return false();
                }
            }

            // contactdetails - prc //
            else if ($formToValidated.attr('id') == 'contactdetails-form') {
                var isValid;
                var startDate = $('#reference-number-1', $formToValidated).val() || false;
                var endDate = $('#reference-number-2', $formToValidated).val() || false;
                var email = $('#reference-number-3', $formToValidated).val() || false;
                var fax = $('#reference-number-4', $formToValidated).val() || false;

                if (startDate == false) {
                    displayPageErrors("error1");
                }
                if (startDate != false) {
                    removePageErrors("error1");
                }
                if (endDate == false) {
                    displayPageErrors("error2");
                }
                if (endDate != false) {
                    removePageErrors("error2");
                }
                if (startDate != false && endDate != false) {
                    if (email == false && fax != false) {
                        $("#contactdetails-form").attr("action", "/prc2/donefax");
                    } else {
                        location.assign($formToValidated.attr('action'));
                    }
                    isValid = true;
                }
                submitFormIfValid();
            }
            else {
                submitFormIfValid();
            }
        });
    }
});
