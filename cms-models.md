# CMS Content Models — Portfolio Migration

This document contains the GraphQL schema definitions and a prompt to create the content models in your Webiny CMS.

---

## GraphQL Schema Definitions

These represent the shape of data each model should expose via the Webiny Headless CMS Read API.

### 1. Project

```graphql
type Project {
  id: ID!
  values: ProjectValues!
}

type ProjectValues {
  title: String!
  slug: String!
  description: String!
  descriptions: [String]          # Multi-paragraph descriptions for gallery projects
  imageUrl: String!               # Primary thumbnail image URL
  images: [String]                # Additional gallery images/videos (can be .mp4 URLs)
  videoUrl: String                # Optional demo video URL (.mp4)
  publishedDate: String!          # Display date (e.g., "Aug 28, 2024")
  datetime: Date!                 # ISO date for sorting (e.g., 2024-08-28)
  category: [String!]!            # Tech stack tags (e.g., ["Machine Learning", "Full Stack"])
  github: String                  # Optional GitHub repo URL
  live: String                    # Optional live demo URL
  href: String!                   # Internal route path (e.g., "/projects/weatherStack")
}

# Queries
type Query {
  listProjects: ProjectListResponse!
  getProject(where: ProjectGetWhereInput!): ProjectResponse!
}

type ProjectListResponse {
  data: [Project!]!
  meta: ListMeta
}

type ProjectResponse {
  data: Project
}

input ProjectGetWhereInput {
  slug: String
  id: ID
}
```

### 2. Certification

```graphql
type Certification {
  id: ID!
  values: CertificationValues!
}

type CertificationValues {
  title: String!                  # e.g., "AWS Certified Developer Associate"
  badgeImage: String!             # Badge image URL
  credlyUrl: String!              # Credly verification URL
  altText: String!                # Image alt text
  order: Number!                  # Display order (1, 2, 3...)
}

type Query {
  listCertifications: CertificationListResponse!
}

type CertificationListResponse {
  data: [Certification!]!
}
```

### 3. SocialLink

```graphql
type SocialLink {
  id: ID!
  values: SocialLinkValues!
}

type SocialLinkValues {
  label: String!                  # e.g., "Github", "Linkedin", "Get in touch"
  href: String!                   # URL or internal path
  iconName: String!               # Icon identifier: "github" | "linkedin" | "email"
  isExternal: Boolean!            # true = opens in new tab, false = internal link
  order: Number!                  # Display order
}

type Query {
  listSocialLinks: SocialLinkListResponse!
}

type SocialLinkListResponse {
  data: [SocialLink!]!
}
```

### 4. JcLabPage (Singleton)

```graphql
type JcLabPage {
  id: ID!
  values: JcLabPageValues!
}

type JcLabPageValues {
  title: String!                  # "JcLab"
  bodyContent: String!            # Rich text / long text (HTML or markdown)
  heroImage: String!              # Image URL (e.g., "/JcLab.jpg")
  heroImageAlt: String!           # Alt text for the image
}

type Query {
  getJcLabPage: JcLabPageResponse!
}

type JcLabPageResponse {
  data: JcLabPage
}
```

### 5. SiteSettings (Singleton)

```graphql
type SiteSettings {
  id: ID!
  values: SiteSettingsValues!
}

type SiteSettingsValues {
  fullName: String!               # "Joono Chakma"
  aboutText: String!              # Long intro paragraph on homepage
  contactEmail: String!           # "joono+portfolio@chakma.com.au"
  contactHeading: String!         # "Get in Touch"
  contactSubtext: String!         # "Want to chat? Here's how to reach me."
  projectsSectionHeading: String! # "Projects"
  projectsSectionSubtext: String! # "Check out my latest work..."
  certificationsHeading: String!  # "AWS Certifications & Cloud Achievements"
  certificationsDescription: String! # The paragraph(s) about cloud experience
}

type Query {
  getSiteSettings: SiteSettingsResponse!
}

type SiteSettingsResponse {
  data: SiteSettings
}
```

---

## Expected Query Usage (Next.js Frontend)

### Fetching Projects (like existing blog pattern)

```graphql
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
```

### Fetching a Single Project by Slug

```graphql
query {
  listProjects {
    data {
      id
      values {
        slug
        title
        description
        descriptions
        imageUrl
        images
        videoUrl
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
# Then filter client-side by slug (matching existing blog pattern)
```

### Fetching Certifications

```graphql
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
```

### Fetching Social Links

```graphql
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
```

### Fetching Site Settings

```graphql
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
```

### Fetching JcLab Page

```graphql
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
```

---

## CMS Repo Prompt

Use the prompt below in your CMS repository to create these content models:

---

### PROMPT START

