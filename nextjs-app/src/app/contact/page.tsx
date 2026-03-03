'use client';

import { useState } from 'react';
import Header from '../header';
import AnimatedPost from '../animated-post';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = 'joono+portfolio@chakma.com.au';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-12 sm:px-20 md:px-28 lg:px-40 xl:px-52">
        <AnimatedPost>
          <div className="text-center">
            <h1 className="text-7xl font-Inter font-semibold mb-4">Get in Touch</h1>
            <p className="text-xl font-extralight font-Inter mb-8">
              Want to chat? Here's how to reach me.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <span 
                onClick={copyToClipboard}
                className="text-lg font-Inter cursor-pointer transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:from-20% hover:via-sky-400 hover:via-30% hover:to-pink-500 hover:to-75% hover:bg-clip-text"
              >
                {email}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 bg-[#272729] text-white rounded hover:bg-gray-600 transition-colors"
                title={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </AnimatedPost>
      </main>
    </div>
  );
};

export default Contact;
