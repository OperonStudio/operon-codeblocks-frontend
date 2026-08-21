import {
  Boxes,
  Command,
  FolderKanban,
  KeyRound,
  Plug,
  User,
} from "@operonstudio/icons";
import { Box, Card } from "@operonstudio/ui";
import { useQuery } from "@tanstack/react-query";
import { getUsageOptions } from "./api";
import * as classes from "./style";

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const UsagePage = () => {
  const activeWorkspaceId =
    typeof window !== "undefined"
      ? localStorage.getItem("operon_active_workspace_id")
      : null;

  const { data: usage, isLoading } = useQuery({
    ...getUsageOptions(activeWorkspaceId || ""),
    enabled: !!activeWorkspaceId,
  });

  if (isLoading) {
    return (
      <Box {...classes.pageContainerStyle}>
        <Box>Loading usage data...</Box>
      </Box>
    );
  }

  if (!usage) {
    return (
      <Box {...classes.pageContainerStyle}>
        <Box>No usage data found.</Box>
      </Box>
    );
  }

  const statCards = [
    {
      title: "API Requests",
      value: usage.apiRequests.toLocaleString(),
      icon: <Plug size={24} color="#6366f1" />,
      bg: "#e0e7ff",
    },
    {
      title: "Storage Used",
      value: formatBytes(usage.storageBytes).split(" ")[0],
      unit: formatBytes(usage.storageBytes).split(" ")[1],
      icon: <FolderKanban size={24} color="#10b981" />,
      bg: "#d1fae5",
    },
    {
      title: "Bandwidth",
      value: formatBytes(usage.bandwidthBytes).split(" ")[0],
      unit: formatBytes(usage.bandwidthBytes).split(" ")[1],
      icon: <Command size={24} color="#f59e0b" />,
      bg: "#fef3c7",
    },
    {
      title: "Active Users",
      value: usage.activeUsers.toLocaleString(),
      icon: <User size={24} color="#ec4899" />,
      bg: "#fce7f3",
    },
    {
      title: "Projects",
      value: usage.projects.toLocaleString(),
      icon: <Boxes size={24} color="#8b5cf6" />,
      bg: "#ede9fe",
    },
    {
      title: "API Keys",
      value: usage.apiKeys.toLocaleString(),
      icon: <KeyRound size={24} color="#ef4444" />,
      bg: "#fee2e2",
    },
  ];

  return (
    <Box {...classes.pageContainerStyle}>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {statCards.map((stat, i) => (
          <Card key={i} shadow="sm">
            <Box display="flex" direction="column" gap={16} style={{ padding: "24px" }}>
              <Box style={{ color: stat.icon.props.color }}>
                {stat.icon}
              </Box>
              <Box {...(classes.statLabelStyle as any)}>{stat.title}</Box>
              <Box display="flex" align="baseline">
                <Box {...(classes.statValueStyle as any)}>{stat.value}</Box>
                {stat.unit && <Box {...(classes.statUnitStyle as any)}>{stat.unit}</Box>}
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
