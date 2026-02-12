// src/index.tsx
import React6 from "react";
import ReactDOM from "react-dom/client";

// src/App.tsx
import { useState as useState5, useEffect as useEffect2 } from "react";

// src/types.ts
var PageView = /* @__PURE__ */ ((PageView2) => {
  PageView2["HOME"] = "HOME";
  PageView2["SERVICES"] = "SERVICES";
  PageView2["COMPANION"] = "COMPANION";
  PageView2["BLOG"] = "BLOG";
  PageView2["BLOG_POST"] = "BLOG_POST";
  PageView2["REVIEWS"] = "REVIEWS";
  PageView2["CONTACT"] = "CONTACT";
  return PageView2;
})(PageView || {});

// src/constants.ts
var SERVICES = [
  {
    id: "private-reading",
    title: "Private Mediumship Reading",
    description: "A deeply personal 1:1 session with Dez to connect with your departed loved ones, receive messages of validation, and find closure.",
    price: "$250 / session",
    features: ["60-minute Zoom session", "Recording included", "Pre-session energy clearing", "Follow-up integration email"],
    cta: "Book Your Session"
  },
  {
    id: "coaching-program",
    title: "Soul Connection Pathway",
    description: "A comprehensive 3-month coaching program designed to help you navigate grief and unlock your own intuitive abilities.",
    price: "",
    features: ["Bi-weekly 1:1 coaching", "Access to exclusive community", "Guided meditation library", "Personalized spiritual roadmap"],
    cta: "Coming Soon"
  },
  {
    id: "membership",
    title: "Soul Connection Membership",
    description: "Join our compassionate community for ongoing support, monthly group readings, and exclusive content.",
    price: "",
    features: ["Monthly Live Q&A with Dez", "Private Community Forum", "New Meditations Monthly", "Discounts on Workshops"],
    cta: "Coming Soon"
  }
];
var TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah M.",
    location: "Austin, TX",
    text: "I was skeptical at first, but Dez knew things no one else could possibly know. connecting with my father brought me a peace I haven't felt in years.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    id: "2",
    name: "James R.",
    location: "London, UK",
    text: "The Soul Connection Pathway changed my life. I went from drowning in grief to feeling empowered and connected to my wife in a new way.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    id: "3",
    name: "Elena K.",
    location: "Toronto, CA",
    text: "Dez has a gift that is truly otherworldly, yet she is so grounded and kind. Her guidance is pure light.",
    avatar: "https://picsum.photos/100/100?random=3"
  }
];
var BLOG_POSTS = [
  {
    id: "1",
    title: "Signs Your Loved Ones Are Near",
    excerpt: "Have you ever smelled a familiar perfume or seen a specific bird repeatedly? These might be messages from the other side.",
    content: 'The journey of grief is often accompanied by a deep longing for one more sign, one more word, or one more moment of connection. In my years as a medium, I have seen countless ways the spirit world reaches out to us. \n\nSigns are rarely a booming voice from the sky. More often, they are whispers in the physical world. Perhaps it is a song that plays on the radio exactly when you were thinking of them, or a butterfly that lingers longer than usual. These are not coincidences; they are "soul-incidences." \n\nLearning to trust these signs is the first step in healing the rift that physical loss creates. Your loved ones are not gone; they have simply changed form, and they are eager to let you know that love never dies.',
    date: "Oct 12, 2023",
    imageUrl: "https://picsum.photos/800/600?random=4",
    category: "Spirituality"
  },
  {
    id: "2",
    title: "Navigating Grief During the Holidays",
    excerpt: "The festive season can be incredibly difficult after a loss. Here are practical tools for honoring your grief while finding moments of peace.",
    content: 'When the world is decorated in lights and filled with the sound of laughter, the silence left behind by a loved one can feel deafening. Grief doesn\u2019t take a holiday; in fact, it often intensifies during these times. \n\nMy advice to those navigating this difficult season is to give yourself permission to feel exactly as you do. You do not owe anyone a "happy" version of yourself. \n\nConsider creating a new tradition to honor your loved one. Light a special candle at the dinner table, or donate to a cause they were passionate about. By inviting their memory into your present, you bridge the gap between "what was" and "what is," allowing love to be the common thread.',
    date: "Nov 05, 2023",
    imageUrl: "https://picsum.photos/800/600?random=5",
    category: "Healing"
  },
  {
    id: "3",
    title: "Awakening Your Intuition",
    excerpt: "We are all born with a sixth sense. Learn three simple daily exercises to start trusting your inner guidance system.",
    content: 'Intuition is not a gift reserved for the few; it is a spiritual muscle we all possess. We often ignore that "gut feeling" or quiet inner voice in favor of logic, but your soul speaks in whispers that can guide you through life\u2019s toughest transitions. \n\nTo begin awakening your intuition, start with silence. Even five minutes of quiet contemplation daily can clear the "static" of modern life. \n\nSecond, pay attention to your physical reactions. Your body often knows the truth before your mind does. Finally, keep an intuition journal. Write down your hunches and see how often they come true. Over time, you will develop a profound trust in your own inner compass.',
    date: "Dec 01, 2023",
    imageUrl: "https://picsum.photos/800/600?random=6",
    category: "Development"
  }
];

