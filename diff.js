function diff(a, b) {
	function subSeq(a, b) {
		function createTable() {
			var t = new Array(a.length + 1);
			for (var i = 0; i < t.length; ++i) {
				t[i] = new Array(b.length + 1);
				t[i][0] = 0;
			}
			for (var i = b.length; i > 0; --i)
				t[0][i] = 0;
			return t;
		}
		function fillTable() {
			for (var i = 1, l; l = t[i]; ++i) {
				for (var j = 1; j < l.length; ++j) {
					t[i][j] = a[i-1] === b[j-1]
						? 1 + t[i-1][j-1]
						: Math.max(t[i-1][j], t[i][j-1]);
				}
			}
		}
		function backTrack() {
			var	i = a.length,
				j = b.length,
				tmp = [];
			for (; i > 0; --i) {
				var v = t[i][j];
				while (j > 0 && t[i][j-1] === v)
					--j;
				if (t[i-1][j] < t[i][j])
					tmp.push(a[i-1]);
			}
			for (var i = tmp.length - 1; i >= 0; --i)
				s.push(tmp[i]);
		}
		var t = createTable();
		var s = [];
		fillTable();
		backTrack();
		lg(s);
		return s;
	}
	var x = subSeq(a, b),
		iA = 0,
		iB = 0,
		iX = 0,
		arr = [];
	while (iA < a.length || iB < b.length) {
		if (a[iA] !== x[iX]) {
			arr.push(['-', a[iA++]]);
		}
		if (b[iB] !== x[iX]) {
			arr.push(['+', b[iB++]]);
		} else if (a[iA] === b[iB]) {
			arr.push([' ', a[iA++]]);
			++iB;
			++iX;
		}
	}
	return arr;
}
