import React from "react";
import "./UserManagementPage.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UsersTable from "../../components/UserManagement/UserTable";

function UserManagementPage() {
  return (
    <div className="wrapper">
      <div className="Header__container">
        <Header />
      </div>
      <main className="body__container">
        <UsersTable />
      </main>
      <div className="footer__contaier">
        <Footer />
      </div>
    </div>
  );
}

export default UserManagementPage;
