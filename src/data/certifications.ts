import { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    issueDate: "2024-03",
    expiryDate: "2027-03",
    credentialId: "AWS-ASA-12345",
    credentialUrl: "https://aws.amazon.com/certification/verify/",
    image: "/images/certificates/aws-solutions-architect.png",
  },
  {
    id: "react-advanced-certification",
    name: "Advanced React Developer Certification",
    issuer: "Meta",
    issueDate: "2023-11",
    expiryDate: "2025-11",
    credentialId: "META-REACT-67890",
    credentialUrl: "https://developers.facebook.com/certification/",
    image: "/images/certificates/meta-react-advanced.png",
  },
  {
    id: "blockchain-fundamentals",
    name: "Blockchain Fundamentals Certificate",
    issuer: "IBM",
    issueDate: "2023-08",
    credentialId: "IBM-BC-54321",
    credentialUrl: "https://www.credly.com/badges/",
    image: "/images/certificates/ibm-blockchain.png",
  },
  {
    id: "tensorflow-developer",
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    issueDate: "2023-05",
    expiryDate: "2026-05",
    credentialId: "GOOGLE-TF-11111",
    credentialUrl: "https://www.credential.net/",
    image: "/images/certificates/google-tensorflow.png",
  },
  {
    id: "embedded-systems-professional",
    name: "Embedded Systems Professional Certificate",
    issuer: "IEEE",
    issueDate: "2022-12",
    credentialId: "IEEE-ESP-22222",
    credentialUrl: "https://www.ieee.org/education/",
    image: "/images/certificates/ieee-embedded-systems.png",
  },
  {
    id: "iot-specialist",
    name: "IoT Specialist Certification",
    issuer: "Cisco",
    issueDate: "2022-09",
    expiryDate: "2025-09",
    credentialId: "CISCO-IOT-33333",
    credentialUrl:
      "https://www.cisco.com/c/en/us/training-events/training-certifications/",
    image: "/images/certificates/cisco-iot.png",
  },
  {
    id: "agile-scrum-master",
    name: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance",
    issueDate: "2022-06",
    expiryDate: "2024-06",
    credentialId: "CSM-44444",
    credentialUrl: "https://www.scrumalliance.org/",
    image: "/images/certificates/scrum-master.png",
  },
  {
    id: "cybersecurity-fundamentals",
    name: "Cybersecurity Fundamentals Certificate",
    issuer: "CompTIA",
    issueDate: "2022-03",
    credentialId: "COMPTIA-SEC-55555",
    credentialUrl: "https://www.comptia.org/certifications/",
    image: "/images/certificates/comptia-security.png",
  },
];

export const getActiveCertifications = () => {
  const now = new Date();
  return certifications.filter((cert) => {
    if (!cert.expiryDate) return true;
    const expiryDate = new Date(cert.expiryDate);
    return expiryDate > now;
  });
};

export const getCertificationsByIssuer = (issuer: string) =>
  certifications.filter((cert) => cert.issuer === issuer);

export const getCertificationById = (id: string) =>
  certifications.find((cert) => cert.id === id);

export const getFeaturedCertifications = () => certifications.slice(0, 6); // Top 6 most recent/important
