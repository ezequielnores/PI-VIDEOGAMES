
// function orden(array){
// 	if(array.length < 1) return array;

// 	let right = [];
// 	let left = [];
// 	let pivote = array[0];
	
// 	for(let i = 1; i < array.length; i++){
// 	  	if(pivote.rating > array[i].rating) left.push(array[i]);
// 	  	else right.push(array[i]);
// 	};
// 	return [].concat(orden(right), pivote, orden(left));
//   };
//   const res = orden(arr);

const obj = { uno: '1uno', dos: '2dos', tres: '3tres', cuatro: '' }

const forin = (object) => {
	let condition = false;
	for (const key in object) {
		if(object[key] === '') condition = true
	};
	return condition
};

console.log(forin(obj));