import { gql } from 'graphql-request';

export const LIST_PROJECTS = gql`
  query {
    listProjects {
      data {
        id
        values {
          title
          slug
          description
          descriptions
          imageUrl
          images
          videoUrl
          useMobileFrame
          publishedDate
          datetime
          category
          github
          live
          href
        }
      }
    }
  }
`;

export const LIST_CERTIFICATIONS = gql`
  query {
    listCertifications {
      data {
        id
        values {
          title
          badgeImage
          credlyUrl
          altText
          order
        }
      }
    }
  }
`;

export const LIST_SOCIAL_LINKS = gql`
  query {
    listSocialLinks {
      data {
        id
        values {
          label
          href
          iconName
          isExternal
          order
        }
      }
    }
  }
`;

export const GET_JCLAB_PAGE = gql`
  query {
    listJcLabPages {
      data {
        id
        values {
          title
          bodyContent
          heroImage
          heroImageAlt
        }
      }
    }
  }
`;

export const GET_SITE_SETTINGS = gql`
  query {
    listSiteSettings {
      data {
        id
        values {
          fullName
          aboutText
          contactEmail
          contactHeading
          contactSubtext
          projectsSectionHeading
          projectsSectionSubtext
          certificationsHeading
          certificationsDescription
        }
      }
    }
  }
`;
