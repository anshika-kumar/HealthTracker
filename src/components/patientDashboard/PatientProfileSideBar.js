import logo from "../../assets/img/landingPage/medical-logo.png";
import dashboard from "../../assets/img/dashboard/dashboard.jpeg";
import reports from "../../assets/img/dashboard/report2_pbl.png";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import logoutimg from "../../assets/img/dashboard/logout.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { url } from "../../environment";
import QRCode from "react-qr-code";
import React from "react";

const PatientProfileSideBar = (props) => {
  const navigate = useNavigate();
  const logout = async () => {
    // const res = await fetch(url + "/logout",
    // {headers: {
    //     "Content-Type": "application/json",
    //     "authorization":"Bearer " + localStorage.getItem("jwt")
    //   }});
    localStorage.clear();
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
    navigate("/");
  };
  const [Toggle, setToggle] = useState("Dashboard");

  return (
    <div className="h-screen overflow-y-hidden w-screen grid grid-cols-12">
      <div className="side_bar bg-white shadow col-span-2">
        <div className="flex m-2 mt-4  ">
          <div className="logo m-2  ">
            <img src={logo} className="w-16" alt="logo"></img>
          </div>
          <div className="heading font-poppins font-bold text-xl  ">
            <Link to="/">
              <h1>Public health Record System</h1>
            </Link>
          </div>
        </div>
        <nav>
          <Link
            to="/patient/dashboard"
            onClick={() => setToggle("Dashboard")}
            className={
              Toggle === "Dashboard" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-8 ">
              <div className="w-6 ml-4  ">
                <img src={dashboard} alt="dashboard"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Dashboard</h1>
              </div>
            </div>
          </Link>

          <Link
            to="/patient/reports"
            onClick={() => setToggle("Reports")}
            className={Toggle === "Reports" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6  ">
              <div className="w-6 ml-4  ">
                <img src={reports} alt="reports"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Reports</h1>
              </div>
            </div>
          </Link>
          
          <Link
            to="/patient/prediction"
            onClick={() => setToggle("Prediction")}
            className={Toggle === "Prediction" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6  ">
              <div className="w-6 ml-4  ">
                <img src={reports} alt="reports"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Prediction</h1>
              </div>
            </div>
          </Link>

          <div className="p-4">
            <h1 className="font-poppins font-bold text-xl mt-4">Main menu</h1>
            <div className="grid grid-rows-2 gap-4 font-bold font-poppins mt-4">
              
              <Link
                to="/patient/profile"
                onClick={() => setToggle("Patient_profile")}
                className={
                  Toggle === "Patient_profile"
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_profile}
                    className="w-6"
                    alt="profile"
                  ></img>
                  <h1 className="ml-4">Patient Profile</h1>
                </div>
              </Link>
            </div>
          </div>
        </nav>

        <div style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }}>
          <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`${url}/patient/info/${localStorage.getItem("healthID")}`}
          viewBox={`0 0 256 256`}
          />
        </div>
        <div className=" mx-auto mt-16 py-1    bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5  ">
          <button className="font-bold  flex items-center" onClick={logout}>
            <img src={logoutimg} className="h-4 px-2 " alt="logout"></img>logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default PatientProfileSideBar;
