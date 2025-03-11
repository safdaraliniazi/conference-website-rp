import { Typography, IconButton } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

const SITEMAP = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/home" },
      { name: "Submission", href: "/submission" },
      { name: "Important Dates", href: "/important-dates" },
      { name: "Registration", href: "/registration" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Committee", href: "/committee" },
      { name: "Venue & Accommodation", href: "/venue-accommodation" },
      { name: "Contact Us", href: "/contact" },
      { name: "Past Conferences", href: "/past-conferences" },
    ],
  },
  {
    title: "Contact",
    info: [
      "Department of Industrial Design",
      "National Institute of Technology Rourkela",
      "Odisha, India - 769008",
      "Email: ipdims2024@nitrkl.ac.in",
      "Phone: +91-XXX-XXX-XXXX"
    ]
  }
];

const SOCIAL_LINKS = [
  { icon: "fa-brands fa-twitter", href: "#", label: "Twitter" },
  { icon: "fa-brands fa-linkedin", href: "#", label: "LinkedIn" },
  { icon: "fa-brands fa-instagram", href: "#", label: "Instagram" },
  { icon: "fa-brands fa-youtube", href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative bg-gray-50/50 pt-24 pb-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/30" />

      <div className="container mx-auto relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Typography variant="h5" className="mb-6 font-bold text-gray-900">
              IPDIMS 2024
            </Typography>
            <Typography className="font-normal text-gray-600 mb-6">
              International Conference on Industrial Product Design for Industry 4.0 and Manufacturing Systems
            </Typography>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <IconButton
                  key={label}
                  variant="text"
                  size="sm"
                  className="hover:bg-orange-500/10 focus:bg-orange-500/10 active:bg-orange-500/10"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <i className={`${icon} text-lg text-orange-500`} />
                  </a>
                </IconButton>
              ))}
            </div>
          </div>

          {/* Sitemap Sections */}
          {SITEMAP.map(({ title, links, info }) => (
            <div key={title} className="col-span-1">
              <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                {title}
              </Typography>
              {links && (
                <ul className="space-y-2">
                  {links.map(({ name, href }) => (
                    <li key={name}>
                      <NavLink to={href}>
                        <Typography
                          className="font-normal text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {name}
                        </Typography>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
              {info && (
                <div className="space-y-2">
                  {info.map((text, index) => (
                    <Typography
                      key={index}
                      className="font-normal text-gray-600"
                    >
                      {text}
                    </Typography>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-gray-200/80" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <Typography className="text-gray-600 text-center font-normal">
            &copy; {CURRENT_YEAR} IPDIMS. All rights reserved.
          </Typography>
          <Typography className="text-gray-600 text-center font-normal">
            Made with ❤️ by Department of Industrial Design, NIT Rourkela
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
