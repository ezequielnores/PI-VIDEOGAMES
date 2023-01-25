
// const bubleSortArray = (order) => {
// 	let array = [...order];

// 	for (let i = 0; i < array.length; i++) {
// 		let curr = 0;
// 		let next = 1;

// 		do {
// 				[ array[i + curr], array[i + next ] ] = [ array[i + next], array[ i + curr ] ];
// 			curr += 1;
// 			next += 1;
// 		}
// 		while( array[i + curr].rating > array[i + next].rating );
// 	};
// 	return array;
// };

// const ordened = bubleSortArray(arr);
// console.log(ordened.length);

const bubleSortArray = (array) => {

	for (let i = 0; i < array.length; i++) {
		let curr = 0;
		let next = 1;
		console.log(next);
		do {
			[ array[i + curr], array[i + next ] ] = [ array[i + next], array[ i + curr ] ];
			curr += 1;
			next += 1;
		}
		while(array[i + curr] > array[i + next]);
	};
	return array;
};

const array = [3,52,1,7,8,2,33,22,1,77,99,11,22,3,4,6,7,8,4,2,65,31];

const res = bubleSortArray(array);
console.log(res);


