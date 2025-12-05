import Appointments from "../assets/icons/appointments.svg";
import History from "../assets/icons/history.svg";
import Conditions from "../assets/icons/conditions.svg";
import Lab from "../assets/icons/lab.svg";
import Procedures from "../assets/icons/procedures.svg";
import CarePlan from "../assets/icons/careplan.svg";
import Education from "../assets/icons/education.svg";
import Facility from "../assets/icons/facility.svg";
import Pharmacy from "../assets/icons/pharmacy.svg";
import Blood from "../assets/icons/blood.svg";
import Organ from "../assets/icons/organ.svg";
import Info from "../assets/icons/info.svg";
import Documents from "../assets/icons/documents.svg";
import Survey from "../assets/icons/survey.svg";
import Assistant from "../assets/icons/asistant.svg";
import Vitals from "../assets/icons/vitals.svg";

export const servicesData = [
    {
        category: "Visits",
        items: [
            { icon: Appointments, label: "Appointments" },
            { icon: History, label: "Visits History" }
        ]
    },
    {
        category: "My Health Record",
        items: [
            { icon: Conditions, label: "My Health Conditions" },
            { icon: Lab, label: "Lab Results and Pathology" },
            { icon: Procedures, label: "Procedures" },
            { icon: CarePlan, label: "Care Plan" },
            { icon: Education, label: "Educational Materials" }
        ]
    },
    {
        category: "Public Services",
        items: [
            { icon: Facility, label: "Closest Health Facilities" },
            { icon: Pharmacy, label: "Closest Pharmacies" },
            { icon: Blood, label: "Blood Donation" },
            { icon: Organ, label: "Organ Donation" }
        ]
    },
    {
        category: "My Health Journal",
        items: [
            { icon: Info, label: "Important Health Information" },
            { icon: Documents, label: "My Uploaded Documents" },
            { icon: Survey, label: "Surveys and Questionnaires" },
            { icon: Assistant, label: "Smart Assistant" },
            { icon: Vitals, label: "Self-Added Vitals" }
        ]
    }
];
