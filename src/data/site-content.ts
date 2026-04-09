import siteContentData from '@/content/site-content.json';
import { SiteContentSchema, type SiteContent } from '@/lib/content-schemas';

const siteContent = SiteContentSchema.parse(siteContentData);

export type { SiteContent };
export default siteContent;
