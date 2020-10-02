function testAxios () {
    console.log("it worked")
}


function menuToggle() {
    const toggleMenu = document.querySelector('.toggle');
    const navigation = document.querySelector('nav');
    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');
    
}