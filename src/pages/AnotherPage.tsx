import React from 'react';
import { Button, Table, Typography, Card, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../store/selectedUsersReducer';

const { Title, Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AnotherPage: React.FC = () => {
  const users = useSelector((state: RootState) => state.selectedUsers.selectedUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (key: React.Key) => {
    dispatch(removeUser(key));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: DataType) => (
        <Button danger onClick={() => handleDelete(record.key)}>
          🗑 Delete
        </Button>
      )
    }
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
      <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3}>✅ Selected Users</Title>
          <Text type="secondary">Tanlangan foydalanuvchilar ro‘yxati. Har birini o‘chirish mumkin.</Text>
          <Table<DataType>
            dataSource={users}
            columns={columns}
            pagination={false}
            rowKey="key"
            bordered
          />
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => navigate('/')}>⬅️ Back</Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default AnotherPage;
