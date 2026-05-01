import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera as rnLaunchCamera, launchImageLibrary as rnLaunchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

const ApplicationForm = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    university: "",
    fatherName: "",
    birthday: "",
  });

  const [files, setFiles] = useState({
    bsc: null,
    msc: null,
    ssc: null,
    hsc: null,
    passport: null,
    ielts: null,
  });

  const [previewFile, setPreviewFile] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const updateFile = (field, file) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const launchCamera = async () => {
    const result = await rnLaunchCamera({ mediaType: 'photo', quality: 1 });
    if (result?.didCancel || result?.errorCode) {
      if (result?.errorCode === 'permission') {
        Alert.alert('Permission required', 'Camera permission is needed.');
      }
      setOptionVisible(false);
      return;
    }
    if (currentField) {
      const asset = result?.assets && result.assets[0];
      if (asset?.uri) {
        updateFile(currentField, {
          uri: asset.uri,
          name: asset.fileName || 'camera-image.jpg',
          mimeType: asset.type || 'image/jpeg',
        });
      }
    }
    setOptionVisible(false);
  };

  const launchImagePicker = async () => {
    const result = await rnLaunchImageLibrary({ mediaType: 'photo', quality: 1, selectionLimit: 1 });
    if (result?.didCancel || result?.errorCode) {
      if (result?.errorCode === 'permission') {
        Alert.alert('Permission required', 'Gallery permission is needed.');
      }
      setOptionVisible(false);
      return;
    }
    if (currentField) {
      const asset = result?.assets && result.assets[0];
      if (asset?.uri) {
        updateFile(currentField, {
          uri: asset.uri,
          name: asset.fileName || 'gallery-image.jpg',
          mimeType: asset.type || 'image/jpeg',
        });
      }
    }
    setOptionVisible(false);
  };

  const pickPDF = async () => {
    // PDF picker functionality removed due to compatibility issues
    Alert.alert('Info', 'PDF picker temporarily disabled. Please use camera or gallery for now.');
    setOptionVisible(false);
  };

  const isImage = (f) => f && f.mimeType && f.mimeType.startsWith("image/");

  const renderUploader = (label, field) => {
    const file = files[field];
    return (
      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>{label}</Text>
        {!file ? (
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              setCurrentField(field);
              setOptionVisible(true);
            }}
          >
            <Text style={styles.uploadBtnText}>Upload File</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.fileRow}>
            <Text style={styles.fileName} numberOfLines={1}>
              {file.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setPreviewFile(file);
                setPreviewVisible(true);
              }}
            >
              <Text style={styles.actionText}>Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentField(field);
                setOptionVisible(true);
              }}
            >
              <Text style={styles.actionText}>Re-upload</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Form</Text>
      </View>
      <View style={styles.headerBorder} />

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
      >
        {/* Input Fields */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#C0C0C0"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#C0C0C0"
            value={formData.address}
            onChangeText={(text) =>
              setFormData({ ...formData, address: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="University Name"
            placeholderTextColor="#C0C0C0"
            value={formData.university}
            onChangeText={(text) =>
              setFormData({ ...formData, university: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Father's Name"
            placeholderTextColor="#C0C0C0"
            value={formData.fatherName}
            onChangeText={(text) =>
              setFormData({ ...formData, fatherName: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Birthday"
            placeholderTextColor="#C0C0C0"
            value={formData.birthday}
            onChangeText={(text) =>
              setFormData({ ...formData, birthday: text })
            }
          />
        </View>

        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          <Text style={styles.sectionTitle}>Required Documents</Text>

          {renderUploader("BSC Certificate", "bsc")}
          {renderUploader("MSC Certificate", "msc")}
          {renderUploader("SSC Certificate", "ssc")}
          {renderUploader("HSC Certificate", "hsc")}
          {renderUploader("Passport", "passport")}
          {renderUploader("IELTS Certificate", "ielts")}
        </View>
      </ScrollView>

      {/* Floating Submit Button */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 30 + insets.bottom }]}
        onPress={() => Alert.alert("Form Submitted!")}
      >
        <Text style={styles.fabText}>Submit</Text>
      </TouchableOpacity>

      {/* Preview Modal */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setPreviewVisible(false)}
          >
            <View style={styles.modalInner}>
              {previewFile && isImage(previewFile) ? (
                <Image
                  source={{ uri: previewFile.uri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.modalText}>
                  Preview not available for this file type.
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Options Sheet */}
      <Modal
        visible={optionVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setOptionVisible(false)}
      >
        <TouchableOpacity
          style={styles.optionBackdrop}
          activeOpacity={1}
          onPressOut={() => setOptionVisible(false)}
        >
          <View style={styles.optionSheet}>
            <TouchableOpacity style={styles.optionBtn} onPress={launchCamera}>
              <Text style={styles.optionText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionBtn}
              onPress={launchImagePicker}
            >
              <Text style={styles.optionText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={pickPDF}>
              <Text style={styles.optionText}>PDF</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 100, // leave space for FAB
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  uploadContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
    height: 48,
    color: "#000",
  },
  uploadSection: {
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
    color: "#495057",
  },
  uploadBtn: {
    backgroundColor: "#f7f7fb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderStyle: "dashed",
  },
  uploadBtnText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 14,
  },
  fileRow: {
    backgroundColor: "#f7f7fb",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderStyle: "dashed",
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginRight: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2563eb",
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: "#f7f7fb",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalInner: {
    width: Math.min(width * 1.0, 700),
    maxHeight: height * 0.55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalText: {
    padding: 20,
    textAlign: "center",
  },
  optionBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  optionSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#1BB161",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ApplicationForm;