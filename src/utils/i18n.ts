// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const esTranslations = {
  title: "Formulario de Pre-incripción - Colni Cine 2025",
  subtitle:
    '¡Pre-inscríbete y forma parte de la magia de "El Desafío Neurovascular"!',
  fullName: "Nombre Completo",
  email: "Correo Electrónico",
  cellphone: "Celular",
  country: "Pais",
  specialty: "Especialidad",
  allergies: "¿Posee alguna alergia?",
  register: "Reservar Cupo",
  identification: "Cedula",
  placeholderAllergies: "Ej. Polen, Penicilina, Camaron, etc.",
};

const enTranslations = {
  title: "Pre-registration Form - Colni Cine 2025",
  subtitle:
    'Pre-register  and Be Part of the Magic of "The Neurovascular Challenge"!',
  fullName: "Full Name",
  email: "Email",
  cellphone: "Mobile phone number",
  country: "Country",
  specialty: "Specialty",
  allergies: "Do you have any allergies?",
  register: "Register",
  identification: "ID",
  placeholderAllergies: "Eg. Penicillin, Polen, shrimp, etc.",
};

(async () => {
  await i18n.use(initReactI18next).init({
    resources: {
      es: { translation: esTranslations },
      en: { translation: enTranslations },
    },
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
})();

export default i18n;
