import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientReportCompo from "./PatientReportCompo";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../environment";
import React from "react";

const PatientReports = (props) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState("01/01/2006");
  const [uploadedReports, setUploadedReports] = useState([]); // Array to store uploaded reports
  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      surName: "",
    },
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    address: {
      building: "",
      city: "",
      state: "",
      pincode: "",
    },
    password: "",
    diseases: [{ disease: "", yrs: "" }],
    contactPerson: {
      name: {
        firstName: "",
        surName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      address: {
        building: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
  });
  const [prescriptions, setPrescriptions] = useState([{}]);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getpatient() {
      const res = await fetch(url + "/getpatient", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setPatient(data.patient);
        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
        setDob(convertDatetoString(patient.dob));
      }
    }
    getpatient();
  }, [dob]);

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file); // Create a blob URL for the file
      setUploadedReports((prevReports) => [
        ...prevReports,
        { name: file.name, url: fileURL },
      ]);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="col-span-10">
      <div className="px-12">
        <div className="h-screen">
          <div className="font-poppins mainf">
            <Link to="/patient/profile">
              <div className="flex bg-white rounded shadow px-4 ml-auto h-14 w-1/5 mr-8 mt-8">
                <img
                  src={patient_profile}
                  className="w-12 p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="grid grid-rows-2 ml-4 gap-2 mb-4">
                  <div className="mt-4 ml-4 font-bold font-poppins">
                    <h1 className="ml-2">
                      {`${patient.name.firstName} ${patient.name.surName}`}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-between m-8">
              <div className="font-bold text-xl ml-4">
                <h1>Patient Reports</h1>
              </div>
              {/* Add Report Button */}
              <div>
                <label
                  htmlFor="pdfUpload"
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Add Report
                </label>
                <input
                  id="pdfUpload"
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
              <div className="grid grid-rows-2 p-6 gap-2 shadow">
                <div className="grid grid-cols-4 font-bold ">
                  <div>
                    <h1>Date</h1>
                  </div>
                  <div>
                    <h1>Doctor Name</h1>
                  </div>
                  <div>
                    <h1>Diagnosis</h1>
                  </div>
                  <div>
                    <h1>Prescription</h1>
                  </div>
                </div>
                {uploadedReports.length > 0 ? (
                  uploadedReports.map((report, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 items-center py-2 border-b"
                    >
                      <div>{new Date().toLocaleDateString()}</div>
                      <div>-</div>
                      <div>-</div>
                      <div>
                        <a
                          href={report.url}
                          download={report.name}
                          className="text-blue-500 underline"
                        >
                          {report.name}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="font-bold mt-3 mx-auto">No Record Found...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-20 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientReports;
