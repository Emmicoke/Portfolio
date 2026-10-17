// Turkish versions of the portfolio content. The English originals stay in
// src/data and are used as-is; anything missing here falls back to English.

export const contentTr = {
    header: {
        title: 'Yazılım Mühendisi',
        desciption:
            'Hayat dolambaçlı bir yol olabilir ama bunu dert etme, tadını çıkar. Önemli olan varış noktası değil yolculuğun kendisi; karşına çıkan her şeyi keşfet, ondan öğren ve büyü, çünkü bu yolculuk yalnızca bir kez yaşanır.',
    },
    about: {
        title: 'Ben kimim?',
        description1:
            'Merhaba! Ben Fahrettin Emin Korkut. Eskişehir Teknik Üniversitesi Bilgisayar Mühendisliği Bölümü’nde yüksek lisans öğrencisiyim.',
        description2:
            'Hasan Kalyoncu Üniversitesi’nden mezun olmuş; web geliştirme, mobil uygulamalar ve görüntü işlemeye özellikle ilgi duyan tutkulu bir yazılım mühendisiyim.\n' +
            'Şu anda aynı alanda yüksek lisans yapıyorum. Yıllar içinde C++, C, Python, SQL, React, React Native, HTML, CSS ve JavaScript ile akademik ödevlerden gerçek dünya uygulamalarına uzanan projelerde deneyim kazandım.\n' +
            'Erasmus+ gibi uluslararası programlara katıldım; İspanya’da staj yaptım, Çek Cumhuriyeti’nde eğitim aldım. Rezervasyon sistemleri, yorum yönetim platformları ve eğitim amaçlı sınav uygulamaları gibi çeşitli projelerde çalıştım.\n' +
            'Problem çözmeyi, yeni teknolojiler öğrenmeyi ve fikirleri işlevsel, kullanıcı dostu çözümlere dönüştürmeyi seviyorum.',
    },
    education: {
        1: { institution: 'Hasan Kalyoncu Üniversitesi', degree: 'Lisans', course: 'Yazılım Mühendisliği' },
        2: {
            institution: 'Ostrava Üniversitesi',
            degree: 'Erasmus+ Öğrenim Değişim Programı',
            course: 'Bilişim ve İletişim Bölümü',
        },
        3: {
            institution: 'Eskişehir Teknik Üniversitesi',
            degree: 'Yüksek Lisans',
            course: 'Bilgisayar Mühendisliği Bölümü',
        },
    },
    experience: {
        1: {
            jobtitle: 'Web Geliştirici ve Web Tasarımcı',
            note:
                'Bu staj, Erasmus+ Staj Hareketliliği Programı kapsamında İspanya merkezli bir turizm ve seyahat acentesi olan South Tours’ta gerçekleşti. Staj; şirketin kullandığı web tabanlı tur yönetim sisteminin bakımına, geliştirilmesine ve iyileştirilmesine katkı sağlamaya odaklanan web geliştirme ve yazılım mühendisliği görevlerini kapsıyordu.',
        },
    },
    projects: {
        1: {
            projectName: 'Otonom Araç için Şerit Tespiti',
            projectDesc: 'Bu proje, otonom bir aracın beyaz şeritleri tespit edip takip etmesini amaçlıyor.',
        },
        2: {
            projectName: 'Vet App',
            projectDesc:
                'Vet App, evcil hayvan sahiplerinin veteriner randevuları oluşturmasını, yönetmesini ve takip etmesini sağlayan bir mobil uygulama. Kullanıcılar sade bir arayüzle randevu planlayabilir, yaklaşan ve geçmiş randevularını görebilir, hesaplarını yönetebilir ve evcil hayvanlarının sağlığıyla ilgili önemli durumlar için bildirim alabilir.',
        },
        3: {
            projectName: 'CFK Academy',
            projectDesc:
                'TYT, AYT ve LGS sınavları için hazırlanmış, React tabanlı bir sınav uygulaması. Kullanıcılar soru çözebilir, süreyi takip edebilir ve sonuç ekranında ayrıntılı bir analiz görebilir.',
        },
        4: {
            projectName: 'Taşınabilir Hava İstasyonu',
            projectDesc:
                'Arduino tabanlı taşınabilir bir hava istasyonu. Çeşitli sensörlerle gaz seviyesini, hava kalitesini, sıcaklığı, nemi ve yangını izliyor.',
        },
    },
    achievementBio: 'Yetenek ve kararlılık buluştuğunda başarı gelir. - Bill Gates',
    achievements: {
        1: { details: 'Akbank’ın yapay zeka eğitimi' },
        2: { details: 'Akbank’ın metaverse eğitimi' },
        3: { details: 'Akbank’ın API ve açık bankacılık eğitimi' },
        4: { details: 'Akbank’ın çevik yönetim eğitimi' },
        5: { details: 'Akbank’ın mobil geliştirme eğitimi' },
        6: { title: 'FinTech Eğitim Programı', details: 'Finans ile teknolojiyi bir araya getiren eğitim programı' },
        7: { title: 'Teknofest Finalist Sertifikası', details: 'Teknofest Otonom Araç Yarışması finalist sertifikası' },
    },
    fields: {
        'Artificial Intelligence': 'Yapay Zeka',
        Management: 'Yönetim',
        Development: 'Geliştirme',
        Competition: 'Yarışma',
    },
    present: 'Devam ediyor',
};

// English text that used to be hard-coded in ExperienceCard
export const experienceNotesEn = {
    1:
        'This internship was part of the Erasmus+ Internship Mobility Program and took place at South Tours, a tourism and travel agency based in Spain. The internship focused on web development and software engineering tasks, specifically contributing to the maintenance, development, and enhancement of a web-based tour management system used by the company.',
};

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// "February" -> "Feb" / "Şub"
export function shortMonth(name, lang) {
    const i = MONTHS.indexOf(String(name).toLowerCase());
    if (i < 0) return name;
    return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', { month: 'short' }).format(new Date(2000, i, 1));
}

// "Oct 27, 2022" -> "27 Eki 2022" in Turkish; English keeps the original text
export function localDate(text, lang) {
    if (lang !== 'tr') return text;
    const d = new Date(text);
    if (isNaN(d)) return text;
    return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
