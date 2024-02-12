module.exports = catchAsync = (fn) => {
	return() => {
		fn().catch((err) => next(err));
	};
};
