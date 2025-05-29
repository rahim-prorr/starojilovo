
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('current-year').textContent = new Date().getFullYear();

    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('#main-menu');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainMenu.classList.toggle('is-active');
    });

    const modal = document.getElementById('consultation-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButton = document.querySelector('.close-modal');
    
    function openModal() {
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        document.querySelector('#name').focus();
    }
    
    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
    }
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    closeModalButton.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (mainMenu.classList.contains('is-active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainMenu.classList.remove('is-active');
                }
            }
        });
    });
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
            }
        });
    });
    

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
});


window.onscroll = () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (window.pageYOffset > 100) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
};

const backToTopBtn = document.querySelector('.back-to-top');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function setThemeBasedOnTime() {
    const currentHour = new Date().getHours();
    const toggleCheckbox = document.getElementById("theme-toggle");
    if (currentHour >= 18 || currentHour <= 6) {
        toggleCheckbox.checked = true;
        document.documentElement.classList.add('theme-dark');
    } else {
        toggleCheckbox.checked = false;
        document.documentElement.classList.remove('theme-dark');
    }
}
setThemeBasedOnTime();