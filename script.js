// --- DATA MASTER ---

const inventory = [
    { name: 'Caladinplast', qty: '1' },
    { name: 'Betadin + kasa + gunting', qty: '1 set' },
    { name: 'Kayu putih', qty: '3' },
    { name: 'Butbut (minyak herbal)', qty: '1' },
    { name: 'Termometer', qty: '1' },
    { name: 'Alkohol', qty: '1' },
    { name: 'Promag / Polysilane', qty: '1' },
    { name: 'Parasetamol 500mg / Sirup', qty: '2' },
    { name: 'Tolak angin anak dan dewasa', qty: '1' },
    { name: 'Obat diare (Oralit)', qty: '1' },
    { name: 'Lotion nyamuk (Sofel dsb)', qty: '2' },
    { name: 'Kasa steril', qty: '2 box' },
    { name: 'Emergency blanket', qty: '2' },
    { name: 'Cottonbud', qty: '1' },
    { name: 'Trombopop Gel', qty: '1' },
    { name: 'Rohto', qty: '1' },
    { name: 'Ibuprofen (Proris)', qty: '1' },
    { name: 'Hansaplast', qty: '1' },
    { name: 'Kasa rol', qty: '1 pack' },
    { name: 'Caladin cair / Lotion', qty: '2' },
    { name: 'Bioplacenton / Salep Burn', qty: '1' }
];

const procedures = {
    'asma': {
        title: 'Serangan Asma / Sesak Napas',
        steps: [
            'Tenangkan anak dan minta anak jangan panik (kepanikan memperparah sesak).',
            'Dudukkan anak dalam posisi <strong>TEGAK lurus</strong>. Longgarkan kancing baju dan jaket tebal yang menjepit dada.',
            '<strong>Gunakan Obat Pribadi Siswa:</strong> Ambil Inhaler / Nebulizer bawaan anak. Semprotkan 1–2 puff inhaler atau jalankan nebulizer selama 10 menit.',
            'Jika tidak membawa inhaler pribadi: Berikan semprotan <strong>Oksigen Portable (Oxycan)</strong> 2–3 kali hisapan saat anak menarik napas.',
            'Pindahkan anak jauh dari debu, udara dingin ekstrem, atau asap BBQ.'
        ],
        danger: 'Rujuk Segera: Jika bibir membiru, anak tidak bisa bicara, atau dada tertarik dalam saat bernapas, segera bawa ke faskes/puskesmas terdekat.'
    },
    'mimisan': {
        title: 'Penanganan Mimisan / Hidung Berdarah',
        steps: [
            'Dudukkan anak dalam posisi <strong>TEGAK</strong>.',
            'Minta anak <strong>MENDUDUK AGAK KE DEPAN</strong>.',
            'Pencet cuping hidung lembut menggunakan ibu jari dan telunjuk selama 5–10 menit penuh tanpa dilepas.',
            'Minta anak bernapas melalui mulut.',
            'Tempelkan kompres dingin / es di area pangkal hidung atau dahi.',
            'Setelah darah berhenti, ingatkan anak untuk tidak mengorek hidung selama beberapa jam.'
        ],
        danger: 'PENTING: Jangan biarkan anak mendongak! Mendongak membuat darah masuk ke tenggorokan dan memicu muntah.'
    },
    'alergi_suhu': {
        title: 'Kedinginan / Hipotermia & Alergi Suhu',
        steps: [
            'Bawa anak masuk ke dalam tenda tertutup yang terlindung dari angin.',
            'Lepas pakaian yang basah oleh keringat, ganti segera dengan baju tebal dan kering.',
            'Bungkus tubuh anak menggunakan <strong>Emergency Blanket</strong> (posisi lapisan perak mengilap menghadap ke DALAM tubuh anak).',
            'Berikan minuman manis hangat (teh manis hangat).',
            'Balurkan Minyak Kayu Putih / Minyak Butbut di dada, punggung, dan telapak kaki, lalu pakaikan kaos kaki tebal.'
        ],
        danger: 'Jika timbul bentol biduran yang luas, berikan 1/2 tablet Cetirizine (dosis anak).'
    },
    'alergi_makanan': {
        title: 'Alergi Makanan / Muntah / Diare',
        steps: [
            'Jika muntah karena makanan: Istirahatkan lambung dari makanan padat selama 1–2 jam.',
            'Berikan sedikit-sedikit larutan <strong>Oralit</strong> atau air hangat setiap 15 menit agar tidak dehidrasi.',
            'Jika mual / nyeri ulu hati: Berikan 1/2 tablet kunyah Promag atau 1 sendok Polysilane Jr.',
            'Jika timbul gatal/bentol akibat alergi makanan: Berikan 1/2 tablet Cetirizine sesudah makan.'
        ]
    },
    'fisik': {
        title: 'Keseleo / Terkilir / Memar',
        steps: [
            '<strong>Rest (Istirahat):</strong> Hentikan aktivitas anak. Dudukkan atau baringkan di tempat teduh.',
            '<strong>Ice (Es):</strong> Kompres area yang bengkak/nyeri dengan ice gel terbungkus kain/kasa selama 10–15 menit.',
            '<strong>Compress (Balut):</strong> Balut longgar menggunakan perban elastis / kasa rol untuk mengurangi pembengkakan.',
            '<strong>Elevate (Tinggikan):</strong> Posisikan area cedera lebih tinggi dari dada.',
            '<strong>Obat & Salep:</strong> Oleskan Trombopop Gel jika kulit tidak ada luka terbuka. Berikan Ibuprofen 1/2 tab jika nyeri hebat.'
        ],
        danger: 'SANGAT DILARANG memijat atau mengurut area terkilir! Pijatan dapat memperparah kerusakan pembuluh darah dan jaringan otot.'
    }
};

