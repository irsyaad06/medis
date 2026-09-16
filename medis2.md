```python
import docx
print(docx.__version__)


```

```text
1.1.0


```

```python
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

doc = docx.Document()

# Page setup - Margins 1 inch
sections = doc.sections
for section in sections:
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(0.8)
    section.right_margin = Inches(0.8)

# Colors
COLOR_PRIMARY = RGBColor(16, 124, 65)    # Medical Green
COLOR_SECONDARY = RGBColor(43, 87, 154) # Deep Blue
COLOR_DARK = RGBColor(38, 38, 38)        # Off-black
COLOR_MUTED = RGBColor(100, 100, 100)

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

# Title
title_p = doc.add_paragraph()
title_p.paragraph_format.space_before = Pt(0)
title_p.paragraph_format.space_after = Pt(4)
title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run_title = title_p.add_run("ENSIKLOPEDIA & PANDUAN MEDIS LAPANGAN")
run_title.font.name = 'Calibri'
run_title.font.size = Pt(22)
run_title.font.bold = True
run_title.font.color.rgb = COLOR_PRIMARY

sub_p = doc.add_paragraph()
sub_p.paragraph_format.space_after = Pt(18)
sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run_sub = sub_p.add_run("Buku Saku First Aid, Dosis Obat & Penanganan Darurat Kegiatan Kemping SD")
run_sub.font.name = 'Calibri'
run_sub.font.size = Pt(12)
run_sub.font.italic = True
run_sub.font.color.rgb = COLOR_MUTED

def add_heading_1(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(15)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY
    return p

def add_heading_2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.color.rgb = COLOR_SECONDARY
    return p

def add_bullet(p_or_text, level=0, bold_prefix="", text=""):
    if isinstance(p_or_text, str):
        p = doc.add_paragraph(style='List Bullet')
        bold_prefix = p_or_text
    else:
        p = p_or_text
    
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    
    if bold_prefix:
        r_bold = p.add_run(bold_prefix)
        r_bold.font.name = 'Calibri'
        r_bold.font.size = Pt(10.5)
        r_bold.font.bold = True
        r_bold.font.color.rgb = COLOR_DARK
        
    if text:
        r_text = p.add_run(text)
        r_text.font.name = 'Calibri'
        r_text.font.size = Pt(10.5)
        r_text.font.color.rgb = COLOR_DARK

# Section 1
add_heading_1("BAGIAN 1: DOSIS & ATURAN PAKAI OBAT (ANAK SD 6–12 TAHUN)")

p = doc.add_paragraph()
p.paragraph_format.space_after = Pt(8)
r = p.add_run("Catatan Penting: Selalu utamakan obat bawaan pribadi siswa jika ada. Gunakan obat dari kit medis umum sesuai indikasi dan dosis standar di bawah ini.")
r.font.name = 'Calibri'
r.font.size = Pt(10)
r.font.italic = True

# Table for Medicines
table_data = [
    ["Nama Obat", "Bentuk & Stok Available", "Indikasi / Kegunaan", "Dosis & Takaran (Anak 6-12 Thn)", "Aturan Pakai & Catatan"],
    ["Parasetamol", "Tablet 500mg & Sirup (3)", "Demam (>38°C), pusing, sakit kepala, nyeri ringan.", "1/2 tablet 500mg ATAU 10 ml sirup (250 mg).", "Tiap 4-6 jam jika perlu. Maks 4x sehari. Berikan sesudah makan."],
    ["Ibuprofen (Proris)", "Sirup / Tablet 200mg (1)", "Demam tinggi, nyeri sedang/berat, bengkak/terkilir.", "5 - 7,5 ml sirup ATAU 1/2 tablet 200mg (100mg).", "Maks 3x sehari. Wajib sesudah makan (cegah iritasi lambung)."],
    ["Cetirizine / Antihistamin", "Tablet 10mg / Sirup", "Alergi dingin, bentol/biduran, bersin rhinitis.", "1/2 tablet (5 mg) ATAU 5 ml sirup.", "1x sehari (sebaiknya malam/sebelum tidur karena efek kantuk)."],
    ["Promag / Polysilane", "Tablet Kunyah & Sirup (1)", "Mual, kembung, nyeri ulu hati, terlambat makan.", "1/2 tablet kunyah ATAU 1 sendok takar (5 ml).", "Dikunyah / diminum 15-30 menit sebelum makan."],
    ["Oralit", "Serbuk sachet", "Diare, muntah-muntah, pencegahan dehidrasi.", "1 sachet dilarutkan dalam 200 ml air matang.", "Minum sedikit-sedikit tiap habis BAB melilit / muntah."],
    ["Tolak Angin Anak", "Sachet cair (1)", "Masuk angin, perut kembung, badan meriang.", "1 sachet anak.", "Sesudah makan. Maksimal 2-3 sachet sehari."],
    ["Trombopop Gel", "Salep tube (1)", "Memar, lebam, bengkak terkilir, kejang otot.", "Oleskan tipis 2-3x sehari.", "DILARANG dioleskan pada luka terbuka / berdarah!"],
    ["Caladin Lotion / Plast", "Cair & Bedak kocok (2)", "Gatal gatal, biang keringat, bentol serangga.", "Oleskan merata pada area gatal.", "Hanya untuk kulit utuh. Jangan kena mata / luka terbuka."],
    ["Rohto (Tetes Mata)", "Botol tetes (1)", "Mata merah, iritasi ringan akibat debu / asap.", "1 - 2 tetes pada mata yang sakit.", "Bilas mata dengan air bersih dulu sebelum diteteskan."],
    ["Bioplacenton / Salep Burn", "Salep tube (Rekomendasi)", "Luka bakar ringan terkena panggangan BBQ / api.", "Oleskan tebal pada area luka bakar.", "Siram air mengalir 10-15 menit DULU sebelum dioles salep."]
]

table = doc.add_table(rows=len(table_data), cols=5)
table.alignment = WD_TABLE_ALIGNMENT.CENTER
table.autofit = False

col_widths = [Inches(1.2), Inches(1.1), Inches(1.3), Inches(1.5), Inches(1.6)]

for row_idx, row in enumerate(table.rows):
    # Prevent row break across pages
    trPr = row._tr.get_or_add_trPr()
    trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
    
    if row_idx == 0:
        # Repeat header
        trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
        
    for col_idx, cell in enumerate(row.cells):
        cell.width = col_widths[col_idx]
        cell.paragraphs[0].paragraph_format.space_before = Pt(2)
        cell.paragraphs[0].paragraph_format.space_after = Pt(2)
        
        text = table_data[row_idx][col_idx]
        p = cell.paragraphs[0]
        run = p.add_run(text)
        run.font.name = 'Calibri'
        
        if row_idx == 0:
            set_cell_background(cell, "107C41") # Green header
            set_cell_margins(cell, top=120, bottom=120, left=100, right=100)
            run.font.bold = True
            run.font.size = Pt(9.5)
            run.font.color.rgb = RGBColor(255, 255, 255)
        else:
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            run.font.size = Pt(8.5)
            run.font.color.rgb = COLOR_DARK
            if row_idx % 2 == 1:
                set_cell_background(cell, "F4F9F5") # Light zebra tint
            else:
                set_cell_background(cell, "FFFFFF")

# Section 2
add_heading_1("BAGIAN 2: LANGKAH SOLUTIF PENANGANAN KONDISI / KEJADIAN (STEP-BY-STEP)")

conditions = [
    ("1. Keseleo / Terkilir / Memar (Games & Playground)", [
        ("Penanganan Utama (Metode R.I.C.E):", ""),
        ("• Rest (Istirahat): ", "Hentikan aktivitas anak. Dudukkan atau baringkan di tempat teduh."),
        ("• Ice (Es): ", "Kompres area yang bengkak/nyeri dengan ice gel terbungkus kain/kasa selama 10–15 menit."),
        ("• Compress (Balut): ", "Balut longgar menggunakan perban elastis / kasa rol untuk mengurangi pembengkakan."),
        ("• Elevate (Tinggikan): ", "Posisikan area cedera lebih tinggi dari dada anak saat berbaring."),
        ("Obat & Salep: ", "Oleskan Trombopop Gel jika kulit tidak ada luka terbuka. Berikan Ibuprofen 1/2 tab jika nyeri hebat."),
        ("PANTANGAN UTAMA: ", "SANGAT DILARANG memijat atau mengurut area terkilir! Pijatan dapat memperparah kerusakan pembuluh darah dan jaringan otot.")
    ]),
    ("2. Kedinginan Ringan / Hipotermia Ringan (Malam Hari & Subuh)", [
        ("Gejala: ", "Menggigil hebat, bibir pucat/kebiruan, bicara gagu, tangan dan kaki sangat dingin."),
        ("Langkah Solutif: ", ""),
        ("1. ", "Bawa anak masuk ke dalam tenda tertutup yang terlindung dari angin."),
        ("2. ", "Lepas pakaian yang basah oleh keringat, ganti segera dengan baju tebal dan kering."),
        ("3. ", "Bungkus tubuh anak menggunakan Emergency Blanket (posisi lapisan perak mengilap menghadap ke DALAM tubuh anak)."),
        ("4. ", "Berikan minuman manis hangat (teh manis hangat)."),
        ("5. ", "Balurkan Minyak Kayu Putih / Minyak Butbut di dada, punggung, dan telapak kaki, lalu pakaikan kaos kaki tebal.")
    ]),
    ("3. Penanganan Mimisan / Hidung Berdarah (Jahida 1A, Xherdan 1A)", [
        ("Langkah Solutif: ", ""),
        ("1. ", "Dudukkan anak dalam posisi TEGAK."),
        ("2. ", "Minta anak MENDUDUK AGAK KE DEPAN. (PENTING: Jangan biarkan anak mendongak! Mendongak membuat darah masuk ke tenggorokan dan memicu muntah)."),
        ("3. ", "Pencet cuping hidung lembut menggunakan ibu jari dan telunjuk selama 5–10 menit penuh tanpa dilepas."),
        ("4. ", "Minta anak bernapas melalui mulut."),
        ("5. ", "Tempelkan kompres dingin / es di area pangkal hidung atau dahi."),
        ("6. ", "Setelah darah berhenti, ingatkan anak untuk tidak mengorek hidung selama beberapa jam.")
    ]),
    ("4. Serangan Asma / Sesak Napas (Kiarana, Fayza, Maiza, Nabila, Syedtimur)", [
        ("Langkah Solutif: ", ""),
        ("1. ", "Tenangkan anak dan minta anak jangan panik (kepanikan memperparah sesak)."),
        ("2. ", "Dudukkan anak dalam posisi TEGAK lurus. Longgarkan kancing baju dan jaket tebal yang menjepit dada."),
        ("3. ", "Gunakan Obat Pribadi Siswa: Ambil Inhaler / Nebulizer bawaan anak (contoh: Ventolin/Rymont). Semprotkan 1–2 puff inhaler atau jalankan nebulizer selama 10 menit."),
        ("4. ", "Jika tidak membawa inhaler pribadi: Berikan semprotan Oksigen Portable (Oxycan) 2–3 kali hisapan saat anak menarik napas."),
        ("5. ", "Pindahkan anak jauh dari debu, udara dingin ekstrem, atau asap BBQ."),
        ("6. ", "Rujuk Segera: Jika bibir membiru, anak tidak bisa bicara, atau dada tertarik dalam saat bernapas, segera bawa ke faskes/puskesmas terdekat.")
    ]),
    ("5. Luka Bakar Ringan (Terkena Alat BBQ / Api)", [
        ("Langkah Solutif: ", ""),
        ("1. ", "Segera siram area yang terbakar dengan AIR BERSIH MENGALIR (suhu ruang) selama 10–15 menit."),
        ("2. ", "PANTANGAN: DILARANG menggunakan es batu, kecap, mentega, atau pasta gigi! Hal ini memperparah kerusakan jaringan dan memicu infeksi."),
        ("3. ", "Keringkan perlahan dengan menepuk-nepukkan kasa steril."),
        ("4. ", "Oleskan salep luka bakar (Bioplacenton / Aloe Vera Gel) secara merata."),
        ("5. ", "Tutup longgar dengan kasa steril jika area luka rawan tergesek baju.")
    ]),
    ("6. Alergi Makanan / Muntah / Diare (Adnaan, Jennaira, Kayla, Syarafana)", [
        ("Langkah Solutif: ", ""),
        ("1. ", "Jika muntah karena makanan (misal coklat/laktosa): Istirahatkan lambung dari makanan padat selama 1–2 jam."),
        ("2. ", "Berikan sedikit-sedikit larutan Oralit atau air hangat setiap 15 menit agar tidak dehidrasi."),
        ("3. ", "Jika mual / nyeri ulu hati: Berikan 1/2 tablet kunyah Promag atau 1 sendok Polysilane Jr."),
        ("4. ", "Jika timbul gatal/bentol akibat alergi makanan: Berikan 1/2 tablet Cetirizine sesudah makan.")
    ]),
    ("7. Mata Kemasukan Debu / Iritasi (Mini Zoo & Panahan)", [
        ("Langkah Solutif: ", ""),
        ("1. ", "PANTANGAN: DILARANG mengucek mata! Mengucek mata berisiko menggores kornea."),
        ("2. ", "Bilas mata menggunakan air bersih mengalir atau cairan Boorwater dari sudut dalam mata ke arah luar."),
        ("3. ", "Teteskan 1–2 tetes Rohto untuk meredakan iritasi dan kemerahan.")
    ]),
    ("8. Luka Lecet / Tergores / Terpotong (Games & Playground)", [
        ("Langkah Solutif: ", ""),
        ("1. ", "Bersihkan luka dari kotoran/tanah dengan air bersih mengalir atau Alkohol 70% di sekitar area kulit luar luka."),
        ("2. ", "Tepuk-tepuk hingga kering memakai kasa steril."),
        ("3. ", "Bubuhi Betadine secukupnya pada luka."),
        ("4. ", "Tutup menggunakan Hansaplast (untuk luka kecil) atau Kasa Steril + Plester (untuk luka lebih lebar).")
    ])
]

for title, steps in conditions:
    add_heading_2(title)
    for bold_p, txt in steps:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.left_indent = Inches(0.2)
        
        r1 = p.add_run(bold_p)
        r1.font.name = 'Calibri'
        r1.font.size = Pt(10)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        
        if txt:
            r2 = p.add_run(txt)
            r2.font.name = 'Calibri'
            r2.font.size = Pt(10)
            r2.font.color.rgb = COLOR_DARK

# Section 3
add_heading_1("BAGIAN 3: PANDUAN PREVENTIF PER AKTIVITAS RUNDOWN")

preventives = [
    ("1. Sesi Games & Playground (15.30 - 17.00 & 06.30 - 08.00)", [
        ("Potensi Bahaya: ", "Jatuh, terkilir, lecet, terbentur, pingsan kelelahan (heat exhaustion)."),
        ("Tindakan Preventif: ", "Wajibkan siswa memakai sepatu kets tertutup. Pantau khusus Ghaida (2A) yang tangan kirinya kaku agar tidak dipaksa ikut permainan fisik berat. Berikan jeda minum untuk Rafasya (1B) yang gampang berkeringat berlebih. Tim medis standby membawa P3K lapangan (Betadine, Kasa, Hansaplast, Trombopop).")
    ]),
    ("2. Sesi BBQ Malam (19.00 - 20.00)", [
        ("Potensi Bahaya: ", "Luka bakar, terhirup asap pemicu asma, salah makan pemicu alergi."),
        ("Tindakan Preventif: ", "Posisikan anak berjarak minimal 1.5 meter dari panggangan. Jauhkan anak-anak berriwayat asma (Kiarana, Fayza, Maiza, Nabila, Syedtimur) dari hembusan asap. Lakukan screening makanan: Adnaan (1A), Kayla (2B), Syarafana (2B) DILARANG makan coklat/manis berlebih. Jennaira (2A) DILARANG minum es/susu sapi. Standby Bioplacenton & Ice gel.")
    ]),
    ("3. Sesi Tidur Malam & Subuh (21.00 - 05.00)", [
        ("Potensi Bahaya: ", "Hipotermia ringan, serangan asma dingin, mimisan pagi hari, gigitan nyamuk."),
        ("Tindakan Preventif: ", "Pukul 20.30: Instruksikan oles lotion nyamuk dan minyak kayu putih/telon pada dada anak. Pastikan anak berisiko alergi dingin tidur memakai jaket tebal, kaos kaki, dan Emergency Blanket. Pukul 04.00 (Subuh): Suhu mencapai titik terdingin, lakukan ronda medis memantau Jahida (1A) & Xherdan (1A) untuk antisipasi mimisan pagi.")
    ]),
    ("4. Sesi Panahan (06.30 - 08.00)", [
        ("Potensi Bahaya: ", "Sabetan tali busur (string slap) pada lengan, tertusuk anak panah, goresan."),
        ("Tindakan Preventif: ", "Garis batas berdiri (shooting line) harus steril. Anak DILARANG berjalan mengambil anak panah sebelum ada komando instruktur. Pastikan busur anak panah tidak diarahkan ke orang lain.")
    ]),
    ("5. Sesi Mini Zoo & Jembatan (06.30 - 08.00)", [
        ("Potensi Bahaya: ", "Cakaran/gigitan hewan, alergi bulu/debu, terpeleset di jembatan."),
        ("Tindakan Preventif: ", "Nabila Azkiya (2B) WAJIB memakai masker karena alergi debu/hewan. Instruksikan anak tidak memasukkan jari ke dalam kandang. WAJIB cuci tangan pakai sabun setelah dari Mini Zoo sebelum sarapan.")
    ])
]

for title, details in preventives:
    add_heading_2(title)
    for bold_p, txt in details:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.left_indent = Inches(0.2)
        
        r1 = p.add_run(bold_p)
        r1.font.name = 'Calibri'
        r1.font.size = Pt(10)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        
        r2 = p.add_run(txt)
        r2.font.name = 'Calibri'
        r2.font.size = Pt(10)
        r2.font.color.rgb = COLOR_DARK

doc.save("Ensiklopedia_Medis_Kemping_SD.docx")
print("File successfully created!")


```

