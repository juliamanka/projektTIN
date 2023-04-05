function validateForm(){

    const firstNameInput = document.getElementById('firstName');
    const titleInput=document.getElementById('title');
    const priceInput=document.getElementById('price');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const commentInput = document.getElementById('comment');


    const errorName=document.getElementById('errorName')
    const errorTitle = document.getElementById('errorTitle');
    const errorPrice= document.getElementById('errorPrice');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorComment = document.getElementById('errorComment');
    const errorSummary=document.getElementById('errorSummary');
    
    resetErrors([firstNameInput,titleInput,priceInput,dateFromInput,dateToInput,commentInput],
        [errorName,errorTitle,errorPrice,errorDateFrom,errorDateTo,errorComment], errorSummary);
    let valid=true;

    if(!checkRequired(firstNameInput.value)){
        valid=false;
        firstNameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(titleInput.value)){
        valid=false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    }
    if(!checkRequired(priceInput.value)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    }else if(!checkNumber(priceInput.value)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText="Pole powinno być liczbą";
    }
    else if(!checkNumberRange(priceInput.value,1500,5000000)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText="Pole powinno być w zakresie od 1500 do 5000000";
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

    if(!checkRequired(dateFromInput.value)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";

    }else if(!checkDate(dateFromInput.value)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie dd.MM.yyyy (np. 01.01.2000)";
    }else if(checkDateIfAfter(dateFromInput.value, nowString)){
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText="Data nie może być w przyszłości";
    }

    if(!checkRequired(commentInput.value)){
        valid=false;
        commentInput.classList.add("error-input");
        errorComment.innerText = "Pole jest wymagane";

    }else if(!checkTextLengthRange(commentInput.value, 30, 500)){
        valid=false;
        commentInput.classList.add("error-input");
        errorComment.innerText = "Pole powinno zawierać od 30 do 500 znaków";
    }

    if(!valid){
        errorSummary.innerText="Formularz zawiera błędy";
    }
    return valid;
}