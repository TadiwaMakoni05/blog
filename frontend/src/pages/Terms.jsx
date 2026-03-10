import React from "react";

const Terms = () => {
  const lastUpdated = "March 1, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        Last updated: {lastUpdated}
      </p>

      <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
        {/* Intro */}
        <section>
          <p>
            Welcome to Medium. By accessing or using our platform, you agree to
            be bound by these Terms of Service ("Terms"). If you do not agree to
            these Terms, you may not use Medium. Please read them carefully.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            1. Eligibility
          </h2>
          <p>
            You must be at least 13 years old to use Medium. If you are under 18,
            you may only use Medium with the involvement of a parent or legal
            guardian who agrees to be bound by these Terms. By using Medium, you
            represent and warrant that you meet these eligibility requirements.
          </p>
        </section>

        {/* Account */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            2. Your Account
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities conducted through your
            account. You agree to provide accurate, current, and complete
            information during registration and to update such information as
            needed. We reserve the right to suspend or terminate accounts that
            violate these Terms.
          </p>
        </section>

        {/* Content & Ownership */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            3. Content & Ownership
          </h2>
          <p className="mb-3">
            You retain ownership of all content you create and publish on
            Medium. By posting content, you grant Medium a non-exclusive,
            worldwide, royalty-free license to use, display, distribute, and
            promote your content in connection with the platform.
          </p>
          <p>
            You are solely responsible for the content you publish. Content
            must not infringe on intellectual property rights, contain false or
            misleading information, promote violence or hatred, or violate any
            applicable law.
          </p>
        </section>

        {/* Acceptable Use */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            4. Acceptable Use
          </h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use Medium for any illegal purpose or in violation of any local,
              state, national, or international law.
            </li>
            <li>
              Post spam, malware, or deceptive content designed to mislead
              readers.
            </li>
            <li>
              Harass, threaten, or intimidate other users, or engage in hate
              speech or discrimination.
            </li>
            <li>
              Attempt to gain unauthorized access to other users' accounts or
              Medium's systems and infrastructure.
            </li>
            <li>
              Use automated tools (bots, scrapers) to access Medium without
              prior written permission.
            </li>
            <li>
              Manipulate engagement metrics, including artificial claps,
              follows, or views.
            </li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            5. Intellectual Property
          </h2>
          <p>
            The Medium name, logo, trademarks, and all related names, logos,
            product and service names, designs, and slogans are trademarks of
            Medium or its affiliates. The platform's design, layout, look, and
            feel are protected by intellectual property laws. You may not copy,
            imitate, or use them without our prior written permission.
          </p>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            6. Termination
          </h2>
          <p>
            We may suspend or terminate your access to Medium at our sole
            discretion, without notice, for conduct that we believe violates
            these Terms or is harmful to other users, Medium, or third parties,
            or for any other reason. You may delete your account at any time
            through your account settings.
          </p>
        </section>

        {/* Disclaimers */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            7. Disclaimers
          </h2>
          <p>
            Medium is provided "as is" and "as available" without warranties of
            any kind, either express or implied. We do not warrant that the
            service will be uninterrupted, secure, or error-free. We are not
            responsible for the accuracy, reliability, or completeness of any
            user-generated content on the platform.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            8. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, Medium shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits, data, or goodwill,
            arising out of or in connection with your access to or use of the
            platform. Our total liability to you for any claims arising from
            these Terms shall not exceed the amount you have paid to Medium in
            the twelve months preceding the claim.
          </p>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            9. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of California, United States, without regard
            to its conflict of law provisions. Any disputes arising from these
            Terms or your use of Medium shall be resolved exclusively in the
            state or federal courts located in San Francisco County, California.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            10. Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make
            material changes, we will notify you by email or through a notice on
            the platform. Your continued use of Medium after such changes
            constitutes acceptance of the revised Terms.
          </p>
        </section>

        {/* Contact */}
        <section className="pb-4">
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">
            11. Contact Us
          </h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a
              href="mailto:legal@medium.com"
              className="text-black dark:text-white underline hover:no-underline"
            >
              legal@medium.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
