import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

const translations = {
  en: {
    signInTitle: 'Sign in to your account',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signUp: 'Sign up',
    dontHaveAccount: "Don't have an account? ",
    alreadyMember: 'Already member ? ',
    submit: 'Submit',
    getStarted: 'Get Started',
    profileComplete: 'Profile Complete',
    events: 'Events',
    institutions: 'Institutions',
    seeAll: 'See all',
    chatNow: 'Chat Now',
    consultAdvisor: 'Consult your Advisor',
    scholarshipHeadline: 'Find your dream university',
    scholarshipSub: 'Explore institutions, track your application, and chat with advisors — all in one place.',
    documents: 'Documents',
    changePassword: 'Change Password',
    helpSupport: 'Help & Support',
    logout: 'Logout',
    mySession: 'My Session',
    application: 'Application',
    profile: 'Profile',
    primaryInfo: 'Primary Info',
    academicInfo: 'Academic Info',
    updatePrimaryInfo: 'Update Your Primary Info',
    updateAcademicInfo: 'Update Your Academic Info',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    fathersName: "Father's Name",
    fathersNamePlaceholder: "Enter your father's name",
    emailPlaceholder: 'Enter your email',
    dob: 'Date of Birth',
    dobPlaceholder: 'YYYY-MM-DD',
    address: 'Address',
    addressPlaceholder: 'Enter your address',
    bscUniversity: 'BSc University',
    bscUniversityPlaceholder: 'Enter BSc university name',
    mscUniversityOptional: 'MSc University (Optional)',
    mscUniversityPlaceholder: 'Enter MSc university name',
    sscInstitution: 'SSC Institution',
    sscInstitutionPlaceholder: 'Enter SSC institution name',
    sscCgpa: 'SSC CGPA',
    sscCgpaPlaceholder: 'e.g. 5.00',
    hscInstitution: 'HSC Institution',
    hscInstitutionPlaceholder: 'Enter HSC institution name',
    hscCgpa: 'HSC CGPA',
    hscCgpaPlaceholder: 'e.g. 4.90',
    saveChanges: 'Save Changes',
    uploadYourDocuments: 'Upload Your Documents',
    tapToUpload: 'Tap to upload',
    tapHint: 'Tap on a card to upload, long press to remove',
    bscCertificate: 'BSc Certificate',
    mscCertificate: 'MSc Certificate',
    passport: 'Passport',
    hscCertificate: 'HSC Certificate',
    sscCertificate: 'SSC Certificate',
    changePasswordTitle: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    updatePassword: 'Update Password',
    passwordMismatch: 'New passwords do not match',
    passwordUpdated: 'Password updated successfully',
    forgotPassword: 'Forgot password?',
    fpEmailSubtitle: "Enter the email address associated with your account and we'll send you an OTP to reset your password.",
    fpEnterEmailTitle: 'Reset your password',
    fpEmailLabel: 'Email address',
    fpEmailPlaceholder: 'Enter your email',
    fpSendCode: 'Send code',
    fpOtpTitle: 'Verify code',
    fpOtpSubtitle: 'Enter the code sent to your email',
    fpVerify: 'Verify',
    fpResetTitle: 'Set new password',
    fpNewPassword: 'New Password',
    fpConfirmNewPassword: 'Confirm New Password',
    fpUpdatePassword: 'Update Password',
    fpPasswordsMismatch: 'Passwords do not match',
    fpCodeSent: 'We sent a verification code to your email',
  },
  bn: {
    signInTitle: 'আপনার অ্যাকাউন্টে সাইন ইন করুন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    dontHaveAccount: 'অ্যাকাউন্ট নেই? ',
    alreadyMember: 'ইতিমধ্যে সদস্য ? ',
    submit: 'সাবমিট',
    getStarted: 'শুরু করুন',
    profileComplete: 'প্রোফাইল সম্পন্ন',
    events: 'ইভেন্টস',
    institutions: 'ইনস্টিটিউশনস',
    seeAll: 'সব দেখুন',
    chatNow: 'চ্যাট করুন',
    consultAdvisor: 'আপনার অ্যাডভাইসরের সাথে কথা বলুন',
    scholarshipHeadline: 'আপনার স্বপ্নের বিশ্ববিদ্যালয় খুঁজুন',
    scholarshipSub: 'ইনস্টিটিউশন অনুসন্ধান, অ্যাপ্লিকেশন ট্র্যাকিং ও অ্যাডভাইজরের সাথে চ্যাট — সব এক জায়গায়।',
    documents: 'ডকুমেন্টস',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',
    helpSupport: 'হেল্প ও সাপোর্ট',
    logout: 'লগআউট',
    mySession: 'আমার সেশন',
    application: 'অ্যাপ্লিকেশন',
    profile: 'প্রোফাইল',
    primaryInfo: 'প্রাইমারি তথ্য',
    academicInfo: 'একাডেমিক তথ্য',
    updatePrimaryInfo: 'আপনার প্রাইমারি তথ্য আপডেট করুন',
    updateAcademicInfo: 'আপনার একাডেমিক তথ্য আপডেট করুন',
    fullName: 'পূর্ণ নাম',
    fullNamePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
    fathersName: 'বাবার নাম',
    fathersNamePlaceholder: 'আপনার বাবার নাম লিখুন',
    emailPlaceholder: 'আপনার ইমেইল লিখুন',
    dob: 'জন্মতারিখ',
    dobPlaceholder: 'YYYY-MM-DD',
    address: 'ঠিকানা',
    addressPlaceholder: 'আপনার ঠিকানা লিখুন',
    bscUniversity: 'বি এস সি বিশ্ববিদ্যালয়',
    bscUniversityPlaceholder: 'বি এস সি বিশ্ববিদ্যালয়ের নাম লিখুন',
    mscUniversityOptional: 'এম এস সি বিশ্ববিদ্যালয় (ঐচ্ছিক)',
    mscUniversityPlaceholder: 'এম এস সি বিশ্ববিদ্যালয়ের নাম লিখুন',
    sscInstitution: 'এস এস সি প্রতিষ্ঠান',
    sscInstitutionPlaceholder: 'এস এস সি প্রতিষ্ঠানের নাম লিখুন',
    sscCgpa: 'এস এস সি জিপিএ',
    sscCgpaPlaceholder: 'যেমন ৫.০০',
    hscInstitution: 'এইচ এস সি প্রতিষ্ঠান',
    hscInstitutionPlaceholder: 'এইচ এস সি প্রতিষ্ঠানের নাম লিখুন',
    hscCgpa: 'এইচ এস সি জিপিএ',
    hscCgpaPlaceholder: 'যেমন ৪.৯০',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    uploadYourDocuments: 'আপনার ডকুমেন্ট আপলোড করুন',
    tapToUpload: 'আপলোড করতে ট্যাপ করুন',
    tapHint: 'আপলোড করতে কার্ডে ট্যাপ করুন, মুছতে লং প্রেস করুন',
    bscCertificate: 'বি এস সি সার্টিফিকেট',
    mscCertificate: 'এম এস সি সার্টিফিকেট',
    passport: 'পাসপোর্ট',
    hscCertificate: 'এইচ এস সি সার্টিফিকেট',
    sscCertificate: 'এস এস সি সার্টিফিকেট',
    changePasswordTitle: 'পাসওয়ার্ড পরিবর্তন',
    currentPassword: 'বর্তমান পাসওয়ার্ড',
    newPassword: 'নতুন পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    updatePassword: 'পাসওয়ার্ড আপডেট করুন',
    passwordMismatch: 'নতুন পাসওয়ার্ড মিলছে না',
    passwordUpdated: 'পাসওয়ার্ড সফলভাবে আপডেট হয়েছে',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    fpEmailSubtitle: 'আপনার অ্যাকাউন্টের সাথে যুক্ত ইমেইলটি লিখুন, আমরা পাসওয়ার্ড রিসেট করার জন্য একটি ওটিপি পাঠাব।',
    fpEnterEmailTitle: 'পাসওয়ার্ড রিসেট করুন',
    fpEmailLabel: 'ইমেইল ঠিকানা',
    fpEmailPlaceholder: 'আপনার ইমেইল লিখুন',
    fpSendCode: 'কোড পাঠান',
    fpOtpTitle: 'কোড যাচাই করুন',
    fpOtpSubtitle: 'আপনার ইমেইলে প্রাপ্ত কোডটি লিখুন',
    fpVerify: 'যাচাই করুন',
    fpResetTitle: 'নতুন পাসওয়ার্ড সেট করুন',
    fpNewPassword: 'নতুন পাসওয়ার্ড',
    fpConfirmNewPassword: 'নতুন পাসওয়ার্ড নিশ্চিত করুন',
    fpUpdatePassword: 'পাসওয়ার্ড আপডেট করুন',
    fpPasswordsMismatch: 'পাসওয়ার্ড মিলছে না',
    fpCodeSent: 'আমরা আপনার ইমেইলে ভেরিফিকেশন কোড পাঠিয়েছি',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('appLanguage');
        if (saved) setLanguage(saved);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const toggleLanguage = async () => {
    const next = language === 'en' ? 'bn' : 'en';
    setLanguage(next);
    try {
      await AsyncStorage.setItem('appLanguage', next);
    } catch {}
  };

  const t = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (key) => dict[key] ?? key;
  }, [language]);

  const value = { language, setLanguage, toggleLanguage, t, loading };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
