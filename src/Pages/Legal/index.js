// src/components/Legal.js

import React from 'react';
import Navigation from '../../Parts/Navigation';
import FooterSection from '../../Parts/Footer';

const Legal = () => {
  return (
    <>
    <Navigation/>
    <div className="bg-maingreen-900 min-h-screen py-6 px-4 pt-48">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-mainyellow-900 pb-3">Legal Information</h1>
        <p className="text-white pb-3">Welcome to Surganarasa.com. By using our site, you agree to the following terms and conditions. Please read them carefully.</p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">1. Terms of Service</h2>
        <p className="text-white pb-3">
          By accessing or using Surganarasa.com, you agree to comply with these Terms of Service ("Terms"). If you disagree with any part of the terms, please discontinue using the website.
        </p>
        <p className="text-white pb-3">
          <strong>Use of Site:</strong> You agree to use the website for lawful purposes only. You are prohibited from violating any laws or regulations, engaging in fraudulent or harmful activities, and attempting to gain unauthorized access to any part of the website.
        </p>
        <p className="text-white pb-3">
          <strong>Termination:</strong> We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including but not limited to breach of these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">2. Privacy Policy</h2>
        <p className="text-white pb-3">
          We take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
        </p>
        <p className="text-white pb-3">
          <strong>Data Collection:</strong> We collect information you provide directly to us, such as when you create an account, contact us, or subscribe to our newsletter. This may include personal data like your name, email, and payment information.
        </p>
        <p className="text-white pb-3">
          <strong>Usage of Data:</strong> The information collected is used to provide and improve our services, communicate with you, and process transactions.
        </p>
        <p className="text-white pb-3">
          <strong>Data Protection:</strong> We implement various security measures to protect your data. However, we cannot guarantee complete security of data transmission over the internet.
        </p>
        <p className="text-white pb-3">For more details, visit our full <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>.</p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">3. Cookie Policy</h2>
        <p className="text-white pb-3">
          Surganarasa.com uses cookies to enhance the user experience. By continuing to use the site, you agree to our use of cookies.
        </p>
        <p className="text-white pb-3">
          <strong>What Are Cookies?</strong> Cookies are small text files stored on your device when you visit a website. They help improve functionality and personalize your experience.
        </p>
        <p className="text-white pb-3">
          <strong>Types of Cookies We Use:</strong>
          <ul className="list-disc list-inside ml-4 text-white pb-3">
            <li>Essential Cookies: Required for website functionality.</li>
            <li>Analytics Cookies: Used to collect information on how users interact with the site.</li>
            <li>Advertising Cookies: Used to provide personalized ads based on your browsing behavior.</li>
          </ul>
        </p>
        <p className="text-white pb-3">You can control and manage cookies through your browser settings.</p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">4. Disclaimer</h2>
        <p className="text-white pb-3">
          The information provided on Surganarasa.com is for general informational purposes only. We do not guarantee the accuracy or completeness of any content provided on the site.
        </p>
        <p className="text-white pb-3">
          <strong>No Warranties:</strong> The website is provided "as is" without any warranties, express or implied. We make no warranties about the availability, accuracy, or reliability of the website.
        </p>
        <p className="text-white pb-3">
          <strong>Limitation of Liability:</strong> In no event shall Surganarasa.com or its owners be liable for any indirect, incidental, or consequential damages arising out of the use of the site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">5. Intellectual Property and Use of Third-Party Assets</h2>
        <p className="text-white pb-3">
          All content on Surganarasa.com, including text, graphics, logos, and software, is the property of Surganarasa.com and is protected by copyright and intellectual property laws.
        </p>
        <p className="text-white pb-3">
          <strong>Use of Third-Party Illustrations:</strong> We may incorporate illustrations and graphics from third-party platforms, including but not limited to <a target="_blank" href="https://www.vecteezy.com/free-vector/jawa" className="text-blue-600 underline">Vecteezy</a>, <a href="https://www.freepik.com/" className="text-blue-600 underline">Freepik</a>, and others. These assets are used under their respective licenses and credits are provided in accordance with the terms set by the creators and platforms.
        </p>
        <p className="text-white pb-3">
          <strong>Restrictions:</strong> You may not copy, reproduce, or distribute any content from this site without prior written consent from us or the respective asset creators where applicable.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">6. GDPR and CCPA Compliance</h2>
        <p className="text-white pb-3">
          We are committed to complying with data protection regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
        </p>
        <p className="text-white pb-3">
          <strong>Your Rights Under GDPR:</strong>
          <ul className="list-disc list-inside ml-4 text-white pb-3">
            <li>Right to access, modify, or delete your data.</li>
            <li>Right to withdraw consent at any time.</li>
          </ul>
        </p>
        <p className="text-white pb-3">
          <strong>Your Rights Under CCPA:</strong>
          <ul className="list-disc list-inside ml-4 text-white pb-3">
            <li>Right to know what personal data is being collected.</li>
            <li>Right to request deletion of personal data.</li>
            <li>Right to opt-out of the sale of your data.</li>
          </ul>
        </p>
        <p className="text-white pb-3">For more details, visit our full <a href="/privacy-policy"  className="text-blue-600 underline">Privacy Policy</a>.</p>

        <h2 className="text-2xl font-semibold mt-6 text-white pb-3">7. Contact Us</h2>
        <p className="text-white pb-3">
          If you have any questions or concerns regarding our legal policies, please contact us at:
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

export default Legal;
