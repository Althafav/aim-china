/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.aimcongress.cn/',
    generateRobotsTxt: true,
    sitemapSize: 100000,
    generateIndexSitemap: false,
    transform: async (config, path) => {
        let priority = 0.7;

        if (path === '/') {
            priority = 1.0;
        } else if (path.startsWith('/about')) {
            priority = 0.9;
        }

        else if (path.startsWith('/contact-us')) {
            priority = 0.9;
        }

        else if (path.startsWith('/register-interest')) {
            priority = 0.9;
        }

        else if (path.startsWith('/event-highlights')) {
            priority = 0.9;
        }

        else if (path.startsWith('/foreign-direct-investment')) {
            priority = 0.8;
        }

        else if (path.startsWith('/global-trade')) {
            priority = 0.8;
        }

        else if (path.startsWith('/global-manufacturing')) {
            priority = 0.8;
        }

        else if (path.startsWith('/future-cities')) {
            priority = 0.8;
        }

        else if (path.startsWith('/digital-economy')) {
            priority = 0.8;
        }

        else if (path.startsWith('/future-finance')) {
            priority = 0.8;
        }

        else if (path.startsWith('/entrepreneurs')) {
            priority = 0.8;
        }

        else if (path.startsWith('/startup')) {
            priority = 0.8;
        }




        return {
            loc: path,
            changefreq: 'weekly',
            priority: priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
}