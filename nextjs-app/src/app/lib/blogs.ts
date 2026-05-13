export const blogs = [
  {
    blogId: 1,
    slug: 'mailcow-home-email-server',

    title: 'Building a Home Email Server with Mailcow',

    href: '/blogs/mailcow-home-email-server',

    description:
      'A personal project to set up a full-featured home email server using Mailcow on Docker. The goal was to eliminate subscription costs from AWS or Google Workspace while learning email concepts like MX, SPF, DKIM, DMARC, PTR, and more.',

    imageUrl: '/mailcow.jpg',

    date: 'Mar 24, 2026',
    datetime: '2026-03-24',

    category: ['Email Server', 'Docker', 'Self-Hosting'],

    github: null,
    live: null,

    data: [
      {
        heading: 'Introduction',
        content:
          'The project started with a simple goal: eliminate my dad’s recurring $5 per mailbox subscription from AWS or Google Workspace for his clients. I recently bought a Mac Mini and installed Ubuntu as the OS. Initially, I tried CyberPanel, but after a couple of hours I gave up — some packages were deprecated or reserved for enterprise customers.',
      },
      {
        heading: 'Discovering Mailcow',
        content:
          'After some research, I came across Mailcow, an open-source email server suite running on Docker. I followed the guide at Libre Data to get it up and running.',
      },
      {
        heading: 'What I Learned',
        content:
          'Setting up an email server is more than just installing software — you have to understand DNS records and how email works. Here’s a quick summary of the records I worked with:\n\n' +
          '- MX (Mail Exchange): directs incoming mail to your server.\n' +
          '- A / AAAA: map your domain to an IPv4 or IPv6 address.\n' +
          '- SPF (Sender Policy Framework): tells receiving servers which IPs are allowed to send mail for your domain.\n' +
          '- DKIM (DomainKeys Identified Mail): cryptographic signature to verify emails weren’t tampered with.\n' +
          '- DMARC (Domain-based Message Authentication): policy for how receivers handle SPF/DKIM failures.\n' +
          '- CNAME / Autodiscover / SRV: help email clients automatically configure settings.\n' +
          '- PTR (Reverse DNS): maps your IP back to a hostname; helps with deliverability.\n\n' +
          'Working through these gave me a much better understanding of how email services really work.',
      },
      {
        heading: 'Challenges',
        content:
          'Of course, it wasn’t all smooth sailing:\n\n' +
          '- AWS Route 53 DKIM limitation: Route 53 only allows a certain string length for TXT records, so I had to use a 1024-bit DKIM key instead of 2048-bit.\n' +
          '- Mailcow dashboard complexity: there’s a ton to configure, and it can be overwhelming for a beginner.',
      },
      {
        heading: 'Conclusion',
        content:
          'After setting everything up and testing with Mail Tester, my score was 6.9/10.\n\n' +
          'There’s still a lot to learn and experiment with, but I’m taking it one day at a time. For now, I’ve created a dummy email just to test and get familiar with the concepts. Once I’m confident with the setup, I will migrate my dad’s mailbox.',
      },
    ],
  },
];
