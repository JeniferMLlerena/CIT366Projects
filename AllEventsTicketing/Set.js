function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/

		if (listA == null || listB === null) {
			return null;
		}

		for (var i = 0; i < listA.length; i++) {
			var nextValue = listA[i];

			for (var j = 0; j < listB.length; j++) {
				if (listB[j] === nextValue) {
					resultList.push(listB[j]);
					break;
                }
			}
		}

	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
		if (listA == null || listB === null) {
			return null;
		}

        var intersection  = this.intersection(listA, listB);
        var symetricDifference  = this.symmetricDifference(listA, listB);
        resultList = intersection.concat(symetricDifference);

        /*-------------------------------Insert your code here -------------------------------------*/
	   
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
        if (listA == null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];
            var found = false;
            for (var j = 0; j < listB.length; j++) {
                if (nextValue === listB[j] ) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                resultList.push(listA[i]);
			}
        }

	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

		var auxList = [];
		var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
        if (listA == null || listB === null) {
            return null;
        }

        var complement1  = this.relativeComplement(listA, listB);
        var complement2  = this.relativeComplement(listB, listA);
        resultList =complement1.concat(complement2);

	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}	
	

}
