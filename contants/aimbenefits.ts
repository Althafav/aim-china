interface BenefitItem {
    id: string;
    name: string;
    content: string;
}

interface Benefit {
    id: string;
    heading: string;
    items: BenefitItem[];
}

export const BenefitsOfParticipatingInAim2025: Benefit[] = [
    {
        id: '1',
        heading: 'For Exhibitors',
        items: [
            {
                id: '1',
                name: 'DEMONSTRATE',
                content: 'your projects, products and service offerings to a diverse global audience and gain the competitive advantage.'
            },
            {
                id: '2',
                name: 'SHOWCASE',
                content: 'investment opportunities in your respective country or region as the government entity representing your country or region in the event, and help in achieving its economic development.'
            },
            {
                id: '3',
                name: 'NETWORK',
                content: 'with diverse range of participants including entrepreneurs, industry experts, government officials, and investors, and explore opportunities for funding and investment, which can help support growth and expansion.'
            },
            {
                id: '4',
                name: 'INTERACT',
                content: 'with potential investors, partners, and stakeholders as well as other government representatives and policy influencers who play a crucial role in shaping the business landscape and regulatory environment.'
            },
            {
                id: '5',
                name: 'BUILD',
                content: 'brand awareness and enhance the reputation of your company or your government organization within the investment community.'
            },
            {
                id: '6',
                name: 'STRENGTHEN',
                content: 'international relations by providing opportunities for government officials to meet and engage with their counterparts from other countries for collaboration and knowledge sharing.'
            },
            {
                id: '7',
                name: 'GATHER',
                content: 'Market intelligence and gain insights into the latest trends in the industry, prevailing consumer preferences, and investor sentiment.'
            }
        ]
    },

    {
        id: '2',
        heading: 'For Investors',
        items: [
            {
                id: '1',
                name: 'Discover Global Opportunities',
                content: 'Explore innovative investment prospects across a diverse range of sectors worldwide. ',
            },

            {
                id: '2',
                name: 'Meet High-Potential Startups',
                content: 'Connect with promising startups and early-stage companies seeking global investment. ',
            },

            {
                id: '3',
                name: 'Exclusive Insights',
                content: 'Access expert panels and discussions on international market trends and investment strategies. ',
            },


            {
                id: '4',
                name: 'Expand Your Network',
                content: 'Build relationships with fellow investors and global industry leaders. ',
            },





        ]
    },

    {
        id: '3',
        heading: 'For Delegates',
        items: [
            {
                id: '1',
                name: 'Global Industry Knowledge',
                content: 'Participate in sessions and workshops led by experts on key investment topics from a global perspective. ',
            },

            {
                id: '2',
                name: 'Explore Emerging Trends',
                content: 'Stay informed on the latest international developments and future directions in global investments. ',
            },

            {
                id: '3',
                name: 'Thought Leadership',
                content: 'Contribute to global discussions on shaping the future of investment and economic growth.',
            },


            {
                id: '4',
                name: 'Network with Peers',
                content: 'Connect with professionals and stakeholders from around the world, building valuable international connections. ',
            },





        ]
    },

    {
        id: '4',
        heading: 'For Startups',
        items: [
            {
                id: '1',
                name: 'Pitch on a Global Stage',
                content: 'Present your startup to a worldwide audience of investors and industry leaders in high-profile pitch competitions. ',
            },

            {
                id: '2',
                name: 'Receive Global Expertise',
                content: 'Gain insights and feedback from seasoned professionals and mentors with international experience. ',
            },

            {
                id: '3',
                name: 'Access Global Funding',
                content: 'Explore opportunities for securing investment and support from global investors and partners. ',
            },


            {
                id: '4',
                name: 'Expand Your Network',
                content: 'Build connections with potential partners, clients, and collaborators from around the globe. ',
            },





        ]
    },


];