```text
File successfully created!


```

Tenang, tidak perlu panik. Ini adalah **Ensiklopedia & Buku Saku Medis Lapangan** lengkap yang dirancang khusus untuk anak SD usia 6–12 tahun (rentang berat badan rata-rata 20–35 kg).

File dokumen resmi berbentuk **.docx** sudah selesai dibuat dan bisa langsung diunduh atau dicetak untuk dibawa ke lapangan:

📁 [Unduh Ensiklopedia Medis Kemping SD (.docx)]()

---

## 1. Panduan Dosis & Takaran Obat Anak SD (6–12 Tahun)

> **Prinsip Utama:** Utamakan obat pribadi siswa yang dibawakan orang tua. Jika menggunakan *kit* medis umum, gunakan acuan takaran di bawah ini.

| Nama Obat | Stok & Bentuk | Indikasi Utamanya | Dosis & Takaran Standar | Aturan Pakai & Catatan |
| --- | --- | --- | --- | --- |
| **Parasetamol** | Tablet 500 mg & Sirup | Demam (>38°C), pusing, sakit kepala, nyeri ringan | **1/2 tablet** (250 mg) **ATAU** 10 ml sirup | Diberikan tiap 4–6 jam jika perlu. Maksimal 4 kali sehari. Wajib sesudah makan. |
| **Ibuprofen (Proris)** | Sirup (100 mg/5 ml) & Tablet | Demam tinggi, nyeri sedang, bengkak terkilir/memar | **5–7,5 ml sirup** (100–150 mg) **ATAU** 1/2 tablet 200 mg | Maksimal 3 kali sehari. **Wajib sesudah makan** untuk mencegah iritasi lambung. |
| **Cetirizine / Antihistamin** | Tablet 10 mg & Sirup | Alergi dingin, bentol, biduran, bersin rhinitis | **1/2 tablet** (5 mg) **ATAU** 5 ml sirup | 1 kali sehari (sebaiknya malam hari karena efek kantuk). |
| **Promag / Polysilane** | Tablet Kunyah & Sirup | Mual, kembung, nyeri ulu hati, mual karena makanan | **1/2 tablet kunyah** **ATAU** 1 sendok takar (5 ml) | Dikunyah atau diminum 15–30 menit sebelum makan. |
| **Oralit** | Serbuk *sachet* | Diare, muntah-muntah, cegah dehidrasi | **1 sachet** dilarutkan dalam 200 ml air matang | Minum sedikit-sedikit tiap habis muntah atau BAB cair. |
| **Tolak Angin Anak** | *Sachet* cair | Masuk angin, perut kembung, meriang | **1 sachet anak** | Sesudah makan. Maksimal 2–3 *sachet* sehari. |
| **Trombopop Gel** | Salep *tube* | Memar, lebam, bengkak terkilir, kejang otot | Oleskan tipis-tipis 2–3 kali sehari | **Dilarang keras** dioleskan pada luka terbuka atau berdarah! |
| **Caladin Lotion / Plast** | Liquid & Bedak kocok | Gatal biang keringat, gigitan serangga, bentol alergi | Oleskan merata pada area kulit yang gatal | Hanya untuk kulit utuh. Hindari area mata dan luka terbuka. |
| **Rohto (Tetes Mata)** | Botol tetes | Mata merah, iritasi ringan akibat debu atau asap | **1–2 tetes** pada mata yang sakit | Bilas mata dengan air bersih dahulu sebelum diteteskan. |
| **Bioplacenton / Salep Burn** | Salep *tube* | Luka bakar ringan terkena panggangan BBQ atau api | Oleskan tebal pada area luka bakar | **Siram air mengalir 10–15 menit dahulu** sebelum diolesi salep. |

