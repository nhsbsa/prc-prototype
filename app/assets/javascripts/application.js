/* global $ */
/* global GOVUK */

console.log("here");

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}    

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
    
    $('.header').click(function(){
     $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
});
    
$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})
    
$(document).ready(function(){
	
	$('ul.tabs1 li').click(function(){
		var tab_id = $(this).attr('data-tab1');

		$('ul.tabs1 li').removeClass('current1');
		$('.tab1-content').removeClass('current1');

		$(this).addClass('current1');
		$("#"+tab_id).addClass('current1');
	})

})
    
$(document).ready(function() {

    $('.internal-table tr').click(function() {
        var href = $(this).find("a").attr("href");
        if(href) {
            window.location = href;
        }
    });

});

$(".selectbtn1").click(function() {
	$(".table-1").removeClass("visually-hidden");
	$(".sort-results").removeClass("visually-hidden");
	if ($("div.table-2")[0].classList.length != 3) {
		$(".table-2").addClass("visually-hidden");
	}
	if ($("div.table-3")[0].classList.length != 3) {
		$(".table-3").addClass("visually-hidden");
	}
});

$(".selectbtn2").click(function() {
	$(".table-2").removeClass("visually-hidden");
	$(".sort-results").removeClass("visually-hidden");	
	if ($("div.table-1")[0].classList.length !== 3) {
		$(".table-1").addClass("visually-hidden");
	}
	if ($("div.table-3")[0].classList.length !== 3) {
		$(".table-3").addClass("visually-hidden");
	}
});

$(".selectbtn3").click(function() {
	$(".table-3").removeClass("visually-hidden");
	$(".sort-results").removeClass("visually-hidden");
	if ($("div.table-1")[0].classList.length != 3) {
		$(".table-1").addClass("visually-hidden");
	}
	if ($("div.table-2")[0].classList.length != 3) {
		$(".table-2").addClass("visually-hidden");
	}
});



$(".button").click(function(){
	$(".house-number").hide();
	$(".postcode").hide();
	$(".address").removeClass("visually-hidden");
	$(".button").hide();
	$(".button1").show();
});

$(".button2").click(function(){
	$(".house-number2").hide();
	$(".postcode2").hide();
	$(".address2").removeClass("visually-hidden");
	$(".button2").hide();
});

//$(".selectbtn1").click(function(){
//	$(".s1-notRegistered").removeClass("visually-hidden");
//	$(".s1-registered").addClass("visually-hidden");
//	$(".ehic-registered").addClass("visually-hidden");
//});

///$(".selectbtn2").click(function(){
//	$(".s1-registered").removeClass("visually-hidden");
//	$(".s1-notRegistered").addClass("visually-hidden");
//	$(".ehic-registered").addClass("visually-hidden");
//});

//$(".selectbtn3").click(function(){
//	$(".ehic-registered").removeClass("visually-hidden");
//	$(".s1-notRegistered").addClass("visually-hidden");
//	$(".s1-registered").addClass("visually-hidden");
//});

$(".button-dependent").click(function(){
	$(".dependent").removeClass("visually-hidden");
	$(".button-dependent").hide();
});
  
})
