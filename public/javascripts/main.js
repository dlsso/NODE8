$(function(){

	$('.delete').on('click', function(){
		var user = $(this).prev().text()
		$.ajax(
			{	
				url: '/delete/' + user,
				type: 'DELETE',
				success: function(res){
					console.log("success")
				}
			}
		)
	})

});