```
Create the following Webiny Headless CMS content models for my portfolio website. These models will replace hardcoded data in a Next.js frontend that already consumes a "Blog" model from this CMS via GraphQL.

Match the same pattern as the existing Blog model (fields nested under `values` in the GraphQL response).

---

## Model 1: Project

A content model for portfolio projects. Each entry represents a project showcase.

Fields:
- title (Text, required) — Project name
- slug (Text, required, unique) — URL-safe identifier used for routing (e.g., "weatherStack")
- description (Long Text, required) — Main project description paragraph
- descriptions (Long Text, multiple values/list) — Additional description paragraphs for multi-image gallery projects. Optional.
- imageUrl (Text, required) — Primary thumbnail image URL (can be a relative path like "/DCA.png" or full URL)
- images (Text, multiple values/list) — Gallery image/video URLs for detailed view. Can include .mp4 URLs. Optional.
- videoUrl (Text) — Optional demo video URL (.mp4 file path)
- publishedDate (Text, required) — Human-readable date string (e.g., "Aug 28, 2024")
- datetime (Date, required) — ISO date for sorting (e.g., 2024-08-28)
- category (Text, multiple values/list, required) — Technology/category tags (e.g., ["Machine Learning", "Full Stack Application"])
- github (Text) — Optional GitHub repository URL
- live (Text) — Optional live demo URL
- href (Text, required) — Internal route path (e.g., "/projects/weatherStack")

---

## Model 2: Certification

A content model for professional certifications and badges.

Fields:
- title (Text, required) — Certification name (e.g., "AWS Certified Developer Associate")
- badgeImage (Text, required) — Badge image URL/path (e.g., "/aws-certified-developer-associate.png")
- credlyUrl (Text, required) — Link to Credly public verification page
- altText (Text, required) — Alt text for the badge image
- order (Number, required) — Display order (lower number = displayed first)

---

## Model 3: SocialLink

A content model for social media / contact links displayed on the portfolio.

Fields:
- label (Text, required) — Display label (e.g., "Github", "Linkedin", "Get in touch")
- href (Text, required) — URL or internal path (e.g., "https://github.com/joonochakma" or "/contact")
- iconName (Text, required) — Icon identifier used by frontend to render the correct icon component. Values: "github", "linkedin", "email"
- isExternal (Boolean, required, default: true) — Whether link opens in a new tab
- order (Number, required) — Display order

---

## Model 4: JcLabPage (Singleton — single entry only)

A content model for the JcLab (homelab) page content.

Fields:
- title (Text, required) — Page title (e.g., "JcLab")
- bodyContent (Rich Text / Long Text, required) — Full page body content describing the homelab setup. Supports paragraphs and line breaks.
- heroImage (Text, required) — Hero image URL/path (e.g., "/JcLab.jpg")
- heroImageAlt (Text, required) — Alt text for the hero image

---

## Model 5: SiteSettings (Singleton — single entry only)

A content model for global site settings and text content that appears across multiple pages.

Fields:
- fullName (Text, required) — Display name (e.g., "Joono Chakma")
- aboutText (Long Text, required) — Homepage intro/about paragraph
- contactEmail (Text, required) — Contact email address
- contactHeading (Text, required) — Contact page heading (e.g., "Get in Touch")
- contactSubtext (Text, required) — Contact page subheading text
- projectsSectionHeading (Text, required) — Homepage projects section title
- projectsSectionSubtext (Text, required) — Homepage projects section description
- certificationsHeading (Text, required) — Skills page section title
- certificationsDescription (Long Text, required) — Skills page description paragraphs about cloud experience

---

## Notes:
- All models should be published and accessible via the Read API
- The frontend uses `graphql-request` and queries fields under a `values` object (Webiny default behavior)
- List queries should support sorting by `datetime` (for Projects) and `order` (for Certifications, SocialLinks)
- "Multiple values/list" fields should be modeled as repeatable text fields or JSON arrays, depending on what Webiny supports natively
- Singleton models (JcLabPage, SiteSettings) should only ever have one published entry
```

### PROMPT END

---

## Migration Data (Initial Content)

Once the models are created, here is the data to populate them:

### Projects (6 entries)

1. **Weather Prediction Stack Application** — slug: `weatherStack`, date: 2024-08-28, categories: Machine Learning, Full Stack Application
2. **Robot Maze Navigation** — slug: `robotMazeNavigation`, date: 2024-03-12, categories: Artificial Intelligence, Data Structure and Algorithms  
3. **Smart Fridge Monitoring System** — slug: `fridgeSensor`, date: 2024-04-22, categories: Internet of Things, Raspberry Pi, Arduino
4. **Music Rental App** — slug: `MusicApp`, date: 2024-09-11, categories: Kotlin, Mobile App Development (has videoUrl)
5. **Ecommerce Website on Vue.js** — slug: `VueEcommerce`, date: 2025-05-20, categories: Vue.js, Website Development
6. **School Management System** — slug: `SchoolManagementSystem`, date: 2025-03-12, categories: Serverless architecture, Website Development (has images[] and descriptions[])

### Certifications (3 entries)

1. AWS Certified Developer Associate — order: 1
2. AWS Certified Cloud Practitioner — order: 2
3. CCNA: Introduction to Networks — order: 3

### Social Links (3 entries)

1. Github — github icon, external, order: 1
2. Linkedin — linkedin icon, external, order: 2
3. Get in touch — email icon, internal (/contact), order: 3
