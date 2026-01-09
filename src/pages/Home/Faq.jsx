import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Faq= () => {
  const faqs = [
    {
      question: "How do I hire a tutor?",
      answer:
        "It's simple! Browse the 'Tuitions' page, filter by your requirements, and view tutor profiles. Once you find a match, you can contact them directly or post a tuition requirement for tutors to apply.",
    },
    {
      question: "Is payment secure?",
      answer:
        "Yes, absolutely. We use Stripe for all transactions, ensuring industry-standard encryption and security for both students and tutors.",
    },
    {
      question: "Can tutors apply for multiple jobs?",
      answer:
        "Yes! Verified tutors can apply to multiple tuition posts that match their expertise and schedule. You can track all your applications in your dashboard.",
    },
    {
      question: "Is there a service fee?",
      answer:
        "Registration is free! We charge a small service fee only upon a successful hiring connection to maintain platform security and support.",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <FaQuestionCircle /> Help Center
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-base-content/60">
            Everything you need to know about the platform.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 border border-base-200 rounded-xl hover:border-primary/40 transition-colors duration-300 shadow-sm"
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              
              <div className="collapse-title text-lg font-semibold text-base-content pr-12">
                {item.question}
              </div>
              
              <div className="collapse-content">
                <p className="text-base-content/70 leading-relaxed border-t border-base-100 pt-3">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Faq;