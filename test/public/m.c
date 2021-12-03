#include <math.h>

double acos(double x);

double asin(double x);

// Returns the arc tangent of x in radians.
double atanM(double x) {
	return atan(x);
}

// Returns the arc tangent in radians of y/x based on the signs of both values to determine the correct quadrant.
double atan2M(double y, double x) {
	return atan2(y, x);
}

// Returns the cosine of a radian angle x.
double cosM(double x) {
	return cos(x);
}

// Returns the hyperbolic cosine of x.
double coshM(double x) {
	return cosh(x);
}

// Returns the sine of a radian angle x.
double sinM(double x) {
	return sin(x);
}

// Returns the hyperbolic sine of x.
double sinhM(double x) {
	return sinh(x);
}

// Returns the hyperbolic tangent of x.
double tanhM(double x) {
	return tanh(x);
}

// Returns the value of e raised to the xth power.
double expM(double x) {
	return exp(x);
}

// The returned value is the mantissa and the integer pointed to by exponent is the exponent. The resultant value is x = mantissa * 2 ^ exponent.
double frexp(double x, int *exponent);

// Returns x multiplied by 2 raised to the power of exponent.
double ldexpM(double x, int exponent) {
	return ldexp(x, exponent);
}

// Returns the natural logarithm (base-e logarithm) of x.
double logM(double x) {
	return log(x);
}

// Returns the common logarithm (base-10 logarithm) of x.
double log10M(double x) {
	return log10(x);
}

// The returned value is the fraction component (part after the decimal), and sets integer to the integer component.
double modf(double x, double *integer);

// Returns x raised to the power of y.
double powM(double x, double y) {
	return pow(x, y);
}

// Returns the square root of x.
double sqrtM(double x) {
	return sqrt(x);
}

// Returns the smallest integer value greater than or equal to x.
double ceilM(double x) {
	return ceil(x);
}

// Returns the absolute value of x.
double fabsM(double x) {
	return fabs(x);
}