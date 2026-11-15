export interface Project {
    id: string;
    title: string;
    desc: { id: string; en: string };
    tech: string[];
    demoUrl: string;
    repoUrl: string;
    badge: { id: string; en: string };
    previewType: 'radar' | 'convert' | 'market';
    previewVideo?: string;
}

export interface TimelineItem {
    date: { id: string; en: string };
    category: 'pendidikan' | 'pekerjaan' | 'organisasi' | 'kepanitiaan' | 'penghargaan';
    title: { id: string; en: string };
    org: { id: string; en: string };
    desc?: { id: string; en: string };
}

export interface PortfolioData {
    name: string;
    role: { id: string; en: string };
    bio: { id1: string; id2: string; en1: string; en2: string };
    funFacts: string[];
    stats: { value: string; label: { id: string; en: string }; sub: { id: string; en: string } }[];
    skills: {
        tech: string[];
        interest: { id: string; en: string }[];
    };
    skillLevels: { name: string; level: number; field: 'web' | 'ml' | 'embedded' | 'sec' }[];
    projects: Project[];
    timeline: TimelineItem[];
    webinars: { id: string; en: string }[];
    contact: {
        email: string;
        whatsapp: string;
        github: string;
        linkedin: string;
        instagram: string;
    };
    cvPdf: string;
}

