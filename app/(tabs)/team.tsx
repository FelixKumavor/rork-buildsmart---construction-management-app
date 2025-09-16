import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react-native";

export default function TeamScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Online", "Offline", "On Site"];

  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Project Manager",
      project: "Downtown Office Complex",
      status: "Online",
      location: "Office",
      phone: "+1 (555) 123-4567",
      email: "john.smith@buildmart.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      statusColor: "#16A34A",
      lastSeen: "Active now",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Site Supervisor",
      project: "Residential Tower A",
      status: "On Site",
      location: "456 Oak Ave",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@buildmart.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      statusColor: "#1E40AF",
      lastSeen: "2 min ago",
    },
    {
      id: 3,
      name: "Mike Wilson",
      role: "Safety Inspector",
      project: "Shopping Mall Renovation",
      status: "On Site",
      location: "789 Commerce Blvd",
      phone: "+1 (555) 345-6789",
      email: "mike.wilson@buildmart.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      statusColor: "#1E40AF",
      lastSeen: "5 min ago",
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "Electrical Engineer",
      project: "Downtown Office Complex",
      status: "Offline",
      location: "Remote",
      phone: "+1 (555) 456-7890",
      email: "lisa.chen@buildmart.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      statusColor: "#6B7280",
      lastSeen: "2 hours ago",
    },
    {
      id: 5,
      name: "David Brown",
      role: "Plumbing Contractor",
      project: "Residential Tower A",
      status: "Online",
      location: "Office",
      phone: "+1 (555) 567-8901",
      email: "david.brown@buildmart.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      statusColor: "#16A34A",
      lastSeen: "Active now",
    },
    {
      id: 6,
      name: "Emma Davis",
      role: "Architect",
      project: "Shopping Mall Renovation",
      status: "Online",
      location: "Office",
      phone: "+1 (555) 678-9012",
      email: "emma.davis@buildmart.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      statusColor: "#16A34A",
      lastSeen: "Active now",
    },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || member.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Online":
        return <CheckCircle color="#16A34A" size={12} />;
      case "On Site":
        return <MapPin color="#1E40AF" size={12} />;
      default:
        return <Clock color="#6B7280" size={12} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Team</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search team members..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Team Members List */}
      <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
        {filteredMembers.map((member) => (
          <TouchableOpacity key={member.id} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: member.avatar }} style={styles.avatar} />
                <View style={[styles.statusIndicator, { backgroundColor: member.statusColor }]}>
                  {getStatusIcon(member.status)}
                </View>
              </View>
              
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <Text style={styles.memberProject}>{member.project}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: member.statusColor + "20" }]}>
                <Text style={[styles.statusText, { color: member.statusColor }]}>
                  {member.status}
                </Text>
              </View>
            </View>

            <View style={styles.memberDetails}>
              <View style={styles.detailRow}>
                <MapPin color="#6B7280" size={16} />
                <Text style={styles.detailText}>{member.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock color="#6B7280" size={16} />
                <Text style={styles.detailText}>{member.lastSeen}</Text>
              </View>
            </View>

            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone color="#1E40AF" size={18} />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Mail color="#1E40AF" size={18} />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1E40AF",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeFilterTab: {
    backgroundColor: "#1E40AF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  membersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  memberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  memberHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  memberProject: {
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  memberDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  contactActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E40AF",
    marginLeft: 8,
  },
});