import React from "react";
import {
  Form,
  Modal,
  Input,
  Select,
  Button,
  InputNumber,
} from "antd";
import toast from 'react-hot-toast';

const { Option } = Select;

interface AddNewEntryModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate: string | null;
  weekId: string | undefined;
}

interface FormValues {
  project: string;
  workType: string;
  description: string;
  hours: number;
}

const AddNewEntryModal: React.FC<AddNewEntryModalProps> = ({
  open,
  onClose,
  selectedDate,
  weekId,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: FormValues) => {
    const key = `timesheet-${weekId}`;
    const existingEntries = JSON.parse(localStorage.getItem(key) || "[]");

    const newEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      ...values,
    };

    const updatedEntries = [...existingEntries, newEntry];
    localStorage.setItem(key, JSON.stringify(updatedEntries));
    toast.success("Entry saved successfully!");

    onClose();
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      centered
      open={open}
      width={600}
      footer={null}
      title="Add New Entry"
      onCancel={handleCancel}
    >
      <Form
        form={form}
        className="mt-6"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="project"
          label="Select Project"
          rules={[{ required: true, message: "Please select a project!" }]}
        >
          <Select placeholder="Project Name" size="large">
            <Option value="project1">Project 1</Option>
            <Option value="project2">Project 2</Option>
            <Option value="project3">Project 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="workType"
          label="Type of Work"
          rules={[{ required: true, message: "Please select type of work!" }]}
        >
          <Select placeholder="Bug Fix" size="large">
            <Option value="development">Development</Option>
            <Option value="bugfix">Bug Fix</Option>
            <Option value="design">Design</Option>
            <Option value="testing">Testing</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Task description"
          rules={[
            { required: true, message: "Please enter task description!" },
          ]}
        >
          <Input.TextArea placeholder="Write text from ..." rows={4} />
        </Form.Item>

        <Form.Item
          name="hours"
          label="Hours"
          rules={[{ required: true, message: "Please enter hours!" }]}
        >
          <InputNumber
            min={0}
            max={24}
            size="large"
            placeholder="12"
           style={{width: "100%"}}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex space-x-4">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="flex-1"
            >
              Save
            </Button>
            <Button onClick={handleCancel} className="flex-1" size="large">
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewEntryModal;
