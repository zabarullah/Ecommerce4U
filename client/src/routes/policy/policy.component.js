import React from 'react'
import Layout from '../../components/layout/layout.component'
import './policy.styles.css'

const Policy = () => {
  return (
   <Layout title="Privacy Policy - Ecommerce 4 U">
    <div className='m-5'>
      <h1 className="bg-info p-2 text-white title">Privacy Policy</h1>
      <p className='mt-4'>
        This Privacy Policy describes how we collect, use, and handle your personal information when you use our website. It applies to all users of our website.
      </p>
      <h2>1. Information We Collect</h2>
      <p>
        When you visit our website, we may collect the following types of information:
      </p>
      <ul>
        <li>Personal Information: We may collect your name, email address, contact details, and other information you provide to us when you create an account or place an order.</li>
        <li>Usage Information: We may collect information about how you interact with our website, such as your IP address, browser type, device information, and pages visited.</li>
      </ul>
      <h2>2. Use of Information</h2>
      <p>
        We use the collected information for the following purposes:
      </p>
      <ul>
        <li>To provide and maintain our services, including processing orders, managing user accounts, and customer support.</li>
        <li>To improve our website and services, analyze usage patterns, and personalize your experience.</li>
        <li>To communicate with you, including sending transactional emails, updates, and promotional materials.</li>
      </ul>
      <h2>3. Information Sharing</h2>
      <p>
        We may share your personal information with third parties in the following circumstances:
      </p>
      <ul>
        <li>Service Providers: We may engage trusted third-party service providers to assist us in operating our website and delivering services to you.</li>
        <li>Legal Compliance: We may disclose your information if required by law or in response to a valid legal request.</li>
      </ul>
      <h2>4. Data Security</h2>
      <p>
        We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
      </p>
      <h2>5. Your Choices</h2>
      <p>
        You have the right to access, update, and delete your personal information. You can do this by logging into your account or contacting us directly.
      </p>
      <h2>6. Cookies</h2>
      <p>
        We use cookies and similar technologies to enhance your browsing experience and collect usage information. You can manage your cookie preferences through your browser settings.
      </p>
      <h2>7. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised version will become effective immediately.
      </p>
      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or our practices, please contact us at [email address] or [mailing address].
      </p>
    </div>
   </Layout>
  )
}

export default Policy