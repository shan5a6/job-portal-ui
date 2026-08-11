import { Link } from "react-router-dom";

const CookiePolicy = () => {
  const sections = [
    {
      title: "What Are Cookies?",
      content:
        "Cookies are small text files placed on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use JobPortal.",
    },
    {
      title: "How We Use Cookies",
      content:
        "We use cookies to keep you signed in, remember your job search preferences, analyse site traffic, and improve our services. We do not use cookies to serve third-party advertising.",
    },
    {
      title: "Types of Cookies We Use",
      items: [
        {
          name: "Essential Cookies",
          description:
            "Required for core functionality such as authentication and session management. These cannot be disabled.",
        },
        {
          name: "Preference Cookies",
          description:
            "Store your settings such as theme choice (light/dark) and saved search filters so they persist between visits.",
        },
        {
          name: "Analytics Cookies",
          description:
            "Help us understand which pages are most visited and how users navigate the site, so we can improve the experience.",
        },
      ],
    },
    {
      title: "Managing Cookies",
      content:
        "You can control or delete cookies through your browser settings at any time. Note that disabling essential cookies may affect your ability to log in or use certain features of JobPortal.",
    },
    {
      title: "Third-Party Cookies",
      content:
        "We may use trusted third-party services (such as analytics providers) that set their own cookies. These are governed by the respective third-party privacy policies.",
    },
    {
      title: "Updates to This Policy",
      content:
        "We may update this Cookie Policy from time to time. Any changes will be posted on this page with a revised effective date.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 relative transition-colors duration-300">
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-purple-200/30 dark:from-primary-600/10 dark:to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-200/30 to-purple-200/30 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent mb-3">
            Cookie Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Effective date: January 1, 2026
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
            Learn how JobPortal uses cookies and how you can manage them.
          </p>
        </div>

        {/* Content card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 space-y-8 transition-colors duration-300">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-purple-500 text-white text-sm font-bold shrink-0">
                  {idx + 1}
                </span>
                {section.title}
              </h2>

              {section.content && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.items && (
                <ul className="space-y-4 mt-2">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="pl-4 border-l-2 border-primary-400 dark:border-primary-600"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {item.name}
                      </span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {idx < sections.length - 1 && (
                <hr className="mt-6 border-gray-200 dark:border-gray-700" />
              )}
            </div>
          ))}

          {/* Contact prompt */}
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Questions about our cookie practices?{" "}
              <Link
                to="/contact"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
              >
                Contact us
              </Link>{" "}
              and we'll be happy to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