---

## 2. Langkah Solutif Pertolongan Pertama (Step-by-Step)

### A. Keseleo, Terkilir, atau Memar (Games & Playground)

* **Penanganan utama (Metode R.I.C.E):**
1. **Rest (Istirahat):** Hentikan aktivitas anak. Dudukkan atau baringkan di tempat yang teduh.
2. **Ice (Es):** Kompres area yang bengkak atau nyeri dengan *ice gel* terbungkus kain atau kasa selama 10–15 menit.
3. **Compress (Balut):** Balut longgar menggunakan perban elastis atau kasa rol untuk mengurangi pembengkakan.
4. **Elevate (Tinggikan):** Posisikan area cedera lebih tinggi dari dada anak saat berbaring.


* **Obat & salep:** Oleskan **Trombopop Gel** jika kulit tidak memiliki luka terbuka. Berikan **Ibuprofen 1/2 tablet** jika nyeri hebat.
* **Pantangan utama:** **Sangat dilarang memijat atau mengurut area yang terkilir!** Pijatan dapat memperparah pendarahan dalam dan kerusakan jaringan otot.

### B. Kedinginan Ringan s/d Hipotermia (Malam Hari & Subuh)

* **Gejala:** Menggigil hebat, bibir pucat atau kebiruan, bicara gagu, tangan dan kaki sangat dingin.
* **Langkah solutif:**
1. Bawa anak masuk ke dalam tenda tertutup yang terlindung dari angin.
2. Lepas pakaian yang basah oleh keringat, ganti segera dengan baju tebal yang kering.
3. Bungkus tubuh anak menggunakan **Emergency Blanket** (posisi lapisan perak mengilap menghadap ke **dalam** tubuh anak).
4. Berikan minuman manis hangat (teh manis hangat).
5. Balurkan **Minta Kayu Putih / Minyak Butbut** di dada, punggung, dan telapak kaki, lalu pakaikan kaos kaki tebal.