// src/components/Navbar.tsx
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Navbar = ({ currentView, setView, onOpenSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Home", value: "HOME" /* HOME */ },
    { label: "Services", value: "SERVICES" /* SERVICES */ },
    { label: "Grief Companion AI", value: "COMPANION" /* COMPANION */ },
    { label: "Reviews", value: "REVIEWS" /* REVIEWS */ },
    { label: "Blog", value: "BLOG" /* BLOG */ },
    { label: "Contact", value: "CONTACT" /* CONTACT */ }
  ];
  const handleNavClick = (view) => {
    setView(view);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs("nav", { className: "sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-100 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleNavClick("HOME" /* HOME */),
          className: "flex-shrink-0 flex items-center gap-2 cursor-pointer",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-blue-400 flex items-center justify-center text-white font-serif font-bold text-xl", children: "D" }),
            /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl font-semibold text-slate-800 tracking-wide", children: [
              "Crossing Over ",
              /* @__PURE__ */ jsx("span", { className: "text-brand-600 font-normal text-base", children: "with Dez" })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-6", children: [
        navLinks.map((link) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleNavClick(link.value),
            className: `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentView === link.value ? "text-brand-700 bg-brand-50" : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"}`,
            children: link.label
          },
          link.value
        )),
        /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-slate-200 mx-2" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onOpenSettings,
            className: "p-2 text-slate-400 hover:text-brand-600 transition-colors rounded-full hover:bg-slate-50",
            title: "Site Settings",
            children: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg", children: "Book Now" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center md:hidden", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onOpenSettings,
            className: "mr-2 p-2 text-slate-400 hover:text-brand-600 transition-colors",
            children: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: "inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
              isOpen ? /* @__PURE__ */ jsx("svg", { className: "block h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { className: "block h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
            ]
          }
        )
      ] })
    ] }) }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-white border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleNavClick(link.value),
          className: `block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentView === link.value ? "text-brand-700 bg-brand-50" : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"}`,
          children: link.label
        },
        link.value
      )),
      /* @__PURE__ */ jsx("button", { className: "w-full mt-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 rounded-md text-base font-medium transition-all", children: "Book Now" })
    ] }) })
  ] });
};
var Navbar_default = Navbar;

// src/components/Hero.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Hero = ({ onCtaClick, imageUrl }) => {
  return /* @__PURE__ */ jsxs2("div", { className: "relative overflow-hidden bg-white", children: [
    /* @__PURE__ */ jsx2("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs2("div", { className: "relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32", children: [
      /* @__PURE__ */ jsx2(
        "svg",
        {
          className: "hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2",
          fill: "currentColor",
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx2("polygon", { points: "50,0 100,0 50,100 0,100" })
        }
      ),
      /* @__PURE__ */ jsx2("main", { className: "mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28", children: /* @__PURE__ */ jsxs2("div", { className: "sm:text-center lg:text-left", children: [
        /* @__PURE__ */ jsx2("span", { className: "inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4 tracking-wide uppercase", children: "Bridging Worlds" }),
        /* @__PURE__ */ jsxs2("h1", { className: "text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl font-serif", children: [
          /* @__PURE__ */ jsx2("span", { className: "block xl:inline", children: "Healing Hearts," }),
          " ",
          /* @__PURE__ */ jsx2("span", { className: "block text-brand-600 xl:inline", children: "Guiding Souls." })
        ] }),
        /* @__PURE__ */ jsx2("p", { className: "mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light", children: "Crossing Over with Dez is your sanctuary for connection. Whether you seek a message from a loved one, grief support, or to awaken your own intuition, you are welcome here." }),
        /* @__PURE__ */ jsxs2("div", { className: "mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start", children: [
          /* @__PURE__ */ jsx2("div", { className: "rounded-md shadow", children: /* @__PURE__ */ jsx2(
            "button",
            {
              onClick: onCtaClick,
              className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg transition-all",
              children: "Explore Services"
            }
          ) }),
          /* @__PURE__ */ jsx2("div", { className: "mt-3 sm:mt-0 sm:ml-3", children: /* @__PURE__ */ jsx2(
            "button",
            {
              disabled: true,
              className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-400 bg-slate-100 cursor-not-allowed md:py-4 md:text-lg transition-all",
              children: "Coming Soon"
            }
          ) })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { className: "lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2", children: [
      /* @__PURE__ */ jsx2(
        "img",
        {
          className: "h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90 transition-opacity duration-700",
          src: imageUrl,
          alt: "Ethereal landscape with peaceful light"
        }
      ),
      /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:via-white/20" })
    ] })
  ] });
};
var Hero_default = Hero;

// src/components/GriefCompanion.tsx
import { useState as useState2, useRef, useEffect } from "react";

// src/services/geminiService.ts
var sendMessageToGemini = async (history, newMessage) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        history,
        newMessage
      })
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    return "I apologize, I am experiencing a temporary disconnection. Please breathe deeply and try again in a moment.";
  }
};

// src/components/GriefCompanion.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var GriefCompanion = () => {
  const [messages, setMessages] = useState2([
    {
      id: "welcome",
      role: "model",
      text: "Hello. I am your Personalized Grief Companion. I'm here to offer a safe space for you to share your feelings, find a moment of peace, or simply breathe. How is your heart feeling today?",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]);
  const [input, setInput] = useState2("");
  const [isLoading, setIsLoading] = useState2(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const historyContext = messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`);
      const responseText = await sendMessageToGemini(historyContext, userMsg.text);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[600px] max-w-4xl mx-auto my-8", children: [
    /* @__PURE__ */ jsx3("div", { className: "bg-gradient-to-r from-brand-500 to-blue-500 p-4 text-white", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx3("div", { className: "p-2 bg-white/20 rounded-full", children: /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx3("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }) }),
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx3("h2", { className: "text-lg font-semibold", children: "Grief Companion" }),
        /* @__PURE__ */ jsx3("p", { className: "text-xs text-brand-100 opacity-90", children: "Powered by AI \u2022 Always here to listen" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs3("div", { className: "flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50", children: [
      messages.map((msg) => /* @__PURE__ */ jsx3(
        "div",
        {
          className: `flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxs3(
            "div",
            {
              className: `max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${msg.role === "user" ? "bg-brand-600 text-white rounded-br-none" : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"}`,
              children: [
                /* @__PURE__ */ jsx3("p", { className: "whitespace-pre-wrap leading-relaxed", children: msg.text }),
                /* @__PURE__ */ jsx3("span", { className: `text-[10px] block mt-2 opacity-70 ${msg.role === "user" ? "text-brand-100 text-right" : "text-slate-400"}`, children: msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
              ]
            }
          )
        },
        msg.id
      )),
      isLoading && /* @__PURE__ */ jsx3("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx3("div", { className: "bg-white border border-slate-200 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm", children: /* @__PURE__ */ jsxs3("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx3("div", { className: "w-2 h-2 bg-brand-400 rounded-full animate-bounce", style: { animationDelay: "0ms" } }),
        /* @__PURE__ */ jsx3("div", { className: "w-2 h-2 bg-brand-400 rounded-full animate-bounce", style: { animationDelay: "150ms" } }),
        /* @__PURE__ */ jsx3("div", { className: "w-2 h-2 bg-brand-400 rounded-full animate-bounce", style: { animationDelay: "300ms" } })
      ] }) }) }),
      /* @__PURE__ */ jsx3("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "p-4 bg-white border-t border-slate-100", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex gap-2 relative", children: [
        /* @__PURE__ */ jsx3(
          "textarea",
          {
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: handleKeyPress,
            placeholder: "Share your thoughts...",
            className: "w-full resize-none rounded-lg border border-slate-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 p-3 pr-12 text-slate-700 bg-slate-50 focus:bg-white transition-colors",
            rows: 2
          }
        ),
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: handleSend,
            disabled: isLoading || !input.trim(),
            className: "absolute right-2 top-2 p-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            children: /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { fillRule: "evenodd", d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx3("p", { className: "text-xs text-slate-400 mt-2 text-center", children: "This is an AI companion. Please seek professional help for urgent mental health crises." })
    ] })
  ] });
};
var GriefCompanion_default = GriefCompanion;

