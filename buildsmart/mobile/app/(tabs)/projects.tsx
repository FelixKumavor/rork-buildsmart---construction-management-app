import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Search,
  Plus,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Filter,
} from "lucide-react-native";

export default function ProjectsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Active", "Completed", "On Hold"];

  const projects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      location: "123 Main St, Downtown",
      progress: 75,
      status: "Active",
      budget: "$2.5M",
      team: 12,
      startDate: "Jan 15, 2024",
      endDate: "Dec 15, 2024",
      statusColor: "#16A34A",
    },
    {
      id: 2,
      name: "Residential Tower A",
      location: "456 Oak Ave, Westside",
      progress: 45,
      status: "Active",
      budget: "$4.2M",
      team: 18,
      startDate: "Mar 1, 2024",
      endDate: "Jan 30, 2025",
      statusColor: "#F97316",
    },
    {
      id: 3,
      name: "Shopping Mall Renovation",
      location: "789 Commerce Blvd",
      progress: 90,
      status: "Active",
      budget: "$1.8M",
      team: 8,
      startDate: "Aug 10, 2024",
      endDate: "Nov 28, 2024",
      statusColor: "#16A34A",
    },
    {
      id: 4,
      name: "Highway Bridge Repair",
      location: "Route 101, Mile 45",
      progress: 100,
      status: "Completed",
      budget: "$3.1M",
      team: 15,
      startDate: "Feb 1, 2024",
      endDate: "Sep 15, 2024",
      statusColor: "#6B7280",
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
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
            placeholder="Search projects..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#6B7280" size={20} />
        </TouchableOpacity>
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

      {/* Projects List */}
      <ScrollView style={styles.projectsList} showsVerticalScrollIndicator={false}>
        {filteredProjects.map((project) => (
          <TouchableOpacity key={project.id} style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={styles.locationContainer}>
                  <MapPin color="#6B7280" size={14} />
                  <Text style={styles.locationText}>{project.location}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: project.statusColor + "20" }]}>
                <Text style={[styles.statusText, { color: project.statusColor }]}>
                  {project.status}
                </Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercentage}>{project.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={["#1E40AF", "#3B82F6"]}
                  style={[styles.progressFill, { width: `${project.progress}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </View>

            <View style={styles.projectDetails}>
              <View style={styles.detailItem}>
                <DollarSign color="#6B7280" size={16} />
                <Text style={styles.detailText}>{project.budget}</Text>
              </View>
              <View style={styles.detailItem}>
                <Users color="#6B7280" size={16} />
                <Text style={styles.detailText}>{project.team} members</Text>
              </View>
              <View style={styles.detailItem}>
                <Calendar color="#6B7280" size={16} />
                <Text style={styles.detailText}>{project.endDate}</Text>
              </View>
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
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  projectsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  projectCard: {
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
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
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
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  projectDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
});