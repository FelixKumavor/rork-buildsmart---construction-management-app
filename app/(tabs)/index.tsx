import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  FolderOpen,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const stats = [
    { title: "Active Projects", value: "12", icon: FolderOpen, color: "#1E40AF" },
    { title: "Tasks Due Today", value: "8", icon: Clock, color: "#F97316" },
    { title: "Team Members", value: "24", icon: Users, color: "#16A34A" },
    { title: "Budget Used", value: "68%", icon: DollarSign, color: "#DC2626" },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      progress: 75,
      status: "On Track",
      dueDate: "Dec 15, 2024",
      statusColor: "#16A34A",
    },
    {
      id: 2,
      name: "Residential Tower A",
      progress: 45,
      status: "Behind",
      dueDate: "Jan 30, 2025",
      statusColor: "#F97316",
    },
    {
      id: 3,
      name: "Shopping Mall Renovation",
      progress: 90,
      status: "Ahead",
      dueDate: "Nov 28, 2024",
      statusColor: "#16A34A",
    },
  ];

  const urgentTasks = [
    { id: 1, title: "Foundation Inspection", project: "Office Complex", priority: "High" },
    { id: 2, title: "Material Delivery", project: "Tower A", priority: "Medium" },
    { id: 3, title: "Safety Review", project: "Mall Renovation", priority: "High" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>Here's your project overview</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}>
                <stat.icon color={stat.color} size={24} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Projects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentProjects.map((project) => (
            <TouchableOpacity key={project.id} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: project.statusColor + "20" }]}>
                  <Text style={[styles.statusText, { color: project.statusColor }]}>
                    {project.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={["#1E40AF", "#3B82F6"]}
                    style={[styles.progressFill, { width: `${project.progress}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.progressText}>{project.progress}%</Text>
              </View>
              
              <Text style={styles.dueDate}>Due: {project.dueDate}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Urgent Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Urgent Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {urgentTasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskCard}>
              <View style={styles.taskIcon}>
                <AlertTriangle color="#F97316" size={20} />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskProject}>{task.project}</Text>
              </View>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: task.priority === "High" ? "#DC2626" : "#F97316" }
              ]}>
                <Text style={styles.priorityText}>{task.priority}</Text>
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
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  seeAll: {
    fontSize: 16,
    color: "#1E40AF",
    fontWeight: "600",
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
    alignItems: "center",
    marginBottom: 16,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
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
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    minWidth: 40,
  },
  dueDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  taskProject: {
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
});