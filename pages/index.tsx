import { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import HeadSEO, { TITLE } from "../components/HeadSEO";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const panelColors = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

const Calendar = dynamic(
  () => import("react-github-contribution-calendar"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[110px] flex items-center justify-center text-ink-tertiary text-sm">
        Loading...
      </div>
    ),
  }
) as any;

const SOCIAL = [
  { icon: FaGithub, href: "https://github.com/blankart", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/nico-mendoza-82631914b/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com/masterocin", label: "Twitter" },
  { icon: FaEnvelope, href: "mailto:blankartwp@gmail.com", label: "Email" },
];

export default function Home({
  values,
  until,
  totalContributions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeadSEO title={"My Personal Portfolio - " + TITLE} />

      <div className="not-prose">
        <h1 className="text-3xl font-bold text-ink mb-4 leading-snug">
          Nico Mendoza
        </h1>

        <p className="text-ink-secondary leading-relaxed mb-6">
          Senior Full-Stack Engineer with 6+ years of experience, based in
          Tagaytay City, Philippines. Proficient in React, Next.js, Node.js,
          GraphQL, and TypeScript with a focus on SEO, performance, and CI/CD.
          Currently at{" "}
          <a
            href="https://thenetwork.co.nz/"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:text-accent-hover hover:underline"
          >
            The Network
          </a>
          .
        </p>

        {/* Social */}
        <div className="flex items-center gap-5 mb-12">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              className="text-ink-tertiary hover:text-ink-secondary transition-colors duration-150"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-t border-rule mb-10" />

        {/* Contributions */}
        <div className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-sm font-medium text-ink-secondary">
              GitHub Activity
            </h2>
            <span className="text-sm text-ink-tertiary">
              {totalContributions.toLocaleString()} contributions
            </span>
          </div>
          <Calendar values={values} until={until} panelColors={panelColors} />
        </div>

        {/* Divider */}
        <hr className="border-t border-rule mb-10" />

        {/* Education */}
        <div>
          <h2 className="text-sm font-medium text-ink-secondary mb-3">
            Education
          </h2>
          <p className="text-ink-secondary leading-relaxed">
            BS in Computer Science, Major in Statistical Computing —{" "}
            <span className="text-ink">University of the Philippines</span>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
  };
  const body = {
    query: `query {
      user(login: "${process.env.GITHUB_USERNAME}") {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  const values: Record<string, number> = {};
  let totalContributions = 0;
  data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
    (week: any) =>
      week.contributionDays.forEach((day: any) => {
        values[day.date] = day.contributionCount;
        totalContributions += day.contributionCount;
      })
  );
  return {
    props: {
      values,
      until: Object.keys(values)[Object.keys(values).length - 1],
      totalContributions,
    },
    revalidate: 60 * 60 * 24,
  };
}
