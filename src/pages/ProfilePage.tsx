import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Profile Page for user {id}</div>;
};

export default ProfilePage;
