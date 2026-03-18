export default function Certifications() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="animate-fade-down text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              AWS Certifications & Cloud Achievements
            </h2>

            <p className="animate-fade font-Inter mt-6 text-lg leading-8 text-gray-300">
              I have developed strong practical experience designing and
              building cloud-native applications using Amazon Web Services. My
              certifications reflect hands-on knowledge in serverless
              architecture, secure system design, and scalable backend
              development.
            </p>

            <p className="animate-fade font-Inter mt-4 text-lg leading-8 text-gray-300">
              Through projects and continuous learning, I have worked with
              services such as AWS Lambda, API Gateway, DynamoDB, S3, IAM, and
              infrastructure as code using AWS CDK. I focus on building
              reliable, secure, and cost-efficient solutions aligned with modern
              cloud best practices.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-12 lg:max-w-none lg:pl-8">
            <a
              href="https://www.credly.com/badges/2523e773-0a04-41e1-8c5f-afc6a3d8e04b/public_url"
              target="_blank"
              className="animate-fade-up group flex justify-center"
            >
              <img
                src="/aws-certified-developer-associate.png"
                alt="AWS Certified Developer Associate"
                className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <a
              href="https://www.credly.com/badges/de6ed83c-664a-409b-90d3-00ad08a02d59/public_url"
              target="_blank"
              className="animate-fade-up animate-delay-200 group flex justify-center"
            >
              <img
                src="/aws-certified-cloud-practitioner.png"
                alt="AWS Certified Cloud Practitioner"
                className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <a
              href="https://www.credly.com/badges/1d1c43a6-5d73-474d-adf4-a825b7a6b226/public_url"
              target="_blank"
              className="animate-fade-up animate-delay-300 group flex justify-center"
            >
              <img
                src="/ccna-introduction-to-networks.png"
                alt="CCNA: Introduction to Networks"
                className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