// src/components/ServiceCard.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var ServiceCard = ({ service }) => {
  const isComingSoon = service.cta === "Coming Soon";
  return /* @__PURE__ */ jsxs4("div", { className: "bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs4("div", { className: "p-8 flex-1", children: [
      /* @__PURE__ */ jsx4("h3", { className: "text-2xl font-serif font-semibold text-slate-800 mb-2", children: service.title }),
      service.price && /* @__PURE__ */ jsx4("p", { className: "text-brand-600 font-medium text-lg mb-4", children: service.price }),
      /* @__PURE__ */ jsx4("p", { className: "text-slate-600 mb-6 leading-relaxed", children: service.description }),
      /* @__PURE__ */ jsx4("ul", { className: "space-y-3 mb-8", children: service.features.map((feature, idx) => /* @__PURE__ */ jsxs4("li", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx4("svg", { className: "h-5 w-5 text-green-500 mr-2 flex-shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx4("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
        /* @__PURE__ */ jsx4("span", { className: "text-slate-500 text-sm", children: feature })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "p-6 bg-slate-50 border-t border-slate-100", children: /* @__PURE__ */ jsx4(
      "button",
      {
        disabled: isComingSoon,
        className: `w-full py-3 px-4 rounded-lg font-medium transition-colors ${isComingSoon ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-800 text-white hover:bg-slate-700"}`,
        children: service.cta
      }
    ) })
  ] });
};
var ServiceCard_default = ServiceCard;

// src/components/BlogPostDetail.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var BlogPostDetail = ({ post, onBack }) => {
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2]",
      icon: /* @__PURE__ */ jsx5("svg", { fill: "currentColor", viewBox: "0 0 24 24", className: "h-5 w-5", children: /* @__PURE__ */ jsx5("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#000000]",
      icon: /* @__PURE__ */ jsx5("svg", { fill: "currentColor", viewBox: "0 0 24 24", className: "h-5 w-5", children: /* @__PURE__ */ jsx5("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0077b5]",
      icon: /* @__PURE__ */ jsx5("svg", { fill: "currentColor", viewBox: "0 0 24 24", className: "h-5 w-5", children: /* @__PURE__ */ jsx5("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
    }
  ];
  const handleShare = (url) => {
    window.open(url, "_blank", "width=600,height=400");
  };
  return /* @__PURE__ */ jsxs5("article", { className: "max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white", children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        onClick: onBack,
        className: "flex items-center text-brand-600 hover:text-brand-700 font-medium mb-8 transition-colors group",
        children: [
          /* @__PURE__ */ jsx5("svg", { className: "h-5 w-5 mr-1 transform group-hover:-translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
          "Back to Blog"
        ]
      }
    ),
    /* @__PURE__ */ jsxs5("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx5("span", { className: "bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider", children: post.category }),
        /* @__PURE__ */ jsx5("time", { className: "text-slate-500 text-sm", dateTime: post.date, children: post.date })
      ] }),
      /* @__PURE__ */ jsx5("h1", { className: "text-4xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6", children: post.title }),
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-4 py-6 border-y border-slate-100 mb-10", children: [
        /* @__PURE__ */ jsx5("span", { className: "text-sm font-medium text-slate-500", children: "Share this post:" }),
        /* @__PURE__ */ jsx5("div", { className: "flex gap-2", children: shareLinks.map((link) => /* @__PURE__ */ jsx5(
          "button",
          {
            onClick: () => handleShare(link.url),
            className: `${link.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity shadow-sm`,
            title: `Share on ${link.name}`,
            children: link.icon
          },
          link.name
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { className: "mb-12 rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx5(
      "img",
      {
        src: post.imageUrl,
        alt: post.title,
        className: "w-full h-[400px] object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxs5("div", { className: "prose prose-lg prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx5("p", { className: "text-xl text-slate-600 leading-relaxed mb-8 italic", children: post.excerpt }),
      /* @__PURE__ */ jsx5("div", { className: "text-slate-800 leading-relaxed whitespace-pre-wrap", children: post.content })
    ] }),
    /* @__PURE__ */ jsx5("footer", { className: "mt-16 pt-8 border-t border-slate-100", children: /* @__PURE__ */ jsxs5("div", { className: "bg-brand-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6", children: [
      /* @__PURE__ */ jsx5("div", { className: "w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-serif font-bold", children: "D" }),
      /* @__PURE__ */ jsxs5("div", { className: "text-center sm:text-left", children: [
        /* @__PURE__ */ jsx5("h4", { className: "text-lg font-bold text-slate-900 mb-1", children: "About the Author" }),
        /* @__PURE__ */ jsx5("p", { className: "text-slate-600", children: "Dez is a spiritual medium and grief guide dedicated to helping others find peace, connection, and spiritual clarity through their most difficult transitions." })
      ] })
    ] }) })
  ] });
};
var BlogPostDetail_default = BlogPostDetail;

// src/components/SettingsModal.tsx
import { useState as useState3 } from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var SettingsModal = ({
  isOpen,
  onClose,
  heroImageUrl,
  setHeroImageUrl,
  blogPosts,
  updateBlogPostImage,
  testimonials,
  updateTestimonialAvatar,
  onAddTestimonial,
  onDeleteTestimonial,
  onReset
}) => {
  const [newReview, setNewReview] = useState3({ name: "", location: "", text: "", avatar: "" });
  if (!isOpen) return null;
  const handleAddNewReview = () => {
    if (!newReview.name || !newReview.text) {
      alert("Name and Message are required.");
      return;
    }
    onAddTestimonial({
      ...newReview,
      avatar: newReview.avatar || `https://picsum.photos/100/100?random=${Date.now()}`
    });
    setNewReview({ name: "", location: "", text: "", avatar: "" });
  };
  return /* @__PURE__ */ jsx6("div", { className: "fixed inset-0 z-[100] overflow-y-auto", children: /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0", children: [
    /* @__PURE__ */ jsx6("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", onClick: onClose, children: /* @__PURE__ */ jsx6("div", { className: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm" }) }),
    /* @__PURE__ */ jsx6("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "\u200B" }),
    /* @__PURE__ */ jsxs6("div", { className: "inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full", children: [
      /* @__PURE__ */ jsxs6("div", { className: "bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4", children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx6("h3", { className: "text-2xl font-serif font-bold text-slate-900", children: "Site Settings" }),
          /* @__PURE__ */ jsx6("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-600", children: /* @__PURE__ */ jsx6("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx6("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "space-y-8 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar", children: [
          /* @__PURE__ */ jsxs6("section", { className: "bg-slate-50 p-4 rounded-xl", children: [
            /* @__PURE__ */ jsx6("h4", { className: "text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3", children: "Hero Image" }),
            /* @__PURE__ */ jsxs6("div", { className: "flex gap-4 items-center", children: [
              /* @__PURE__ */ jsx6("img", { src: heroImageUrl, className: "w-16 h-16 rounded-lg object-cover bg-white", alt: "Preview" }),
              /* @__PURE__ */ jsx6("div", { className: "flex-1", children: /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  value: heroImageUrl,
                  onChange: (e) => setHeroImageUrl(e.target.value),
                  placeholder: "Image URL...",
                  className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-brand-500 focus:border-brand-500"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs6("section", { className: "bg-slate-50 p-4 rounded-xl border border-brand-100", children: [
            /* @__PURE__ */ jsx6("h4", { className: "text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4", children: "Add New Review" }),
            /* @__PURE__ */ jsxs6("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  value: newReview.name,
                  onChange: (e) => setNewReview({ ...newReview, name: e.target.value }),
                  placeholder: "Reviewer Name",
                  className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                }
              ),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  value: newReview.location,
                  onChange: (e) => setNewReview({ ...newReview, location: e.target.value }),
                  placeholder: "Location (e.g. Austin, TX)",
                  className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                }
              ),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  value: newReview.avatar,
                  onChange: (e) => setNewReview({ ...newReview, avatar: e.target.value }),
                  placeholder: "Avatar Image URL (Optional)",
                  className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                }
              ),
              /* @__PURE__ */ jsx6(
                "textarea",
                {
                  value: newReview.text,
                  onChange: (e) => setNewReview({ ...newReview, text: e.target.value }),
                  placeholder: "Their Message...",
                  className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-md",
                  rows: 2
                }
              ),
              /* @__PURE__ */ jsx6(
                "button",
                {
                  onClick: handleAddNewReview,
                  className: "w-full bg-brand-600 text-white py-2 rounded-md text-sm font-bold hover:bg-brand-700 transition-colors",
                  children: "Add This Review"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs6("section", { className: "p-4 bg-white border border-slate-100 rounded-xl", children: [
            /* @__PURE__ */ jsxs6("h4", { className: "text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3", children: [
              "Manage Existing Reviews (",
              testimonials.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx6("div", { className: "space-y-4", children: testimonials.map((t) => /* @__PURE__ */ jsxs6("div", { className: "flex gap-4 items-start p-3 bg-slate-50 rounded-lg group", children: [
              /* @__PURE__ */ jsx6("img", { src: t.avatar, className: "w-10 h-10 rounded-full object-cover bg-white", alt: t.name }),
              /* @__PURE__ */ jsxs6("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs6("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx6("p", { className: "text-xs font-bold text-slate-900 truncate", children: t.name }),
                  /* @__PURE__ */ jsx6(
                    "button",
                    {
                      onClick: () => onDeleteTestimonial(t.id),
                      className: "text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity",
                      children: /* @__PURE__ */ jsx6("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx6("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx6("p", { className: "text-[10px] text-slate-500 mb-1", children: t.location }),
                /* @__PURE__ */ jsx6(
                  "input",
                  {
                    type: "text",
                    value: t.avatar,
                    onChange: (e) => updateTestimonialAvatar(t.id, e.target.value),
                    placeholder: "Update Avatar URL...",
                    className: "w-full px-2 py-1 text-[10px] border border-slate-200 rounded bg-white"
                  }
                )
              ] })
            ] }, t.id)) })
          ] }),
          /* @__PURE__ */ jsxs6("section", { className: "p-4 bg-slate-50 rounded-xl", children: [
            /* @__PURE__ */ jsx6("h4", { className: "text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3", children: "Blog Post Images" }),
            /* @__PURE__ */ jsx6("div", { className: "space-y-4", children: blogPosts.map((post) => /* @__PURE__ */ jsxs6("div", { className: "flex gap-4 items-center", children: [
              /* @__PURE__ */ jsx6("img", { src: post.imageUrl, className: "w-16 h-12 rounded-md object-cover bg-white", alt: post.title }),
              /* @__PURE__ */ jsxs6("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx6("label", { className: "text-xs text-slate-500 mb-1 block truncate", children: post.title }),
                /* @__PURE__ */ jsx6(
                  "input",
                  {
                    type: "text",
                    value: post.imageUrl,
                    onChange: (e) => updateBlogPostImage(post.id, e.target.value),
                    placeholder: "Image URL...",
                    className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-brand-500 focus:border-brand-500"
                  }
                )
              ] })
            ] }, post.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "bg-slate-50 px-6 py-4 sm:px-8 flex flex-col sm:flex-row gap-3 justify-between items-center", children: [
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: onReset,
            className: "text-sm text-slate-500 hover:text-brand-600 font-medium transition-colors",
            children: "Reset to Defaults"
          }
        ),
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: onClose,
            className: "w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm",
            children: "Done"
          }
        )
      ] })
    ] })
  ] }) });
};
var SettingsModal_default = SettingsModal;

// src/components/Reviews.tsx
import { useState as useState4 } from "react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var Reviews = ({ testimonials, onAddReview }) => {
  const [showForm, setShowForm] = useState4(false);
  const [formData, setFormData] = useState4({
    name: "",
    location: "",
    text: "",
    avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1e3)}`
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    onAddReview(formData);
    setFormData({
      name: "",
      location: "",
      text: "",
      avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1e3)}`
    });
    setShowForm(false);
    alert("Thank you for sharing your story! It has been added to our community wall.");
  };
  return /* @__PURE__ */ jsx7("div", { className: "py-16 bg-white min-h-screen", children: /* @__PURE__ */ jsxs7("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs7("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx7("h2", { className: "text-base text-brand-600 font-semibold tracking-wide uppercase", children: "Community Wall" }),
      /* @__PURE__ */ jsx7("p", { className: "mt-2 text-3xl leading-8 font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl", children: "Healing & Connection Stories" }),
      /* @__PURE__ */ jsx7("p", { className: "mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto", children: "Real experiences from people who have found comfort and closure through our sanctuary." }),
      /* @__PURE__ */ jsx7("div", { className: "mt-8", children: /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: () => setShowForm(!showForm),
          className: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 transition-all",
          children: showForm ? "Cancel" : "Share Your Story"
        }
      ) })
    ] }),
    showForm && /* @__PURE__ */ jsxs7("div", { className: "max-w-xl mx-auto mb-16 bg-brand-50 p-8 rounded-2xl shadow-inner animate-fade-in", children: [
      /* @__PURE__ */ jsx7("h3", { className: "text-xl font-bold text-slate-900 mb-6 font-serif", children: "Write Your Review" }),
      /* @__PURE__ */ jsxs7("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx7("label", { className: "block text-sm font-medium text-slate-700", children: "Name" }),
          /* @__PURE__ */ jsx7(
            "input",
            {
              type: "text",
              required: true,
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: "mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx7("label", { className: "block text-sm font-medium text-slate-700", children: "Location (Optional)" }),
          /* @__PURE__ */ jsx7(
            "input",
            {
              type: "text",
              value: formData.location,
              onChange: (e) => setFormData({ ...formData, location: e.target.value }),
              className: "mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx7("label", { className: "block text-sm font-medium text-slate-700", children: "Your Experience" }),
          /* @__PURE__ */ jsx7(
            "textarea",
            {
              required: true,
              rows: 4,
              value: formData.text,
              onChange: (e) => setFormData({ ...formData, text: e.target.value }),
              className: "mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "submit",
            className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700",
            children: "Submit Review"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx7("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: testimonials.map((t) => /* @__PURE__ */ jsxs7("div", { className: "bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-transform", children: [
      /* @__PURE__ */ jsxs7("div", { className: "relative", children: [
        /* @__PURE__ */ jsx7("svg", { className: "absolute -top-4 -left-4 h-8 w-8 text-brand-100 transform -scale-x-100", fill: "currentColor", viewBox: "0 0 32 32", children: /* @__PURE__ */ jsx7("path", { d: "M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" }) }),
        /* @__PURE__ */ jsxs7("p", { className: "text-slate-600 italic leading-relaxed relative z-10 mb-6", children: [
          '"',
          t.text,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center pt-6 border-t border-slate-50", children: [
        /* @__PURE__ */ jsx7("img", { className: "h-12 w-12 rounded-full object-cover shadow-sm bg-slate-100", src: t.avatar, alt: t.name }),
        /* @__PURE__ */ jsxs7("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx7("p", { className: "text-base font-bold text-slate-900", children: t.name }),
          /* @__PURE__ */ jsx7("p", { className: "text-sm text-brand-500 font-medium", children: t.location })
        ] })
      ] })
    ] }, t.id)) })
  ] }) });
};
var Reviews_default = Reviews;

// src/App.tsx
import { Fragment, jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1600";
var App = () => {
  const [currentView, setCurrentView] = useState5("HOME" /* HOME */);
  const [selectedPost, setSelectedPost] = useState5(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState5(false);
  const [heroImageUrl, setHeroImageUrl] = useState5(DEFAULT_HERO_IMAGE);
  const [blogPosts, setBlogPosts] = useState5(BLOG_POSTS);
  const [testimonials, setTestimonials] = useState5(TESTIMONIALS);
  useEffect2(() => {
    const savedHero = localStorage.getItem("dez_hero_image");
    if (savedHero) setHeroImageUrl(savedHero);
    const savedBlogPosts = localStorage.getItem("dez_blog_posts");
    if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts));
    const savedTestimonials = localStorage.getItem("dez_testimonials");
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1).toUpperCase();
      if (hash && hash in PageView) {
        setCurrentView(PageView[hash]);
        if (hash !== "BLOG_POST") setSelectedPost(null);
      } else {
        setCurrentView("HOME" /* HOME */);
        setSelectedPost(null);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  useEffect2(() => {
    localStorage.setItem("dez_hero_image", heroImageUrl);
  }, [heroImageUrl]);
  useEffect2(() => {
    localStorage.setItem("dez_blog_posts", JSON.stringify(blogPosts));
  }, [blogPosts]);
  useEffect2(() => {
    localStorage.setItem("dez_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);
  const navigateTo = (view) => {
    window.location.hash = view.toLowerCase();
    setCurrentView(view);
    window.scrollTo(0, 0);
  };
  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigateTo("BLOG_POST" /* BLOG_POST */);
  };
  const updateBlogPostImage = (id, url) => {
    setBlogPosts((prev) => prev.map((post) => post.id === id ? { ...post, imageUrl: url } : post));
    if (selectedPost?.id === id) {
      setSelectedPost((prev) => prev ? { ...prev, imageUrl: url } : null);
    }
  };
  const updateTestimonialAvatar = (id, url) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, avatar: url } : t));
  };
  const addTestimonial = (review) => {
    const newT = {
      ...review,
      id: Date.now().toString()
    };
    setTestimonials((prev) => [newT, ...prev]);
  };
  const deleteTestimonial = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
  };
  const handleResetSettings = () => {
    if (window.confirm("Are you sure you want to reset all images and content to defaults?")) {
      setHeroImageUrl(DEFAULT_HERO_IMAGE);
      setBlogPosts(BLOG_POSTS);
      setTestimonials(TESTIMONIALS);
      localStorage.removeItem("dez_hero_image");
      localStorage.removeItem("dez_blog_posts");
      localStorage.removeItem("dez_testimonials");
    }
  };
  const renderContent = () => {
    switch (currentView) {
      case "REVIEWS" /* REVIEWS */:
        return /* @__PURE__ */ jsx8(Reviews_default, { testimonials, onAddReview: addTestimonial });
      case "COMPANION" /* COMPANION */:
        return /* @__PURE__ */ jsxs8("div", { className: "pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ethereal-gradient min-h-screen", children: [
          /* @__PURE__ */ jsxs8("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsx8("h1", { className: "text-3xl font-serif font-bold text-slate-900 sm:text-4xl", children: "Grief Companion AI" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4", children: "A safe, judgment-free space to process your emotions." })
          ] }),
          /* @__PURE__ */ jsx8(GriefCompanion_default, {})
        ] });
      case "SERVICES" /* SERVICES */:
        return /* @__PURE__ */ jsx8("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs8("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs8("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx8("h2", { className: "text-base text-brand-600 font-semibold tracking-wide uppercase", children: "Offerings" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-2 text-3xl leading-8 font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl", children: "Connect, Heal, and Grow" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto", children: "Choose the path that resonates with your soul's current journey." })
          ] }),
          /* @__PURE__ */ jsx8("div", { className: "mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8", children: SERVICES.map((service) => /* @__PURE__ */ jsx8(ServiceCard_default, { service }, service.id)) })
        ] }) });
      case "BLOG" /* BLOG */:
        return /* @__PURE__ */ jsx8("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs8("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs8("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsx8("h1", { className: "text-3xl font-serif font-bold text-slate-900", children: "Soul Whispers Blog" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-4 text-xl text-slate-500", children: "Insights, channelings, and guidance from Dez." })
          ] }),
          /* @__PURE__ */ jsx8("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: blogPosts.map((post) => /* @__PURE__ */ jsxs8("div", { className: "flex flex-col rounded-lg shadow-lg overflow-hidden group", children: [
            /* @__PURE__ */ jsxs8("div", { className: "flex-shrink-0 relative overflow-hidden bg-slate-100", children: [
              /* @__PURE__ */ jsx8("img", { className: "h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110", src: post.imageUrl, alt: post.title }),
              /* @__PURE__ */ jsx8("div", { className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsx8(
                "button",
                {
                  onClick: () => handlePostClick(post),
                  className: "bg-white text-slate-900 px-4 py-2 rounded-full font-medium shadow-lg",
                  children: "Read Article"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs8("div", { className: "flex-1 bg-white p-6 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs8("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx8("p", { className: "text-sm font-medium text-brand-600", children: post.category }),
                /* @__PURE__ */ jsxs8("button", { onClick: () => handlePostClick(post), className: "block mt-2 text-left", children: [
                  /* @__PURE__ */ jsx8("p", { className: "text-xl font-semibold text-slate-900 hover:text-brand-600 transition-colors", children: post.title }),
                  /* @__PURE__ */ jsx8("p", { className: "mt-3 text-base text-slate-500 line-clamp-3", children: post.excerpt })
                ] })
              ] }),
              /* @__PURE__ */ jsx8("div", { className: "mt-6 flex items-center", children: /* @__PURE__ */ jsx8("div", { className: "text-sm text-slate-500", children: /* @__PURE__ */ jsx8("time", { dateTime: post.date, children: post.date }) }) })
            ] })
          ] }, post.id)) })
        ] }) });
      case "BLOG_POST" /* BLOG_POST */:
        if (!selectedPost) {
          navigateTo("BLOG" /* BLOG */);
          return null;
        }
        return /* @__PURE__ */ jsx8(BlogPostDetail_default, { post: selectedPost, onBack: () => navigateTo("BLOG" /* BLOG */) });
      case "CONTACT" /* CONTACT */:
        return /* @__PURE__ */ jsx8("div", { className: "bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24", children: /* @__PURE__ */ jsxs8("div", { className: "relative max-w-xl mx-auto", children: [
          /* @__PURE__ */ jsxs8("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx8("h2", { className: "text-3xl font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl", children: "Get in touch" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-4 text-lg leading-6 text-slate-500", children: "Questions about a reading? Want to share your story? We'd love to hear from you." })
          ] }),
          /* @__PURE__ */ jsx8("div", { className: "mt-12", children: /* @__PURE__ */ jsxs8("form", { className: "grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8", children: [
            /* @__PURE__ */ jsxs8("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx8("label", { htmlFor: "name", className: "block text-sm font-medium text-slate-700", children: "Name" }),
              /* @__PURE__ */ jsx8("div", { className: "mt-1", children: /* @__PURE__ */ jsx8("input", { type: "text", name: "name", id: "name", className: "py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" }) })
            ] }),
            /* @__PURE__ */ jsxs8("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx8("label", { htmlFor: "email", className: "block text-sm font-medium text-slate-700", children: "Email" }),
              /* @__PURE__ */ jsx8("div", { className: "mt-1", children: /* @__PURE__ */ jsx8("input", { type: "email", name: "email", id: "email", className: "py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" }) })
            ] }),
            /* @__PURE__ */ jsxs8("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx8("label", { htmlFor: "message", className: "block text-sm font-medium text-slate-700", children: "Message" }),
              /* @__PURE__ */ jsx8("div", { className: "mt-1", children: /* @__PURE__ */ jsx8("textarea", { id: "message", name: "message", rows: 4, className: "py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border border-slate-300 rounded-md" }) })
            ] }),
            /* @__PURE__ */ jsx8("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx8("button", { type: "submit", className: "w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500", children: "Send Message" }) })
          ] }) })
        ] }) });
      case "HOME" /* HOME */:
      default:
        return /* @__PURE__ */ jsxs8(Fragment, { children: [
          /* @__PURE__ */ jsx8(Hero_default, { onCtaClick: () => navigateTo("SERVICES" /* SERVICES */), imageUrl: heroImageUrl }),
          /* @__PURE__ */ jsx8("div", { className: "py-12 bg-white", children: /* @__PURE__ */ jsx8("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs8("div", { className: "lg:text-center", children: [
            /* @__PURE__ */ jsx8("h2", { className: "text-base text-brand-600 font-semibold tracking-wide uppercase", children: "Why Choose Dez" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl font-serif", children: "A Modern Approach to Ancient Wisdom" }),
            /* @__PURE__ */ jsx8("p", { className: "mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto", children: "We blend authentic mediumship with practical grief tools and community support." })
          ] }) }) }),
          /* @__PURE__ */ jsx8("div", { className: "bg-brand-50 py-16", children: /* @__PURE__ */ jsxs8("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs8("div", { className: "flex justify-between items-end mb-12", children: [
              /* @__PURE__ */ jsx8("h2", { className: "text-3xl font-serif font-bold text-slate-900", children: "Healing Stories" }),
              /* @__PURE__ */ jsxs8(
                "button",
                {
                  onClick: () => navigateTo("REVIEWS" /* REVIEWS */),
                  className: "text-brand-600 font-bold hover:text-brand-700 transition-colors flex items-center",
                  children: [
                    "View All Reviews",
                    /* @__PURE__ */ jsx8("svg", { className: "h-5 w-5 ml-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx8("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx8("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: testimonials.slice(0, 3).map((t) => /* @__PURE__ */ jsxs8("div", { className: "bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsxs8("p", { className: "text-slate-600 italic mb-4", children: [
                '"',
                t.text,
                '"'
              ] }),
              /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx8("img", { className: "h-10 w-10 rounded-full object-cover bg-slate-100", src: t.avatar, alt: t.name }),
                /* @__PURE__ */ jsxs8("div", { className: "ml-3", children: [
                  /* @__PURE__ */ jsx8("p", { className: "text-sm font-medium text-slate-900", children: t.name }),
                  /* @__PURE__ */ jsx8("p", { className: "text-sm text-slate-500", children: t.location })
                ] })
              ] })
            ] }, t.id)) })
          ] }) }),
          /* @__PURE__ */ jsx8("div", { className: "bg-brand-700", children: /* @__PURE__ */ jsxs8("div", { className: "max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs8("h2", { className: "text-3xl font-extrabold text-white sm:text-4xl font-serif", children: [
              /* @__PURE__ */ jsx8("span", { className: "block", children: "Ready to connect?" }),
              /* @__PURE__ */ jsx8("span", { className: "block", children: "Start your journey today." })
            ] }),
            /* @__PURE__ */ jsx8("p", { className: "mt-4 text-lg leading-6 text-brand-100", children: "Whether you need a listening ear or a sign from above, we are here for you." }),
            /* @__PURE__ */ jsx8(
              "button",
              {
                onClick: () => navigateTo("COMPANION" /* COMPANION */),
                className: "mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50 sm:w-auto",
                children: "Try Grief Companion AI"
              }
            )
          ] }) })
        ] });
    }
  };
  return /* @__PURE__ */ jsxs8("div", { className: "min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900", children: [
    /* @__PURE__ */ jsx8(
      Navbar_default,
      {
        currentView,
        setView: navigateTo,
        onOpenSettings: () => setIsSettingsOpen(true)
      }
    ),
    renderContent(),
    /* @__PURE__ */ jsx8(
      SettingsModal_default,
      {
        isOpen: isSettingsOpen,
        onClose: () => setIsSettingsOpen(false),
        heroImageUrl,
        setHeroImageUrl,
        blogPosts,
        updateBlogPostImage,
        testimonials,
        updateTestimonialAvatar,
        onAddTestimonial: addTestimonial,
        onDeleteTestimonial: deleteTestimonial,
        onReset: handleResetSettings
      }
    ),
    /* @__PURE__ */ jsx8("footer", { className: "bg-white border-t border-slate-200 mt-auto", children: /* @__PURE__ */ jsxs8("div", { className: "max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs8("nav", { className: "-mx-5 -my-2 flex flex-wrap justify-center", "aria-label": "Footer", children: [
        /* @__PURE__ */ jsx8("div", { className: "px-5 py-2", children: /* @__PURE__ */ jsx8("button", { onClick: () => navigateTo("HOME" /* HOME */), className: "text-base text-slate-500 hover:text-slate-900", children: "Home" }) }),
        /* @__PURE__ */ jsx8("div", { className: "px-5 py-2", children: /* @__PURE__ */ jsx8("button", { onClick: () => navigateTo("SERVICES" /* SERVICES */), className: "text-base text-slate-500 hover:text-slate-900", children: "Services" }) }),
        /* @__PURE__ */ jsx8("div", { className: "px-5 py-2", children: /* @__PURE__ */ jsx8("button", { onClick: () => navigateTo("BLOG" /* BLOG */), className: "text-base text-slate-500 hover:text-slate-900", children: "Blog" }) }),
        /* @__PURE__ */ jsx8("div", { className: "px-5 py-2", children: /* @__PURE__ */ jsx8("button", { onClick: () => navigateTo("CONTACT" /* CONTACT */), className: "text-base text-slate-500 hover:text-slate-900", children: "Contact" }) })
      ] }),
      /* @__PURE__ */ jsx8("div", { className: "mt-8 flex justify-center space-x-6", children: /* @__PURE__ */ jsx8("span", { className: "text-slate-400", children: "\xA9 2024 Crossing Over with Dez. All rights reserved." }) })
    ] }) })
  ] });
};
var App_default = App;

// src/index.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx9(React6.StrictMode, { children: /* @__PURE__ */ jsx9(App_default, {}) })
);