### C. Mimisan / Hidung Berdarah (Jahida 1A, Xherdan 1A)

* **Langkah solutif:**
1. Dudukkan anak dalam posisi **tegak**.
2. Minta anak **menduduk agak ke depan**. (**Penting:** Jangan biarkan anak mendongak! Mendongak membuat darah masuk ke tenggorokan dan memicu muntah).
3. Pencet cuping hidung lembut menggunakan ibu jari dan telunjuk selama 5–10 menit penuh tanpa dilepas.
4. Minta anak bernapas melalui mulut.
5. Tempelkan kompres dingin atau es di area pangkal hidung atau dahi.
6. Setelah darah berhenti, ingatkan anak untuk tidak mengorek hidungnya selama beberapa jam.



### D. Serangan Asma / Sesak Napas (Kiarana, Fayza, Maiza, Nabila, Syedtimur)

* **Langkah solutif:**
1. Tenangkan anak dan minta anak jangan panik (kepanikan memperparah sesak).
2. Dudukkan anak dalam posisi **tegak** lurus. Longgarkan kancing baju dan jaket tebal yang menjepit dada.
3. **Gunakan obat pribadi siswa:** Ambil *Inhaler* atau *Nebulizer* bawaan anak (contoh: Ventolin/Rymont). Semprotkan 1–2 *puff inhaler* atau jalankan *nebulizer* selama 10 menit.
4. Jika tidak membawa inhaler pribadi: Berikan semprotan **Oksigen Portable (Oxycan)** 2–3 kali hisapan saat anak menarik napas.
5. Pindahkan anak jauh dari debu, udara dingin ekstrem, atau asap BBQ.
6. **Rujuk segera:** Jika bibir membiru, anak tidak bisa bicara, atau dada tertarik dalam saat bernapas, segera bawa ke faskes atau puskesmas terdekat.



