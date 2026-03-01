import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className="py-16 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">About Dez</h2>
                    <p className="mt-2 text-4xl leading-8 font-serif font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Empathetic Understanding
                    </p>
                </div>

                <div className="prose prose-lg text-slate-600 mx-auto font-sans leading-relaxed animate-fade-in text-justify">
                    <p className="mb-6">
                        Dez's approach is rooted in empathy and a deep understanding of your needs. They strive to create a warm, welcoming environment where you can feel comfortable opening up and exploring your spiritual connections.
                    </p>
                    <p className="mb-6">
                        Dez's background as a medium allows her to offer a unique perspective and insights that go beyond the surface level. Dez has a gift for tuning into the subtle energies that shape our lives and relationships, both in this world and the next.
                    </p>
                    <p>
                        When you connect with Dez, you'll be met with a compassionate spirit that aims to guide you towards healing and growth. Whether you're seeking to strengthen your bond with loved ones on the other side or explore your own spiritual gifts, Dez is here to support you every step of the way.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
