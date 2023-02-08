const array = [3,4,7,1,2,10];

const quickSort = (array) => {

	if(array.length === 0) return [];

	const left = [];
	const right = [];
	const pivote = array[0];
	
	for (let i = 1; i < array.length; i++) {
		if(pivote > array[i]){
			left.push(array[i]);
		}else{
			right.push(array[i]);
		};
	};

	return [].concat(quickSort(left), pivote, quickSort(right));
};