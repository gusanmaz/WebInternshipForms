import {num2Text} from './num2text.js'

export function generateform({id, name, surname, year, begin, end ,subject, days}){
    let student_form = document.body.querySelector("#student_form");

    let id2Param = new Map();
    id2Param.set("id_val", id);
    id2Param.set("name_val", name + ' ' + surname);
    id2Param.set("year_val", year);
    id2Param.set("begin_val", begin);
    id2Param.set("end_val", end);
    id2Param.set("subject_val", subject);
    id2Param.set("days_val", `${days} (${num2Text(days)})`);

    for (let [key,value] of id2Param){
        document.body.querySelector(`#${key}`).innerText = value;
    }

    //student_form.setAttribute("style", "display:initial;");
}

//{id="1234567890", name="foo", surname="bar", year="Sophomore",
//                           begin="10.07.3000", end ="10.08.3000",subject="RSA Solver", days="10"} = {}