### E. Luka Bakar Ringan (Terkena Alat BBQ / Api)

* **Langkah solutif:**
1. Segera siram area yang terbakar dengan **air bersih mengalir (suhu ruang)** selama 10–15 menit.
2. **Pantangan:** Dilarang menggunakan es batu, kecap, mentega, atau pasta gigi! Hal ini memperparah kerusakan jaringan dan memicu infeksi.
3. Keringkan perlahan dengan menepuk-nepukkan kasa steril.
4. Oleskan salep luka bakar (**Bioplacenton / Aloe Vera Gel**) secara merata.
5. Tutup longgar dengan kasa steril jika area luka rawan tergesek baju.



### F. Alergi Makanan, Muntah, Diare, & Maag (Adnaan, Jennaira, Kayla, Syarafana)

* **Langkah solutif:**
1. Jika muntah karena makanan (misalnya coklat/laktosa): Istirahatkan lambung dari makanan padat selama 1–2 jam.
2. Berikan sedikit-sedikit larutan **Oralit** atau air hangat setiap 15 menit agar tidak dehidrasi.
3. Jika mual atau nyeri ulu hati: Berikan **1/2 tablet kunyah Promag** atau **1 sendok Polysilane Jr**.
4. Jika timbul gatal atau bentol akibat alergi makanan: Berikan **1/2 tablet Cetirizine** sesudah makan.



