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
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
} from "lucide-react-native";

export default function TasksScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Pending", "In Progress", "Completed", "Overdue"];

  const tasks = [
    {
      id: 1,
      title: "Foundation Inspection",
      project: "Downtown Office Complex",
      assignee: "John Smith",
      priority: "High",
      status: "Pending",
      dueDate: "Today",
      description: "Inspect foundation concrete pour quality",
      statusColor: "#F97316",
      priorityColor: "#DC2626",
    },
    {
      id: 2,
      title: "Material Delivery Coordination",
      project: "Residential Tower A",
      assignee: "Sarah Johnson",
      priority: "Medium",
      status: "In Progress",
      dueDate: "Tomorrow",
      description: "Coordinate steel beam delivery schedule",
      statusColor: "#1E40AF",
      priorityColor: "#F97316",
    },
    {
      id: 3,
      title: "Safety Equipment Check",
      project: "Shopping Mall Renovation",
      assignee: "Mike Wilson",
      priority: "High",
      status: "Completed",
      dueDate: "Yesterday",
      description: "Weekly safety equipment inspection",
      statusColor: "#16A34A",
      priorityColor: "#DC2626",
    },
    {
      id: 4,
      title: "Electrical Wiring Review",
      project: "Downtown Office Complex",
      assignee: "Lisa Chen",
      priority: "Medium",
      status: "Overdue",
      dueDate: "2 days ago",
      description: "Review electrical wiring installation",
      statusColor: "#DC2626",
      priorityColor: "#F97316",
    },
    {
      id: 5,
      title: "Plumbing Installation",
      project: "Residential Tower A",
      assignee: "David Brown",
      priority: "Low",
      status: "Pending",
      dueDate: "Next Week",
      description: "Install plumbing fixtures on floors 5-8",
      statusColor: "#F97316",
      priorityColor: "#16A34A",
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle color="#16A34A" size={20} />;
      case "In Progress":
        return <Clock color="#1E40AF" size={20} />;
      case "Overdue":
        return <AlertTriangle color="#DC2626" size={20} />;
      default:
        return <Clock color="#F97316" size={20} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
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
            placeholder="Search tasks..."
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

      {/* Tasks List */}
      <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => (
          <TouchableOpacity key={task.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <View style={styles.taskIcon}>
                {getStatusIcon(task.status)}
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.projectName}>{task.project}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: task.priorityColor }]}>
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </View>

            <Text style={styles.taskDescription}>{task.description}</Text>

            <View style={styles.taskFooter}>
              <View style={styles.assigneeContainer}>
                <User color="#6B7280" size={16} />
                <Text style={styles.assigneeText}>{task.assignee}</Text>
              </View>
              <View style={styles.dueDateContainer}>
                <Calendar color="#6B7280" size={16} />
                <Text style={[
                  styles.dueDateText,
                  task.status === "Overdue" && styles.overdueDateText
                ]}>
                  {task.dueDate}
                </Text>
              </View>
            </View>

            <View style={[styles.statusBar, { backgroundColor: task.statusColor }]} />
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
  tasksList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  projectName: {
    fontSize: 14,
    color: "#6B7280",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  taskDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assigneeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  assigneeText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dueDateText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  overdueDateText: {
    color: "#DC2626",
    fontWeight: "600",
  },
  statusBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
});