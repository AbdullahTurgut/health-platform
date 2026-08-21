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
    eyebrow: "Sağlık Kayıtları",
    title: "Hastalıklar",
    description: "Takip ettiğiniz hastalıkları görüntüleyin ve yönetin.",

    add: "Hastalık Ekle",
    createTitle: "Yeni Hastalık Kaydı",
    createDescription: "Takip etmek istediğiniz hastalık bilgilerini girin.",

    name: "Hastalık Adı",
    namePlaceholder: "Örn. Migren",

    diagnosisDate: "Tanı Tarihi",

    status: "Durum",
    statusPlaceholder: "Durum seçin",

    descriptionLabel: "Açıklama",
    descriptionPlaceholder: "Hastalıkla ilgili ek bilgileri yazabilirsiniz.",

    cancel: "Vazgeç",
    save: "Kaydet",
    saving: "Kaydediliyor...",

    createSuccess: "Hastalık kaydı başarıyla oluşturuldu.",

    emptyTitle: "Henüz hastalık kaydı yok",

    emptyDescription:
      "Takip etmek istediğiniz hastalıkları buradan ekleyebilirsiniz.",

    filteredEmptyTitle: "Bu durumda hastalık kaydı bulunmuyor",

    filteredEmptyDescription:
      "Seçtiğiniz duruma ait kayıt bulunamadı. Farklı bir filtre deneyebilirsiniz.",

    unknownDiagnosisDate: "Tanı tarihi belirtilmemiş",

    loadError: "Hastalık kayıtları yüklenemedi",

    filterAll: "Tümü",
    filterLabel: "Duruma göre filtrele",

    edit: "Düzenle",
    editTitle: "Hastalık Kaydını Düzenle",
    editDescription: "Hastalık bilgilerini ve durumunu güncelleyin.",
    updateSuccess: "Hastalık kaydı başarıyla güncellendi.",
    saveChanges: "Değişiklikleri Kaydet",
    delete: "Sil",

    deleteTitle: "Hastalık Kaydını Sil",

    deleteDescription:
      "Bu hastalık kaydını silmek istediğinizden emin misiniz?",

    deleteWarning: "Bu işlem geri alınamaz.",

    deleting: "Siliniyor...",

    deleteConfirm: "Kaydı Sil",

    deleteSuccess: "Hastalık kaydı başarıyla silindi.",

    deleteError: "Hastalık kaydı silinemedi.",
  },

  diseaseStatus: {
    ACTIVE: "Aktif",
    RESOLVED: "Çözümlenmiş",
    CHRONIC: "Kronik",
  },

  doctors: {
    eyebrow: "Sağlık Kayıtları",
    title: "Doktorlar",
    description:
      "Sağlık geçmişinizle ilişkili doktorları görüntüleyin ve yönetin.",

    add: "Doktor Ekle",

    createTitle: "Yeni Doktor Kaydı",
    createDescription:
      "Sağlık geçmişinizde yer alan doktorun bilgilerini girin.",

    firstName: "Ad",
    firstNamePlaceholder: "Örn. Ayşe",

    lastName: "Soyad",
    lastNamePlaceholder: "Örn. Demir",

    specialization: "Uzmanlık Alanı",
    specializationPlaceholder: "Örn. Endokrinoloji",
    specializationUnknown: "Uzmanlık alanı belirtilmemiş",

    phone: "Telefon",
    phonePlaceholder: "Örn. +90 555 111 22 33",

    email: "E-posta",
    emailPlaceholder: "Örn. doktor@example.com",

    notes: "Notlar",
    notesPlaceholder: "Doktorla ilgili ek bilgileri yazabilirsiniz.",

    cancel: "Vazgeç",
    save: "Kaydet",
    saving: "Kaydediliyor...",

    emptyTitle: "Henüz doktor kaydı yok",
    emptyDescription:
      "Sağlık geçmişinizde yer alan doktorları buradan ekleyebilirsiniz.",

    filteredEmptyTitle: "Bu uzmanlık alanında doktor bulunmuyor",

    filteredEmptyDescription:
      "Aradığınız uzmanlık alanına ait doktor kaydı bulunamadı.",

    loadError: "Doktor kayıtları yüklenemedi",

    specializationFilter: "Uzmanlık alanına göre filtrele",

    applyFilter: "Filtrele",
    clearFilter: "Temizle",
    edit: "Düzenle",

    editTitle: "Doktor Kaydını Düzenle",

    editDescription: "Doktor bilgilerini güncelleyin.",

    saveChanges: "Değişiklikleri Kaydet",

    updating: "Güncelleniyor...",

    updateSuccess: "Doktor kaydı başarıyla güncellendi.",
    delete: "Sil",

    deleteTitle: "Doktor Kaydını Sil",

    deleteDescription: "Bu doktor kaydını silmek istediğinizden emin misiniz?",

    deleteWarning: "Bu işlem geri alınamaz.",

    deleteConfirm: "Kaydı Sil",

    deleting: "Siliniyor...",

    deleteError: "Doktor kaydı silinemedi.",
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
