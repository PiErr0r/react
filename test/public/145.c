/*
to COMPILE run:
`emcc 145.c -Os -s WASM=1 -s SIDE_MODULE=1 -o test.wasm`
*/

int all_odd(int n) {
	while (n) {
		if (!(n & 1)){
			return 0;
		}
		n /= 10;
	}
	return 1;
}

int is_rev(int n) {
	int a = n, b = 0;
	while (n) {
		b = 10 * b + n % 10;
		n /= 10;
	}
	return all_odd(a + b);
}

int test() {
	unsigned long long int i, cnt = 0, t = 10;
	// unsigned long long int maxi = 100000000;
	unsigned long long int maxi = 1000000;

	for (i = 10; i < maxi + 1; ++i) {
		if (i == t * 10) {
			t *= 10;
		}
		if ((i / t & 1) != (i & 1) && i % 10 && is_rev(i)) {
			++cnt;
		}
	}
	return cnt;
}