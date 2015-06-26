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
		minLen = Math.min( aLen, bLen ),
		beginPart,
		beginPartLen,
		endingPart,
		endingPartLen,
		tab,
		seq = [],
		arr = [],
		iA = 0,
		iB = 0,
		iX
	;

	// calcul the size of the identical begin part
	for ( i = 0; i < minLen; ++i ) {
		if ( a[ i ] !== b[ i ] ) {
			break;
		}
	}

	// trim the size of the identical ending part
	for ( j = 0; j < minLen; ++j ) {
		if ( a[ aLen - 1 - j ] !== b[ bLen - 1 - j ] ) {
			break;
		}
	}

	// cut the arrays to keep only the change
	endingPart = a.splice( aLen - j );
	b.splice( bLen - j );
	endingPartLen = endingPart.length;
	beginPart = a.splice( 0, i );
	b.splice( 0, i );
	beginPartLen = beginPart.length;
	aLen = a.length;
	bLen = b.length;

	// create the table
	tab = new Array( aLen + 1 );
	for ( i = aLen; i >= 0; --i ) {
		tab[ i ] = new Array( bLen + 1 );
		tab[ i ][ 0 ] = 0;
	}
	for ( i = bLen; i > 0; --i ) {
		tab[ 0 ][ i ] = 0;
	}

	// fill the table
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


	// write the begin identical part into the diff
	if ( beginPartLen > 0 ) {
		for ( i = 0; i < beginPartLen; ++i ) {
			arr.push( [ 0, i, i, beginPart[ i ] ] );
		}
	}

	// write the middle part with the changes
	iX = iB = iA = 0;
	while ( iA < aLen && iB < bLen ) {
		if ( a[ iA ] !== seq[ iX ] ) {
			arr.push( [ -1, beginPartLen + iA, -1, a[ iA ] ] );
			++iA;
		} else if ( b[ iB ] !== seq[ iX ] ) {
			arr.push( [ +1, -1, beginPartLen + iB, b[ iB ] ] );
			++iB;
		} else if ( a[ iA ] === b[ iB ] ) {
			arr.push( [ 0, beginPartLen + iA, beginPartLen + iB, a[ iA ] ] );
			++iA;
			++iB;
			++iX;
		}
	}
	for ( ; iA < aLen; ++iA ) {
		arr.push( [ -1, beginPartLen + iA, -1, a[ iA ] ] );
	}
	for ( ; iB < bLen; ++iB ) {
		arr.push( [ +1, -1, beginPartLen + iB, b[ iB ] ] );
	}


	// write the ending identical part into the diff
	for ( i = 0; i < endingPartLen; ++i ) {
		arr.push( [ 0, beginPartLen + iA + i, beginPartLen + iB + i, endingPart[ i ] ] );
	}


	return arr;
}
