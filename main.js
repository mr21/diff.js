$(function() {

	var
		jqHtmlBody = $( "html, body" ),
		jqSubmit = $( ".submit" ),
		jqTextareas = $( "textarea" ),
		jqDiffOutput = $( ".diffOutput" )
	;

	jqSubmit
		.click(function() {

			jqDiffOutput
				.html(
					diffShow(
						diff(
							jqTextareas[ 0 ].value.split( /\n/ ),
							jqTextareas[ 1 ].value.split( /\n/ )
						)
					)
				)
				.removeClass( "hidden" )
			;

			jqHtmlBody
				.animate({
					scrollTop: jqDiffOutput.height()
				}, {
					duration: 250
				})
			;

			return false;

		})
	;

});
