/*
	Mr21 - diff.js
	https://github.com/Mr21/diff.js
*/

function diff( a, b ) {

	var
		i,
		j,
		v,
		line,
		aLen = a.length,
		bLen = b.length,
		tab = new Array( aLen + 1 ),
		seq = [],
		arr = [],
		iA = 0,
		iB = 0,
		iX = 0
	;


	// create table
	for ( i = aLen; i >= 0; --i ) {
		tab[ i ] = new Array( bLen + 1 );
		tab[ i ][ 0 ] = 0;
	}
	for ( i = bLen; i > 0; --i ) {
		tab[ 0 ][ i ] = 0;
	}


	// fill table
	for ( i = 1; line = tab[ i ]; ++i ) {
		for ( j = 1; j <= bLen; ++j ) {
			tab[ i ][ j ] = a[ i - 1 ] === b[ j - 1 ]
				? 1 + tab[ i - 1 ][ j - 1 ]
				: Math.max( tab[ i - 1 ][ j ], tab[ i ][ j - 1 ] );
		}
	}


	// backtrack
	i = aLen;
	j = bLen;
	for ( ; i > 0; --i ) {
		v = tab[ i ][ j ];
		while ( j > 0 && tab[ i ][ j - 1 ] === v ) {
			--j;
		}
		if ( tab[ i - 1 ][ j ] < tab[ i ][ j ] ) {
			seq[ tab[ i ][ j ] - 1 ] = a[ i - 1 ];
		}
	}


	// write the diff
	while ( iA < aLen && iB < bLen ) {
		if ( a[ iA ] !== seq[ iX ] ) {
			arr.push( [ -1, iA, -1, a[ iA ] ] );
			++iA;
		} else if ( b[ iB ] !== seq[ iX ] ) {
			arr.push( [ +1, -1, iB, b[ iB ] ] );
			++iB;
		} else if ( a[ iA ] === b[ iB ] ) {
			arr.push( [ 0, iA, iB, a[ iA ] ] );
			++iA;
			++iB;
			++iX;
		}
	}
	for ( ; iA < aLen; ++iA ) {
		arr.push( [ -1, iA, -1, a[ iA ] ] );
	}
	for ( ; iB < bLen; ++iB ) {
		arr.push( [ +1, -1, iB, b[ iB ] ] );
	}


	return arr;
}
