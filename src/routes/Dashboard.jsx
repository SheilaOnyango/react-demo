const Dashboard = ({ user }) => {
  return (
    <div>
      {user === "Sheila" ? (
        <h2>Welcome to inner circle, {user}</h2>
      ) : (
        <h2>Oh you must be a new one here! {user}</h2>
      )}
    </div>
  );
};
export default Dashboard;
