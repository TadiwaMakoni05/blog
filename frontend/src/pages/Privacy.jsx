import React from "react";

const Privacy = () => {
  const lastUpdated = "March 1, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        Last updated: {lastUpdated}
      </p>

      <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
        {/* Intro */}
        <section>
          <p>
            At Medium, your privacy is important to us. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our platform, create an account, or
            interact with our services. Please read this policy carefully. By
            using Medium, you consent to the practices described herein.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            1. Information We Collect
          </h2>
          <p className="mb-3">
            We collect information you provide directly, as well as data
            generated through your use of our platform:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> When you register, we
              collect your name, email address, password, and optional profile
              details such as a bio and profile picture.
            </li>
            <li>
              <strong>Content:</strong> Any articles, comments, highlights, or
              responses you create on the platform.
            </li>
            <li>
              <strong>Usage Data:</strong> We automatically collect information
              about how you interact with Medium, including pages visited, time
              spent reading, search queries, and device/browser information.
            </li>
            <li>
              <strong>Cookies & Tracking:</strong> We use cookies and similar
              technologies to personalize your experience, analyze trends, and
              administer the site.
            </li>
          </ul>
        </section>

        {/* How We Use */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, and maintain the Medium platform.</li>
            <li>
              To personalize your experience, including content
              recommendations and curated reading lists.
            </li>
            <li>
              To communicate with you about account activity, updates, and
              promotional materials (which you can opt out of at any time).
            </li>
            <li>
              To monitor and analyze usage and trends to improve our services.
            </li>
            <li>
              To detect, prevent, and address technical issues, fraud, or abuse.
            </li>
          </ul>
        </section>

        {/* Sharing */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            3. How We Share Your Information
          </h2>
          <p className="mb-3">
            We do not sell your personal information. We may share your data in
            the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Public Content:</strong> Articles, comments, and profile
              information you choose to make public are visible to all users
              and may be indexed by search engines.
            </li>
            <li>
              <strong>Service Providers:</strong> We share data with trusted
              third-party vendors who help us operate, such as hosting
              providers, analytics services, and email delivery platforms.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              when required to comply with applicable law, regulation, or legal
              process.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            4. Data Security
          </h2>
          <p>
            We implement industry-standard security measures, including
            encryption in transit (TLS/SSL), hashed passwords, and regular
            security audits. However, no method of transmission over the
            internet is 100% secure, and we cannot guarantee absolute security.
            You are responsible for keeping your account credentials
            confidential.
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            5. Data Retention
          </h2>
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide you with our services. If you
            request account deletion, we will remove your personal data within
            30 days, except where we are required to retain it for legal or
            legitimate business purposes.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            6. Your Rights
          </h2>
          <p className="mb-3">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and receive a copy of your personal data.</li>
            <li>Rectify inaccurate or incomplete personal information.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict certain processing of your data.</li>
            <li>Data portability — receive your data in a portable format.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:privacy@medium.com"
              className="text-black dark:text-white underline hover:no-underline"
            >
              privacy@medium.com
            </a>
            .
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We'll notify
            you of any material changes by posting the new policy on this page
            and updating the "Last updated" date above. We encourage you to
            review this policy periodically.
          </p>
        </section>

        {/* Contact */}
        <section className="pb-4">
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            8. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at{" "}
            <a
              href="mailto:privacy@medium.com"
              className="text-black dark:text-white underline hover:no-underline"
            >
              privacy@medium.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
