const passScreen = document.querySelector(".input-div container");
const passSlider = document.getElementById('pass-slider');
const passOptions = document.querySelectorAll('.option input');
const passButton = document.querySelector('.container button');
const passInput = document.querySelector('.input-div input');
const copyIcon = document.getElementById('copy');

const passwordCharacters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
    symbols: "!@#$%¨&*(){}[]+=¢¬´`~^;:,.<>/?"
}

const generatePassword = () => {
    let staticPass = "";
    let randomPass = "";
    let noDuplicate = false;
    let passLenght = passSlider.value;

    passOptions.forEach(option => {
        if(option.checked) {
            if(option.id !== "no-duplicate") {
                staticPass += passwordCharacters[option.id];
            }
            else {
                noDuplicate = true;
            }
        }
    })

    for (let i = 0; i < passLenght; i++) {
        if(staticPass.length >= 1) {
            let randomCharacter = staticPass[Math.floor(Math.random() * staticPass.length)];

            if(noDuplicate) {

                if(staticPass.length >= passSlider.value) {
                    !randomPass.includes(randomCharacter) ? randomPass += randomCharacter : i--;
                }
                else {
                    noDuplicate = false;
                    let check = document.getElementById("no-duplicate");
                    check.checked = false;
                }
                
            }
            else {
                randomPass += randomCharacter;
            }

            passInput.value = randomPass;
        }
        else {
            passInput.placeholder = "Selecione uma das opções"
        }
        
    }
}

const updateSlider = () => {
    document.querySelector('.slider-details span').innerText = passSlider.value;
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passInput.value);

    copyIcon.innerText = "check";
    copyIcon.style.color = "royalblue";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
passSlider.addEventListener("mousemove", updateSlider);
passSlider.addEventListener("mouseup", generatePassword);
passButton.addEventListener("click", generatePassword);
