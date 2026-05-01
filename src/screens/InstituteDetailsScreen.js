import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { ROUTES } from '../config/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

const InstituteDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { institute } = route.params;
  const [activeTab, setActiveTab] = useState('programs');

  // Dummy data
  const programs = [
    {
      name: "Computer Science",
      intake: "Fall 2025",
      deadline: "June 30, 2025",
      duration: "4 Years",
      degree: "B.Sc",
      subjects: ["AI", "Cybersecurity", "Data Science"],
    },
    {
      name: "Business Administration",
      intake: "Spring 2025",
      deadline: "Dec 15, 2024",
      duration: "3 Years",
      degree: "BBA",
      subjects: ["Marketing", "Finance", "HR Management"],
    },
    {
      name: "Design & Arts",
      intake: "Fall 2025",
      deadline: "July 10, 2025",
      duration: "4 Years",
      degree: "B.Des",
      subjects: ["Graphic Design", "Fashion Design"],
    },
  ];

  const requirements = [
    "Minimum GPA: 3.0",
    "IELTS: 6.5 or TOEFL: 90",
    "Copy of passport",
    "Transcripts & certificates",
  ];

  const scholarships = [
    { name: "Merit-based Scholarship", amount: "50% Tuition Fee" },
    { name: "Sports Excellence Scholarship", amount: "25% Tuition Fee" },
  ];

  const facilities = ["Library", "Sports Complex", "Laboratories", "Hostel", "Cafeteria"];

  const reviews = [
    { name: "Alice", rating: 5, comment: "Great campus and faculty!" },
    { name: "Bob", rating: 4, comment: "Amazing programs, but accommodation is limited." },
  ];

  const contact = {
    email: "admissions@exampleuniversity.com",
    phone: "+1 234 567 890",
    website: "https://www.exampleuniversity.com",
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'programs':
        return (
          <View style={styles.detailsContainer}>
            {programs.map((program, index) => (
              <View key={index} style={styles.programCard}>
                <Text style={styles.programName}>{program.name}</Text>
                <View style={styles.programInfoRow}>
                  <Text style={styles.programInfoLabel}>Intake:</Text>
                  <Text style={styles.programInfoValue}>{program.intake}</Text>
                </View>
                <View style={styles.programInfoRow}>
                  <Text style={styles.programInfoLabel}>Deadline:</Text>
                  <Text style={styles.programInfoValue}>{program.deadline}</Text>
                </View>
                <View style={styles.programInfoRow}>
                  <Text style={styles.programInfoLabel}>Duration:</Text>
                  <Text style={styles.programInfoValue}>{program.duration}</Text>
                </View>
                <View style={styles.programInfoRow}>
                  <Text style={styles.programInfoLabel}>Degree:</Text>
                  <Text style={styles.programInfoValue}>{program.degree}</Text>
                </View>
                <View>
                  <Text style={[styles.programInfoLabel, { marginTop: 6 }]}>Subjects:</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
                    {program.subjects.map((sub, idx) => (
                      <View key={idx} style={styles.subjectTag}>
                        <Text style={styles.subjectText}>{sub}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      case 'requirements':
        return (
          <View style={styles.detailsContainer}>
            {requirements.map((req, idx) => (
              <View key={idx} style={styles.requirementRow}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>
        );
      case 'scholarships':
        return (
          <View style={styles.detailsContainer}>
            {scholarships.map((sch, idx) => (
              <View key={idx} style={styles.scholarshipCard}>
                <Text style={styles.programName}>{sch.name}</Text>
                <Text style={styles.programInfoValue}>{sch.amount}</Text>
              </View>
            ))}
          </View>
        );
      case 'contact':
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#DF252A" />
              <Text style={styles.infoText}>{contact.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color="#DF252A" />
              <Text style={styles.infoText}>{contact.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="link" size={20} color="#DF252A" />
              <Text style={[styles.infoText, { color: "#0077CC" }]}>{contact.website}</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 20 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button below notch, above Image */}
        <TouchableOpacity 
          style={[styles.backButton, { marginTop: 8 + insets.top }]} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        {/* Cover Image with Back Button */}
        <View style={[styles.imageContainer]}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2sw4hgQft6loHWnHAksFXmDsIpPu8jqdhg&s",
            }}
            style={styles.image}
          />
        </View>

        {/* Basic Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Institute Info</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-sharp" size={20} color="#DF252A" />
            <Text style={styles.infoText}>New York, USA</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color="#DF252A" />
            <Text style={styles.infoText}>Private University</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="star" size={20} color="#DF252A" />
            <Text style={styles.infoText}>Top 50 in USA</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="attach-money" size={20} color="#DF252A" />
            <Text style={styles.infoText}>$25,000 per year</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="link" size={20} color="#DF252A" />
            <Text style={[styles.infoText, { color: "#0077CC" }]}>https://www.exampleuniversity.com</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'programs' && styles.activeTabButton]}
            onPress={() => setActiveTab('programs')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'programs' && styles.activeTabButtonText]}>
              Programs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'requirements' && styles.activeTabButton]}
            onPress={() => setActiveTab('requirements')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'requirements' && styles.activeTabButtonText]}>
              Requirements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'scholarships' && styles.activeTabButton]}
            onPress={() => setActiveTab('scholarships')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'scholarships' && styles.activeTabButtonText]}>
              Scholarships
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'contact' && styles.activeTabButton]}
            onPress={() => setActiveTab('contact')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'contact' && styles.activeTabButtonText]}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Floating Apply Now Button */}
      <TouchableOpacity style={[styles.applyButton, { bottom: 30 + insets.bottom }]} onPress={() => navigation.navigate(ROUTES.MAIN.APPLICATION_FORM)}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InstituteDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 5,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 12,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: width * 0.037,
    color: "#555",
  },
  programCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: "#fff",
    
  },
  programName: {
    fontSize: width * 0.04,
    fontWeight: "700",
    marginBottom: 8,
    color: "#DF252A",
  },
  programInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  programInfoLabel: {
    fontSize: width * 0.035,
    color: "#666",
  },
  programInfoValue: {
    fontSize: width * 0.035,
    fontWeight: "600",
    color: "#333",
  },
  subjectTag: {
    backgroundColor: "#DF252A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  subjectText: {
    color: "#fff",
    fontSize: width * 0.03,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  requirementText: {
    marginLeft: 8,
    fontSize: width * 0.035,
    color: "#555",
  },
  scholarshipCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    
  },
  facilityTag: {
    backgroundColor: "#DF252A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    color: "#fff",
    fontSize: width * 0.033,
  },
  applyButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#1BB161",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
   
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: width * 0.045,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  activeTabButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#DF252A',
  },
  tabButtonText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabButtonText: {
    color: '#DF252A',
    fontWeight: '700',
  },
});