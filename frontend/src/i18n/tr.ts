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
    dashboard: "Dashboard",
    timeline: "Zaman Akışı",
    search: "Arama",
    diseases: "Hastalıklar",
    doctors: "Doktorlar",
    hospitals: "Hastaneler",
    visits: "Ziyaretler",
    tests: "Testler",
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

  hospitals: {
    eyebrow: "Sağlık Kayıtları",

    title: "Hastaneler",

    description:
      "Sağlık geçmişinizle ilişkili hastane ve sağlık kuruluşlarını görüntüleyin ve yönetin.",

    add: "Hastane Ekle",

    emptyTitle: "Henüz hastane kaydı yok",

    emptyDescription:
      "Tedavi veya kontrollerinizde yer alan sağlık kuruluşlarını buradan ekleyebilirsiniz.",

    filteredEmptyTitle: "Bu şehirde hastane bulunmuyor",

    filteredEmptyDescription:
      "Aradığınız şehirle ilişkili hastane kaydı bulunamadı.",

    loadError: "Hastane kayıtları yüklenemedi",

    city: "Şehir",

    cityUnknown: "Şehir belirtilmemiş",

    cityFilter: "Şehre göre filtrele",

    cityPlaceholder: "Örn. İstanbul",

    applyFilter: "Filtrele",

    clearFilter: "Temizle",

    address: "Adres",

    phone: "Telefon",

    notes: "Notlar",

    createTitle: "Yeni Hastane Kaydı",

    createDescription:
      "Sağlık geçmişinizde yer alan hastane veya sağlık kuruluşunun bilgilerini girin.",

    name: "Hastane Adı",

    namePlaceholder: "Örn. Acıbadem Hastanesi",

    addressPlaceholder: "Hastanenin açık adresini girin.",

    phonePlaceholder: "Örn. +90 216 000 00 00",

    notesPlaceholder: "Hastaneyle ilgili ek bilgileri yazabilirsiniz.",

    cancel: "Vazgeç",

    save: "Kaydet",

    saving: "Kaydediliyor...",

    edit: "Düzenle",

    editTitle: "Hastane Kaydını Düzenle",

    editDescription: "Hastane veya sağlık kuruluşu bilgilerini güncelleyin.",

    saveChanges: "Değişiklikleri Kaydet",

    updating: "Güncelleniyor...",

    updateSuccess: "Hastane kaydı başarıyla güncellendi.",

    delete: "Sil",

    deleteTitle: "Hastane Kaydını Sil",

    deleteDescription: "Bu hastane kaydını silmek istediğinizden emin misiniz?",

    deleteWarning: "Bu işlem geri alınamaz.",

    deleteConfirm: "Kaydı Sil",

    deleting: "Siliniyor...",

    deleteError: "Hastane kaydı silinemedi.",
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
    eyebrow: "Sağlık Kayıtları",

    title: "Ziyaretler",

    description:
      "Doktor muayenelerinizi, hastane ziyaretlerinizi ve sağlık kontrollerinizi görüntüleyin ve yönetin.",

    add: "Ziyaret Ekle",

    emptyTitle: "Henüz ziyaret kaydı yok",

    emptyDescription:
      "Doktor muayenelerinizi ve hastane ziyaretlerinizi buradan kaydedebilirsiniz.",

    loadError: "Ziyaret kayıtları yüklenemedi",

    visitDate: "Ziyaret Tarihi",

    disease: "Hastalık",

    doctor: "Doktor",

    hospital: "Hastane",

    department: "Bölüm",

    reason: "Ziyaret Nedeni",

    diagnosisNote: "Tanı Notu",

    notes: "Notlar",

    diseaseUnknown: "Hastalık belirtilmemiş",

    doctorUnknown: "Doktor belirtilmemiş",

    hospitalUnknown: "Hastane belirtilmemiş",

    departmentUnknown: "Bölüm belirtilmemiş",
    createTitle: "Yeni Ziyaret Kaydı",

    createDescription:
      "Doktor muayenesi, hastane ziyareti veya sağlık kontrolü bilgilerini kaydedin.",

    visitDateLabel: "Ziyaret Tarihi ve Saati",

    visitDatePlaceholder: "Ziyaret tarihini seçin",

    selectDisease: "Hastalık Seçin",

    selectDoctor: "Doktor Seçin",

    selectHospital: "Hastane Seçin",

    noDisease: "Hastalık seçilmedi",

    noDoctor: "Doktor seçilmedi",

    noHospital: "Hastane seçilmedi",

    departmentPlaceholder: "Örn. Endokrinoloji",

    reasonPlaceholder: "Ziyaret veya muayene nedenini yazın.",

    diagnosisNotePlaceholder:
      "Doktorun belirttiği tanı veya değerlendirme notunu yazın.",

    notesPlaceholder: "Ziyaretle ilgili ek notları yazabilirsiniz.",

    cancel: "Vazgeç",

    save: "Kaydet",

    saving: "Kaydediliyor...",

    relationsLoadError: "Ziyaret formu için gerekli kayıtlar yüklenemedi.",

    preparing: "Hazırlanıyor...",

    edit: "Düzenle",

    editTitle: "Ziyaret Kaydını Düzenle",

    editDescription:
      "Ziyaret bilgilerini ve ilişkili sağlık kayıtlarını güncelleyin.",

    saveChanges: "Değişiklikleri Kaydet",

    updating: "Güncelleniyor...",

    updateSuccess: "Ziyaret kaydı başarıyla güncellendi.",
    delete: "Sil",

    deleteTitle: "Ziyaret Kaydını Sil",

    deleteDescription: "Bu ziyaret kaydını silmek istediğinizden emin misiniz?",

    deleteWarning: "Bu işlem geri alınamaz.",

    deleteConfirm: "Kaydı Sil",

    deleting: "Siliniyor...",

    deleteError: "Ziyaret kaydı silinemedi.",

    filtersTitle: "Ziyaretleri Filtrele",

    allDiseases: "Tüm Hastalıklar",

    allDoctors: "Tüm Doktorlar",

    allHospitals: "Tüm Hastaneler",

    applyFilters: "Filtrele",

    clearFilters: "Temizle",

    filteredEmptyTitle: "Filtrelere uygun ziyaret bulunamadı",

    filteredEmptyDescription:
      "Seçtiğiniz hastalık, doktor veya hastane kriterleriyle eşleşen ziyaret kaydı bulunmuyor.",
  },

  tests: {
    eyebrow: "Sağlık Kayıtları",

    title: "Tıbbi Testler",

    description:
      "Laboratuvar testlerinizi, test sonuçlarınızı ve sağlık ölçümlerinizi görüntüleyin ve yönetin.",

    add: "Test Ekle",

    emptyTitle: "Henüz test kaydı yok",

    emptyDescription:
      "Laboratuvar ve sağlık testlerinizi buradan kaydedebilirsiniz.",

    loadError: "Test kayıtları yüklenemedi",

    testDate: "Test Tarihi",

    disease: "Hastalık",

    visit: "Ziyaret",

    category: "Kategori",

    laboratory: "Laboratuvar",

    notes: "Notlar",

    diseaseUnknown: "Hastalık belirtilmemiş",

    visitUnknown: "Ziyaret belirtilmemiş",

    laboratoryUnknown: "Laboratuvar belirtilmemiş",
    filtersTitle: "Testleri Filtrele",

    allDiseases: "Tüm Hastalıklar",

    allVisits: "Tüm Ziyaretler",

    allCategories: "Tüm Kategoriler",

    applyFilters: "Filtrele",

    clearFilters: "Temizle",

    filteredEmptyTitle: "Filtrelere uygun test bulunamadı",

    filteredEmptyDescription:
      "Seçtiğiniz hastalık, ziyaret veya kategori kriterleriyle eşleşen test kaydı bulunmuyor.",
    createTitle: "Yeni Tıbbi Test",

    createDescription:
      "Laboratuvar veya sağlık testinizin bilgilerini kaydedin.",

    name: "Test Adı",

    namePlaceholder: "Örn. TSH, Hemogram, Ferritin",

    selectDisease: "Hastalık Seçin",

    selectVisit: "Ziyaret Seçin",

    noDisease: "Hastalık seçilmedi",

    noVisit: "Ziyaret seçilmedi",

    selectCategory: "Kategori Seçin",

    testDateLabel: "Test Tarihi ve Saati",

    laboratoryPlaceholder: "Örn. Acıbadem Laboratuvarı",

    notesPlaceholder: "Testle ilgili ek notları yazabilirsiniz.",

    cancel: "Vazgeç",

    save: "Kaydet",

    saving: "Kaydediliyor...",

    preparing: "Hazırlanıyor...",

    edit: "Düzenle",

    editTitle: "Tıbbi Test Kaydını Düzenle",

    editDescription:
      "Test bilgilerini, ilişkili kayıtları ve test tarihini güncelleyin.",

    saveChanges: "Değişiklikleri Kaydet",

    updating: "Güncelleniyor...",

    updateSuccess: "Test kaydı başarıyla güncellendi.",

    delete: "Sil",

    deleteTitle: "Tıbbi Test Kaydını Sil",

    deleteDescription:
      "Bu test kaydını silmek üzeresiniz. Bu işlem geri alınamaz.",

    deleteWarning: "Bu teste bağlı test sonuçları varsa onlar da silinebilir.",

    deleteConfirm: "Kaydı Sil",

    deleting: "Siliniyor...",

    deleteSuccess: "Test kaydı başarıyla silindi.",
  },

  testResults: {
    title: "Test Sonuçları",

    description:
      "Bu teste ait ölçüm ve laboratuvar sonuçlarını görüntüleyin ve yönetin.",

    showResults: "Sonuçları Gör",

    add: "Sonuç Ekle",

    createTitle: "Yeni Test Sonucu",

    createDescription:
      "Seçili tıbbi teste ait ölçüm veya laboratuvar sonucunu kaydedin.",

    parameterName: "Parametre",

    parameterPlaceholder: "Örn. TSH, Ferritin, Glukoz",

    value: "Değer",

    valuePlaceholder: "Örn. 4.2, Negatif, Pozitif",

    numericValue: "Sayısal Değer",

    numericValuePlaceholder: "Örn. 4.2",

    unit: "Birim",

    unitPlaceholder: "Örn. mIU/L, mg/dL",

    referenceRange: "Referans Aralığı",

    referenceRangePlaceholder: "Örn. 0.4 - 4.0",

    flag: "Durum",

    noFlag: "Durum belirtilmedi",

    notes: "Notlar",

    notesPlaceholder: "Sonuçla ilgili ek notlar.",

    emptyTitle: "Henüz test sonucu yok",

    emptyDescription: "Bu teste ait sonuçları buradan ekleyebilirsiniz.",

    loadError: "Test sonuçları yüklenemedi",

    cancel: "Vazgeç",

    save: "Kaydet",

    saving: "Kaydediliyor...",

    close: "Kapat",
    edit: "Düzenle",

    editTitle: "Test Sonucunu Düzenle",

    editDescription:
      "Seçili test sonucunun değerlerini ve durum bilgilerini güncelleyin.",

    saveChanges: "Değişiklikleri Kaydet",

    updating: "Güncelleniyor...",

    delete: "Sil",

    deleteTitle: "Test Sonucunu Sil",

    deleteDescription:
      "Bu test sonucunu silmek üzeresiniz. Bu işlem geri alınamaz.",

    deleteConfirm: "Sonucu Sil",

    deleting: "Siliniyor...",

    history: "Geçmiş",

    historyTitle: "Parametre Geçmişi",

    historyDescription:
      "Aynı parametrenin önceki test kayıtlarındaki sonuçlarını görüntüleyin.",

    historyEmpty: "Bu parametre için başka sonuç kaydı bulunamadı.",

    historyLoadError: "Parametre geçmişi yüklenemedi.",
  },

  imaging: {
    eyebrow: "Sağlık Kayıtları",

    title: "Görüntüleme Kayıtları",

    description:
      "MR, BT, ultrason, röntgen ve diğer tıbbi görüntüleme kayıtlarınızı görüntüleyin ve yönetin.",

    add: "Görüntüleme Ekle",

    type: "Görüntüleme Türü",

    bodyPart: "Vücut Bölgesi",

    imagingDate: "Görüntüleme Tarihi",

    disease: "Hastalık",

    visit: "Ziyaret",

    doctor: "Doktor",

    hospital: "Hastane",

    report: "Rapor",

    notes: "Notlar",

    diseaseUnknown: "Hastalık belirtilmemiş",

    visitUnknown: "Ziyaret belirtilmemiş",

    doctorUnknown: "Doktor belirtilmemiş",

    hospitalUnknown: "Hastane belirtilmemiş",

    bodyPartUnknown: "Vücut bölgesi belirtilmemiş",

    emptyTitle: "Henüz görüntüleme kaydı yok",

    emptyDescription:
      "MR, BT, ultrason ve diğer görüntüleme kayıtlarınızı buradan ekleyebilirsiniz.",

    loadError: "Görüntüleme kayıtları yüklenemedi",

    filtersTitle: "Görüntüleme Kayıtlarını Filtrele",

    filterHint: "Aynı anda yalnızca bir filtre kullanabilirsiniz.",

    allDiseases: "Tüm Hastalıklar",

    allVisits: "Tüm Ziyaretler",

    allDoctors: "Tüm Doktorlar",

    allHospitals: "Tüm Hastaneler",

    allTypes: "Tüm Görüntüleme Türleri",

    bodyPartPlaceholder: "Örn. Bel, Diz, Beyin",

    applyFilters: "Filtrele",

    clearFilters: "Temizle",

    filteredEmptyTitle: "Filtreye uygun görüntüleme kaydı bulunamadı",

    filteredEmptyDescription:
      "Seçtiğiniz filtreyle eşleşen görüntüleme kaydı bulunmuyor.",

    createTitle: "Yeni Görüntüleme Kaydı",

    createDescription:
      "MR, BT, ultrason, röntgen veya diğer görüntüleme bilgilerinizi kaydedin.",

    selectDisease: "Hastalık Seçin",

    selectVisit: "Ziyaret Seçin",

    selectDoctor: "Doktor Seçin",

    selectHospital: "Hastane Seçin",

    noDisease: "Hastalık seçilmedi",

    noVisit: "Ziyaret seçilmedi",

    noDoctor: "Doktor seçilmedi",

    noHospital: "Hastane seçilmedi",

    selectType: "Görüntüleme Türü Seçin",

    imagingDateLabel: "Görüntüleme Tarihi ve Saati",

    reportPlaceholder: "Görüntüleme raporunun metnini buraya yazabilirsiniz.",

    notesPlaceholder: "Görüntüleme kaydıyla ilgili ek notlar.",

    cancel: "Vazgeç",

    save: "Kaydet",

    saving: "Kaydediliyor...",

    preparing: "Hazırlanıyor...",

    edit: "Düzenle",

    editTitle: "Görüntüleme Kaydını Düzenle",

    editDescription:
      "Görüntüleme kaydının ilişkilerini ve detaylarını güncelleyin.",

    update: "Güncelle",

    updating: "Güncelleniyor...",

    delete: "Sil",

    deleteTitle: "Görüntüleme Kaydını Sil",

    deleteDescription:
      "Bu görüntüleme kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",

    deleteConfirm: "Kaydı Sil",

    deleting: "Siliniyor...",

    deleteError: "Görüntüleme kaydı silinemedi",
  },

  documents: {
    eyebrow: "Sağlık Kayıtları",

    title: "Tıbbi Belgeler",

    description:
      "Laboratuvar raporları, görüntüleme raporları, reçeteler ve diğer sağlık belgelerinizi yönetin.",

    upload: "Belge Yükle",

    name: "Belge Adı",

    documentType: "Belge Türü",

    file: "Dosya",

    disease: "Hastalık",

    visit: "Ziyaret",

    medicalTest: "Tıbbi Test",

    imaging: "Görüntüleme",

    fileName: "Dosya Adı",

    fileSize: "Dosya Boyutu",

    uploadedAt: "Yüklenme Tarihi",

    download: "İndir",

    delete: "Sil",

    supportedFiles: "PDF, JPG, JPEG veya PNG",

    maxFileSize: "Maksimum dosya boyutu 10 MB",

    emptyTitle: "Henüz tıbbi belge yok",

    emptyDescription: "Sağlık belgelerinizi buradan yükleyebilirsiniz.",

    loadError: "Tıbbi belgeler yüklenemedi",

    uploadTitle: "Yeni Tıbbi Belge Yükle",

    uploadDescription:
      "Belgenizi yükleyin ve isteğe bağlı olarak ilgili sağlık kayıtlarıyla ilişkilendirin.",

    selectType: "Belge Türü Seçin",

    selectDisease: "Hastalık Seçin",

    selectVisit: "Ziyaret Seçin",

    selectMedicalTest: "Tıbbi Test Seçin",

    selectImaging: "Görüntüleme Seçin",

    noDisease: "Hastalık seçilmedi",

    noVisit: "Ziyaret seçilmedi",

    noMedicalTest: "Tıbbi test seçilmedi",

    noImaging: "Görüntüleme seçilmedi",

    namePlaceholder: "Örn. 2026 Ağustos Kan Tahlili",

    chooseFile: "Dosya Seçin",

    fileRequired: "Bir dosya seçin.",

    invalidFileType: "Yalnızca PDF, JPG, JPEG veya PNG dosyaları yüklenebilir.",

    fileTooLarge: "Dosya boyutu 10 MB'ı geçemez.",

    uploading: "Yükleniyor...",

    save: "Yükle",

    cancel: "Vazgeç",

    preparing: "Hazırlanıyor...",

    filtersTitle: "Tıbbi Belgeleri Filtrele",

    filterHint: "Aynı anda yalnızca bir filtre kullanabilirsiniz.",

    allDiseases: "Tüm Hastalıklar",

    allVisits: "Tüm Ziyaretler",

    allMedicalTests: "Tüm Tıbbi Testler",

    allImaging: "Tüm Görüntülemeler",

    allDocumentTypes: "Tüm Belge Türleri",

    nameFilter: "Belge Adı",

    nameFilterPlaceholder: "Belge adına göre ara",

    applyFilters: "Filtrele",

    clearFilters: "Temizle",

    filteredEmptyTitle: "Filtreye uygun belge bulunamadı",

    filteredEmptyDescription:
      "Seçtiğiniz filtreyle eşleşen tıbbi belge bulunmuyor.",

    downloadError: "Belge indirilemedi",

    mimeType: "Dosya Türü",

    downloading: "İndiriliyor...",

    deleteTitle: "Tıbbi Belgeyi Sil",

    deleteDescription:
      "Bu belgeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",

    deleteConfirm: "Belgeyi Sil",

    deleting: "Siliniyor...",

    deleteError: "Belge silinemedi",
  },

  medications: {
    eyebrow: "Sağlık Kayıtları",

    title: "İlaçlar",

    description:
      "Kullandığınız ilaçları, doz bilgilerini ve kullanım geçmişinizi yönetin.",

    create: "İlaç Ekle",

    edit: "Düzenle",

    delete: "Sil",

    name: "İlaç Adı",

    dosage: "Doz",

    frequency: "Kullanım Sıklığı",

    route: "Kullanım Yolu",

    disease: "Hastalık",

    status: "Durum",

    startDate: "Başlangıç Tarihi",

    endDate: "Bitiş Tarihi",

    prescribedBy: "Reçete Eden",

    notes: "Notlar",

    selectDisease: "Hastalık Seçin",

    noDisease: "Hastalık seçilmedi",

    selectRoute: "Kullanım Yolu Seçin",

    selectStatus: "Durum Seçin",

    emptyTitle: "Henüz ilaç kaydı yok",

    emptyDescription:
      "Kullandığınız veya daha önce kullandığınız ilaçları buradan ekleyebilirsiniz.",

    filteredEmptyTitle: "Filtreye uygun ilaç bulunamadı",

    filteredEmptyDescription:
      "Seçtiğiniz filtreyle eşleşen ilaç kaydı bulunmuyor.",

    loadError: "İlaç kayıtları yüklenemedi",

    filtersTitle: "İlaçları Filtrele",

    filterHint: "Aynı anda yalnızca bir filtre kullanabilirsiniz.",

    allDiseases: "Tüm Hastalıklar",

    allStatuses: "Tüm Durumlar",

    nameFilter: "İlaç Adı",

    nameFilterPlaceholder: "İlaç adına göre ara",

    applyFilters: "Filtrele",

    clearFilters: "Temizle",

    preparing: "Hazırlanıyor...",

    saving: "Kaydediliyor...",

    cancel: "Vazgeç",

    createTitle: "Yeni İlaç Ekle",

    createDescription:
      "İlaç bilgilerini girin ve isteğe bağlı olarak ilgili hastalık kaydıyla ilişkilendirin.",

    namePlaceholder: "Örn. Parol",

    dosagePlaceholder: "Örn. 500 mg",

    frequencyPlaceholder: "Örn. Günde 2 kez",

    prescribedByPlaceholder: "Örn. Dr. Ayşe Demir",

    notesPlaceholder: "İlaç kullanımıyla ilgili notlar...",

    save: "Kaydet",

    dateRangeError: "Bitiş tarihi başlangıç tarihinden önce olamaz",

    editTitle: "İlaç Kaydını Düzenle",

    editDescription: "İlaç bilgilerini ve kullanım durumunu güncelleyin.",

    update: "Güncelle",

    updating: "Güncelleniyor...",
  },

  placeholder: {
    moduleComingSoon:
      "Bu modül bir sonraki frontend aşamasında geliştirilecek.",
  },
} as const;
