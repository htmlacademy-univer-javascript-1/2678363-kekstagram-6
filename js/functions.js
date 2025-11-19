// function stringLength(str, num) {
//   str.length <= num ? true : false;
// }

// stringLength("Зло – это зло, Стрегобор, – серьезно сказал ведьмак, вставая", 100);
// stringLength("Лютик, бл**ь", 12);
// stringLength("Время стирает воспоминания, искажает их", 10);



// function palindrom(myStr) {
//   let normalizeStr = myStr.replaceAll(" ", "").toLowerCase();
//   let newStr = "";
//   for (let i = normalizeStr.length - 1; i >= 0; i--) {
//     newStr += normalizeStr[i];
//   }
//   newStr === normalizeStr ? console.log(true) : console.log(false);
// }

// palindrom("Топот");
// palindrom("ДовОд");
// palindrom("Ведьмак");
// palindrom("Лёша на полке клопа нашёл ");



function numberfromString(mixedString) {
  let str = mixedString.toString();
  console.log(str);
  let numberString = "";
  for (let i = 0; i < str; i++) {
    numberString += str[i];
  }
  console.log(numberString);
}

numberfromString('2023 год');            // 2023
numberfromString('ECMAScript 2022');     // 2022
numberfromString('1 кефир, 0.5 батона'); // 105
numberfromString('агент 007');           // 7
numberfromString('а я томат');           // NaN
