// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Logika Modal Universal ---
    const modal = document.getElementById('info-modal');
    if (modal) {
        const modalContent = document.getElementById('modal-content');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        const modalDialog = modal.querySelector('.bg-white');
        const modalData = {
            info: { content: `<div class="p-4 md:p-6"><h2 class="text-2xl font-bold mb-4 text-gray-800">About SIAZ*</h2><div class="text-gray-600 leading-relaxed"><p class="mb-4">SIAZ* adalah sebuah kolektif desain yang berfokus pada eksplorasi bentuk, fungsi, dan material dalam fashion kontemporer.</p><p>Setiap produk kami direkayasa dengan presisi, memadukan estetika minimalis dengan fungsionalitas untuk penggunaan sehari-hari di berbagai elemen.</p></div></div>` },
            contact: { content: `<div class="p-4 md:p-6"><h2 class="text-2xl font-bold mb-4 text-gray-800">Get in Touch</h2><div class="text-gray-600 leading-relaxed"><p class="mb-4">Untuk pertanyaan mengenai produk, kolaborasi, atau pers, silakan hubungi kami melalui email.</p><p class="font-semibold">hello@siazcollective.com</p></div></div>` }
        };

        function openModal(target) {
            const data = modalData[target]; if (!data) return;
            modalDialog.classList.remove('max-w-4xl'); modalDialog.classList.add('max-w-2xl');
            modalContent.innerHTML = data.content;
            modal.classList.remove('hidden'); document.body.style.overflow = 'hidden';
            setTimeout(() => { modal.classList.add('opacity-100'); modalDialog.classList.remove('scale-95', 'opacity-0'); modalDialog.classList.add('scale-100', 'opacity-100'); }, 10);
        }

        function closeModal() {
            modal.classList.remove('opacity-100');
            modalDialog.classList.remove('scale-100', 'opacity-100');
            modalDialog.classList.add('scale-95', 'opacity-0');
            document.body.style.overflow = '';
            setTimeout(() => { modal.classList.add('hidden'); modalContent.innerHTML = ''; }, 300);
        }
        
        modalTriggers.forEach(trigger => { trigger.addEventListener('click', (e) => { e.preventDefault(); openModal(trigger.dataset.modalTarget); }); });
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) { closeModal(); } });

        // --- Logika Quick View Produk dengan Galeri ---
        const quickViewTriggers = document.querySelectorAll('.quick-view-trigger');
        function openProductModal(productId) {
            // Cek apakah productData ada sebelum digunakan
            if (typeof productData === 'undefined' || !productData[productId]) {
                console.error('Data produk tidak ditemukan untuk ID:', productId);
                return;
            }
            const product = productData[productId];
            
            modalDialog.classList.remove('max-w-2xl'); modalDialog.classList.add('max-w-4xl');

            let thumbnailsHTML = '';
            if (product.images && product.images.length > 1) {
                thumbnailsHTML = `<div class="flex space-x-2 mt-4 overflow-x-auto p-1">${product.images.map((imgSrc, index) => `<img src="${imgSrc}" alt="${product.name} thumbnail ${index + 1}" class="w-16 h-20 object-cover rounded-md cursor-pointer border-2 ${index === 0 ? 'border-gray-900' : 'border-transparent'} quick-view-thumbnail">`).join('')}</div>`;
            }

            modalContent.innerHTML = `
                <div class="modal-container">
                    <div class="flex flex-col md:flex-row md:space-x-8 p-4 md:p-2">
                        <div class="w-full md:w-1/2 mb-4 md:mb-0">
                            <img id="main-product-image" src="${product.images ? product.images[0] : 'https://placehold.co/800x1200/f3f4f6/333333?text=No+Image'}" alt="${product.name}" class="rounded-lg w-full h-auto object-cover">
                            ${thumbnailsHTML}
                        </div>
                        <div class="w-full md:w-1/2 flex flex-col">
                            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">${product.name}</h2>
                            <p class="text-xl text-gray-700 mt-2 mb-4">${product.price}</p>
                            <div class="text-gray-600 leading-relaxed mb-6 flex-grow">${product.description}</div>
                            <a href="${product.link}" target="_blank" class="w-full mt-auto inline-block text-center bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors">Lihat di Toko</a>
                        </div>
                    </div>
                </div>`;

            modal.classList.remove('hidden'); document.body.style.overflow = 'hidden';
            setTimeout(() => { modal.classList.add('opacity-100'); modalDialog.classList.remove('scale-95', 'opacity-0'); modalDialog.classList.add('scale-100', 'opacity-100'); }, 10);

            if (product.images && product.images.length > 1) {
                const mainImage = document.getElementById('main-product-image');
                const thumbnails = document.querySelectorAll('.quick-view-thumbnail');
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', () => {
                        mainImage.src = thumb.src;
                        thumbnails.forEach(t => t.classList.remove('border-gray-900'));
                        thumb.classList.add('border-gray-900');
                    });
                });
            }
        }
        quickViewTriggers.forEach(trigger => { trigger.addEventListener('click', (e) => { e.preventDefault(); openProductModal(trigger.dataset.productId); }); });
    }
    
    // --- Logika Carousel ---
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const cells = Array.from(carousel.querySelectorAll('.carousel__cell'));
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const backgroundShadow = document.getElementById('background-shadow');
    const scene = carousel.parentElement;
    const titleElement = document.getElementById('carousel-product-title');
    const cellCount = cells.length;
    if (cellCount === 0) return;
    const theta = 360 / cellCount;
    let radius;
    function setCarouselRadius() { radius = Math.round((scene.offsetWidth / 2) / Math.tan(Math.PI / cellCount)); rotateCarousel(); }
    let selectedIndex = 0;
    function updateCells() { const positiveIndex = (selectedIndex % cellCount + cellCount) % cellCount; cells.forEach((cell, i) => { const isSelected = i === positiveIndex; const scale = isSelected ? 1.35 : 1; const opacity = isSelected ? 1 : 0.5; const filter = isSelected ? 'brightness(1)' : 'brightness(0.8)'; const backgroundColor = isSelected ? '#ffffff' : 'transparent'; const rotation = theta * i; cell.style.backgroundColor = backgroundColor; cell.style.opacity = opacity; cell.style.filter = filter; cell.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px) scale(${scale})`; if (isSelected && titleElement) { titleElement.textContent = cell.dataset.title || ''; titleElement.style.opacity = '1'; } }); }
    function rotateCarousel() { const angle = theta * selectedIndex * -1; carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`; setTimeout(updateCells, 0); }
    prevButton.addEventListener('click', () => { selectedIndex--; if (titleElement) titleElement.style.opacity = '0'; rotateCarousel(); });
    nextButton.addEventListener('click', () => { selectedIndex++; if (titleElement) titleElement.style.opacity = '0'; rotateCarousel(); });
    let isDragging = false, startX, currentAngle = 0;
    function onPointerDown(event) { isDragging = true; if (backgroundShadow) backgroundShadow.classList.add('is-visible'); if (titleElement) titleElement.style.opacity = '0'; carousel.classList.add('is-dragging'); startX = event.pageX || (event.touches && event.touches[0].pageX); const transform = carousel.style.transform; currentAngle = parseFloat(transform.split('rotateY(')[1]) || 0; event.preventDefault(); }
    function onPointerMove(event) { if (!isDragging) return; const x = event.pageX || (event.touches && event.touches[0].pageX); const deltaX = x - startX; const sensitivity = 0.8; const angleChange = deltaX * sensitivity; const newAngle = currentAngle + angleChange; carousel.style.transform = `translateZ(-${radius}px) rotateY(${newAngle}deg)`; }
    function onPointerUp() { if (!isDragging) return; isDragging = false; if (backgroundShadow) backgroundShadow.classList.remove('is-visible'); carousel.classList.remove('is-dragging'); const transformStyle = carousel.style.transform; const rotationMatch = transformStyle.match(/rotateY\(([^deg]+)deg\)/); if (rotationMatch && rotationMatch[1]) { const finalAngle = parseFloat(rotationMatch[1]); selectedIndex = Math.round(finalAngle / -theta); rotateCarousel(); } }
    scene.addEventListener('mousedown', onPointerDown); window.addEventListener('mousemove', onPointerMove); window.addEventListener('mouseup', onPointerUp);
    scene.addEventListener('touchstart', onPointerDown, { passive: true }); window.addEventListener('touchmove', onPointerMove); window.addEventListener('touchend', onPointerUp);
    setCarouselRadius(); window.addEventListener('resize', setCarouselRadius);
});