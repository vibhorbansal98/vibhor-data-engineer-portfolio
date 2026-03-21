'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const contactInfo = [
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    value: 'vibhorbansal1312@gmail.com',
    href: 'mailto:vibhorbansal1312@gmail.com',
  },
  {
    icon: <FaLinkedin size={20} />,
    label: 'LinkedIn',
    value: 'Vibhor Bansal',
    href: 'https://www.linkedin.com/in/vibhor-bansal-b8533119a',
  },
  {
    icon: <FaGithub size={20} />,
    label: 'GitHub',
    value: 'vibhor-bansal',
    href: 'https://github.com/vibhorbansal98',
  },
  {
    icon: <FiMapPin size={20} />,
    label: 'Location',
    value: 'Bangalore, India',
    href: '#',
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Portfolio Contact',
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof Errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's discuss data challenges and opportunities"
        />

        <div ref={ref} className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-4"
          >
            <p className="text-muted text-sm leading-relaxed mb-6">
              I&apos;m always open to discussing new opportunities, interesting data
              problems, or ways to collaborate on scalable data solutions.
            </p>

            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs text-muted">{info.label}</div>
                  <div className="text-sm font-medium text-foreground">
                    {info.value}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-surface border text-foreground text-sm placeholder:text-muted/60 outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-card-border focus:border-primary'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-surface border text-foreground text-sm placeholder:text-muted/60 outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-card-border focus:border-primary'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-card-border text-foreground text-sm placeholder:text-muted/60 outline-none focus:border-primary transition-colors"
              />

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-foreground text-sm placeholder:text-muted/60 outline-none resize-none transition-colors ${
                    errors.message
                      ? 'border-red-500'
                      : 'border-card-border focus:border-primary'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {submitError && (
                <p className="text-red-400 text-sm text-center">{submitError}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted || loading}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : loading
                    ? 'bg-primary/50 text-white/70 cursor-wait'
                    : 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40'
                }`}
              >
                {submitted ? (
                  '✓ Message Sent!'
                ) : loading ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend size={16} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
