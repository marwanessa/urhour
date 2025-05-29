import { useLanguage } from '../contexts/LanguageContext';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    taskMap: 'Task Map',
    createTask: 'Post Task',
    profile: 'Profile',
    messages: 'Messages',
    settings: 'Settings',
    help: 'Help & Support',
    myTasks: 'My Tasks',

    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    logIn: 'Log In',
    logOut: 'Log Out',

    // Task Related
    tasks: 'Tasks',
    recentTasks: 'Recent Tasks',
    availableTasks: 'Available Tasks',
    taskDetails: 'Task Details',
    postTask: 'Post a Task',
    location: 'Location',
    category: 'Category',
    payment: 'Payment',
    description: 'Description',
    dueDate: 'Due Date',
    status: 'Status',
    postedBy: 'Posted By',
    assignedTo: 'Assigned To',
    makeOffer: 'Make an Offer',
    submitOffer: 'Submit Offer',
    viewDetails: 'View Details',
    editTask: 'Edit Task',
    deleteTask: 'Delete Task',

    // Categories
    popularCategories: 'Popular Categories',
    cleaning: 'Cleaning',
    delivery: 'Delivery',
    handyman: 'Handyman',
    moving: 'Moving',
    petCare: 'Pet Care',
    other: 'Other',

    // Status
    open: 'Open',
    assigned: 'Assigned',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',

    // Common Actions
    search: 'Search',
    searchTasks: 'Search for tasks in your area',
    filter: 'Filters',
    sort: 'Sort',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',

    // Sections
    howItWorks: 'How It Works',
    testimonials: 'What People Are Saying',

    // Messages
    noTasks: 'No tasks found',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    taskMap: 'خريطة المهام',
    createTask: 'نشر مهمة',
    profile: 'الملف الشخصي',
    messages: 'الرسائل',
    settings: 'الإعدادات',
    help: 'المساعدة والدعم',
    myTasks: 'مهامي',

    // Auth
    signIn: 'تسجيل الدخول',
    signUp: 'التسجيل',
    logIn: 'تسجيل الدخول',
    logOut: 'تسجيل الخروج',

    // Task Related
    tasks: 'المهام',
    recentTasks: 'المهام الحديثة',
    availableTasks: 'المهام المتاحة',
    taskDetails: 'تفاصيل المهمة',
    postTask: 'نشر مهمة',
    location: 'الموقع',
    category: 'الفئة',
    payment: 'الدفع',
    description: 'الوصف',
    dueDate: 'تاريخ الاستحقاق',
    status: 'الحالة',
    postedBy: 'نشر بواسطة',
    assignedTo: 'تم تعيينه إلى',
    makeOffer: 'تقديم عرض',
    submitOffer: 'إرسال العرض',
    viewDetails: 'عرض التفاصيل',
    editTask: 'تعديل المهمة',
    deleteTask: 'حذف المهمة',

    // Categories
    popularCategories: 'الفئات الشائعة',
    cleaning: 'تنظيف',
    delivery: 'توصيل',
    handyman: 'صيانة',
    moving: 'نقل',
    petCare: 'رعاية الحيوانات',
    other: 'أخرى',

    // Status
    open: 'مفتوح',
    assigned: 'تم التعيين',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغي',

    // Common Actions
    search: 'بحث',
    searchTasks: 'ابحث عن المهام في منطقتك',
    filter: 'الفلاتر',
    sort: 'ترتيب',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    back: 'رجوع',

    // Sections
    howItWorks: 'كيف تعمل',
    testimonials: 'آراء المستخدمين',

    // Messages
    noTasks: 'لم يتم العثور على مهام',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح!',
  }
};

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return { t };
};