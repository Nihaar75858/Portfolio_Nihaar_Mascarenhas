import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from '../components/Navbar';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SiLeetcode } from "react-icons/si";
import { FaArrowUp } from "react-icons/fa";
import { useInView } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const skills = [
  { src: '/images/Python.png', label: 'Python' },
  { src: '/images/java.png', label: 'Java' },
  { src: '/images/htmlcssjs.png', label: 'HTML, CSS, JS' },
  { src: '/images/C.png', label: 'C' },
  { src: '/images/kotlin.png', label: 'Kotlin' },
  { src: '/images/C++.png', label: 'C++' },
];

const contactLinks = [
  {
    icon: <FaGithub size={32} />,
    link: 'https://github.com/Nihaar75858',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin size={32} />,
    link: 'https://www.linkedin.com/in/nihaar-mascarenhas/',
    label: 'LinkedIn',
  },
  {
    icon: <SiLeetcode size={32} />,
    link: 'https://leetcode.com/u/CodeRider123/',
    label: 'LeetCode',
  },
  {
    icon: <IoIosMail size={32} />,
    link: 'mailto:nihar.adhiep@gmail.com',
    label: 'Mail',
  },
];

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' }, // Added education section
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [useSecondBg, setUseSecondBg] = useState(false); // Track which background to use
  const aboutRef = useRef(null);
  const aboutBarRef = useRef(null);
  const projectsBarRef = useRef(null);
  const skillsRef = useRef(null); // Ref for skills section
  const aboutBarInView = useInView(aboutBarRef, { amount: 0.4, once: false });
  const projectsBarInView = useInView(projectsBarRef, { amount: 0.4, once: false });
  const aboutInView = useInView(aboutRef, { amount: 0.4, once: false });

  // Scroll spy for navbar highlight and background change
  useEffect(() => {
    const handleScroll = () => {
      const navbarOffset = 80; // adjust if your navbar is taller/shorter
      let currentSection = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - navbarOffset <= 0) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
      setShowScrollTop(window.scrollY > 300);

      // Change background when reaching skills section
      const skillsEl = document.getElementById('skills');
      if (skillsEl) {
        const rect = skillsEl.getBoundingClientRect();
        // If the top of the skills section is at or above the navbar, show background2
        if (rect.top - navbarOffset <= 0) {
          setUseSecondBg(true);
        } else {
          setUseSecondBg(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll logic
  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    };
    const links = document.querySelectorAll('.menu li a');
    links.forEach(link => link.addEventListener('click', handleClick));
    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  };
  const { scrollY } = useScroll();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const height = useTransform(scrollY, [0, 400], [400, 600]);

  const smoothHeight = useSpring(height, {
    stiffness: 80,
    damping: 20
  });

  return (
    <div
      className="min-h-screen font-sans relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/${useSecondBg ? 'background2.svg' : 'background.svg'})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
      }}
    >
      {/* Header/Menu */}
      <Navbar sections={sections} activeSection={activeSection} />

      {/* Home Section */}
      <motion.div
        id="home"
        className="Home relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center min-h-[80vh]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="circle flex w-[800px] h-[600px] bg-dark-grey rounded-br-[600px] items-start justify-center z-0">
          <motion.img
            className="main-image ml-15 mt-12 w-2/5 h-3/5 rounded-full border-4 border-white object-cover shadow-xl relative z-10"
            src={process.env.PUBLIC_URL + '/images/Nihaar_Mascarenhas_Photo.png'}
            alt="Nihaar Mascarenhas"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="description mt-48 text-right mr-10 font-mono z-20">
          <motion.h1 className="name text-5xl font-mono" variants={fadeIn}>Nihaar Mascarenhas</motion.h1>
          <hr className="border-2 border-black my-2" />
          <motion.p className="brief text-2xl" variants={fadeIn}>I'm a Software Engineer, designated in India</motion.p>
          <div className="resume mt-12 mr-12 p-8">
            <motion.a
              className="resume-button bg-black text-pink-200 text-lg font-light px-8 py-4 rounded hover:bg-cyan-400 hover:text-white transition"
              href={process.env.PUBLIC_URL + '/Nihaar_Resume.pdf'}
              download
              whileHover={{ scale: 1.05 }}
            >
              Download Resume
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <div className="relative" id="about" ref={aboutBarRef}>
        {/* Animated Bar: Height in About, then width in Projects */}
        <motion.div
          initial={{ height: '0px', width: '12rem' }}
          animate={{
            height: aboutBarInView ? '400px' : '0px',
            left: 0,
            top: 0,
            borderBottomRightRadius: '100px',
          }}
          transition={{ height: { duration: 0.7, ease: 'easeInOut' }, width: { duration: 0.7, ease: 'easeInOut', delay: aboutBarInView && projectsBarInView ? 0.2 : 0 } }}
          className="fixed md:absolute left-0 top-0 bg-dark-grey z-10 flex items-center justify-center"
          style={{ minHeight: '0px', minWidth: '0px', height: aboutBarInView ? '400px' : '0px', width: projectsBarInView ? '100vw' : '12rem' }}
        >
          <motion.span
            className="text-white text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: aboutInView ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            About Me
          </motion.span>
        </motion.div>
        {/* About Content Animation */}
        <div ref={aboutRef} className="relative flex items-center min-h-[400px] pl-48">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: aboutInView ? 0 : -200, opacity: aboutInView ? 1 : 0 }}
            transition={{ delay: aboutInView ? 0.7 : 0, duration: 0.7, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Orange background shape */}
            <div className="absolute left-6 top-6 w-full h-full bg-black rounded-lg z-5" style={{ transform: 'skewX(-10deg)', clipPath: 'polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)' }}></div>
            {/* Cream foreground shape */}
            <div className="bg-white px-12 py-10 shadow-md relative z-10" style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)' }}>
              <p className="text-lg text-center">As a Fresher, I have developed strong skills in Java, Python, and Kotlin to develop user-focused applications. I have a solid grasp of data structures and algorithms, which sharpens my problem-solving and critical thinking abilities. I’m an effective communicator and a reliable team player, having worked hands-on across diverse projects that strengthened my collaboration and technical skills. I’m eager to take on more opportunities like these, contribute fresh energy to any team, and deliver impactful solutions. I’m always ready to connect — let’s build something exciting together!</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="min-h-full bg-dark-grey" id="projects" ref={projectsBarRef}>
        <div className="relative z-10 flex flex-col items-center min-h-[500px] pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: projectsBarInView ? 1 : 0,
              y: projectsBarInView ? 0 : 1
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-4xl font-bold mb-12 text-white"
          >
            My Projects
          </motion.h1>
          {/* Timeline Layout */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7, ease: 'easeInOut' }}
            className="w-full flex flex-col items-center"
          >
            <div className="relative w-full max-w-6xl py-30 pl-10">
              <div className="absolute top-0 h-full w-1 bg-white"></div>
              <div className="flex justify-start mb-16">
                <div className="absolute transform -translate-x-1/2 bg-cyan-200 rounded-full px-4 py-2">
                  2024-25
                </div>
                {/* Project 1 */}
                <div className="bg-cyan-100 rounded-lg px-10 py-4 shadow-md mx-4 w-full max-w-[700px] text-center">
                  <div className="flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-6">
                    {/* Text section */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 items-center space-x-2">
                        <span>MAPLMS</span>
                      </h3>
                      <p className="mt-2 text-gray-700 text-sm text-justify">
                        Developed a responsive web application for mapping course and program outcomes,
                        enabling faculty to evaluate student learning with ease. Designed direct
                        mark input for teachers with automatic attainment calculations, added
                        safeguards for data accuracy, and integrated indirect attainment tracking within a
                        Learning Management System featuring separate student and admin logins for smooth operations.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">REACTJS</span>
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">NODEJS</span>
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">MySQL</span>
                      </div>
                    </div>

                    {/* Image section */}
                    <div className="flex-1 flex justify-left items-left">
                      <img
                        src="/images/maplms.png"
                        alt="MapLMS logo"
                        className="rounded-lg shadow-md w-32 h-32"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mb-16">
                <div className="absolute right-0 top-0 h-full w-1 bg-white"></div>
                {/* Project 2 */}
                <div className="bg-cyan-100 rounded-lg px-8 py-4 shadow-md mx-4 w-full max-w-[600px] text-center">
                  <div className="flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-6">
                    {/* Image section */}
                    <div className="flex-1 flex justify-end items-right">
                      <img
                        src="/images/Caretaker.jpg"
                        alt="Caretaker logo"
                        className="rounded-lg shadow-md w-32 h-32"
                      />
                    </div>

                    {/* Text section */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 items-center space-x-2">
                        <span>Caretaker</span>
                      </h3>
                      <p className="mt-2 text-gray-700 text-sm text-justify">
                        Developed an Android app offering caregiving services for bedridden or immobile patients, with improved accessibility, user-friendly patient and caretaker profiles, and a backend system enabling easy matching and selection.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">Android Studio</span>
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">Kotlin</span>
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">Firebase</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 transform translate-x-1/2 bg-cyan-200 rounded-full px-4 py-2">
                  24
                </div>
              </div>
              {/* Left line continues */}
              <div className="relative flex justify-start mb-16 pb-16">

                {/* Optional circle */}
                <div className="absolute -translate-x-1/2 bg-cyan-200 rounded-full px-4 py-2">
                  2024
                </div>
                {/* Project 3 */}
                <div className="bg-cyan-100 rounded-lg px-8 py-4 shadow-md mx-4 w-full max-w-[600px] text-center">
                  <div className="flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-6">
                    {/* Text section */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 items-center space-x-2">
                        <span>MindCare</span>
                      </h3>
                      <p className="mt-2 text-gray-700 text-sm text-justify">
                        Developed an informative mental health app featuring a calming chatbot, disorder manuals, and helpline resources, with a user-friendly UI/UX for easy navigation and support.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">Android Studio</span>
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">Kotlin</span>
                      </div>
                    </div>

                    {/* Image section */}
                    <div className="flex-1 flex justify-left items-left">
                      <img
                        src="/images/MindCare.png"
                        alt="MindCare logo"
                        className="rounded-lg shadow-md w-32 h-32"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills and Internships Section */}
      <motion.div
        id="skills"
        ref={skillsRef}
        className="projects text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="languages mt-20 bg-blue-50 rounded-[50px] pb-5">
          <div id="skills"></div>
          <h1 className="h1 pt-5 text-3xl font-bold shared-colors">MY SKILLS</h1>
          <div className="language-card grid grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                className="images mt-12 mx-[35%] mb-12 shadow-md grid grid-cols-1 items-center bg-white rounded-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08 }}
              >
                <img className="language-images w-40" src={process.env.PUBLIC_URL + skill.src} alt={skill.label} />
                <h3 className="text-lg font-semibold">{skill.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Education Section (timeline with center line and attached cards) */}
      <div className="min-h-full bg-gray-50 mt-16" id="education">
        <div className="relative z-10 flex flex-col items-center min-h-[500px] pt-16">
          <h1 className="text-4xl font-bold mb-12 text-black">My Educational Journey</h1>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-4xl py-20">
              {/* Vertical center line */}
              <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2 z-0"></div>
              {/* College (left) */}
              <div className="flex w-full mb-16 justify-start relative">
                <div className="w-1/2 flex justify-end pr-8">
                  <div className="bg-white rounded-lg px-10 py-4 shadow-md max-w-[400px] text-left z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">VASANTDADA PATIL PRATHISTHAN COLLEGE OF ENGINEERING</h3>
                    <div className="text-gray-700 font-semibold mb-1">Mumbai University (MU)</div>
                    <div className="text-gray-700 mb-2">I'm Pre-Final year student pursuing Bachelors in Engineering in Information Technology</div>
                    <ul className="list-disc ml-5 text-gray-700">
                      <li>CGPA : 8.0 / 10</li>
                    </ul>
                  </div>
                </div>
                {/* Timeline dot and date */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                  <div className="bg-white border border-gray-300 rounded-full p-3 shadow text-2xl">🎓</div>
                  <div className="bg-gray-100 rounded-full px-4 py-2 mt-2 text-gray-600 text-sm">2021 - 2025</div>
                </div>
                <div className="w-1/2"></div>
              </div>
              {/* HSC (right) */}
              <div className="flex w-full mb-16 justify-end relative">
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                  <div className="bg-white border border-gray-300 rounded-full p-3 shadow text-2xl">🏛️</div>
                  <div className="bg-gray-100 rounded-full px-4 py-2 mt-2 text-gray-600 text-sm">2021</div>
                </div>
                <div className="w-1/2 flex justify-start pl-8">
                  <div className="bg-white rounded-lg px-8 py-4 shadow-md max-w-[400px] text-left z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Wilson College, Mumbai</h3>
                    <div className="text-gray-700 font-semibold mb-1">Maharashtra State Board (HSC)</div>
                    <ul className="list-disc ml-5 text-gray-700">
                      <li>Percentage: 88.50 / 100</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* SSC (left) */}
              <div className="flex w-full mb-16 justify-start relative">
                <div className="w-1/2 flex justify-end pr-8">
                  <div className="bg-white rounded-lg px-8 py-4 shadow-md max-w-[400px] text-left z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Holy Cross High School, Mumbai</h3>
                    <div className="text-gray-700 font-semibold mb-1">Maharashtra State Board (SSC)</div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                  <div className="bg-white border border-gray-300 rounded-full p-3 shadow text-2xl">🏫</div>
                  <div className="bg-gray-100 rounded-full px-4 py-2 mt-2 text-gray-600 text-sm">2019</div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        className="contact mt-24 text-center px-4 pb-16"
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-3xl font-bold mb-2">CONTACT ME</h1>
        <p className="mb-4 font-semibold">Know about me more! Let me know if you're interested.</p>
        <div className="contact-logo flex justify-center space-x-6 mb-4">
          {contactLinks.map(({ icon, link, label }, i) => (
            <motion.a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-cyan-500 transition-colors duration-300"
              whileHover={{ scale: 1.25 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              aria-label={label}
            >
              {icon}
            </motion.a>
          ))}
        </div>
        <div className="resume my-12">
          <motion.a
            className="resume-button bg-black text-pink-200 text-lg font-light px-8 py-4 rounded hover:bg-cyan-400 hover:text-white transition"
            href={process.env.PUBLIC_URL + '/Nihaar_Resume.pdf'}
            download
            whileHover={{ scale: 1.05 }}
          >
            Download Resume
          </motion.a>
        </div>
        <div className="contact-location mb-4">
          <p>Or you can contact me from here:</p>
        </div>
        {/* Contact Form */}
        <ContactForm />
      </motion.div>

      {/* Footer */}
      <footer className="text-center py-4 bg-black text-white mt-8">
        <p>Copyright 2024| All rights reserved</p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
} 