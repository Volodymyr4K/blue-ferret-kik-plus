import projectsData from '@/content/projects.json';
import projectsBasicData from '@/content/manager/projects-basic.json';
import {
  ProjectsBasicOverridesSchema,
  ProjectsSchema,
  type Project,
  type ProjectSupportConfig,
  type ProjectSupportTier,
} from '@/lib/content-schemas';

const baseProjects = ProjectsSchema.parse(projectsData);
const basicOverrides = ProjectsBasicOverridesSchema.parse(projectsBasicData);
const overridesById = new Map(basicOverrides.map((item) => [item.id, item]));

const projects = ProjectsSchema.parse(
  baseProjects.map((project) => {
    const override = overridesById.get(project.id);
    if (!override) return project;

    return {
      ...project,
      name: override.name,
      shortDescription: override.shortDescription,
      status: override.status,
      statusLabel: override.statusLabel,
      raised: override.raised,
      goal: override.goal,
      currency: override.currency,
      lastUpdate: override.lastUpdate,
      updatePreview: override.updatePreview,
      coverImage: override.coverImage,
      link: override.link,
      support: override.support,
    };
  })
);

export type { Project, ProjectSupportConfig, ProjectSupportTier };
export default projects;
