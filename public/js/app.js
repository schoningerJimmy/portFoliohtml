
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