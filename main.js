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
					diffCodes(
						jqTextareas[ 0 ].value,
						jqTextareas[ 1 ].value
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
