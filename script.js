document.addEventListener('DOMContentLoaded', function() {
    const panels = {
        'sciencePanel': document.getElementById('sciencePanel'),
        'kazakhstanPanel': document.getElementById('kazakhstanPanel'),
        'procurementPanel': document.getElementById('procurementPanel'),
        'institutePanel': document.getElementById('institutePanel'),
        'newsPanel': document.getElementById('newsPanel'),
        'npaPanel': document.getElementById('npaPanel')
    };
    
    const overlay = document.getElementById('panelOverlay');
    const navItems = document.querySelectorAll('.nav-item[class*="nav-"], .modal-nav-item[class*="nav-"]');
    const navButtons = document.querySelectorAll('.nav-btn[class*="nav-"], .modal-nav-btn[class*="nav-"]');
    
    let activePanel = null;
    let isTransitioning = false;

    function openPanel(panelId) {
        if (isTransitioning) return;
        if (!panels[panelId]) return;
        
        isTransitioning = true;
        
        overlay.classList.add('active');
        document.body.classList.add('panel-open');
        document.body.style.overflow = 'hidden';
        
        if (activePanel && activePanel !== panelId) {
            panels[activePanel].classList.remove('active');
        }
        
        activePanel = panelId;
        
        setTimeout(() => {
            panels[panelId].classList.add('active');
            updateNavigation(panelId);
            
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }, 50);
    }
    function closeAllPanels() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        Object.values(panels).forEach(panel => {
            panel.classList.remove('active');
        });
        
        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.classList.remove('panel-open');
            document.body.style.overflow = '';
            
            resetNavigation();
            activePanel = null;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }, 300);
    }
    function updateNavigation(panelId) {
        navItems.forEach(item => item.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        const panelType = panelId.replace('Panel', '');
        const activeElements = document.querySelectorAll(`.nav-${panelType}, .nav-${panelType}-btn`);
        
        activeElements.forEach(el => {
            if (el.classList.contains('modal-nav-item') || 
                el.classList.contains('nav-item') || 
                el.classList.contains('nav-btn') || 
                el.classList.contains('modal-nav-btn')) {
                el.classList.add('active');
            }
        });
    }

    function resetNavigation() {
        navItems.forEach(item => item.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
    }
    navItems.forEach(item => {
        if (item.classList.contains('nav-contacts-btn')) {
            item.style.opacity = '0.7';
            item.style.cursor = 'default';
            return;
        }
        
        if (item.classList.contains('nav-kazakhstan-btn') || 
            item.classList.contains('nav-institute-btn') || 
            item.classList.contains('nav-science-btn') || 
            item.classList.contains('nav-procurement-btn') || 
            item.classList.contains('nav-news-btn') || 
            item.classList.contains('nav-npa-btn')) {
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const panelClass = Array.from(this.classList)
                    .find(cls => cls.startsWith('nav-') && cls.endsWith('-btn'));
                
                if (!panelClass) return;
                
                const panelType = panelClass.replace('nav-', '').replace('-btn', '');
                const panelId = panelType + 'Panel';
                
                if (activePanel === panelId) {
                    closeAllPanels();
                } else {
                    openPanel(panelId);
                }
            });
        }
    });
    navButtons.forEach(btn => {
        if (btn.classList.contains('btn-kontakt')) {
            btn.style.opacity = '0.7';
            btn.style.cursor = 'default';
            return;
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const navClass = Array.from(this.classList).find(cls => cls.startsWith('nav-'));
            if (!navClass) return;
            
            let panelType = navClass.includes('-btn') 
                ? navClass.replace('nav-', '').replace('-btn', '')
                : navClass.replace('nav-', '');
            
            const panelId = panelType + 'Panel';
            
            if (activePanel === panelId) {
                closeAllPanels();
            } else {
                openPanel(panelId);
            }
        });
    });
    
    overlay.addEventListener('click', function(e) {
        if (!isTransitioning) closeAllPanels();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activePanel) {
            closeAllPanels();
        }
    });
    Object.values(panels).forEach(panel => {
        panel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    document.querySelectorAll('.panel-item-content').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
            const line = this.nextElementSibling;
            if (line && line.classList.contains('panel-item-line')) {
                line.classList.add('active');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            const line = this.nextElementSibling;
            if (line && line.classList.contains('panel-item-line')) {
                line.classList.remove('active');
            }
        });
    });
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    


    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const panelClass = Array.from(this.classList)
                .find(cls => cls.startsWith('nav-') && cls.endsWith('-btn'));
            
            if (!panelClass) return;
            
            const panelType = panelClass.replace('nav-', '').replace('-btn', '');
            const panelId = panelType + 'Panel';
            
            if (panels[panelId]) {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                openPanel(panelId);
            }
        });
    });
    


    const heroSection = document.querySelector('.hero-section');
    const fixedElements = document.querySelectorAll('.logo, .nav-buttons, .nav-right-section, .hero-bottom-icons, .hero-bottom-left, .hero-bottom-right');
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollTop < heroHeight) {
            const scrollProgress = scrollTop / heroHeight;
            const translateY = scrollTop * 0.8;
            
            fixedElements.forEach(el => {
                if (el) {
                    el.style.transform = `translateY(${translateY}px)`;
                }
            });
            
            const bottomElements = ['.hero-bottom-icons', '.hero-bottom-left', '.hero-bottom-right'];
            const opacity = 1 - (scrollProgress * 0.5);
            
            bottomElements.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) {
                    el.style.opacity = Math.max(0.3, opacity);
                }
            });
            
        } else {
            fixedElements.forEach(el => {
                if (el) {
                    el.style.transform = 'translateY(0)';
                }
            });
            
            const bottomElements = ['.hero-bottom-icons', '.hero-bottom-left', '.hero-bottom-right'];
            
            bottomElements.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) {
                    el.style.opacity = '0';
                }
            });
        }
        
        lastScrollTop = scrollTop;
    });
    
    setTimeout(() => {
        fixedElements.forEach(el => {
            if (el) {
                el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            }
        });
    }, 100);
    
    const museumFull = document.querySelector('.museum-full');
    const museumItems = document.querySelectorAll('.museum-item-link');
    
    if (museumFull && museumItems.length) {
        const originalGradient = 'linear-gradient(135deg, rgba(15,95,46,.95) 0%, rgba(26,61,31,.95) 50%, rgba(10,74,30,.95) 100%)';
        
        museumItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const text = this.querySelector('.museum-text').textContent;
                if (text.includes('археологии')) {
                    museumFull.style.background = '#522918';
                } else if (text.includes('истории науки')) {
                    museumFull.style.background = '#153F65';
                } else if (text.includes('природы')) {
                    museumFull.style.background = '#0f5f2e';
                } else if (text.includes('редких книг')) {
                    museumFull.style.background = '#848484';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    const isHoveringAnyItem = Array.from(museumItems).some(item => item.matches(':hover'));
                    if (!isHoveringAnyItem) {
                        museumFull.style.background = originalGradient;
                    }
                }, 300);
            });
        });
        
        museumFull.addEventListener('mouseleave', function() {
            setTimeout(() => {
                museumFull.style.background = originalGradient;
            }, 200);
        });
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});













