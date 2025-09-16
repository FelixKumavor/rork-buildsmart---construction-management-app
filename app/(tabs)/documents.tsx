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
import {
  Search,
  Plus,
  FileText,
  Image as ImageIcon,
  File,
  Download,
  Share,
  Calendar,
  User,
  Folder,
} from "lucide-react-native";

export default function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Blueprints", "Contracts", "Reports", "Photos"];

  const documents = [
    {
      id: 1,
      name: "Foundation Blueprint - Level 1",
      type: "Blueprint",
      project: "Downtown Office Complex",
      size: "2.4 MB",
      uploadedBy: "John Smith",
      uploadDate: "Dec 10, 2024",
      icon: FileText,
      iconColor: "#1E40AF",
    },
    {
      id: 2,
      name: "Construction Contract - Phase 2",
      type: "Contract",
      project: "Residential Tower A",
      size: "1.8 MB",
      uploadedBy: "Sarah Johnson",
      uploadDate: "Dec 9, 2024",
      icon: File,
      iconColor: "#16A34A",
    },
    {
      id: 3,
      name: "Site Progress Photos",
      type: "Photos",
      project: "Shopping Mall Renovation",
      size: "15.2 MB",
      uploadedBy: "Mike Wilson",
      uploadDate: "Dec 8, 2024",
      icon: ImageIcon,
      iconColor: "#F97316",
    },
    {
      id: 4,
      name: "Weekly Safety Report",
      type: "Report",
      project: "Downtown Office Complex",
      size: "856 KB",
      uploadedBy: "Lisa Chen",
      uploadDate: "Dec 7, 2024",
      icon: FileText,
      iconColor: "#DC2626",
    },
    {
      id: 5,
      name: "Electrical Wiring Diagram",
      type: "Blueprint",
      project: "Residential Tower A",
      size: "3.1 MB",
      uploadedBy: "David Brown",
      uploadDate: "Dec 6, 2024",
      icon: FileText,
      iconColor: "#1E40AF",
    },
    {
      id: 6,
      name: "Material Purchase Orders",
      type: "Contract",
      project: "Shopping Mall Renovation",
      size: "1.2 MB",
      uploadedBy: "Emma Davis",
      uploadDate: "Dec 5, 2024",
      icon: File,
      iconColor: "#16A34A",
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || doc.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const folders = [
    { name: "Blueprints", count: 24, color: "#1E40AF" },
    { name: "Contracts", count: 12, color: "#16A34A" },
    { name: "Reports", count: 18, color: "#DC2626" },
    { name: "Photos", count: 156, color: "#F97316" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
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
            placeholder="Search documents..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Folders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Folders</Text>
          <View style={styles.foldersGrid}>
            {folders.map((folder, index) => (
              <TouchableOpacity key={index} style={styles.folderCard}>
                <View style={[styles.folderIcon, { backgroundColor: folder.color + "20" }]}>
                  <Folder color={folder.color} size={24} />
                </View>
                <Text style={styles.folderName}>{folder.name}</Text>
                <Text style={styles.folderCount}>{folder.count} files</Text>
              </TouchableOpacity>
            ))}
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

        {/* Recent Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Documents</Text>
          {filteredDocuments.map((doc) => (
            <TouchableOpacity key={doc.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={[styles.documentIcon, { backgroundColor: doc.iconColor + "20" }]}>
                  <doc.icon color={doc.iconColor} size={24} />
                </View>
                
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{doc.name}</Text>
                  <Text style={styles.documentProject}>{doc.project}</Text>
                  <View style={styles.documentMeta}>
                    <View style={styles.metaItem}>
                      <User color="#6B7280" size={12} />
                      <Text style={styles.metaText}>{doc.uploadedBy}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Calendar color="#6B7280" size={12} />
                      <Text style={styles.metaText}>{doc.uploadDate}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.documentActions}>
                  <Text style={styles.documentSize}>{doc.size}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Download color="#6B7280" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Share color="#6B7280" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: 20,
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  foldersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  folderCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  folderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  folderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  folderCount: {
    fontSize: 12,
    color: "#6B7280",
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
  documentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  documentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  documentProject: {
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "500",
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  documentActions: {
    alignItems: "flex-end",
  },
  documentSize: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
});