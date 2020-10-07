
// get request for the DL backend
function downloadResume () {
    console.log("download called");

    axios('/download', {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    .then(response => {//Create a Blob from the PDF Stream
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});//Build a URL from the file
        const downloadUrl = window.URL.createObjectURL(file);//Open the URL on new Window
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'SchoningerJimmy.pdf'); //any other extension
        document.body.appendChild(link);
        link.click();
        })
    .catch(error => {
        console.log(error);
    });
}


function menuToggle() {
    const toggleMenu = document.querySelector('.toggle');
    const navigation = document.querySelector('nav');
    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');
    
}


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function sendEmail() {
    // get send button
    const button = document.getElementById('sendEmailButton');
    // get input values
    const inputText = document.getElementById('inputText').value;
    const inputEmail = document.getElementById('inputEmail').value;
    const textEmail = document.getElementById('textEmail').value;
    
    // disabled button
    button.disabled = true;
    // if one of the value is empty, enable button, alert and return
    if (inputText === "" || inputEmail === "" || textEmail === "") {
        button.disabled = false;
        alert("Check your values! Can't send an empty message.");
        return;
    }
    // if email is not valid, enable, alert and return
    if(!validateEmail(inputEmail)) {
        button.disabled = false;
        alert("Check your email.");
        return;
    }
    
    
    // perform POST method
    try {
        emailContent = {
            email: inputEmail,
            name: inputText,
            informationDetails: textEmail
        };
        // fetch data from a url endpoint
        const res = await axios.post("/api/email", emailContent);
        console.log(res);
        if (res.data.success) {
            alert("sent");
            button.disabled = false;
        } else {
            alert("Not sent");
            button.disabled = false;
        }

      } catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
    //setTimeout(function(){ alert(inputText); button.disabled = false; console.log(textEmail)}, 3000);
    /*
    if JSON.res(OK)
        set input value to null
        enable button
        pop up sent
    else 
        enable button
        display error log
        pop up not sent
        */   
}