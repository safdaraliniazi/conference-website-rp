"use client";

import React from "react";
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { QuestionMarkCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const FAQS = [
  {
    title: "How do I submit my paper to IPDIMS 2024?",
    desc: "You can submit your paper through our online submission system. First, register on the website, then go to the submission portal where you can upload your paper in the required format. Make sure your paper follows the Springer conference proceedings format and guidelines.",
  },
  {
    title: "What are the registration fees and what is included?",
    desc: "The registration fees vary based on your category (Student/Faculty/Industry Professional) and whether you're a national or international participant. The fee includes conference kit, lunch and refreshments during the conference days, access to all technical sessions, and publication charges for accepted papers.",
  },
  {
    title: "What is the format for paper submission?",
    desc: "Papers must be submitted in English and follow the Springer conference proceedings format. The maximum page length is typically 8-10 pages. Authors should use the Springer paper template which is available on the submission page. All figures and tables should be of high quality and properly cited.",
  },
  {
    title: "Will the conference be held in online or offline mode?",
    desc: "IPDIMS 2024 will be conducted in offline mode at the Department of Industrial Design, National Institute of Technology Rourkela. All presenters are expected to attend in person to present their papers.",
  },
  {
    title: "What is the review process for submitted papers?",
    desc: "All submitted papers undergo a double-blind peer review process. Each paper is reviewed by at least two experts in the field. Authors will receive detailed feedback and the final decision (Accept/Reject/Revise) through their registered email.",
  },
  {
    title: "Is accommodation available for conference attendees?",
    desc: "Yes, limited accommodation is available in the institute guest house on a first-come-first-served basis. Additionally, hostel accommodation for students can be arranged. There are also several hotels near the campus. Details about accommodation options and booking will be provided after paper acceptance.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
            <QuestionMarkCircleIcon className="h-8 w-8 text-orange-500" />
          </div>
          <Typography variant="h6" className="text-center mb-2 text-orange-500 font-semibold">
            FAQ
          </Typography>
          <Typography variant="h3" className="text-center text-gray-900 font-bold mb-4">
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="lead"
            className="text-center text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about IPDIMS 2024. If you don't find what you're looking for, feel free to contact us.
          </Typography>
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-3xl mx-auto">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              className="mb-4 rounded-lg border border-orange-100 px-4 bg-white hover:bg-orange-50/50 transition-colors"
            >
              <AccordionHeader
                onClick={() => handleOpen(key + 1)}
                className={`border-b-0 transition-colors ${open === key + 1 ? "text-orange-500 hover:text-orange-700" : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-transform ${open === key + 1 ? "rotate-180 text-orange-500" : "text-gray-400"
                      }`}
                  />
                  <span className="font-medium">{title}</span>
                </div>
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                <div className="pl-9 text-gray-600">
                  {desc}
                </div>
              </AccordionBody>
            </Accordion>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <Typography variant="h6" className="text-gray-600 mb-4">
            Still have questions?
          </Typography>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-700 font-medium transition-colors"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Faq;
