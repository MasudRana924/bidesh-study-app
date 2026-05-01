import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const notificationsData = [
  {
    id: "1",
    type: "calendar",
    text: "University of Idaho has extended the application date for Programs starting in Sep 2022.",
    time: "10 h ago",
    hasButton: false,
  },
  {
    id: "2",
    type: "book",
    text: "New Programs in Business Accounting introduced by University of California.",
    time: "10 h ago",
    hasButton: false,
  },
  {
    id: "3",
    type: "location",
    text: "Offer recieved for Masters in Business Administration from University of Washington.",
    time: "1 day ago",
    hasButton: true,
    accepted: false,
  },
  {
    id: "4",
    type: "book",
    text: "New Programs in Business Accounting introduced by University of California.",
    time: "18 h ago",
    hasButton: false,
  },
  {
    id: "5",
    type: "location",
    text: "Offer recieved for Masters in Business Administration from University of California.",
    time: "",
    hasButton: true,
    accepted: true,
  },
];

export default function NotificationsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState(notificationsData);

  const acceptOffer = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, accepted: true } : n
      )
    );
  };

  const renderIcon = (type) => {
    switch (type) {
      case "calendar":
        return <View style={[styles.icon, styles.calendarIcon]} />;
      case "book":
        return <View style={[styles.icon, styles.bookIcon]} />;
      case "location":
        return <View style={[styles.icon, styles.locationIcon]} />;
      default:
        return null;
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notification} activeOpacity={0.7}>
      {renderIcon(item.type)}
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
        {item.hasButton && (
          <TouchableOpacity
            style={[
              styles.acceptBtn,
              item.accepted && styles.acceptedBtn,
            ]}
            disabled={item.accepted}
            onPress={() => acceptOffer(item.id)}
          >
            <Text style={styles.acceptBtnText}>
              {item.accepted ? "✓ Accepted" : "✓ Accept"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity   onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["All", "Applications", "Offers"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {tab === "All" && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notifications.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 20 + insets.bottom }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginLeft: 12,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#ff6b35",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#333",
  },
  badge: {
    backgroundColor: "#ff6b35",
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  notification: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
    marginTop: 2,
    backgroundColor: "#ddd",
  },
  calendarIcon: { borderRadius: 3 },
  bookIcon: { borderRadius: 2 },
  locationIcon: { borderRadius: 10 },
  notificationContent: { flex: 1 },
  notificationText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#666",
  },
  acceptBtn: {
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  acceptedBtn: {
    backgroundColor: "#28a745",
  },
  acceptBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
});
