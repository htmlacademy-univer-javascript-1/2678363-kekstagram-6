function stringLength(str, num) {
  if (str.length <= num) {
    return true;
  }
  return false;
}

stringLength('Зло – это зло, Стрегобор, – серьезно сказал ведьмак, вставая', 100);
stringLength('Лютик, бл**ь', 12);
stringLength('Время стирает воспоминания, искажает их', 10);


function palindrom(myStr) {
  const normalizeStr = myStr.replaceAll(' ', '').toLowerCase();
  let newStr = '';
  for (let i = normalizeStr.length - 1; i >= 0; i--) {
    newStr += normalizeStr[i];
  }
  if (normalizeStr === newStr) {
    return true;
  }
  return false;
}

palindrom('Топот');
palindrom('ДовОд');
palindrom('Кекс');
palindrom('Лёша на полке клопа нашёл ');


function digitsFromString(mixedString) {
  const str = mixedString.toString();
  let digits = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      digits += str[i];
    }
  }
  if (digits === '') {
    return NaN;
  }
  return parseInt(digits, 10);
}

digitsFromString('2023 год');
digitsFromString('ECMAScript 2022');
digitsFromString('1 кефир, 0.5 батона');
digitsFromString('агент 007');
digitsFromString('а я томат');
