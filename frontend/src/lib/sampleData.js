// sampleData.js

const sampleUsers = {
  volunteers: [
    { id: 1, name: "Sarah Johnson", email: "sarah@volunteer.com", phone: "+91 98765 43210", location: "Mumbai", casesRegistered: 23, joinDate: "2024-01-15", rating: 4.8 },
    { id: 2, name: "Mike Rodriguez", email: "mike@volunteer.com", phone: "+91 98765 43211", location: "Delhi", casesRegistered: 18, joinDate: "2024-02-01", rating: 4.6 },
    { id: 3, name: "Priya Sharma", email: "priya@volunteer.com", phone: "+91 98765 43212", location: "Bangalore", casesRegistered: 31, joinDate: "2023-12-10", rating: 4.9 }
  ],
  ngos: [
    { id: 1, name: "HelpIndia NGO", email: "contact@helpindia.org", phone: "+91 98765 43220", location: "Mumbai", casesVerified: 156, joinDate: "2023-11-20", rating: 4.7 },
    { id: 2, name: "Care Foundation", email: "info@carefoundation.org", phone: "+91 98765 43221", location: "Delhi", casesVerified: 89, joinDate: "2024-01-05", rating: 4.5 }
  ],
  donors: [
    { id: 1, name: "Rajesh Patel", email: "rajesh@donor.com", phone: "+91 98765 43230", totalDonated: 45000, donations: 12, joinDate: "2024-02-10", preferredCategory: "Medical" },
    { id: 2, name: "Anonymous Donor", email: "anonymous@donor.com", phone: "Hidden", totalDonated: 67000, donations: 15, joinDate: "2024-01-20", preferredCategory: "All" },
    { id: 3, name: "Tech Corp Foundation", email: "foundation@techcorp.com", phone: "+91 98765 43232", totalDonated: 125000, donations: 3, joinDate: "2023-12-15", preferredCategory: "Education" }
  ],
  serviceProviders: [
    { id: 1, name: "City Hospital", email: "admin@cityhospital.com", phone: "+91 98765 43240", location: "Mumbai", servicesProvided: 89, joinDate: "2023-12-05", category: "Medical" },
    { id: 2, name: "Food Bank Mumbai", email: "contact@foodbank.com", phone: "+91 98765 43241", location: "Mumbai", servicesProvided: 156, joinDate: "2024-01-10", category: "Food" },
    { id: 3, name: "Shelter Home Delhi", email: "info@shelterhome.com", phone: "+91 98765 43242", location: "Delhi", servicesProvided: 67, joinDate: "2024-02-01", category: "Shelter" }
  ]
};

const sampleCases = [
  { id: "CASE-2024-0892", beneficiary: "Ramesh Kumar", age: 45, gender: "Male", location: "Mumbai Central Station", gpsCoordinates: "19.0176, 72.8562", volunteer: "Sarah Johnson", ngo: "HelpIndia NGO", status: "voucher_generated", priority: "high", category: "Medical", description: "Homeless person with diabetes requiring immediate medical attention and medication", medicalNeeds: ["Diabetes medication", "Blood pressure check", "General health checkup"], estimatedCost: 5000, donatedAmount: 5000, photos: ["/case-photos/ramesh-1.jpg", "/case-photos/ramesh-2.jpg"], voiceRecording: "/voice-recordings/ramesh-case.mp3", registrationDate: "2024-01-15", verificationDate: "2024-01-15", donationDate: "2024-01-15" },
  { id: "CASE-2024-0891", beneficiary: "Sunita Devi", age: 38, gender: "Female", location: "Delhi Railway Station", gpsCoordinates: "28.6139, 77.2090", volunteer: "Mike Rodriguez", ngo: "Care Foundation", status: "verified", priority: "medium", category: "Food & Shelter", description: "Single mother with two children needing food and temporary shelter", needs: ["Food for 3 people", "Temporary accommodation", "Children clothing"], estimatedCost: 3500, donatedAmount: 2100, photos: ["/case-photos/sunita-1.jpg"], voiceRecording: "/voice-recordings/sunita-case.mp3", registrationDate: "2024-01-14", verificationDate: "2024-01-14" },
  { id: "CASE-2024-0890", beneficiary: "Abdul Rahman", age: 62, gender: "Male", location: "Bangalore Bus Stand", gpsCoordinates: "12.9716, 77.5946", volunteer: "Priya Sharma", ngo: "HelpIndia NGO", status: "pending_verification", priority: "low", category: "Medical", description: "Elderly person with mobility issues requiring walking aid and basic medical care", medicalNeeds: ["Walking stick", "Physiotherapy", "Basic medication"], estimatedCost: 2500, donatedAmount: 0, photos: ["/case-photos/abdul-1.jpg"], voiceRecording: "/voice-recordings/abdul-case.mp3", registrationDate: "2024-01-16" }
];

const sampleVouchers = [
  { id: "VOUCH-MED-1234", caseId: "CASE-2024-0892", type: "Medical", amount: 3000, serviceProvider: "City Hospital", beneficiary: "Ramesh Kumar", status: "active", generatedDate: "2024-01-15", expiryDate: "2024-02-15", qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=" },
  { id: "VOUCH-FOOD-5678", caseId: "CASE-2024-0892", type: "Food", amount: 1550, serviceProvider: "Food Bank Mumbai", beneficiary: "Ramesh Kumar", status: "active", generatedDate: "2024-01-15", expiryDate: "2024-02-15", qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=" }
];

const sampleDonations = [
  { id: "DON-2024-001", caseId: "CASE-2024-0892", donor: "Rajesh Patel", amount: 5000, serviceFee: 450, netAmount: 4550, paymentMethod: "UPI", transactionId: "TXN123456789", status: "completed", donationDate: "2024-01-15", message: "Hope this helps with medical treatment" },
  { id: "DON-2024-002", caseId: "CASE-2024-0891", donor: "Anonymous Donor", amount: 2100, serviceFee: 189, netAmount: 1911, paymentMethod: "Credit Card", transactionId: "TXN123456790", status: "completed", donationDate: "2024-01-14", message: "For the children" }
];

const sampleSchemes = [
  { id: "SCHEME-001", name: "Winter Relief Program", description: "Providing warm clothing and shelter during winter months", ngo: "HelpIndia NGO", category: "Shelter", beneficiaries: 45, budget: 125000, spent: 89000, startDate: "2024-01-01", endDate: "2024-03-31", status: "active" },
  { id: "SCHEME-002", name: "Medical Emergency Fund", description: "Emergency medical assistance for homeless individuals", ngo: "Care Foundation", category: "Medical", beneficiaries: 23, budget: 200000, spent: 156000, startDate: "2024-01-15", endDate: "2024-12-31", status: "active" }
];

export { sampleUsers, sampleCases, sampleVouchers, sampleDonations, sampleSchemes };
