function arrayEquals( a, b ) {
	if ( a === b ) {
		return true;
	}
	if ( a.length === b.length && a.length !== undefined ) {
		for ( var i = a.length - 1; i >= 0; --i ) {
			if ( !arrayEquals( a[ i ], b[ i ] ) ) {
				console.log(i + ": " + a[ i ] + " !== " + b[ i ]);
				return false;
			}
		}
		return true;
	}
	return false;
}

console.log( "unit tests begin" );

console.log( arrayEquals( diff(
	"",
	""
), [] ) );

console.log( arrayEquals( diff(
	"Kikoo",
	"Kikoo"
), [
	[  0,  0,  0, "K" ],
	[  0,  1,  1, "i" ],
	[  0,  2,  2, "k" ],
	[  0,  3,  3, "o" ],
	[  0,  4,  4, "o" ]
] ) );

console.log( arrayEquals( diff(
	"012 abc 789",
	"012 defgh 789"
), [
	[  0,  0,  0, "0" ],
	[  0,  1,  1, "1" ],
	[  0,  2,  2, "2" ],
	[  0,  3,  3, " " ],
	[ -1,  4, -1, "a" ],
	[ -1,  5, -1, "b" ],
	[ -1,  6, -1, "c" ],
	[ +1, -1,  4, "d" ],
	[ +1, -1,  5, "e" ],
	[ +1, -1,  6, "f" ],
	[ +1, -1,  7, "g" ],
	[ +1, -1,  8, "h" ],
	[  0,  7,  9, " " ],
	[  0,  8, 10, "7" ],
	[  0,  9, 11, "8" ],
	[  0, 10, 12, "9" ]
] ) );

console.log( arrayEquals( diff(
	"012 defgh 789",
	"012 abc 789"
), [
	[  0,  0,  0, "0" ],
	[  0,  1,  1, "1" ],
	[  0,  2,  2, "2" ],
	[  0,  3,  3, " " ],
	[ -1,  4, -1, "d" ],
	[ -1,  5, -1, "e" ],
	[ -1,  6, -1, "f" ],
	[ -1,  7, -1, "g" ],
	[ -1,  8, -1, "h" ],
	[ +1, -1,  4, "a" ],
	[ +1, -1,  5, "b" ],
	[ +1, -1,  6, "c" ],
	[  0,  9,  7, " " ],
	[  0, 10,  8, "7" ],
	[  0, 11,  9, "8" ],
	[  0, 12, 10, "9" ]
] ) );

console.log( arrayEquals( diff(
	"012",
	"01"
), [
	[  0, 0,  0, "0" ],
	[  0, 1,  1, "1" ],
	[ -1, 2, -1, "2" ]
] ) );

console.log( arrayEquals( diff(
	"01",
	"012"
), [
	[  0,  0, 0, "0" ],
	[  0,  1, 1, "1" ],
	[ +1, -1, 2, "2" ]
] ) );

console.log( arrayEquals( diff(
	"XMJYAUZ",
	"MAJAWXUA"
), [
	[ -1,  0, -1, "X" ],
	[  0,  1,  0, "M" ],
	[  1, -1,  1, "A" ],
	[  0,  2,  2, "J" ],
	[ -1,  3, -1, "Y" ],

	[  0,  4,  3, "A" ],
	[  1, -1,  4, "W" ],
	[  1, -1,  5, "X" ],
	[  0,  5,  6, "U" ],
	[ -1,  6, -1, "Z" ],
	[  1, -1,  7, "A" ]
] ) );

console.log( arrayEquals( diff(
	"thomas",
	"misty thomas"
), [
	[ +1, -1,  0, "m" ],
	[ +1, -1,  1, "i" ],
	[ +1, -1,  2, "s" ],
	[  0,  0,  3, "t" ],
	[ +1, -1,  4, "y" ],
	[ +1, -1,  5, " " ],
	[ +1, -1,  6, "t" ],
	[  0,  1,  7, "h" ],
	[  0,  2,  8, "o" ],
	[  0,  3,  9, "m" ],
	[  0,  4, 10, "a" ],
	[  0,  5, 11, "s" ]
] ) );

console.log( "unit tests end" );
