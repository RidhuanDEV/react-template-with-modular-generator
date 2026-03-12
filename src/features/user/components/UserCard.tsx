const UserCard: React.FC<{ name: string; email: string; role: string }> = ({
  name,
  email,
  role,
}) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      <span className="badge">{role}</span>
    </div>
  );
};

export { UserCard };