### G. Mata Kemasukan Debu / Iritasi (Mini Zoo & Panahan)

* **Langkah solutif:**
1. **Pantangan:** Dilarang mengucek mata! Mengucek mata berisiko menggores kornea.
2. Bilas mata menggunakan air bersih mengalir dari sudut dalam mata ke arah luar.
3. Teteskan **1–2 tetes Rohto** untuk meredakan iritasi dan kemerahan.



### H. Luka Lecet, Tergores, atau Terpotong (Games & Playground)

* **Langkah solutif:**
1. Bersihkan luka dari kotoran atau tanah dengan air bersih mengalir atau Alkohol 70% di sekitar area kulit luar luka.
2. Tepuk-tepuk hingga kering memakai kasa steril.
3. Bubuhi **Betadine** secukupnya pada luka.
4. Tutup menggunakan **Hansaplast** (untuk luka kecil) atau **Kasa Steril + Plester** (untuk luka lebih lebar).



---

## 3. Langkah Preventif per Aktivitas Rundown

### 1. Sesi Games & Playground (15.30–17.00 & 06.30–08.00)

* **Potensi bahaya:** Jatuh, terkilir, lecet, terbentur, pingsan kelelahan (*heat exhaustion*).
* **Tindakan preventif:**
* Wajibkan siswa memakai sepatu kets tertutup.
* Pantau khusus **Ghaida (2A)** yang tangan kirinya kaku agar tidak dipaksa ikut permainan fisik berat.
* Berikan jeda minum untuk **Rafasya (1B)** yang gampang berkeringat berlebih.
* Tim medis *standby* membawa P3K lapangan (Betadine, Kasa, Hansaplast, Trombopop).



