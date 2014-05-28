var makeGreyScale = function(){
	$(".winelist-img").mouseenter( function(){
		$(this).removeClass("wine-no-hover");
		$(".wine-no-hover").addClass("greyscale");
	})
	$(".winelist-img").mouseleave( function(){
		$(".wine-no-hover").removeClass("greyscale");
		$(this).addClass("wine-no-hover");
	})
};

var addEventSubmitNewWine = function(){
	$("#form-wine-new").submit(function(e){
		e.preventDefault();
		
		$("#textarea-description-en").val( tinyMCE.get('textarea-description-en').getContent({format : 'raw'}) );
		$("#textarea-description-vn").val( tinyMCE.get('textarea-description-vn').getContent({format : 'raw'}) );

		this.submit();

		return false;
	});
};

var showPhoneNumber = function(){
	 	$("html, body").animate({ scrollTop: $(document).height() }, 500, function(){
	 		$("#footer-wrapper").addClass('select-box');
	 		setTimeout(function() {
	 		$("#footer-wrapper").removeClass('select-box');
	 		}, 2000);
	 	});
};

var setLang = function( lang ){
	$.when( $.cookie('locale', lang) ).then( function(){
		window.location.reload();
	});
};

var initSelectList = function() {
	var chooseList = $("#choose-list"),
			chooseInput = $("#choose-input"),
			selectList = $("#select-list");

	$(selectList).on("click", "li", function(e) {
		var chooseTemplate = "<li data-id='"+$(this).data("id")+"'><a href='#'' class='small button secondary'>"+$(this).text()+"</a></li>",
				chooseInputTemplate = "<input id='"+$(this).data("id")+"' value='"+$(this).data("id")+"' name='categories' />";
		
		$(chooseTemplate).appendTo(chooseList);
		$(chooseInputTemplate).appendTo(chooseInput);
		$(this).remove();		
	});

	$(chooseList).on("click", "li", function() {
		var chooseTemplate = "<li data-id='"+$(this).data("id")+"'><a href='#'' class='small button secondary'>"+$(this).text()+"</a></li>";

		$(chooseTemplate).appendTo(selectList);
		$(chooseInput).find("#"+$(this).data("id")).remove();
		$(this).remove();		
	});
};

$(function(){
  $("#multipleupload").uploadFile({
    url:"/wine/image",
    multiple: true,
    fileName: "file",
    allowedTypes: "jpg,png,gif",
    formData: {
    	"_csrf" : $("#csrf").val()
    }
  });

  if( $(".winelist-thumbnail").length > 0 ){
  	makeGreyScale();
  }

  if( $("#form-wine-new").length > 0  ){
  	addEventSubmitNewWine();
  }

  if( $("#select-list").length > 0 ){
  	initSelectList();
  }
})