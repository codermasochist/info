function calculateAge() {
    const birthDate = new Date(2008, 5, 30);
    const now = new Date();
    const years = (now - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
    document.getElementById('age').textContent = years.toFixed(6) + ' y. o.';
}

function setupCopyTonButton() {
    const copyBtn = document.getElementById('copy-ton');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('addresserror.ton')
                .then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = '✓ Скопировано!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
}

function updateAvatar() {
    const username = 'codermasochist';
    const avatar = document.getElementById('tg-avatar');
    if (avatar) {
        const isMobile = window.innerWidth < 768;
        const size = isMobile ? '160' : '320';
        avatar.src = `https://t.me/i/userpic/${size}/${username}.jpg?${new Date().getTime()}`;
    }
}

function loadNftAnimations() {
    const nfts = [
        { id: 'nft1', url: 'https://nft.fragment.com/gift/JellyBunny-58211.lottie.json' },
        { id: 'nft2', url: 'https://nft.fragment.com/gift/PartySparkler-36813.lottie.json' },
        { id: 'nft3', url: 'https://nft.fragment.com/gift/JesterHat-22129.lottie.json' },
        { id: 'nft4', url: 'https://nft.fragment.com/gift/LolPop-227888.lottie.json' },
        { id: 'nft5', url: 'https://nft.fragment.com/gift/LunarSnake-34446.lottie.json' },
        { id: 'nft6', url: 'https://nft.fragment.com/gift/SakuraFlower-12955.lottie.json' }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nftId = entry.target.id;
                const nft = nfts.find(item => item.id === nftId);
                
                if (nft && !entry.target.hasChildNodes()) {
                    lottie.loadAnimation({
                        container: entry.target,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: nft.url
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    nfts.forEach(nft => {
        const element = document.getElementById(nft.id);
        if (element) {
            observer.observe(element);
        }
    });
}

function setupNftToggle() {
    const toggleBtn = document.getElementById('toggle-nft');
    const nftGrid = document.getElementById('nft-grid');
    let nftsLoaded = false;
    
    if (toggleBtn && nftGrid) {
        toggleBtn.addEventListener('click', () => {
            if (nftGrid.style.display === 'none' || nftGrid.style.display === '') {
                nftGrid.style.display = 'grid';
                toggleBtn.textContent = 'Hide NFT';
                
                if (!nftsLoaded) {
                    loadNftAnimations();
                    nftsLoaded = true;
                }
            } else {
                nftGrid.style.display = 'none';
                toggleBtn.textContent = 'View NFT';
            }
        });
    }
}

function setActiveNavButton(pageId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.nav-btn[data-page="${pageId}"]`).classList.add('active');
}

function initPage(pageId) {
    setActiveNavButton(pageId);
    document.getElementById(pageId).classList.add('active');
    
    if (pageId === 'info') {
        calculateAge();
        setInterval(calculateAge, 1000);
        setupNftToggle();
        updateAvatar();
        setInterval(updateAvatar, 300000);
    }
    
    setupCopyTonButton();
    document.title = `Assa | ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    let pageId = 'info';
    
    if (path.includes('/donate')) pageId = 'donate';
    else if (path.includes('/links')) pageId = 'links';
    
    initPage(pageId);
});