const students = [
    { cls: "1A", name: "Adnaan Daneer Faeyza", risk: "Kebanyakan makan coklat jadi muntah, Dermatitis atopik", meds: "", category: ["makanan", "fisik"], proc: "alergi_makanan" },
    { cls: "1A", name: "Hizan Abdi Gusti", risk: "Radang saluran empedu saat masih bayi", meds: "", category: ["fisik"], proc: null },
    { cls: "1A", name: "Jahida Walagri Arkana", risk: "Sedang suka mimisan, terutama di pagi hari", meds: "", category: ["fisik"], proc: "mimisan" },
    { cls: "1A", name: "Kiarana Alhaza Tsabita", risk: "Asma jadi gampang batuk kalo terlalu dingin", meds: "Sesekali nebu jika batuk asmanya intens kambuh", category: ["suhu"], proc: "asma" },
    { cls: "1A", name: "Maezurra Karima Shabira", risk: "flu, batuk, masuk angin, kembung, demam.", meds: "imboost vitamin, tolak angin, Proris ibuprofen, actived, polysilane Jr", category: ["fisik"], proc: "alergi_makanan" },
    { cls: "1A", name: "Muhammad Juna Ahnaf", risk: "Suhu", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "1A", name: "Muhammad Xherdan Putra", risk: "Alergi dingin, batuk2, flu, dan mimisan, penanganannya di berikan kehangatan (minyak telon)", meds: "", category: ["suhu"], proc: "mimisan" },
    { cls: "1A", name: "Rasya Rafif Arrasyid", risk: "Suhu", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    
    { cls: "1B", name: "Medina Humaira Putri", risk: "alergi dingin yg berlebih", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "1B", name: "Muhammad Ghaisan", risk: "Dingin", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "1B", name: "Rafasya Aksa Parvez", risk: "Klo cuaca terlalu panas keringat berlebih", meds: "", category: ["suhu", "fisik"], proc: null },
    { cls: "1B", name: "Syedtimur Syarief", risk: "Dingin, batuk pilek, Kalo batuk ada sesek", meds: "Kalo sesek (nebu), batuk pilek (lapifed), demam (sanmol/tempra forte)", category: ["suhu"], proc: "asma" },
    
    { cls: "2A", name: "Eshal Mariam", risk: "Pernah TB Kelenjar saat usia 3 tahun", meds: "", category: ["fisik"], proc: null },
    { cls: "2A", name: "Fayza Rahmi Meinanda", risk: "Alergi suhu dingin, Asma", meds: "Rymont", category: ["suhu"], proc: "asma" },
    { cls: "2A", name: "Ghaida Aljazira Mecca", risk: "Bila terlalu panas/kedinginan gatal, Terapi tangan kiri kaku", meds: "", category: ["suhu", "fisik"], proc: "alergi_suhu" },
    { cls: "2A", name: "Jennaira Mahathira", risk: "Alergi susu sapi/intoleransi laktosa, sensitif dingin, Rhinitis, tonsilitis", meds: "cetirizine, semprot hidung modexa", category: ["makanan", "suhu"], proc: "alergi_makanan" },
    { cls: "2A", name: "Muhammad Attarkun", risk: "Alergi dingin, Rhinitis allergy", meds: "Cetirizine", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "2A", name: "Raira Qaireen Azzahra", risk: "Jika udara dingin , biasanya bersin-bersin", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "2A", name: "Ryuji Arga", risk: "Alergi dingin", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    
    { cls: "2B", name: "Arjuna Ramadhan", risk: "alergi dingin (rhinitis alergi)", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "2B", name: "Kayla Inayah Naiful", risk: "suhu dingin & makan manis berlebihan", meds: "vit dari dokter", category: ["suhu", "makanan"], proc: "alergi_makanan" },
    { cls: "2B", name: "Maiza Numa Malika", risk: "Asma", meds: "", category: ["suhu"], proc: "asma" },
    { cls: "2B", name: "Muhammad Umarain", risk: "dingin - langsung bentol", meds: "", category: ["suhu"], proc: "alergi_suhu" },
    { cls: "2B", name: "Syarafana Delisha", risk: "Alergi dingin, coklat meises, sabun, Sinusitis dan eksim", meds: "Cetinal, semprot hidung modexa, pelembab", category: ["suhu", "makanan", "fisik"], proc: "alergi_makanan" },
    { cls: "2B", name: "Nabila Azkiya Marwa", risk: "Alergi dingin & debu, Asma", meds: "", category: ["suhu", "fisik"], proc: "asma" }
];

const schedule = [
    { time: "13.00 - 14.30", activity: "Registrasi & Penyerahan Bahan BBQ", note: "" },
    { time: "14.30 - 15.30", activity: "Pembukaan & Shalat Ashar", note: "" },
    { time: "15.30 - 17.00", activity: "Games & Playground", note: "Wajib sepatu kets tertutup. Pantau Ghaida (2A) tidak dipaksa fisik berat. Beri jeda minum Rafasya (1B). Medis standby." },
    { time: "17.00 - 19.00", activity: "Istirahat, ISHOMA", note: "" },
    { time: "19.00 - 20.00", activity: "BBQ", note: "Anak Asma jauh dari asap. Adnaan, Kayla, Syarafana dilarang manis berlebih. Jennaira dilarang susu sapi." },
    { time: "20.00 - 21.00", activity: "Resik diri (Oles anti nyamuk)", note: "Instruksikan oles lotion nyamuk dan kayu putih di dada." },
    { time: "21.00 - 04.00", activity: "Tidur", note: "Anak alergi dingin wajib jaket tebal & kaos kaki." },
    { time: "04.00 - 05.00", activity: "Shalat Shubuh dan Olahraga", note: "Suhu terdingin. Pantau Jahida (1A) & Xherdan (1A) rawan mimisan." },
    { time: "05.00 - 06.30", activity: "Resik diri, Packing & Sarapan", note: "" },
    { time: "06.30 - 08.00", activity: "Panahan & Mini Zoo", note: "Nabila (2B) wajib masker (alergi debu hewan). Wajib cuci tangan. Area panah harus steril." },
    { time: "08.00 - 09.00", activity: "Refleksi, Penutupan & Kepulangan", note: "" }
];

const pocketBook = [
    { name: "Parasetamol", dose: "1/2 tab (250mg) ATAU 10ml sirup", rules: "Demam (>38°C), tiap 4-6 jam jika perlu. Wajib sesudah makan." },
    { name: "Ibuprofen (Proris)", dose: "5-7,5ml sirup ATAU 1/2 tab 200mg", rules: "Demam tinggi, memar. Wajib sesudah makan." },
    { name: "Cetirizine / Antihistamin", dose: "1/2 tab (5mg) ATAU 5ml sirup", rules: "Alergi, biduran. 1x sehari (malam - efek ngantuk)." },
    { name: "Promag / Polysilane", dose: "1/2 tab kunyah ATAU 1 sendok takar", rules: "Mual, kembung. Diminum 15-30 mnt sebelum makan." },
    { name: "Oralit", dose: "1 sachet dlm 200ml air", rules: "Muntah/Diare. Minum sedikit-sedikit." }
];


// --- RENDER FUNCTIONS ---

function renderInventory() {
    const list = document.getElementById('inventory-list');
    list.innerHTML = inventory.map(item => `
        <div class="list-item">
            <div class="list-item-content">
                <h3>${item.name}</h3>
            </div>
            <div class="badge">${item.qty}</div>
        </div>
    `).join('');
}

function renderPocketBook() {
    const list = document.getElementById('pocketbook-list');
    list.innerHTML = pocketBook.map(item => `
        <div class="list-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <h3 style="color: var(--primary-hover);">${item.name}</h3>
            </div>
            <div style="background: var(--background); padding: 8px 12px; border-radius: 6px; width: 100%;">
                <p style="font-weight: 600; font-size: 0.85rem; color: var(--text-main); margin-bottom: 2px;">Dosis: ${item.dose}</p>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${item.rules}</p>
            </div>
        </div>
    `).join('');
}

let currentFilter = 'all';
let currentSearch = '';

function renderStudents() {
    const list = document.getElementById('students-list');
    
    // Filter by Category & Search
    const filtered = students.filter(s => {
        const matchCategory = currentFilter === 'all' || s.category.includes(currentFilter);
        const matchSearch = s.name.toLowerCase().includes(currentSearch) || s.cls.toLowerCase().includes(currentSearch);
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                <p>Tidak ada data siswa untuk filter ini.</p>
            </div>`;
        return;
    }

    list.innerHTML = filtered.map((student, index) => `
        <div class="card student-card">
            <div class="student-header">
                <div class="student-name">${index + 1}. ${student.name}</div>
                <div class="student-class">${student.cls}</div>
            </div>
            <div class="student-risk">
                <div class="student-risk-title">
                    <svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                    Kondisi Risiko
                </div>
                ${student.risk}
            </div>
            ${student.meds ? `
            <div class="student-meds">
                <strong>Obat Bawaan/Keterangan:</strong><br>
                ${student.meds}
            </div>
            ` : ''}
            
            ${student.proc ? `
            <button class="btn-action" onclick="openModal('${student.proc}')" style="margin-top: auto;">
                <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.5 11.5H9V16H7v-1.5H5.5v-2H7V11h2v1.5h1.5v2zM19 12h-6v-2h6v2zM19 8h-6V6h6v2z"/></svg>
                Panduan Penanganan Darurat
            </button>
            ` : '<div style="margin-top: auto;"></div>'}
        </div>
    `).join('');
}

function renderSchedule() {
    const list = document.getElementById('schedule-list');
    list.innerHTML = schedule.map(item => `
        <div class="timeline-item">
            <div class="timeline-time">${item.time}</div>
            <div style="font-weight: 600; margin-bottom: 4px;">${item.activity}</div>
            ${item.note ? `<div class="timeline-desc">${item.note}</div>` : ''}
        </div>
    `).join('');
}

// --- INTERACTIONS ---

function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`tab-${tabId}`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    element.classList.add('active');
    window.scrollTo(0,0);
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderStudents();
    });
});

// Search Logic
function handleSearch() {
    const input = document.getElementById('search-student');
    currentSearch = input.value.toLowerCase();
    renderStudents();
}

// Modal Logic
function openModal(procKey) {
    const proc = procedures[procKey];
    if (!proc) return;

    document.getElementById('modal-title').innerText = proc.title;
    
    let bodyHtml = '<ol>';
    proc.steps.forEach(step => {
        bodyHtml += `<li>${step}</li>`;
    });
    bodyHtml += '</ol>';

    if (proc.danger) {
        bodyHtml += `<div class="danger-note">${proc.danger}</div>`;
    }

    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('medical-modal').classList.add('active');
    
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('medical-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on click outside
document.getElementById('medical-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Initialize
window.onload = () => {
    renderInventory();
    renderStudents();
    renderSchedule();
    renderPocketBook();
};
