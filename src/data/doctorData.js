const doctorData = [
    {
        id: 1,
        name: "Dr. Rajesh Sharma",
        specialization: "General Physician",
        experience: 10, // years
        qualifications: ["MBBS", "MD (Internal Medicine)"],
        contactInfo: {
            phone: "9876543211",
            email: "rajesh.sharma@clinic.com"
        },
        availability: [
            { day: "Monday", time: "09:00 AM - 01:00 PM" },
            { day: "Wednesday", time: "09:00 AM - 01:00 PM" },
            { day: "Friday", time: "09:00 AM - 01:00 PM" },
        ],
        consultationFee: 500 // in INR
    },
    {
        id: 2,
        name: "Dr. Neha Mehta",
        specialization: "ENT Specialist",
        experience: 7, // years
        qualifications: ["MBBS", "MS (ENT)"],
        contactInfo: {
            phone: "9123456780",
            email: "neha.mehta@clinic.com"
        },
        availability: [
            { day: "Tuesday", time: "10:00 AM - 02:00 PM" },
            { day: "Thursday", time: "10:00 AM - 02:00 PM" },
            { day: "Saturday", time: "10:00 AM - 01:00 PM" },
        ],
        consultationFee: 600 // in INR
    },
    {
        id: 3,
        name: "Dr. Amitabh Singh",
        specialization: "Diabetologist",
        experience: 12, // years
        qualifications: ["MBBS", "MD (Endocrinology)"],
        contactInfo: {
            phone: "9345678901",
            email: "amitabh.singh@clinic.com"
        },
        availability: [
            { day: "Monday", time: "02:00 PM - 06:00 PM" },
            { day: "Wednesday", time: "02:00 PM - 06:00 PM" },
            { day: "Friday", time: "02:00 PM - 06:00 PM" },
        ],
        consultationFee: 700 // in INR
    }
];

export default doctorData;
