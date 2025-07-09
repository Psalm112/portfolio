import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/components/sections/projects/data/projects";
import ProjectDetailsPage from "@/app/components/sections/projects/ProjectDetailsPage";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - Samuel Adebola Oyenuga`,
    description: project.description,
    keywords: [project.title, project.category, ...project.technologies],
    openGraph: {
      title: `${project.title} - Samuel Adebola Oyenuga`,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Samuel Adebola Oyenuga`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsPage project={project} />;
}
