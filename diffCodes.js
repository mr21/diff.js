function diffCodes( codeA, codeB ) {
	var
		d,
		d2,
		i, j,
		html = '',
		htmlInline,
		content,
		table = document.createElement( "table" ),
		classes = [ "diffjs-deletion", "", "diffjs-addition" ],
		arrDiff = diff(
			codeA.split( /\n/ ),
			codeB.split( /\n/ )
		),
		delA = -1,
		addA = -1,
		delLen
	;

	for ( i = 0; d = arrDiff[ i ]; ++i ) {

		if ( d[ 0 ] < 0 ) {
			if ( delA < 0 ) {
				delA = i;
			}
		} else if ( d[ 0 ] > 0 ) {
			if ( delA >= 0 && addA < 0 ) {
				addA = i;
			}
		} else {
			if ( addA >= 0 ) {
				if ( addA - delA === i - addA ) {

					delLen = addA - delA;
					for ( j = 0; j < delLen; ++j ) {
						arrDiff[ delA + j ][ 3 ] =
						arrDiff[ addA + j ][ 3 ] =
						diff(
							arrDiff[ delA + j ][ 3 ].split(""),
							arrDiff[ addA + j ][ 3 ].split("")
						);
					}

				}
			}
			delA = addA = -1;
		}

	}

	function htmlPre( addDel, str ) {
		return '<pre class="'+ classes[ addDel + 1 ] +'">'+ str.replace( /</g, "&lt;" ) +'</pre>';
	}

	for ( i = 0; d = arrDiff[ i ]; ++i ) {

		content = d[ 3 ];
		if ( typeof content === "string" ) {
			htmlInline = htmlPre( d[ 0 ], content );
		} else {
			htmlInline = '';
			for ( j = 0; d2 = content[ j ]; ++j ) {
				if ( !d2[ 0 ] || d2[ 0 ] === d[ 0 ] ) {
					htmlInline += htmlPre( d2[ 0 ], d2[ 3 ] );
				}
			}
		}

		html += '\
			<tr class="'+ classes[ d[ 0 ] + 1 ] +'">\
				<td class="diffjs-line">'+ (d[ 0 ] < +1 ? d[ 1 ] + 1 : "") +'</td>\
				<td class="diffjs-line">'+ (d[ 0 ] > -1 ? d[ 2 ] + 1 : "") +'</td>\
				<td class="diffjs-content">'+ htmlInline +'</td>\
			</tr>\
		';
	}

	table.className = "diffjs";
	table.innerHTML = html;
	return table;
}
