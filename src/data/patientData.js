const patientData = [
    {
        id: 1,
        name: "Rohan Sharma",
        age: 29,
        gender: "Male",
        height: 172,
        weight: 68,
        bloodType: "B+",
        allergies: ["Dust", "Pollen"],
        medicalHistory: ["Asthma"],
        contactInfo: {
            phone: "9876543210",
            email: "rohan.sharma@example.com"
        },
        emergencyContact: {
            name: "Meena Sharma",
            relationship: "Mother",
            phone: "9876512345"
        },
        appointments: [
            {
                id: 1,
                doctorId: 1,
                doctorName: "Dr. Sharma",
                date: "2023-10-05",
                time: "09:30 AM",
                type: "general",
                reason: "Regular checkup for asthma",
                status: "scheduled"
            },
            {
                id: 2,
                doctorId: 1,
                doctorName: "Dr. Sharma",
                date: "2023-09-15",
                time: "10:00 AM",
                type: "followup",
                reason: "Asthma follow-up",
                status: "completed"
            }
        ],
        prescription: {
            medications: [
                { name: "Salbutamol Inhaler", dosage: "2 puffs", frequency: "As needed" },
                { name: "Montair LC", dosage: "10mg", frequency: "Once daily" }
            ],
            notes: "Avoid allergens. Use inhaler during attacks."
        }
    },
    {
        id: 2,
        name: "Priya Verma",
        age: 35,
        gender: "Female",
        height: 160,
        weight: 60,
        bloodType: "O+",
        allergies: [],
        medicalHistory: ["Thyroid"],
        contactInfo: {
            phone: "9123456789",
            email: "priya.verma@example.com"
        },
        emergencyContact: {
            name: "Amit Verma",
            relationship: "Husband",
            phone: "9988776655"
        },
        appointments: [
            {
                id: 3,
                doctorId: 2,
                doctorName: "Dr. Mehta",
                date: "2023-10-06",
                time: "11:00 AM",
                type: "followup",
                reason: "Thyroid monitoring",
                status: "scheduled"
            }
        ],
        prescription: {
            medications: [
                { name: "Thyronorm", dosage: "50mcg", frequency: "Once daily before breakfast" }
            ],
            notes: "Regular thyroid tests every 6 months."
        }
    },
    {
        id: 3,
        name: "Amit Singh",
        age: 45,
        gender: "Male",
        height: 170,
        weight: 75,
        bloodType: "A+",
        allergies: ["Peanuts"],
        medicalHistory: ["Hypertension"],
        contactInfo: {
            phone: "9112233445",
            email: "amit.singh@example.com"
        },
        emergencyContact: {
            name: "Seema Singh",
            relationship: "Wife",
            phone: "9122233445"
        },
        appointments: [
            {
                id: 4,
                doctorId: 3,
                doctorName: "Dr. Smith",
                date: "2023-10-10",
                time: "12:00 PM",
                type: "consultation",
                reason: "Blood pressure check",
                status: "scheduled"
            },
            {
                id: 5,
                doctorId: 3,
                doctorName: "Dr. Smith",
                date: "2023-09-25",
                time: "02:00 PM",
                type: "general",
                reason: "Hypertension consultation",
                status: "completed"
            }
        ],
        prescription: {
            medications: [
                { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" }
            ],
            notes: "Monitor BP daily."
        }
    },
    {
        id: 4,
        name: "Neha Patel",
        age: 32,
        gender: "Female",
        height: 158,
        weight: 58,
        bloodType: "B+",
        allergies: [],
        medicalHistory: ["Migraine"],
        contactInfo: {
            phone: "9334455667",
            email: "neha.patel@example.com"
        },
        emergencyContact: {
            name: "Rahul Patel",
            relationship: "Brother",
            phone: "9345566778"
        },
        appointments: [
            {
                id: 6,
                doctorId: 2,
                doctorName: "Dr. Mehta",
                date: "2023-10-12",
                time: "03:00 PM",
                type: "consultation",
                reason: "Severe migraine episodes",
                status: "scheduled"
            }
        ],
        prescription: {
            medications: [
                { name: "Suminat", dosage: "50mg", frequency: "As needed" },
                { name: "Dolo 650", dosage: "650mg", frequency: "As needed for pain" }
            ],
            notes: "Avoid bright lights and loud noise during headaches."
        }
    },
    {
        id: 5,
        name: "Suresh Kumar",
        age: 50,
        gender: "Male",
        height: 165,
        weight: 80,
        bloodType: "AB+",
        allergies: ["Penicillin"],
        medicalHistory: ["Diabetes", "High Cholesterol"],
        contactInfo: {
            phone: "9223344556",
            email: "suresh.kumar@example.com"
        },
        emergencyContact: {
            name: "Lakshmi Devi",
            relationship: "Wife",
            phone: "9234455667"
        },
        appointments: [
            {
                id: 7,
                doctorId: 1,
                doctorName: "Dr. Sharma",
                date: "2023-10-15",
                time: "04:00 PM",
                type: "followup",
                reason: "Diabetes and cholesterol checkup",
                status: "scheduled"
            },
            {
                id: 8,
                doctorId: 1,
                doctorName: "Dr. Sharma",
                date: "2023-09-30",
                time: "03:30 PM",
                type: "general",
                reason: "Regular diabetes monitoring",
                status: "completed"
            }
        ],
        prescription: {
            medications: [
                { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
                { name: "Atorvastatin", dosage: "10mg", frequency: "Once daily" },
                { name: "Dolo 650", dosage: "650mg", frequency: "If required for pain" }
            ],
            notes: "Monitor sugar levels regularly."
        }
    }
];

export default patientData;
