import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../shared';
import { useLanguage } from '../shared';
import {
  launchCamera as rnLaunchCamera,
  launchImageLibrary as rnLaunchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with spacing
const PROFILE_COMPLETION = 75;

// Document Upload Screen
const DocumentUploadScreen = ({ onSave }) => {
  const { t } = useLanguage();
  const [files, setFiles] = useState({
    bsc: null,
    msc: null,
    passport: null,
    hsc: null,
    ssc: null,
  });

  const pickFile = async (type) => {
    try {
      Alert.alert(
        t('submit'),
        t('tapHint'),
        [
          {
            text: 'Take Photo',
            onPress: () => launchCamera(type),
          },
          {
            text: 'Choose from Gallery',
            onPress: () => launchImagePicker(type),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    } catch (err) {
      console.log('Error picking file: ', err);
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const launchCamera = async (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      cameraType: 'back',
      quality: 0.8,
      saveToPhotos: false,
    };
    const result = await rnLaunchCamera(options);
    if (result?.didCancel || result?.errorCode) {
      if (result?.errorCode === 'permission') {
        Alert.alert('Permission required', 'Camera permission is needed to take photos');
      }
      return;
    }
    const asset = result?.assets && result.assets[0];
    if (asset?.uri) {
      const file = {
        name: asset.fileName || `photo_${type}_${Date.now()}.jpg`,
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        mimeType: asset.type || 'image/jpeg',
        size: asset.fileSize,
      };
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const launchImagePicker = async (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      selectionLimit: 1,
    };
    const result = await rnLaunchImageLibrary(options);
    if (result?.didCancel || result?.errorCode) {
      if (result?.errorCode === 'permission') {
        Alert.alert('Permission required', 'Gallery permission is needed to select photos');
      }
      return;
    }
    const asset = result?.assets && result.assets[0];
    if (asset?.uri) {
      const file = {
        name: asset.fileName || `image_${type}_${Date.now()}.jpg`,
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        mimeType: asset.type || 'image/jpeg',
        size: asset.fileSize,
      };
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const launchDocumentPicker = async (type) => {
    // PDF picker functionality removed due to compatibility issues
    Alert.alert('Info', 'PDF picker temporarily disabled. Please use camera or gallery for now.');
  };

  const removeFile = (type) => {
    Alert.alert('Remove File', 'Are you sure you want to remove this file?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        onPress: () => setFiles((prev) => ({ ...prev, [type]: null })),
      },
    ]);
  };

  const UploadCard = ({ title, type, file }) => {
    const isImage = file?.mimeType?.startsWith('image/');
    const isPdf = file?.mimeType === 'application/pdf';

    return (
      <View style={styles.uploadCard}>
        {file ? (
          <>
            {isImage ? (
              <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Image
                  source={{ uri: file.uri }}
                  style={styles.fullImage}
                  resizeMode="cover"
                />

                {/* Cross Button */}
                <TouchableOpacity
                  style={styles.crossButton}
                  onPress={() => removeFile(type)}>
                  <Ionicons name="close-circle" size={24} color="#e53935" />
                </TouchableOpacity>

                {/* Title Overlay */}
                <View style={styles.imageTitleWrapper}>
                  <Text style={styles.imageTitle}>{title}</Text>
                </View>
              </View>
            ) : isPdf ? (
              <View style={styles.fileWrapper}>
                <Ionicons
                  name="document-text-outline"
                  size={38}
                  color="#9CA3AF"
                />
                <Text style={styles.uploadTitle}>{title}</Text>
              </View>
            ) : (
              <View style={styles.fileWrapper}>
                <Ionicons name="document-outline" size={38} color="#9CA3AF" />
                <Text style={styles.uploadTitle}>{title}</Text>
              </View>
            )}
          </>
        ) : (
          <TouchableOpacity
            style={styles.emptyCard}
            onPress={() => pickFile(type)}
            activeOpacity={0.8}>
            <Ionicons name="document-text-outline" size={38} color="#9CA3AF" />
            <Text style={styles.uploadTitle}>{title}</Text>
            <Text style={styles.uploadHint}>Tap to upload</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.uploadContainer}>
        <Text style={styles.sectionTitle}>{t('uploadYourDocuments')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('tapHint')}
        </Text>

        <View style={styles.row}>
          <UploadCard title={t('bscCertificate')} type="bsc" file={files.bsc} />
          <UploadCard title={t('mscCertificate')} type="msc" file={files.msc} />
        </View>
        <View style={styles.row}>
          <UploadCard title={t('passport')} type="passport" file={files.passport} />
          <UploadCard title={t('hscCertificate')} type="hsc" file={files.hsc} />
        </View>
        <View style={styles.row}>
          <UploadCard title={t('sscCertificate')} type="ssc" file={files.ssc} />
          <View style={{ width: CARD_WIDTH }} /> {/* Empty placeholder */}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={onSave}>
        <Text style={styles.submitText}>{t('saveChanges')}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Profile Screen
const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('primary');
  const { logout } = useAuth();
  const { t } = useLanguage();

  const onSave = () => {
    Alert.alert('Saved', 'Your information has been saved successfully!');
  };

  // Inside ProfileScreen component

  const PrimaryInfoForm = () => {
    const [profileImage, setProfileImage] = useState(null);

    // Default user info values
    const [formData, setFormData] = useState({
      fullName: 'Masud Rana',
      fatherName: 'Rana Khan',
      email: 'masudrana15924@example.com',
      dob: '1995-01-01',
      address: 'Dhaka, Bangladesh',
    });

    const pickImage = async () => {
      const result = await rnLaunchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.8,
        selectionLimit: 1,
      });
      if (result?.didCancel || result?.errorCode) {
        if (result?.errorCode === 'permission') {
          Alert.alert('Permission required', 'Gallery access is needed to select a profile picture.');
        }
        return;
      }
      const asset = result?.assets && result.assets[0];
      if (asset?.uri) {
        setProfileImage(asset.uri);
      }
    };

    const handleChange = (key, value) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <ScrollView contentContainerStyle={[styles.formContainer, styles.primaryFormContainer]}>
       <Text style={styles.formTitle}>{t('updatePrimaryInfo')} </Text>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: 'https://i.pravatar.cc/100?img=12' }
            }
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Input
          label={t('fullName')}
          placeholder={t('fullNamePlaceholder')}
          value={formData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />
        <Input
          label={t('fathersName')}
          placeholder={t('fathersNamePlaceholder')}
          value={formData.fatherName}
          onChangeText={(text) => handleChange('fatherName', text)}
        />
        <Input
          label={t('email')}
          placeholder={t('emailPlaceholder')}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <Input
          label={t('dob')}
          placeholder={t('dobPlaceholder')}
          value={formData.dob}
          onChangeText={(text) => handleChange('dob', text)}
        />
        <Input
          label={t('address')}
          placeholder={t('addressPlaceholder')}
          multiline
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
        />
      </ScrollView>
    );
  };

  const AcademicInfoForm = () => {
    const [academicData, setAcademicData] = useState({
      bscVarsity: 'Dhaka University',
      mscVarsity: 'Dhaka University',
      sscInstitution: 'ABC High School',
      sscCgpa: '5.00',
      hscInstitution: 'XYZ College',
      hscCgpa: '4.90',
    });

    const handleChange = (key, value) => {
      setAcademicData((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <ScrollView contentContainerStyle={[styles.formContainer, styles.primaryFormContainer]}>
       <Text style={styles.formTitle}>{t('updateAcademicInfo')} </Text>
        <Input
          label={t('bscUniversity')}
          placeholder={t('bscUniversityPlaceholder')}
          value={academicData.bscVarsity}
          onChangeText={(text) => handleChange('bscVarsity', text)}
        />
        <Input
          label={t('mscUniversityOptional')}
          placeholder={t('mscUniversityPlaceholder')}
          value={academicData.mscVarsity}
          onChangeText={(text) => handleChange('mscVarsity', text)}
        />
        <Input
          label={t('sscInstitution')}
          placeholder={t('sscInstitutionPlaceholder')}
          value={academicData.sscInstitution}
          onChangeText={(text) => handleChange('sscInstitution', text)}
        />
        <Input
          label={t('sscCgpa')}
          placeholder={t('sscCgpaPlaceholder')}
          keyboardType="decimal-pad"
          value={academicData.sscCgpa}
          onChangeText={(text) => handleChange('sscCgpa', text)}
        />
        <Input
          label={t('hscInstitution')}
          placeholder={t('hscInstitutionPlaceholder')}
          value={academicData.hscInstitution}
          onChangeText={(text) => handleChange('hscInstitution', text)}
        />
        <Input
          label={t('hscCgpa')}
          placeholder={t('hscCgpaPlaceholder')}
          keyboardType="decimal-pad"
          value={academicData.hscCgpa}
          onChangeText={(text) => handleChange('hscCgpa', text)}
        />
      </ScrollView>
    );
  };

  /* Update Input Component to accept `value` and `onChangeText` */
  const Input = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    multiline = false,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = !!value && String(value).length > 0;

    return (
      <View style={styles.inputWrapper}>
        <View style={styles.floatingContainer}>
          {label ? (
            <Text
              style={[
                styles.floatingLabel,
                (isFocused || hasValue) && styles.floatingLabelActive,
              ]}
            >
              {label}
            </Text>
          ) : null}

          <TextInput
            style={[
              styles.input,
              multiline && {
                height: 96,
                textAlignVertical: 'top',
                paddingTop: 20,
              },
              (isFocused || hasValue) && styles.inputFocused,
            ]}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            keyboardType={keyboardType}
            multiline={multiline}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{t('profile')}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.progressText}>{`${PROFILE_COMPLETION}% ${t('profileComplete')}`}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${PROFILE_COMPLETION}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TabButton
          title={t('primaryInfo')}
          active={activeTab === 'primary'}
          onPress={() => setActiveTab('primary')}
        />
        <TabButton
          title={t('academicInfo')}
          active={activeTab === 'academic'}
          onPress={() => setActiveTab('academic')}
        />
        <TabButton
          title={t('documents')}
          active={activeTab === 'documents'}
          onPress={() => setActiveTab('documents')}
        />
      </View>

      <View style={{ flex: 1 }}>
        {activeTab === 'primary' && <PrimaryInfoForm />}
        {activeTab === 'academic' && <AcademicInfoForm />}
        {activeTab === 'documents' && <DocumentUploadScreen onSave={onSave} />}
      </View>

      {activeTab !== 'documents' && (
        <TouchableOpacity style={[styles.floatingButton, { bottom: 20 + insets.bottom }]} onPress={onSave}>
          <Text style={styles.submitText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/* -------------------
   Reusable Components
---------------------*/

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, active && styles.activeTab]}
    onPress={onPress}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default ProfileScreen;

/* -------------------
   Styles
---------------------*/
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '600',
  },
  progressTrack: {
    width: 140,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1BB161',
    borderRadius: 999,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#1BB161' },
  tabText: { fontSize: 14, color: '#777', fontWeight: '500' },
  activeTabText: { color: '#1BB161', fontWeight: '600' },

  inputWrapper: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  floatingContainer: {
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    left: 24,
    top: 18,
    fontSize: 14,
    color: '#000',
    zIndex: 2,
  },
  floatingLabelActive: {
    top: -8,
    fontSize: 12,
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 2,
    borderColor: '#F3F2F1',
  },
  inputFocused: {
    borderColor: '#F3F2F1',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1BB161',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  submitText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700',
    textAlign: 'center',
  },

  // Upload Section
  uploadContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  uploadCard: {
    width: CARD_WIDTH,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  crossButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
  },
  imageTitleWrapper: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
  },
  fileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  uploadHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
  formContainer: { 
    paddingBottom: 140,
    paddingTop: 0,
    backgroundColor: '#f8fafc',
  },
  primaryFormContainer: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 24,
    marginLeft: 20,
    textAlign: 'left',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 24,
    marginTop: 20,
    textAlign: 'left',
    marginLeft: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    marginLeft: 8,
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginVertical: 32,
    position: 'relative',
    alignItems: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#1BB161',
  },
  editIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#1BB161',
    borderRadius: 24,
    padding: 10,
    borderWidth: 4,
    borderColor: '#fff',
  },
});
