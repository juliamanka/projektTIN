function validateForm(){
    const firstNameInput=document.getElementById('firstName');
    const lastNameInput=document.getElementById('lastName');
    const dateInput=document.getElementById('date');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName= document.getElementById('errorLastName');
    const errorDate = document.getElementById('errorDate');
    const errorSummary=document.getElementById('errorSummary')

    resetErrors([firstNameInput,lastNameInput,dateInput],[errorFirstName,errorLastName,errorDate], errorSummary);
    let valid=true;

    if(!checkRequired(firstNameInput.value)){
        valid=false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";

    }else if(!checkTextLengthRange(firstNameInput.value, 2, 60)){
        valid=false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(lastNameInput.value)){
        valid=false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";

    }else if(!checkTextLengthRange(lastNameInput.value, 2, 60)){
        valid=false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    let nowDate = new Date();
    month= '' + (nowDate.getMonth() + 1);
    day = '' + (nowDate.getDate());
    year = nowDate.getFullYear();

    //
    if(month.length < 2){
        month = '0' + month;
    }
    if(day.length < 2){
        day ='0'+day;
    }
    const nowString = [year, month, day].join('-');

    if(!checkRequired(dateInput.value)){
        valid=false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";

    }else if(!checkDate(dateInput.value)){
        valid=false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie dd.MM.yyyy (np. 01.01.2000)";
    }else if(checkDateIfAfter(dateInput.value, nowString)){
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText="Data nie może być w przyszłości";
    }

    if(!valid){
        errorSummary.innerText="Formularz zawiera błędy";
    }
    return valid;
}