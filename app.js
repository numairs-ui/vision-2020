// app.js - DOM Component Controller Engine
document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const productGrid = document.getElementById('product-grid');
    const filterNav = document.getElementById('filter-nav');
    const detailsModal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    
    // New Hero DOM References
    const mainHero = document.getElementById('main-hero');
    const categoryHeroContainer = document.getElementById('category-hero-container');

    // Category Metadata for Dynamic Banners
    const categoryMeta = {
        'Vests': { 
            titleMain: 'TACTICAL', 
            titleBadge: 'VEST',
            desc: 'High-performance soft armor and tactical load-bearing platforms.', 
            img: 'assets/images/hero-vests.jpg' 
        },
        'Helmets': { 
            titleMain: 'COMBAT', 
            titleBadge: 'HELMETS',
            desc: 'Advanced head protection and ballistic face shields.', 
            img: 'assets/images/hero-helmets.jpg' 
        },
        'Plates': { 
            titleMain: 'BULLET PROOF', 
            titleBadge: 'PLATE',
            desc: 'Stand-alone and in-conjunction rigid ballistic protection systems.', 
            img: 'assets/images/hero-plates.jpg' 
        },
        'Specialty': { 
            titleMain: 'SPECIALTY', 
            titleBadge: 'SYSTEMS',
            desc: 'Ballistic briefcases, protective blankets, and EOD suits.', 
            img: 'assets/images/hero-specialty.jpg' 
        }
    };

    // Render Function Core
    function renderCatalog(categoryFilter = 'All') {
        productGrid.innerHTML = '';
        const data = window.catalogData || [];
        
        // Handle Hero Banner Logic
        if (categoryFilter === 'All') {
            mainHero.classList.remove('hidden');
            categoryHeroContainer.classList.add('hidden');
            categoryHeroContainer.innerHTML = ''; // Clear memory
        } else {
            mainHero.classList.add('hidden');
            categoryHeroContainer.classList.remove('hidden');
            
            const meta = categoryMeta[categoryFilter];
            if (meta) {
                categoryHeroContainer.innerHTML = `
                    <div class="relative w-full min-h-[220px] md:min-h-[260px] bg-tacticalBlack rounded-lg overflow-hidden flex flex-col md:flex-row items-stretch border border-gray-800 shadow-lg animate-in fade-in duration-300">
                        <!-- Left Side: Content -->
                        <div class="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10 bg-tacticalBlack bg-gradient-to-r from-tacticalBlack via-tacticalBlack to-tacticalBlack/90 md:bg-none">
                            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold font-stencil uppercase tracking-wider text-white mb-2 leading-tight">
                                ${meta.titleMain} <span class="bg-slate-800/60 backdrop-blur border border-slate-700/50 text-white px-3 py-0.5 rounded text-lg md:text-xl font-tactical uppercase tracking-widest inline-block shadow-sm ml-1">${meta.titleBadge}</span>
                            </h2>
                            <p class="text-xs md:text-sm font-medium text-gray-300 max-w-lg leading-relaxed">${meta.desc}</p>
                        </div>
                        <!-- Right Side: Clean Image -->
                        <div class="relative w-full md:w-[40%] h-36 md:h-auto overflow-hidden">
                            <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-tacticalBlack to-transparent z-10 hidden md:block"></div>
                            <img src="${meta.img}" alt="${meta.titleMain} ${meta.titleBadge}" class="w-full h-full object-cover object-center" onerror="this.src='https://placehold.co/600x300/1a202c/ffffff?text=${encodeURIComponent(categoryFilter)}'">
                        </div>
                    </div>
                `;
            }
        }

        // Apply Data Filtering
        const filteredData = categoryFilter === 'All' 
            ? data 
            : data.filter(p => p.category === categoryFilter);

        if (filteredData.length === 0) {
            productGrid.innerHTML = `<p class="col-span-full text-center text-sm py-12 text-gray-500 font-medium">No products indexed under this system node.</p>`;
            return;
        }

        filteredData.forEach(product => {
            const card = document.createElement('div');
            card.className = "group bg-white border border-gray-200 hover:border-militaryGreen/50 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative";

            card.innerHTML = `
                <div>
                    <!-- Image Area -->
                    <div class="w-full h-56 bg-gray-50 flex items-center justify-center p-6 overflow-hidden relative border-b border-gray-100">
                        <img src="${product.image}" alt="${product.name}" class="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" onerror="this.src='https://placehold.co/400x300/4c514a/ffffff?text=${encodeURIComponent(product.model)}'">
                        <span class="absolute top-3 right-3 bg-slate-900/95 backdrop-blur border border-slate-800 text-white text-[9px] font-bold font-tactical px-2.5 py-0.5 rounded uppercase tracking-widest shadow-sm">${product.category}</span>
                        <!-- Corner Crosshairs/Accents for Tactical Vibe -->
                        <div class="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-300 group-hover:border-militaryGreen transition-colors duration-300"></div>
                        <div class="absolute top-2 right-2 w-2 h-2 border-t border-r border-gray-300 group-hover:border-militaryGreen transition-colors duration-300"></div>
                        <div class="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gray-300 group-hover:border-militaryGreen transition-colors duration-300"></div>
                        <div class="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-300 group-hover:border-militaryGreen transition-colors duration-300"></div>
                    </div>
                    <!-- Body Area -->
                    <div class="p-5">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-[9px] font-mono font-medium text-gray-400 tracking-wider">SYS.REF // ${product.id.toUpperCase()}</span>
                            <span class="text-[10px] font-extrabold font-tactical tracking-widest text-militaryGreen uppercase">${product.category}</span>
                        </div>
                        <h3 class="text-lg font-bold font-tactical text-tacticalBlack group-hover:text-militaryGreen transition-colors uppercase tracking-wide mt-1 leading-tight">${product.name}</h3>
                        <p class="text-xs font-semibold text-gray-400 mt-1">MODEL: ${product.model}</p>
                        
                        <div class="mt-4 pt-3 border-t border-dashed border-gray-200">
                            <div class="flex items-start gap-1.5 mb-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-militaryGreen mt-1.5 flex-shrink-0"></span>
                                <p class="text-xs font-medium text-gunmetalGray"><span class="text-tacticalBlack font-semibold">Protection:</span> ${product.protection}</p>
                            </div>
                            <div class="flex items-start gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full bg-militaryGreen mt-1.5 flex-shrink-0"></span>
                                <p class="text-xs font-medium text-gunmetalGray"><span class="text-tacticalBlack font-semibold">Material:</span> ${product.material}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-5 pb-5 pt-2">
                    <button data-id="${product.id}" class="details-trigger w-full bg-tacticalBlack hover:bg-militaryGreen text-white border border-tacticalBlack hover:border-militaryGreen font-tactical uppercase tracking-widest text-xs font-bold py-2.5 px-4 rounded transition-all duration-300 shadow-sm flex items-center justify-center gap-2">
                        <span>INSPECT SPECIFICATIONS</span>
                        <span class="text-[10px] font-light opacity-60">→</span>
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
 
        // Re-attach triggers to dynamic canvas elements
        document.querySelectorAll('.details-trigger').forEach(btn => {
            btn.addEventListener('click', () => launchDetailsModal(btn.dataset.id));
        });
    }
 
    // Modal Builder Engine Configuration
    function launchDetailsModal(id) {
        const product = window.catalogData.find(p => p.id === id);
        if (!product) return;
 
        modalTitle.textContent = `${product.name} Configuration Profile`;
 
        let specTableHtml = '';
        if (product.specs) {
            specTableHtml = `
                <div class="border border-gray-200 rounded-lg overflow-hidden mt-4 shadow-sm">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr class="bg-tacticalBlack text-white font-tactical uppercase tracking-widest text-[10px] border-b border-gray-800">
                                <th class="p-3">Model Variant</th>
                                <th class="p-3">Protection Threshold</th>
                                <th class="p-3">Specs (mm)</th>
                                <th class="p-3 text-right">Mass (kg)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 font-medium">
                            ${product.specs.map(s => `
                                <tr class="hover:bg-militaryGreen/10 odd:bg-white even:bg-gray-50/60 transition-colors duration-150">
                                    <td class="p-3 font-bold font-tactical text-tacticalBlack tracking-wider">${s.model}</td>
                                    <td class="p-3 text-gunmetalGray">${s.protection}</td>
                                    <td class="p-3 text-gunmetalGray">${s.size}</td>
                                    <td class="p-3 text-right font-extrabold text-tacticalBlack">${s.weight}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
 
        modalContent.innerHTML = `
            <div>
                <h4 class="font-tactical font-bold uppercase tracking-widest text-[11px] text-gray-400 mb-2">Standard Defense Metrics</h4>
                <p class="text-xs font-bold text-militaryGreen bg-militaryGreen/10 border border-militaryGreen/20 inline-block px-3 py-1 rounded-full uppercase tracking-wider">${product.protection}</p>
                <p class="text-xs font-medium text-gunmetalGray mt-3"><span class="font-bold text-tacticalBlack">Material Compound Base:</span> ${product.material}</p>
            </div>
            <hr class="border-gray-200">
            <div>
                <h4 class="font-tactical font-bold uppercase tracking-widest text-[11px] text-gray-400 mb-3">Operational Product Features</h4>
                <ul class="space-y-2 list-none pl-0">
                    ${product.features.map(f => `
                        <li class="flex items-start text-xs font-medium text-gunmetalGray">
                            <span class="text-militaryGreen font-extrabold mr-3 flex-shrink-0 text-sm leading-none">✓</span>
                            <span class="leading-relaxed">${f}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ${specTableHtml ? `<hr class="border-gray-200"><div><h4 class="font-tactical font-bold uppercase tracking-widest text-[11px] text-gray-400 mb-2">Dimensional Variance Tables</h4>${specTableHtml}</div>` : ''}
        `;
 
        detailsModal.classList.remove('hidden');
        detailsModal.classList.add('flex');
    }
 
    // Interactive State Event Handling Modules
    filterNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (!btn) return;
 
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.className = "nav-btn px-4 py-2 rounded text-xs font-bold uppercase font-tactical text-gray-400 border border-slate-800 bg-black/20 hover:bg-black/40 hover:text-white transition-all duration-300 tracking-wider";
        });
        btn.className = "nav-btn px-4 py-2 rounded text-xs font-bold uppercase font-tactical bg-militaryGreen text-white border border-militaryGreen shadow-md transition-all duration-300 tracking-wider";
 
        renderCatalog(btn.dataset.target);
    });

    closeModal.addEventListener('click', () => {
        detailsModal.classList.remove('flex');
        detailsModal.classList.add('hidden');
    });

    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) closeModal.click();
    });

    // Bootstrapping Execution Trigger
    renderCatalog('All');
});