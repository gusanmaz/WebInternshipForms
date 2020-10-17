export function num2Text(num){
    const ones = ['','bir','iki','üç','dört','beş','altı','yedi','sekiz','dokuz'];
    const tens = ['','on','yirmi','otuz','kırk','elli','altmış','yetmiş','seksen','doksan'];

    let onesDig = num % 10;
    let tensDig = (num - (num % 10)) / 10;
    let numStr = tens[tensDig] + ' ' + ones[onesDig];
    numStr = numStr.trim(' ');
    return numStr;
}