import {generateform} from './form-generator.js'

let header = document.querySelector("#standard_header")

let sidButton = document.querySelector("#sid_next");
let sidText = document.querySelector("#sid_input_text");

let sid2Button = document.querySelector("#sid2_next");
let downloadButton = document.querySelector("#download_button");

let sidBox = document.querySelector("#sid_input_box");
let sid2SubjectBox = document.querySelector("#sid2_subject_box");
let dateBox = document.querySelector("#date_box");
let studentForm = document.querySelector("#student_form");

let sinfo = {};
let jsonResp = {};
let nameSurname;
let subject;
let days;
let year;

header.onclick = function(event){
    location.reload();
}

sidButton.onclick = function(event) {
    let sid = sidText.value;
    let url = `https://aqueous-shelf-29436.herokuapp.com/${sid}.json`
    fetch(url)
        .then(res => res.json())
        .then((out) => {
                        let yearSelect = document.querySelector("#year_input_text");
                        year = yearSelect.value;
                        console.log(year);
                        if (out.studentInfo == undefined){
                            window.alert("Gecersiz ogrenci numarasi");
                            window.alert(out);
                            console.log(out);
                        }else{
                            jsonResp = out;

                            let n = out.studentInfo.name;
                            let s = out.studentInfo.surname;
                            nameSurname = n[0].toUpperCase() + n.substr(1) + ' ' + s.toUpperCase();
                            let stuSpans =  document.querySelectorAll(".student_name");
                            stuSpans = [...stuSpans];
                            for (let s of stuSpans){
                                s.innerText = nameSurname;
                            }

                            let subjectSpans = document.querySelectorAll(".subject_name");
                            subjectSpans = [...subjectSpans];
                            console.log(out.projectInfo[0]['subject']);
                            subject = out.projectInfo[0]['subject'];
                            let subjectText = '`' + subject.trimRight(' ') + `'`;
                            days = out.projectInfo[0]['days'];

                            sidBox.style.display = "none";
                            if (jsonResp['projectInfo'].length == 1){
                                dateBox.style.display = "grid";
                                for (let s of subjectSpans){
                                    s.innerText = subjectText;
                                }
                            }else{
                                sid2SubjectBox.style.display = "grid";
                                let subject1Opt  = document.querySelector('#subject1');
                                let subject2Opt  = document.querySelector('#subject2');
                                let subject1 = out.projectInfo[0]['subject'].trimRight(' ');
                                let subject2 = out.projectInfo[1]['subject'].trimRight(' ');
                                subject1Opt.innerText = subject1;
                                subject2Opt.innerText = subject2;
                            }
                        }
        })
        .catch(err => { throw err });
}

sid2Button.onclick = function(event) {
    let subSelect = document.querySelector('#sid2_subject_select');
    subject =  subSelect.value;
    if (subSelect.selectedIndex == 1){
        days = jsonResp.projectInfo[1]['days'];
    }
    sid2SubjectBox.style.display = "none";
    dateBox.style.display = "grid";
    console.log(subject);
}

downloadButton.onclick = function(event){
    console.log('Subject ' + subject)
    let begin_picker = document.querySelector("#begin_picker");
    let end_picker = document.querySelector("#end_picker");
    let beginRaw = begin_picker.value;
    let endRaw   = end_picker.value;
    if (beginRaw == ""){
        window.alert("Geçerli bir staj baslangıç tarihi giriniz!");
        return;
    }
    if (endRaw == ""){
        window.alert("Geçerli bir staj baslangıç tarihi giriniz!");
        return;
    }
    let [bYear, bMonth, bDay] = beginRaw.split('-');
    let [eYear, eMonth, eDay] = endRaw.split('-');
    let beginDate = bDay + "/" + bMonth + "/" + bYear;
    let endDate = eDay + "/" + eMonth + "/" + eYear;
    console.log(beginDate);
    console.log(endDate);

    let allData = {};
    allData.id = jsonResp.studentInfo.id;
    let name = jsonResp.studentInfo.name;
    allData.name = name[0].toUpperCase() + name.substr(1);
    let surname = jsonResp.studentInfo.surname;
    allData.surname = surname.toUpperCase();
    allData.year = year;
    allData.begin = beginDate;
    allData.end = endDate;
    console.log('sdsd' + subject);
    allData.subject = subject;
    allData.days   = days;
    generateform(allData);
    console.log(allData);

    dateBox.style.display = "none";
    studentForm.style.display = "grid";
    /*width: 100%;
    max-width: 960px;
    margin: 10% auto;
    margin-top: 5%;*/
    studentForm.style.width = "100%";
    studentForm.style['max-width'] = "960px";
    studentForm.style.margin = "10% auto";
    studentForm.style['margin-top'] = "5%";



    let fName = allData.id + "_" + name + "_" + surname.replaceAll(' ', '_') + '.pdf'
    let opt = {
        margin:       20,
        filename:     fName,
        image:        { type: 'jpeg', quality: 0.99 },
        html2canvas:  { scale: 4 },
        jsPDF:        { format: 'a4', orientation: 'portrait' }
    };
    html2pdf(studentForm, opt);


}