document.addEventListener('DOMContentLoaded', function() {
    const navbarLogo = document.querySelector('.navbar-logo');
    
    if (navbarLogo) {
    const originalSrc = navbarLogo.src;
    const hoverSrc = 'Imagenes/LogoAlternativo.png'; 
    const brandElement = navbarLogo.parentElement;

    if (brandElement) {
        brandElement.addEventListener('mouseenter', function() {
        navbarLogo.src = hoverSrc;
        });
        
        brandElement.addEventListener('mouseleave', function() {
        navbarLogo.src = originalSrc;
        });
    }
    }
});