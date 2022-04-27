import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const HomePage = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleLogout}>sair</button>
    </div>
  );
};

export default HomePage;