export const portfolioData: PortfolioData = {
    name: "Ibnu Farrel Athaillah Firdaus",
    role: {
        id: "Mahasiswa Informatika · Universitas Diponegoro",
        en: "Informatics Student · Diponegoro University"
    },
    bio: {
        id1: "Mahasiswa Program Studi Informatika, Universitas Diponegoro, dengan minat besar pada <strong>cyber security</strong> dan <strong>machine learning</strong>. Memiliki dasar keterampilan pemrograman web serta aktif dalam riset robotik bersama tim kapal ASV kampus.",
        id2: "Terbiasa belajar mandiri lewat proyek-proyek kecil untuk memperluas wawasan teknologi, sekaligus aktif berorganisasi dan berkompetisi — mulai dari lapangan taekwondo hingga kompetisi sains informatika.",
        en1: "An Informatics student at Universitas Diponegoro with a strong interest in <strong>cyber security</strong> and <strong>machine learning</strong>. I have foundational web development skills and stay active in robotics research with the campus ASV boat team.",
        en2: "I regularly teach myself through small independent projects to broaden my technical knowledge, while staying active in organizations and competitions — from the taekwondo mat to informatics science competitions."
    },
    funFacts: [
        "Latihan taekwondo sejak SMP — sempat jadi pelatih kyorugi.",
        "Ikut riset robot kapal ASV Aterkia di Undip Robotics Development Center.",
        "Suka ngoprek web kecil-kecilan sambil ngopi.",
        "Bikin Convertly karena males buka aplikasi konversi yang penuh iklan.",
        "Kalau lagi bingung, buka terminal dulu. Katanya sih helps."
    ],
    stats: [
        { value: "3.88", label: { id: "IP Kumulatif", en: "Cumulative GPA" }, sub: { id: "dari skala 4.00", en: "out of 4.00 scale" } },
        { value: "5", label: { id: "Pengalaman Aktif", en: "Active Experience" }, sub: { id: "kerja & organisasi", en: "work & organizations" } },
        { value: "2", label: { id: "Penghargaan", en: "Awards" }, sub: { id: "bidang informatika", en: "in informatics" } },
        { value: "3", label: { id: "Proyek Web", en: "Web Projects" }, sub: { id: "dipublikasikan", en: "published" } }
    ],
    skills: {
        tech: ["HTML", "CSS", "JavaScript", "Python", "C/C++", "React", "Node.js"],
        interest: [
            { id: "Cyber Security", en: "Cyber Security" },
            { id: "Machine Learning", en: "Machine Learning" },
            { id: "Software Development", en: "Software Development" },
            { id: "Robotika", en: "Robotics" }
        ]
    },
    skillLevels: [
        { name: "HTML & CSS", level: 90, field: 'web' },
        { name: "JavaScript", level: 85, field: 'web' },
        { name: "Python", level: 80, field: 'ml' },
        { name: "C / C++", level: 72, field: 'embedded' },
        { name: "Cyber Security", level: 70, field: 'sec' },
        { name: "Robotika / Embedded", level: 75, field: 'embedded' },
    ],
    projects: [
        {
            id: "web-asv",
            title: "Aterkia ASV Web",
            desc: {
                id: "Platform computer vision robot kapal tim Aterkia ASV Undip untuk memantau status kapal secara real-time.",
                en: "A computer vision platform for the Aterkia ASV team boat robot, used to monitor vessel status in real time."
            },
            tech: ["HTML", "CSS", "JavaScript", "Python"],
            demoUrl: "https://farrewl.github.io/Web_ASV/",
            repoUrl: "https://github.com/Farrewl/Web_ASV",
            badge: { id: "Tim — Divisi Elektrik", en: "Team — Electrical Division" },
            previewType: "radar"
        },
        {
            id: "convertly",
            title: "Convertly",
            desc: {
                id: "Platform untuk mengonversi dokumen ke berbagai format dengan cepat lewat antarmuka yang sederhana.",
                en: "A platform for quickly converting documents between formats through a simple interface."
            },
            tech: ["HTML", "CSS", "JavaScript"],
            demoUrl: "https://farrewl.github.io/Convertly/",
            repoUrl: "https://github.com/Farrewl/Convertly",
            badge: { id: "Proyek Individu", en: "Individual Project" },
            previewType: "convert",
            previewVideo: "/assets/convertly-preview.webm"
        },
        {
            id: "seapedia",
            title: "Seapedia",
            desc: {
                id: "Platform marketplace multi-peran — menghubungkan Buyer, Seller, dan Driver dalam satu ekosistem. Dikerjakan secara individu sebagai syarat seleksi COMPFEST 18 Software Engineering Academy.",
                en: "A multi-role marketplace platform — connecting Buyer, Seller, and Driver within one ecosystem. Built individually as an admission requirement for COMPFEST 18 Software Engineering Academy."
            },
            tech: ["React", "CSS", "JavaScript", "HTML", "Node.js"],
            demoUrl: "https://compfest-soft-eng.vercel.app/",
            repoUrl: "https://github.com/Farrewl/Compfest-SoftEng",
            badge: { id: "Individu — Seleksi Academy", en: "Individual — Academy Selection" },
            previewType: "market",
            previewVideo: "/assets/seapedia-preview.webm"
        }
    ],
    timeline: [
        {
            date: { id: "Jun 2022 – Jun 2025", en: "Jun 2022 – Jun 2025" },
            category: "pendidikan",
            title: { id: "SMAS Al-Mubarak", en: "SMAS Al-Mubarak" },
            org: { id: "Tangerang Selatan · Jurusan IPA", en: "South Tangerang · Science Major" }
        },
        {
            date: { id: "2024", en: "2024" },
            category: "penghargaan",
            title: { id: "Medali Perunggu Informatika", en: "Bronze Medal in Informatics" },
            org: { id: "Kejuaraan Sains Nasional", en: "National Science Championship" }
        },
        {
            date: { id: "Jul 2024 – Sekarang", en: "Jul 2024 – Present" },
            category: "pekerjaan",
            title: { id: "Pelatih Atlet Kyorugi", en: "Kyorugi Athlete Coach" },
            org: { id: "Java Eagle Taekwondo Academy · Tangerang Selatan", en: "Java Eagle Taekwondo Academy · South Tangerang" },
            desc: {
                id: "Menyusun program latihan terstruktur dan membimbing atlet meningkatkan teknik, strategi, serta mental bertanding.",
                en: "Designed structured training programs and coached athletes to improve technique, strategy, and competitive mindset."
            }
        },
        {
            date: { id: "Okt 2024", en: "Oct 2024" },
            category: "kepanitiaan",
            title: { id: "Anggota Seksi Peralatan", en: "Equipment Section Member" },
            org: { id: "Albin Leadership Training — OSISMPK Albin", en: "Albin Leadership Training — OSISMPK Albin" },
            desc: {
                id: "Mengoordinasikan kesiapan logistik dan kelayakan peralatan sebelum serta selama acara berlangsung.",
                en: "Coordinated logistics readiness and equipment condition before and during the event."
            }
        },
        {
            date: { id: "2025", en: "2025" },
            category: "penghargaan",
            title: { id: "Medali Perak Informatika", en: "Silver Medal in Informatics" },
            org: { id: "Prestasi Maju Indonesia", en: "Prestasi Maju Indonesia" }
        },
        {
            date: { id: "Feb 2025 – Sekarang", en: "Feb 2025 – Present" },
            category: "organisasi",
            title: { id: "Anggota Elektrik — Program ASV Aterkia", en: "Electrical Member — Aterkia ASV Program" },
            org: { id: "Undip Robotics Development Center · Semarang", en: "Undip Robotics Development Center · Semarang" },
            desc: {
                id: "Mengintegrasikan hardware dan program robot kapal, serta riset lintas divisi untuk optimalisasi performa ASV.",
                en: "Integrated hardware and software for the boat robot, and conducted cross-division research to optimize ASV performance."
            }
        },
        {
            date: { id: "Feb 2025 – Sekarang", en: "Feb 2025 – Present" },
            category: "organisasi",
            title: { id: "Anggota Divisi Ekokeu", en: "Finance & Economy Division Member" },
            org: { id: "UKM Taekwondo Undip · Semarang", en: "UKM Taekwondo Undip · Semarang" },
            desc: {
                id: "Mengatur arus dana UKM dan menghubungi sponsor untuk kebutuhan latihan maupun kompetisi.",
                en: "Managed the club's cash flow and liaised with sponsors for training and competition needs."
            }
        },
        {
            date: { id: "Agu 2025 – Agu 2029*", en: "Aug 2025 – Aug 2029*" },
            category: "pendidikan",
            title: { id: "Universitas Diponegoro", en: "Universitas Diponegoro" },
            org: { id: "Sarjana Informatika · IPK 3.88/4.00", en: "Bachelor of Informatics · GPA 3.88/4.00" },
            desc: { id: "*Estimasi kelulusan.", en: "*Expected graduation." }
        },
        {
            date: { id: "Des 2025 – Mar 2026", en: "Dec 2025 – Mar 2026" },
            category: "kepanitiaan",
            title: { id: "Anggota Divisi Keamanan", en: "Security Division Member" },
            org: { id: "Keluarga Mahasiswa Banten — Roadshow KMB · Tangerang Selatan", en: "Keluarga Mahasiswa Banten — KMB Roadshow · South Tangerang" },
            desc: {
                id: "Mengoordinasikan panitia lapangan agar sesuai rundown serta mencatat kehadiran dan evaluasi kegiatan.",
                en: "Coordinated on-site committee members to keep to the run-of-show, and logged attendance and event evaluations."
            }
        }
    ],
    webinars: [
        { id: "Kegiatan LKMM-PD Informatika Undip · 2025", en: "LKMM-PD Informatics Undip Program · 2025" },
        { id: "GORe FSM Undip · 2025", en: "GORe FSM Undip · 2025" }
    ],
    contact: {
        email: "ibnufirdaus2030@gmail.com",
        whatsapp: "6281384619711",
        github: "https://github.com/Farrewl",
        linkedin: "https://www.linkedin.com/in/ibnufarrel",
        instagram: "https://www.instagram.com/ibnufaths"
    },
    cvPdf: "/assets/CV-Ibnu-Farrel-Athaillah-Firdaus.pdf"
};
