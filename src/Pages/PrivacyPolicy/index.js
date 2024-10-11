// src/components/PrivacyPolicy.js

import React from 'react';
import Navigation from '../../Parts/Navigation';
import FooterSection from '../../Parts/Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <Navigation/>
    <div className="bg-maingreen-900 min-h-screen py-6 px-4 pt-48 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-mainyellow-900 pb-2">Privacy Policy</h1>
        <p className="text-white pb-2">Last updated: 7 October 2024</p>

        <p className="text-white pb-2">
          This Privacy Policy explains how Surganarasa.com ("we", "us", or "our") collects, uses, discloses, and protects your information when you visit our website Surganarasa.com.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">1. Information We Collect</h2>
        <p className="text-white pb-2">
          We may collect personal information from you in a variety of ways, including when you:
        </p>
        <ul className="list-disc list-inside ml-4 text-white pb-2">
          <li>Create an account</li>
          <li>Place an order</li>
          <li>Subscribe to our newsletter</li>
          <li>Fill out a form</li>
        </ul>
        <p className="text-white pb-2">
          The personal information we may collect includes your name, email address, mailing address, phone number, and payment information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">2. How We Use Your Information</h2>
        <p className="text-white pb-2">
          We use the information we collect from you for various purposes, including to:
        </p>
        <ul className="list-disc list-inside ml-4 text-white pb-2">
          <li>Process your transactions</li>
          <li>Improve our website and services</li>
          <li>Send periodic emails</li>
          <li>Respond to customer service requests</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">3. How We Protect Your Information</h2>
        <p className="text-white pb-2">
          We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">4. Sharing Your Information</h2>
        <p className="text-white pb-2">
          We do not sell, trade, or otherwise transfer your personal information to outside parties except to provide the services you requested or as required by law.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">5. Your Rights</h2>
        <p className="text-white pb-2">
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside ml-4 text-white pb-2">
          <li>The right to access</li>
          <li>The right to rectification</li>
          <li>The right to erasure</li>
          <li>The right to restrict processing</li>
          <li>The right to data portability</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">6. Changes to This Privacy Policy</h2>
        <p className="text-white pb-2">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-2">7. Contact Us</h2>
        <p className="text-white pb-2">
          If you have any questions or concerns regarding this Privacy Policy, please contact us at:
        </p>
        <p className="text-white pb-2">
          <strong>Email:</strong> <a href="mailto:info@surganarasa.com" className="text-blue-600 underline">info@surganarasa.com</a>
        </p>
        <p className="text-white pb-2">
          <strong>Address:</strong> Jl. Raya Rawa Buntu No.18,BSD, Serpong, Tangerang Selatan.
        </p>
      </div>
    </div>
    <FooterSection/>
    </>
  );
};

export default PrivacyPolicy;
