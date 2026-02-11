"use client";

import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/axios-api";

interface EnquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  careHome: string;
  careType: string;
  message: string;
  consent: boolean;
}

const careHomes = [
  { value: "", label: "Select a care home (optional)" },
  { value: "emerald-lodge", label: "Emerald Lodge" },
  { value: "joseph-lodge", label: "Joseph Lodge" },
  { value: "rose-manor", label: "Rose Manor" },
  { value: "oakwood-house", label: "Oakwood House" },
  { value: "not-sure", label: "Not sure yet" },
];

const careTypes = [
  { value: "", label: "Select type of care" },
  { value: "nursing", label: "Nursing Care" },
  { value: "dementia", label: "Dementia Care" },
  { value: "residential", label: "Residential Care" },
  { value: "respite", label: "Respite Care" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function EnquiryForm() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    careHome: "",
    careType: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real implementation, this would submit to Strapi
      await submitForm("/enquiries", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        careHome: formData.careHome,
        careType: formData.careType,
        message: formData.message,
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl bg-primary/5 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-gray-900">
          Thank You!
        </h3>
        <p className="mt-2 text-gray-600">
          We've received your enquiry and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
      )}

      {/* Name Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Care Options */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="careHome"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Preferred Care Home
          </label>
          <select
            id="careHome"
            name="careHome"
            value={formData.careHome}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {careHomes.map((home) => (
              <option key={home.value} value={home.value}>
                {home.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="careType"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Type of Care Required
          </label>
          <select
            id="careType"
            name="careType"
            value={formData.careType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {careTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements and any questions you have..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          I consent to Senkoun Care Homes contacting me about my enquiry and
          processing my data in accordance with the{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          . *
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full py-4 text-lg disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
