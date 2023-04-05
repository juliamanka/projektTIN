function validateForm(){

    const titleInput=document.getElementById('title');
    const priceInput=document.getElementById('price');
    const typeInput=document.getElementById('type');
    const dimensionsInput = document.getElementById('dimensions')

    const errorTitle = document.getElementById('errorTitle');
    const errorPrice= document.getElementById('errorPrice');
    const errorType = document.getElementById('errorType');
    const errorDimensions = document.getElementById('errorDimensions')
    const errorSummary=document.getElementById('errorSummary')

    resetErrors([titleInput,priceInput,typeInput,dimensionsInput],[errorTitle,errorPrice,errorType,errorDimensions], errorSummary);
    let valid=true;

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

    if(!checkRequired(typeInput.value)){
        valid=false;
        typeInput.classList.add("error-input");
        errorType.innerText = "Pole jest wymagane";
    }
    if(!checkRequired(dimensionsInput.value)){
        valid=false;
        dimensionsInput.classList.add("error-input");
        errorDimensions.innerText = "Pole jest wymagane";
    }else if(!checkDimensions(dimensionsInput.value)){
        valid=false;
        dimensionsInput.classList.add("error-input");
        errorDimensions.innerText="Pole powinno być w formacie AAxAAcm np.100x100cm"
    }

    if(!valid){
        errorSummary.innerText="Formularz zawiera błędy";
    }
    return valid;
}