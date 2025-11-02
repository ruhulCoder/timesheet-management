import Header from "./Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tag, Empty, Card, Layout } from "antd";
import AddNewEntryModal from "../modal/AddNewEntryModal";

const { Content } = Layout;

interface Entry {
  id: string;
  date: string;
  project: string;
  workType: string;
  description: string;
  hours: number;
}

const WeekTimeSheet = () => {
  const { weekId } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getWeekData = (weekId: string | undefined) => {
    const weekData: Record<string, { dateRange: string; days: string[] }> = {
      "1": {
        dateRange: "6 - 10 October, 2025",
        days: ["6 Oct", "7 Oct", "8 Oct", "9 Oct", "10 Oct"],
      },
      "2": {
        dateRange: "13 - 17 October, 2025",
        days: ["13 Oct", "14 Oct", "15 Oct", "16 Oct", "17 Oct"],
      },
      "3": {
        dateRange: "20 - 24 October, 2025",
        days: ["20 Oct", "21 Oct", "22 Oct", "23 Oct", "24 Oct"],
      },
      "4": {
        dateRange: "27 - 31 October, 2025",
        days: ["27 Oct", "28 Oct", "29 Oct", "30 Oct", "31 Oct"],
      },
      "5": {
        dateRange: "3 - 7 November, 2025",
        days: ["3 Nov", "4 Nov", "5 Nov", "6 Nov", "7 Nov"],
      },
      "6": {
        dateRange: "10 - 14 November, 2025",
        days: ["10 Nov", "11 Nov", "12 Nov", "13 Nov", "14 Nov"],
      },
      "7": {
        dateRange: "17 - 21 November, 2025",
        days: ["17 Nov", "18 Nov", "19 Nov", "20 Nov", "21 Nov"],
      },
      "8": {
        dateRange: "24 - 28 November, 2025",
        days: ["24 Nov", "25 Nov", "26 Nov", "27 Nov", "28 Nov"],
      },
    };
    return weekData[weekId || ""] || { dateRange: "Unknown", days: [] };
  };

  const weekData = getWeekData(weekId);

  useEffect(() => {
    const key = `timesheet-${weekId}`;
    const storedEntries = JSON.parse(localStorage.getItem(key) || "[]");
    setEntries(storedEntries);
  }, [weekId]);

  const handleAddEntry = (date: string) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDate(null);
    const key = `timesheet-${weekId}`;
    const storedEntries = JSON.parse(localStorage.getItem(key) || "[]");
    setEntries(storedEntries);
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <Content className="p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                This week's timesheet
              </h1>
              <p className="text-gray-600">{weekData.dateRange}</p>
            </div>
          </div>

          {/* Daily Entries */}
          <div className="space-y-6">
            {weekData.days.map((day: string) => {
              const dayEntries = entries.filter(
                (entry: Entry) => entry.date === day
              );
              return (
                <Card
                  key={day}
                  style={{ marginBottom: 10 }}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {day}
                    </h3>
                  </div>

                  {dayEntries.length === 0 ? (
                    <div className="text-center py-8">
                      <Empty
                        description="No entries for this day"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      >
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          onClick={() => handleAddEntry(day)}
                        >
                          Add new task
                        </Button>
                      </Empty>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dayEntries.map((entry: Entry) => {
                        const getWorkTypeColor = (workType: string): string => {
                          switch (workType) {
                            case "development":
                              return "blue";
                            case "bugfix":
                              return "red";
                            case "design":
                              return "purple";
                            case "testing":
                              return "green";
                            default:
                              return "default";
                          }
                        };

                        return (
                          <div
                            key={entry.id}
                            className="flex items-center justify-between p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">
                                  {entry.description}
                                </span>
                                <Tag color={getWorkTypeColor(entry.workType)}>
                                  {entry.workType}
                                </Tag>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{entry.hours} hrs</span>
                                <span className="text-blue-600 font-medium">
                                  {entry.project}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <Button
                        block
                        type="dashed"
                        className="mt-3"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddEntry(day)}
                      >
                        Add new task
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <Card style={{ marginTop: 10 }}>
            <div className="text-center text-gray-500">
              © 2025 Time Sheet. All rights reserved.
            </div>
          </Card>

          <AddNewEntryModal
            open={isModalVisible}
            onClose={handleModalClose}
            selectedDate={selectedDate}
            weekId={weekId}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WeekTimeSheet;
