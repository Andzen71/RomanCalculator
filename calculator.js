function calculator(string) {

  let arg1, arg2, operator, isRime, result;
  isRime = false;
  string = string.trim()
  if(!string){
    throw new Error("Строка не передана")
  }

  try{
    console.log(string)
    operatorQuantity(string);
    if(string[string.search(/[\+\-\*\/]/)-1] === undefined || (string[string.search(/[\+\-\*\/]/)+1]) === undefined)
      throw new Error("Оператор стоит в начале или конце строки")

    arg2 = (string.slice((string.search(/[\+\-\*\/]/))+1)).trim()
    arg1 = (string.slice(0,(string.search(/[\+\-\*\/]/)))).trim()
    operator = string.slice((string.search(/[\+\-\*\/]/)),((string.search(/[\+\-\*\/]/))+1))

    if(isRim(arg1) && isRim(arg2)){
      arg1 = romanToArabic(arg1);
      arg2 = romanToArabic(arg2);

      if(arg1 > 10 && arg2 > 10 ) 
        throw new Error("Аргумент больше 10ти");
      result = eval(arg1+operator+arg2);
      result = Math.floor(result);
      if(result < 1){
        return ""
      }else{
        return arabicToRoman(result)
      }
    }else if(isArabic(arg1) && isArabic(arg2)){
      if(arg1 > 10 && arg2 > 10 ) // повторяющийся код
        throw new Error("Аргумент больше 10ти");
      result = eval(arg1+operator+arg2);
      result = Math.floor(result);
      return ''+result

    }else{
      throw new Error("Оба числа должны быть либо Римские либо Арабские")
    }
  }
  catch(e){

  }

}

function operatorQuantity(string){
  let arr = string.split(/[\+\-\*\/]/);
    if(arr.length > 2){
      throw new Error("Слишком много операторов")
    }
    else if(arr.length < 2){
      throw new Error("Слишком мало операторов")
    }
    return 1;
}

function isArabic(str){
  for (let ch of str){
    ch = ch.trim();
  	if (ch.charCodeAt() < 48 || ch.charCodeAt() > 59 ){
			return false;
    }
  }
  return true;
}

function isRim(string){
// only works with I,V,X
  for (let ch of string){
    if(ch.charCodeAt() != 73 && ch.charCodeAt() != 86 && ch.charCodeAt() != 88){
      return false;
    }
  }
  return true;  
}

function romanToArabic(roman){
  if(roman.search(/^(X{0,3})(IX|IV|V?I{0,3})$/) == -1)
    throw new Error("Некорректный ввод римских цифр")
    if(roman == null)
        return -1;
    var totalValue = 0, 
        value = 0, // Initialise!
        prev = 0;
        
    for(var i=0;i<roman.length;i++){
        var current = char_to_int(roman.charAt(i));
        if (current > prev) {
            totalValue -= 2 * value;
        }
        if (current !== prev) { 
            value = 0; 
        }
        value += current;
        totalValue += current;
        prev = current;
    }
    return totalValue;
}


function char_to_int(character) {
    switch(character){
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        default: return -1;
    }
}
function int_to_char(character){
  switch(character){
        case 1: return 'I';
        case 5: return 'V';
        case 10: return 'X';
        case 50: return 'L';
        case 100 : return 'C';
        default: return -1;
    }
}
function arabicToRoman(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

module.exports = calculator; // Не трогайте эту строчку