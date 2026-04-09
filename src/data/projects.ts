import projectsData from '@/content/projects.json';
import {
  ProjectsSchema,
  type Project,
  type ProjectSupportConfig,
  type ProjectSupportTier,
} from '@/lib/content-schemas';

const projects = ProjectsSchema.parse(projectsData);

export type { Project, ProjectSupportConfig, ProjectSupportTier };
export default projects;
