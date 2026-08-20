export const tr = {
  common: {
    appName: "Health Platform",
    personalHealthRecord: "Kişisel Sağlık Kaydı",
    healthRecords: "Sağlık Kayıtları",
    personalAccount: "Kişisel hesap",
    logout: "Çıkış Yap",
    loading: "Yükleniyor...",
    noRecords: "Henüz kayıt yok.",
    retry: "Tekrar Dene",
  },

  navigation: {
    dashboard: "Genel Bakış",
    timeline: "Sağlık Geçmişi",
    search: "Ara",
    diseases: "Hastalıklar",
    doctors: "Doktorlar",
    visits: "Ziyaretler",
    tests: "Tahliller",
    imaging: "Görüntüleme",
    documents: "Belgeler",
    medications: "İlaçlar",
  },

  navigationSections: {
    main: "Genel",
    healthRecords: "Sağlık Kayıtları",
  },

  auth: {
    signedInAs: "Oturum açan kullanıcı",
    signIn: "Giriş Yap",
    signingIn: "Giriş yapılıyor...",
    register: "Kayıt Ol",
    registering: "Hesap oluşturuluyor...",
    email: "E-posta",
    password: "Şifre",
    confirmPassword: "Şifre Tekrar",
    firstName: "Ad",
    lastName: "Soyad",
    passwordMismatch: "Şifreler eşleşmiyor.",
  },

  dashboard: {
    eyebrow: "Kişisel Sağlık Özeti",
    title: "Genel Bakış",
    description: "Kişisel sağlık kayıtlarınızın güncel özetini görüntüleyin.",

    activeDiseases: "Aktif Hastalıklar",
    activeMedications: "Aktif İlaçlar",
    visits: "Ziyaretler",
    medicalTests: "Tahliller",
    imaging: "Görüntüleme",
    documents: "Belgeler",

    recentVisits: "Son Ziyaretler",
    recentMedicalTests: "Son Tahliller",
    recentImaging: "Son Görüntülemeler",
    recentHealthActivity: "Son Sağlık Hareketleri",
    relatedDisease: "İlişkili hastalık",
    recentHealthActivityDescription:
      "Sağlık kayıtlarınızdaki en son hareketler",

    noHealthActivity: "Henüz sağlık hareketi bulunmuyor.",

    unableToLoad: "Sağlık özeti yüklenemedi.",
  },

  timeline: {
    title: "Sağlık Geçmişi",
    description: "Sağlık kayıtlarınızı kronolojik sırayla görüntüleyin.",
  },

  search: {
    title: "Ara",
    description: "Kişisel sağlık kayıtlarınız arasında arama yapın.",
  },

  diseases: {
    title: "Hastalıklar",
    description: "Takip ettiğiniz hastalıkları yönetin.",
  },

  doctors: {
    title: "Doktorlar",
    description: "Sağlık geçmişinizle ilişkili doktorları yönetin.",
  },

  visits: {
    title: "Ziyaretler",
    description: "Doktor ve hastane ziyaretlerinizi görüntüleyin.",
  },

  tests: {
    title: "Tahliller",
    description: "Tahlil ve laboratuvar sonuçlarınızı yönetin.",
  },

  imaging: {
    title: "Görüntüleme",
    description: "MR, BT, röntgen ve diğer görüntüleme kayıtlarınızı yönetin.",
  },

  documents: {
    title: "Belgeler",
    description: "Özel sağlık belgelerinizi yönetin.",
  },

  medications: {
    title: "İlaçlar",
    description: "Aktif ve geçmiş ilaç kayıtlarınızı takip edin.",
  },

  placeholder: {
    moduleComingSoon:
      "Bu modül bir sonraki frontend aşamasında geliştirilecek.",
  },
} as const;
