import projectsData from '@/content/projects.json';
import type { Project, ProjectSupportConfig, ProjectSupportTier } from './types';

const projects = projectsData as Project[];

export type { Project, ProjectSupportConfig, ProjectSupportTier };
export default projects;
