import { z } from 'zod';

const nonEmptyText = z.string().trim().min(1);
const optionalText = z.string().trim().optional();

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, 'Invalid date');

const hexColorSchema = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);

const internalPathSchema = z
  .string()
  .trim()
  .regex(/^\/[^\s]*$/)
  .refine((value) => !value.startsWith('//'), 'Protocol-relative URL is not allowed');

const mediaPathSchema = internalPathSchema;
const optionalMediaPathSchema = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  mediaPathSchema.optional()
);

const externalUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === 'https:';
  }, 'Only https URLs are allowed');

const safeLinkSchema = z
  .string()
  .trim()
  .refine((value) => {
    if (value === '#') return true;
    if (value.startsWith('/')) return !value.startsWith('//') && !/\s/.test(value);
    try {
      const parsed = new URL(value);
      return ['https:', 'mailto:', 'tel:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, 'Unsafe link value');

const gameStageSchema = z
  .object({
    state: z.enum(['active', 'locked', 'archived', 'hidden']),
    title: nonEmptyText,
    content: optionalText,
    image: mediaPathSchema.optional(),
    lastUpdate: dateSchema.optional(),
    ctaText: optionalText,
    ctaLink: safeLinkSchema.optional(),
  })
  .strict();

const gamePassportSchema = z
  .object({
    players: optionalText,
    duration: optionalText,
    age: optionalText,
    author: optionalText,
  })
  .strict();

const gameSchema = z
  .object({
    id: slugSchema,
    slug: slugSchema,
    name: nonEmptyText,
    slogan: optionalText,
    shortDescription: nonEmptyText,
    aboutGame: optionalText,
    status: z.enum(['announcement', 'production', 'preorder', 'onsale']),
    heroImage: mediaPathSchema.optional(),
    coverImage: mediaPathSchema.optional(),
    palette: hexColorSchema.optional(),
    accent: hexColorSchema.optional(),
    price: z.number().finite().min(0).optional(),
    passport: gamePassportSchema.optional(),
    stages: z
      .object({
        announcement: gameStageSchema,
        production: gameStageSchema,
        preorder: gameStageSchema,
        onsale: gameStageSchema,
      })
      .strict(),
  })
  .strict();

const projectSupportTierSchema = z
  .object({
    id: slugSchema,
    title: nonEmptyText,
    description: nonEmptyText,
    amount: z.number().finite().min(1),
    featured: z.boolean().optional(),
    includes: z.array(nonEmptyText).optional(),
  })
  .strict();

const projectSupportSchema = z
  .object({
    minDonation: z.number().finite().min(1),
    defaultDonation: z.number().finite().min(1),
    tiers: z.array(projectSupportTierSchema),
  })
  .strict()
  .refine((value) => value.defaultDonation >= value.minDonation, {
    message: 'defaultDonation must be >= minDonation',
    path: ['defaultDonation'],
  });

const projectSchema = z
  .object({
    id: slugSchema,
    name: nonEmptyText,
    shortDescription: nonEmptyText,
    status: z.enum(['active', 'preparing', 'complete']),
    statusLabel: nonEmptyText,
    raised: z.number().finite().min(0),
    goal: z.number().finite().min(0),
    currency: z.enum(['UAH']),
    lastUpdate: dateSchema,
    updatePreview: nonEmptyText,
    coverImage: mediaPathSchema.optional(),
    link: internalPathSchema,
    support: projectSupportSchema.optional(),
  })
  .strict()
  .refine((value) => value.goal >= value.raised, {
    message: 'goal must be >= raised',
    path: ['goal'],
  });

const gameBasicOverrideSchema = z
  .object({
    id: slugSchema,
    name: nonEmptyText,
    slogan: optionalText,
    shortDescription: nonEmptyText,
    aboutGame: optionalText,
    status: z.enum(['announcement', 'production', 'preorder', 'onsale']),
    heroImage: optionalMediaPathSchema,
    coverImage: optionalMediaPathSchema,
    price: z.number().finite().min(0).optional(),
  })
  .strict();

const projectBasicOverrideSchema = z
  .object({
    id: slugSchema,
    name: nonEmptyText,
    shortDescription: nonEmptyText,
    status: z.enum(['active', 'preparing', 'complete']),
    statusLabel: nonEmptyText,
    raised: z.number().finite().min(0),
    goal: z.number().finite().min(0),
    lastUpdate: dateSchema,
    updatePreview: nonEmptyText,
    coverImage: optionalMediaPathSchema,
  })
  .strict()
  .refine((value) => value.goal >= value.raised, {
    message: 'goal must be >= raised',
    path: ['goal'],
  });

const siteContentSchema = z
  .object({
    brand: z
      .object({
        name: nonEmptyText,
        tagline: nonEmptyText,
        description: nonEmptyText,
        heroSubtitle: nonEmptyText,
        heroDescription: nonEmptyText,
        brandWords: z.array(nonEmptyText).optional(),
        antiWords: z.array(nonEmptyText).optional(),
      })
      .strict(),
    kik: z
      .object({
        name: nonEmptyText,
        tagline: nonEmptyText,
        description: nonEmptyText,
        proKik: z
          .object({
            intro: nonEmptyText,
            story: nonEmptyText,
            benefit: nonEmptyText,
            trust: nonEmptyText,
          })
          .strict()
          .optional(),
      })
      .strict(),
    about: z
      .object({
        title: nonEmptyText,
        subtitle: nonEmptyText,
        intro: nonEmptyText,
        paragraph2: nonEmptyText,
        paragraph3: nonEmptyText,
      })
      .strict(),
    values: z
      .object({
        title: nonEmptyText,
        items: z
          .array(
            z
              .object({
                title: nonEmptyText,
                description: nonEmptyText,
              })
              .strict()
          )
          .min(1),
      })
      .strict(),
    approach: z
      .object({
        title: nonEmptyText,
        items: z.array(nonEmptyText).min(1),
      })
      .strict(),
    nav: z
      .object({
        blueFerret: z.array(nonEmptyText).min(1),
        kik: z.array(nonEmptyText).min(1),
      })
      .strict(),
    contacts: z
      .object({
        email: z.string().trim().email(),
        phone: nonEmptyText,
        address: nonEmptyText,
        intro: nonEmptyText,
        partnership: nonEmptyText,
        social: z
          .object({
            instagram: externalUrlSchema,
            facebook: externalUrlSchema,
            telegram: externalUrlSchema,
          })
          .strict(),
      })
      .strict(),
    cta: z
      .object({
        title: nonEmptyText,
        subtitle: nonEmptyText,
        description: nonEmptyText,
      })
      .strict()
      .optional(),
    pillars: z
      .array(
        z
          .object({
            title: nonEmptyText,
            description: nonEmptyText,
            href: internalPathSchema,
            icon: nonEmptyText,
          })
          .strict()
      )
      .optional(),
    testimonial: z
      .array(
        z
          .object({
            quote: nonEmptyText,
            author: nonEmptyText,
            role: optionalText,
          })
          .strict()
      )
      .optional(),
  })
  .strict();

const fallbackPillarSchema = z
  .object({
    title: nonEmptyText,
    description: nonEmptyText,
    href: internalPathSchema,
    icon: nonEmptyText,
  })
  .strict();

const proKikPointSchema = z
  .object({
    title: nonEmptyText,
    text: nonEmptyText,
  })
  .strict();

const uiContentSchema = z
  .object({
    metadata: z
      .object({
        siteTitle: nonEmptyText,
        siteDescription: nonEmptyText,
        openGraphTitle: nonEmptyText,
        openGraphDescription: nonEmptyText,
        gamesTitle: nonEmptyText,
        gamesDescription: nonEmptyText,
        kikTitle: nonEmptyText,
        kikDescription: nonEmptyText,
        kikProjectsTitle: nonEmptyText,
        kikProjectsDescription: nonEmptyText,
        contactsTitle: nonEmptyText,
        contactsDescription: nonEmptyText,
        gameNotFoundTitle: nonEmptyText,
        gameTitleTemplate: nonEmptyText,
        projectTitleTemplate: nonEmptyText,
        projectSupportTitleTemplate: nonEmptyText,
      })
      .strict(),
    branding: z
      .object({
        logoHomeAria: nonEmptyText,
        publisherLabel: nonEmptyText,
        kikLogoAlt: nonEmptyText,
        defaultSideLabel: nonEmptyText,
      })
      .strict(),
    navbar: z
      .object({
        home: nonEmptyText,
        games: nonEmptyText,
        allGames: nonEmptyText,
        contacts: nonEmptyText,
        kik: nonEmptyText,
        mobileKikSection: nonEmptyText,
        mobileGamesSection: nonEmptyText,
        trymaysiaLabel: nonEmptyText,
        closeMenuAria: nonEmptyText,
        openMenuAria: nonEmptyText,
        closeMobileMenuAria: nonEmptyText,
      })
      .strict(),
    footer: z
      .object({
        navigationTitle: nonEmptyText,
        contactTitle: nonEmptyText,
        home: nonEmptyText,
        games: nonEmptyText,
        kik: nonEmptyText,
        contacts: nonEmptyText,
        rights: nonEmptyText,
      })
      .strict(),
    kikNav: z
      .object({
        backHomeAria: nonEmptyText,
        about: nonEmptyText,
        projects: nonEmptyText,
      })
      .strict(),
    home: z
      .object({
        ctaPrimary: nonEmptyText,
        ctaSecondary: nonEmptyText,
        pillarMore: nonEmptyText,
        valuesSubtitle: nonEmptyText,
        previewGamesTitle: nonEmptyText,
        previewGamesDescription: nonEmptyText,
        previewGamesAction: nonEmptyText,
        previewKikTitle: nonEmptyText,
        previewKikDescription: nonEmptyText,
        previewKikAction: nonEmptyText,
        ctaPrimaryLarge: nonEmptyText,
        ctaSecondaryLarge: nonEmptyText,
        ctaTertiary: nonEmptyText,
        fallbackPillars: z.array(fallbackPillarSchema),
        fallbackCta: z
          .object({
            title: nonEmptyText,
            subtitle: nonEmptyText,
            description: nonEmptyText,
          })
          .strict(),
      })
      .strict(),
    gamesPage: z
      .object({
        paymentSuccess: nonEmptyText,
        badgeTitle: nonEmptyText,
        title: nonEmptyText,
        subtitle: nonEmptyText,
        gamesCount: nonEmptyText,
        activeStages: nonEmptyText,
        statusUpdates: nonEmptyText,
        statusAnnouncement: nonEmptyText,
        statusProduction: nonEmptyText,
        statusPreorder: nonEmptyText,
        statusOnsale: nonEmptyText,
        details: nonEmptyText,
        comingSoon: nonEmptyText,
        loading: nonEmptyText,
      })
      .strict(),
    kikHome: z
      .object({
        platformBadge: nonEmptyText,
        facts: z.array(nonEmptyText),
        projectsButton: nonEmptyText,
        aboutButton: nonEmptyText,
        comicAltTemplate: nonEmptyText,
      })
      .strict(),
    proKik: z
      .object({
        badge: nonEmptyText,
        title: nonEmptyText,
        authorFormButton: nonEmptyText,
        projectsButton: nonEmptyText,
        reasonsTitle: nonEmptyText,
        processBadge: nonEmptyText,
        processTitle: nonEmptyText,
        processButton: nonEmptyText,
        afterApply: nonEmptyText,
        fallback: z
          .object({
            intro: nonEmptyText,
            story: nonEmptyText,
            benefit: nonEmptyText,
            trust: nonEmptyText,
          })
          .strict(),
        keyPoints: z.array(proKikPointSchema).min(4),
        submissionSteps: z.array(proKikPointSchema).min(3),
      })
      .strict(),
    contactsPage: z
      .object({
        label: nonEmptyText,
        title: nonEmptyText,
        instagramHandle: nonEmptyText,
        telegramAction: nonEmptyText,
        partnershipTitle: nonEmptyText,
        writeButton: nonEmptyText,
      })
      .strict(),
    projectsPage: z
      .object({
        paymentSuccess: nonEmptyText,
        label: nonEmptyText,
        title: nonEmptyText,
        subtitle: nonEmptyText,
        projectsCount: nonEmptyText,
        activeCount: nonEmptyText,
        updates: nonEmptyText,
        loading: nonEmptyText,
      })
      .strict(),
    projectCard: z
      .object({
        raised: nonEmptyText,
        update: nonEmptyText,
        details: nonEmptyText,
      })
      .strict(),
    projectDetails: z
      .object({
        notFoundTitle: nonEmptyText,
        backToProjects: nonEmptyText,
        updatePrefix: nonEmptyText,
        pageBadge: nonEmptyText,
        raised: nonEmptyText,
        progress: nonEmptyText,
        prepare: nonEmptyText,
        collecting: nonEmptyText,
        production: nonEmptyText,
        support: nonEmptyText,
        supportSoon: nonEmptyText,
        otherProjects: nonEmptyText,
        howItWorks: nonEmptyText,
      })
      .strict(),
    projectSupportPage: z
      .object({
        fallbackTitle: nonEmptyText,
        fallbackDescriptionTemplate: nonEmptyText,
        backToProject: nonEmptyText,
        titleTemplate: nonEmptyText,
        subtitle: nonEmptyText,
        howItWorks: nonEmptyText,
        supportLockedBadge: nonEmptyText,
        supportLockedTitle: nonEmptyText,
        supportLockedDescription: nonEmptyText,
        backButton: nonEmptyText,
      })
      .strict(),
    supportOptions: z
      .object({
        minDonationErrorTemplate: nonEmptyText,
        createFailed: nonEmptyText,
        missingPaymentLink: nonEmptyText,
        paymentError: nonEmptyText,
        withoutRewardTitle: nonEmptyText,
        withoutRewardDescriptionTemplate: nonEmptyText,
        amountAria: nonEmptyText,
        withoutRewardButtonLabel: nonEmptyText,
        supportButton: nonEmptyText,
        creating: nonEmptyText,
        featured: nonEmptyText,
      })
      .strict(),
    gamePage: z
      .object({
        highlightsTrymaysia: z.array(nonEmptyText),
        highlightsDefault: z.array(nonEmptyText),
        stageBadge: z
          .object({
            active: nonEmptyText,
            locked: nonEmptyText,
            archived: nonEmptyText,
            hidden: nonEmptyText,
          })
          .strict(),
        statusLabels: z
          .object({
            announcement: nonEmptyText,
            production: nonEmptyText,
            preorder: nonEmptyText,
            onsale: nonEmptyText,
          })
          .strict(),
        dive: nonEmptyText,
        aboutLabel: nonEmptyText,
        passportTitle: nonEmptyText,
        passportSubtitleTemplate: nonEmptyText,
        passportStats: z
          .object({
            players: nonEmptyText,
            duration: nonEmptyText,
            age: nonEmptyText,
            author: nonEmptyText,
          })
          .strict(),
        projectState: nonEmptyText,
        readinessTemplate: nonEmptyText,
        stagesOpenTemplate: nonEmptyText,
        aboutImageAlt: nonEmptyText,
        aboutFallbackTitle: nonEmptyText,
        progressLabel: nonEmptyText,
        stagesTitle: nonEmptyText,
        stagesSubtitle: nonEmptyText,
        previewFallback: nonEmptyText,
        clickToOpen: nonEmptyText,
        sectionNotFilled: nonEmptyText,
      })
      .strict(),
    orderModal: z
      .object({
        createPaymentError: nonEmptyText,
        missingPaymentLink: nonEmptyText,
        paymentError: nonEmptyText,
        title: nonEmptyText,
        closeAria: nonEmptyText,
        gamePrefix: nonEmptyText,
        monoText: nonEmptyText,
        monoBrand: nonEmptyText,
        creating: nonEmptyText,
        payButtonTemplate: nonEmptyText,
        safePayment: nonEmptyText,
        requestInstead: nonEmptyText,
        requestOnly: nonEmptyText,
        placeholderName: nonEmptyText,
        placeholderPhone: nonEmptyText,
        placeholderEmail: nonEmptyText,
        placeholderAddress: nonEmptyText,
        placeholderComment: nonEmptyText,
        submitRequest: nonEmptyText,
      })
      .strict(),
    monoApi: z
      .object({
        paymentsDisabled: nonEmptyText,
        notConfigured: nonEmptyText,
        minAmount: nonEmptyText,
        destinationPrefix: nonEmptyText,
        defaultOrder: nonEmptyText,
        defaultComment: nonEmptyText,
        defaultItemName: nonEmptyText,
        unit: nonEmptyText,
        monoApiError: nonEmptyText,
        createInvoiceError: nonEmptyText,
      })
      .strict(),
    errors: z
      .object({
        notFoundTitle: nonEmptyText,
        notFoundDescription: nonEmptyText,
        toHome: nonEmptyText,
        toGames: nonEmptyText,
        brandLine: nonEmptyText,
        errorTitle: nonEmptyText,
        errorDescription: nonEmptyText,
        tryAgain: nonEmptyText,
        home: nonEmptyText,
        games: nonEmptyText,
        kik: nonEmptyText,
        globalErrorTitle: nonEmptyText,
        globalErrorDescription: nonEmptyText,
        gamesErrorTitle: nonEmptyText,
        gamesErrorDescription: nonEmptyText,
      })
      .strict(),
  })
  .strict();

export const GamesSchema = z.array(gameSchema).superRefine((games, ctx) => {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  games.forEach((game, index) => {
    if (ids.has(game.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate game id: ${game.id}`,
        path: [index, 'id'],
      });
    }
    ids.add(game.id);

    if (slugs.has(game.slug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate game slug: ${game.slug}`,
        path: [index, 'slug'],
      });
    }
    slugs.add(game.slug);
  });
});

export const ProjectsSchema = z.array(projectSchema).superRefine((projects, ctx) => {
  const ids = new Set<string>();
  const links = new Set<string>();

  projects.forEach((project, index) => {
    if (ids.has(project.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate project id: ${project.id}`,
        path: [index, 'id'],
      });
    }
    ids.add(project.id);

    if (!project.link.endsWith(`/${project.id}`)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Project link must end with /${project.id}`,
        path: [index, 'link'],
      });
    }

    if (links.has(project.link)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate project link: ${project.link}`,
        path: [index, 'link'],
      });
    }
    links.add(project.link);
  });
});

export const SiteContentSchema = siteContentSchema;
export const UIContentSchema = uiContentSchema;
export const GamesBasicOverridesSchema = z.array(gameBasicOverrideSchema);
export const ProjectsBasicOverridesSchema = z.array(projectBasicOverrideSchema);

export type Game = z.infer<typeof gameSchema>;
export type GameStage = z.infer<typeof gameStageSchema>;
export type GamePassport = z.infer<typeof gamePassportSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectSupportConfig = z.infer<typeof projectSupportSchema>;
export type ProjectSupportTier = z.infer<typeof projectSupportTierSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
export type UIContent = z.infer<typeof uiContentSchema>;
export type GameBasicOverride = z.infer<typeof gameBasicOverrideSchema>;
export type ProjectBasicOverride = z.infer<typeof projectBasicOverrideSchema>;