### 2. Sesi BBQ Malam (19.00–20.00)

* **Potensi bahaya:** Luka bakar, terhirup asap pemicu asma, salah makan pemicu alergi.
* **Tindakan preventif:**
* Posisikan anak berjarak minimal 1,5 meter dari panggangan.
* Jauhkan anak-anak berriwayat asma (**Kiarana, Fayza, Maiza, Nabila, Syedtimur**) dari hembusan asap.
* Lakukan *screening* makanan: **Adnaan (1A)**, **Kayla (2B)**, dan **Syarafana (2B)** dilarang makan coklat atau makanan manis berlebih. **Jennaira (2A)** dilarang minum es atau susu sapi.
* *Standby* Bioplacenton & *ice gel*.



### 3. Sesi Tidur Malam & Subuh (21.00–05.00)

* **Potensi bahaya:** Hipotermia ringan, serangan asma dingin, mimisan pagi hari, gigitan nyamuk.
* **Tindakan preventif:**
* Pukul 20.30: Instruksikan oles lotion nyamuk dan minyak kayu putih/telon pada dada anak.
* Pastikan anak berisiko alergi dingin tidur memakai jaket tebal, kaos kaki, dan Emergency Blanket.
* Pukul 04.00 (Subuh): Suhu mencapai titik terdingin, lakukan ronda medis memantau **Jahida (1A)** dan **Xherdan (1A)** untuk antisipasi mimisan pagi.



### 4. Sesi Panahan (06.30–08.00)

* **Potensi bahaya:** Sabetan tali busur (*string slap*) pada lengan, tertusuk anak panah, goresan.
* **Tindakan preventif:**
* Garis batas berdiri (*shooting line*) harus steril.
* Anak dilarang berjalan mengambil anak panah sebelum ada komando instruktur.
* Pastikan busur atau anak panah tidak diarahkan ke orang lain.



### 5. Sesi Mini Zoo & Jembatan (06.30–08.00)

* **Potensi bahaya:** Cakaran/gigitan hewan, alergi bulu/debu, terpeleset di jembatan.
* **Tindakan preventif:**
* **Nabila Azkiya (2B)** wajib memakai masker karena alergi debu/hewan.
* Instruksikan anak tidak memasukkan jari ke dalam kandang.
* Wajib cuci tangan pakai sabun setelah dari Mini Zoo sebelum sarapan.