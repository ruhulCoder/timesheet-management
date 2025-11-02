import { useState } from "react";
import {
  Tag,
  Card,
  Table,
  Space,
  Layout,
  Button,
  Select,
  Typography,
} from "antd";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import type { ColumnType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import AddNewEntryModal from "../modal/AddNewEntryModal";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("all");

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "incomplete", label: "Incomplete" },
    { value: "missing", label: "Missing" },
  ];

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
    { value: "astThreeMonths", label: "Last Three Months" },
  ];

  const timesheetData = [
    {
      key: "1",
      week: "1",
      dateRange: "6 - 10 October, 2025",
      status: "missing",
    },
    {
      key: "2",
      week: "2",
      dateRange: "13 - 17 October, 2025",
      status: "missing",
    },
    {
      key: "3",
      week: "3",
      dateRange: "20 - 24 October, 2025",
      status: "missing",
    },
    {
      key: "4",
      week: "4",
      dateRange: "27 - 31 October, 2025",
      status: "missing",
    },
    {
      key: "5",
      week: "5",
      dateRange: "3 - 7 November, 2025",
      status: "missing",
    },
    {
      key: "6",
      week: "6",
      dateRange: "10 - 14 November, 2025",
      status: "missing",
    },
    {
      key: "7",
      week: "7",
      dateRange: "17 - 21 November, 2025",
      status: "missing",
    },
    {
      key: "8",
      week: "8",
      dateRange: "24 - 28 November, 2025",
      status: "missing",
    },
  ];

  const columns: ColumnType<{
    week: string;
    dateRange: string;
    status: string;
  }>[] = [
    {
      title: "WEEK #",
      dataIndex: "week",
      key: "week",
      responsive: ["sm"],
    },
    {
      title: "DATE",
      dataIndex: "dateRange",
      key: "dateRange",
      responsive: ["sm"],
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      responsive: ["sm"],
      render: (status: string) => {
        let color = "green";
        if (status === "incomplete") color = "orange";
        if (status === "missing") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      responsive: ["sm"],
      render: (_: any, record: any) => (
        <Space>
          {record.status === "missing" && (
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={() => navigate(`/timesheet/${record.week}`)}
            >
              Create
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <Content className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <Title level={3} className="font-bold text-gray-900">
                  Your Timesheets
                </Title>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <Select
                    value={selectedDateRange}
                    onChange={setSelectedDateRange}
                    style={{ width: 200 }}
                    options={dateRangeOptions}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    style={{ width: 200 }}
                    options={statusOptions}
                  />
                </div>
              </div>

              <Table
                columns={columns}
                dataSource={timesheetData}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                }}
                className="responsive-table"
              />
            </Card>

            <Card style={{ marginTop: 10 }}>
              <div className="text-center text-gray-500">
                © 2025 Time Sheet. All rights reserved.
              </div>
            </Card>
          </div>

          <AddNewEntryModal
            open={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            selectedDate={null}
            weekId={undefined}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
