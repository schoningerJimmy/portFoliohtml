
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

function sendEmail() {
    // get send button
    const button = document.getElementById('sendEmailButton');
    // get input values
    // disabled button
    button.disabled = true;
    setTimeout(function(){ alert("disabled"); button.disabled = false; }, 3000);
    // perform POST method
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