import uiContentData from '@/content/ui-content.json';
import { UIContentSchema, type UIContent } from '@/lib/content-schemas';

const uiContent = UIContentSchema.parse(uiContentData);

export default uiContent;
export type { UIContent };
