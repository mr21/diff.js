function diffShow( diff ) {
	var
		d,
		i = 0,
		html = '',
		table = document.createElement( "table" ),
		classes = [ "diffjs-deletion", "", "diffjs-addition" ]
	;
	table.className = "diffjs";
	for ( ; d = diff[ i ]; ++i ) {
		html += '\
			<tr class="'+ classes[ d[ 0 ] + 1 ] +'">\
				<td class="diffjs-line">'+ (d[ 0 ] < +1 ? d[ 1 ] + 1 : "") +'</td>\
				<td class="diffjs-line">'+ (d[ 0 ] > -1 ? d[ 2 ] + 1 : "") +'</td>\
				<td class="diffjs-content"><pre>'+ d[ 3 ].replace( /</g, "&lt;" ) +'</pre></td>\
			</tr>\
		';
	}
	table.innerHTML = html;
	return table;
}
