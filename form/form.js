const userForm = document.querySelector("#userForm");

const email = document.querySelector("#email");
const password = document.querySelector("#password");

const emailError = document.querySelector("#invalidEmail");
const passwordError = document.querySelector("#passwordInvalid");

userForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    let isValid = true;

    emailError.textContent = "";
    passwordError.textContent = "";
    emailError.classList.remove("error");
    passwordError.classList.remove("error");

    if(!email.validity.valid){
        isValid = false;
        emailError.textContent = "Please enter valid email";
        emailError.classList.add("error");
    }
    if(password.value.length<8){
        isValid = false;
        passwordError.textContent = "Password must contain at least 8 characters";
        passwordError.classList.add("error");
    }
    
    if(!isValid){
        return;
    }
    let data = new FormData(userForm);
    console.log("email: ", data.get("email"));
    console.log("password: ", data.get("password"));
    console.log("Form submitted successfully");
})