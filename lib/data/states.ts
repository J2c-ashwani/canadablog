// lib/data/states.ts - US States Grant Data for Programmatic SEO

export interface StateGrant {
    id: string;
    name: string;
    slug: string;
    abbreviation: string;
    region: 'Northeast' | 'Southeast' | 'Midwest' | 'Southwest' | 'West';
    totalFunding: string;
    description: string;
    topPrograms: {
        name: string;
        amount: string;
        focus: string;
    }[];
    keyIndustries: string[];
    metrics: {
        label: string;
        value: string;
        description: string;
        color: string;
        iconName: string;
    }[];
    expertTip: {
        title: string;
        type: 'tip' | 'warning' | 'success';
        content: string;
    };
    seoKeywords: string[];
}

export const usStates: StateGrant[] = [
    {
        id: 'alabama',
        name: 'Alabama',
        slug: 'alabama',
        abbreviation: 'AL',
        region: 'Southeast',
        totalFunding: '$890M+',
        description: 'Alabama offers robust small business grants through AIDT workforce training, the Alabama Innovation Fund, and regional development programs focused on manufacturing and aerospace industries.',
        topPrograms: [
            { name: 'AIDT Training', amount: '$15K/employee', focus: 'Workforce Development' },
            { name: 'Alabama Innovation Fund', amount: '$500K', focus: 'Tech Startups' },
            { name: 'Rural Development Grants', amount: '$250K', focus: 'Rural Business' }
        ],
        keyIndustries: ['Aerospace', 'Automotive', 'Manufacturing', 'Agriculture'],
        metrics: [
            { label: 'Total', value: '$890M+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Training', value: '$15K', description: 'Per employee', color: 'text-blue-600', iconName: 'Users' },
            { label: 'Focus', value: 'Aerospace', description: 'Key sector', color: 'text-purple-600', iconName: 'Rocket' },
            { label: 'Rural', value: 'Priority', description: 'Development', color: 'text-orange-600', iconName: 'Mountain' }
        ],
        expertTip: {
            title: 'AIDT Is Free Training',
            type: 'tip',
            content: '<strong>AIDT (Alabama Industrial Development Training)</strong> provides FREE customized training. This is one of the best state programs in the nation for manufacturers.'
        },
        seoKeywords: ['alabama small business grants', 'alabama startup funding', 'alabama business grants 2026']
    },
    {
        id: 'alaska',
        name: 'Alaska',
        slug: 'alaska',
        abbreviation: 'AK',
        region: 'West',
        totalFunding: '$420M+',
        description: 'Alaska provides unique funding opportunities through AIDEA, tribal business grants, and resource development programs tailored to remote and rural entrepreneurs.',
        topPrograms: [
            { name: 'AIDEA Loans', amount: '$25M', focus: 'Economic Development' },
            { name: 'Alaska Native Corp Grants', amount: '$500K', focus: 'Native Business' },
            { name: 'Microloan Program', amount: '$50K', focus: 'Small Business' }
        ],
        keyIndustries: ['Oil & Gas', 'Fishing', 'Tourism', 'Mining'],
        metrics: [
            { label: 'AIDEA', value: '$25M', description: 'Max loan', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Native', value: '$500K', description: 'Corp grants', color: 'text-blue-600', iconName: 'Users' },
            { label: 'Focus', value: 'Resources', description: 'Key sector', color: 'text-purple-600', iconName: 'Mountain' },
            { label: 'Rural', value: '94%', description: 'Priority', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: {
            title: 'Alaska Native Corporations',
            type: 'success',
            content: '<strong>Alaska Native Corporations</strong> have exclusive access to 8(a) federal contracts. If eligible, this is your fastest path to government funding.'
        },
        seoKeywords: ['alaska small business grants', 'alaska native business funding', 'aidea loans alaska']
    },
    {
        id: 'arizona',
        name: 'Arizona',
        slug: 'arizona',
        abbreviation: 'AZ',
        region: 'Southwest',
        totalFunding: '$1.2B+',
        description: 'Arizona offers extensive tech startup support through ACA, the Arizona Innovation Challenge, and semiconductor manufacturing incentives attracting major chip manufacturers.',
        topPrograms: [
            { name: 'Arizona Innovation Challenge', amount: '$250K', focus: 'Tech Startups' },
            { name: 'ACA Investment Fund', amount: '$2M', focus: 'Growth Companies' },
            { name: 'Semiconductor Incentives', amount: '$100M+', focus: 'Chip Manufacturing' }
        ],
        keyIndustries: ['Semiconductors', 'Aerospace', 'Healthcare', 'Fintech'],
        metrics: [
            { label: 'Total', value: '$1.2B+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'AIC', value: '$250K', description: 'Innovation grants', color: 'text-blue-600', iconName: 'Zap' },
            { label: 'Chips', value: '$100M+', description: 'Semiconductor', color: 'text-purple-600', iconName: 'Cpu' },
            { label: 'Growth', value: '+12%', description: 'Tech jobs', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: {
            title: 'Semiconductor Boom',
            type: 'success',
            content: 'Arizona is now a <strong>top 3 semiconductor hub</strong>. Supply chain companies should target CHIPS Act + state incentives for maximum funding.'
        },
        seoKeywords: ['arizona small business grants', 'arizona innovation challenge', 'arizona tech startup funding']
    },
    {
        id: 'arkansas',
        name: 'Arkansas',
        slug: 'arkansas',
        abbreviation: 'AR',
        region: 'Southeast',
        totalFunding: '$560M+',
        description: 'Arkansas focuses on manufacturing, agriculture tech, and rural development through AEDC programs and the Arkansas Quick Action Closing Fund.',
        topPrograms: [
            { name: 'Quick Action Fund', amount: '$500K', focus: 'Job Creation' },
            { name: 'Create Rebate', amount: '$5K/job', focus: 'New Hiring' },
            { name: 'InvestArk', amount: '$300K', focus: 'Equipment Purchase' }
        ],
        keyIndustries: ['Agriculture', 'Manufacturing', 'Logistics', 'Food Processing'],
        metrics: [
            { label: 'Total', value: '$560M+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Per Job', value: '$5K', description: 'Create rebate', color: 'text-blue-600', iconName: 'Users' },
            { label: 'Focus', value: 'AgTech', description: 'Priority', color: 'text-purple-600', iconName: 'Leaf' },
            { label: 'Rural', value: '75%', description: 'Counties', color: 'text-orange-600', iconName: 'Mountain' }
        ],
        expertTip: {
            title: 'Walmart HQ Advantage',
            type: 'tip',
            content: 'Arkansas is home to <strong>Walmart, Tyson, and JB Hunt</strong>. Supply chain and logistics startups have unique networking advantages here.'
        },
        seoKeywords: ['arkansas small business grants', 'arkansas startup funding', 'aedc arkansas grants']
    },
    {
        id: 'california',
        name: 'California',
        slug: 'california',
        abbreviation: 'CA',
        region: 'West',
        totalFunding: '$8.5B+',
        description: 'California leads the nation in startup funding with CalSEED clean energy grants, the California Competes tax credit, and extensive VC ecosystem support.',
        topPrograms: [
            { name: 'CalSEED', amount: '$150K', focus: 'Clean Energy' },
            { name: 'California Competes', amount: '$10M+', focus: 'Tax Credits' },
            { name: 'GO-Biz Grants', amount: '$500K', focus: 'Small Business' }
        ],
        keyIndustries: ['Technology', 'Clean Energy', 'Biotech', 'Entertainment'],
        metrics: [
            { label: 'Total', value: '$8.5B+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'CalSEED', value: '$150K', description: 'Clean energy', color: 'text-blue-600', iconName: 'Zap' },
            { label: 'VC', value: '#1', description: 'In nation', color: 'text-purple-600', iconName: 'TrendingUp' },
            { label: 'Jobs', value: '3.9M', description: 'Small biz', color: 'text-orange-600', iconName: 'Users' }
        ],
        expertTip: {
            title: 'Stack State + Federal',
            type: 'success',
            content: '<strong>California allows stacking</strong> state incentives with federal grants. Combine CalSEED with DOE funding for 2x the non-dilutive capital.'
        },
        seoKeywords: ['california small business grants', 'calseed grants', 'california startup funding 2026']
    },
    {
        id: 'colorado',
        name: 'Colorado',
        slug: 'colorado',
        abbreviation: 'CO',
        region: 'West',
        totalFunding: '$1.8B+',
        description: 'Colorado excels in clean tech and outdoor industry funding through OEDIT grants, the Advanced Industries Accelerator, and climate tech incentives.',
        topPrograms: [
            { name: 'Advanced Industries Grant', amount: '$250K', focus: 'Tech R&D' },
            { name: 'OEDIT Grants', amount: '$500K', focus: 'Economic Development' },
            { name: 'Clean Tech Fund', amount: '$2M', focus: 'Climate Innovation' }
        ],
        keyIndustries: ['Clean Tech', 'Aerospace', 'Outdoor Recreation', 'Cannabis'],
        metrics: [
            { label: 'Total', value: '$1.8B+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'AI Grant', value: '$250K', description: 'Tech R&D', color: 'text-blue-600', iconName: 'Cpu' },
            { label: 'Climate', value: 'Priority', description: 'Clean tech', color: 'text-purple-600', iconName: 'Leaf' },
            { label: 'Growth', value: '+8%', description: 'Tech jobs', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: {
            title: 'Advanced Industries Program',
            type: 'success',
            content: 'The <strong>Advanced Industries Accelerator</strong> provides proof-of-concept and early-stage capital grants. Perfect for hardware and deep tech startups.'
        },
        seoKeywords: ['colorado small business grants', 'colorado startup funding', 'oedit grants colorado']
    },
    {
        id: 'connecticut',
        name: 'Connecticut',
        slug: 'connecticut',
        abbreviation: 'CT',
        region: 'Northeast',
        totalFunding: '$950M+',
        description: 'Connecticut offers strong biotech and insurance tech funding through CT Innovations, the Small Business Express program, and manufacturing incentives.',
        topPrograms: [
            { name: 'CT Innovations', amount: '$1M', focus: 'Tech Startups' },
            { name: 'Small Business Express', amount: '$300K', focus: 'Small Business' },
            { name: 'Manufacturing Fund', amount: '$500K', focus: 'Manufacturing' }
        ],
        keyIndustries: ['Insurance', 'Biotech', 'Defense', 'Financial Services'],
        metrics: [
            { label: 'CTI', value: '$1M', description: 'Max investment', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'SBE', value: '$300K', description: 'Express grants', color: 'text-blue-600', iconName: 'Zap' },
            { label: 'Biotech', value: 'Hub', description: 'Key sector', color: 'text-purple-600', iconName: 'Shield' },
            { label: 'Yale', value: 'Partner', description: 'Research', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: {
            title: 'Yale Ecosystem',
            type: 'tip',
            content: 'Leverage <strong>Yale University partnerships</strong> for biotech grants. CT Innovations prioritizes university spinouts.'
        },
        seoKeywords: ['connecticut small business grants', 'ct innovations funding', 'connecticut startup grants']
    },
    {
        id: 'delaware',
        name: 'Delaware',
        slug: 'delaware',
        abbreviation: 'DE',
        region: 'Northeast',
        totalFunding: '$280M+',
        description: 'Delaware provides business-friendly incentives through DEDO grants, the Strategic Fund, and strong corporate formation benefits.',
        topPrograms: [
            { name: 'Strategic Fund', amount: '$500K', focus: 'Job Creation' },
            { name: 'EDGE Grant', amount: '$100K', focus: 'Small Business' },
            { name: 'Training Fund', amount: '$50K', focus: 'Workforce' }
        ],
        keyIndustries: ['Financial Services', 'Pharma', 'Chemical', 'Corporate HQ'],
        metrics: [
            { label: 'Fund', value: '$500K', description: 'Strategic', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Tax', value: 'Low', description: 'No sales tax', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Corp', value: '#1', description: 'Incorporation', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Size', value: 'Small', description: 'Less competition', color: 'text-orange-600', iconName: 'Target' }
        ],
        expertTip: {
            title: 'Incorporation Advantage',
            type: 'tip',
            content: '<strong>Delaware corporation status</strong> is preferred by VCs. Combine this with state grants for credibility + capital.'
        },
        seoKeywords: ['delaware small business grants', 'delaware startup funding', 'dedo grants delaware']
    },
    {
        id: 'florida',
        name: 'Florida',
        slug: 'florida',
        abbreviation: 'FL',
        region: 'Southeast',
        totalFunding: '$2.5B+',
        description: 'Florida offers major incentives through Enterprise Florida, QTI tax credits, and the Florida Opportunity Fund for high-growth companies.',
        topPrograms: [
            { name: 'QTI Tax Credit', amount: '$3K/job', focus: 'Job Creation' },
            { name: 'Florida Opportunity Fund', amount: '$5M', focus: 'Growth Companies' },
            { name: 'HIPI Grant', amount: '$1M', focus: 'High Impact' }
        ],
        keyIndustries: ['Tourism', 'Aerospace', 'Life Sciences', 'Fintech'],
        metrics: [
            { label: 'Total', value: '$2.5B+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'QTI', value: '$3K/job', description: 'Tax credit', color: 'text-blue-600', iconName: 'Users' },
            { label: 'Tax', value: 'None', description: 'No income tax', color: 'text-purple-600', iconName: 'Award' },
            { label: 'Growth', value: '#3', description: 'In nation', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: {
            title: 'No State Income Tax',
            type: 'success',
            content: 'Florida has <strong>no state income tax</strong>. Combined with QTI credits, this makes FL extremely attractive for relocating companies.'
        },
        seoKeywords: ['florida small business grants', 'florida startup funding', 'enterprise florida grants']
    },
    {
        id: 'georgia',
        name: 'Georgia',
        slug: 'georgia',
        abbreviation: 'GA',
        region: 'Southeast',
        totalFunding: '$3.2B+',
        description: 'Georgia provides extensive film, tech, and manufacturing incentives through GDOT, the Georgia Research Alliance, and major tax credit programs.',
        topPrograms: [
            { name: 'Film Tax Credit', amount: '30%', focus: 'Entertainment' },
            { name: 'Job Tax Credit', amount: '$4K/job', focus: 'Job Creation' },
            { name: 'OneGeorgia Fund', amount: '$500K', focus: 'Rural Development' }
        ],
        keyIndustries: ['Film', 'Fintech', 'Logistics', 'Manufacturing'],
        metrics: [
            { label: 'Total', value: '$3.2B+', description: 'Annual funding', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Film', value: '30%', description: 'Tax credit', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Tech', value: 'Hub', description: 'Atlanta', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Port', value: '#1', description: 'Savannah', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: {
            title: 'Film Industry Boom',
            type: 'success',
            content: 'Georgia is now <strong>Hollywood East</strong>. Film and production companies get 30% tax credits - one of the best in the nation.'
        },
        seoKeywords: ['georgia small business grants', 'georgia startup funding', 'georgia film tax credit']
    },
    {
        id: 'hawaii',
        name: 'Hawaii',
        slug: 'hawaii',
        abbreviation: 'HI',
        region: 'West',
        totalFunding: '$380M+',
        description: 'Hawaii focuses on sustainable tourism, clean energy, and agriculture through HTDC grants and the Hawaii Technology Development Corporation.',
        topPrograms: [
            { name: 'HTDC Grants', amount: '$250K', focus: 'Tech Startups' },
            { name: 'Clean Energy Fund', amount: '$500K', focus: 'Renewable Energy' },
            { name: 'Ag Loan Program', amount: '$100K', focus: 'Agriculture' }
        ],
        keyIndustries: ['Tourism', 'Clean Energy', 'Agriculture', 'Aerospace'],
        metrics: [
            { label: 'HTDC', value: '$250K', description: 'Tech grants', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Clean', value: '100%', description: 'Renewable goal', color: 'text-blue-600', iconName: 'Leaf' },
            { label: 'Tourism', value: '$18B', description: 'Industry', color: 'text-purple-600', iconName: 'Globe' },
            { label: 'Remote', value: 'Work Hub', description: 'Growing', color: 'text-orange-600', iconName: 'Mountain' }
        ],
        expertTip: {
            title: '100% Renewable Goal',
            type: 'success',
            content: 'Hawaii aims for <strong>100% renewable energy by 2045</strong>. Clean tech startups have a captive market here.'
        },
        seoKeywords: ['hawaii small business grants', 'htdc hawaii grants', 'hawaii startup funding']
    },
    {
        id: 'idaho',
        name: 'Idaho',
        slug: 'idaho',
        abbreviation: 'ID',
        region: 'West',
        totalFunding: '$450M+',
        description: 'Idaho offers strong incentives for tech relocation, agriculture innovation, and manufacturing through Commerce Idaho programs.',
        topPrograms: [
            { name: 'Tax Reimbursement', amount: '$3M', focus: 'Job Creation' },
            { name: 'Workforce Training', amount: '$3K/employee', focus: 'Training' },
            { name: 'Rural Initiative', amount: '$250K', focus: 'Rural Business' }
        ],
        keyIndustries: ['Agriculture', 'Technology', 'Manufacturing', 'Food Processing'],
        metrics: [
            { label: 'TRI', value: '$3M', description: 'Tax rebate', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Training', value: '$3K', description: 'Per employee', color: 'text-blue-600', iconName: 'Users' },
            { label: 'Growth', value: '#1', description: 'Population', color: 'text-purple-600', iconName: 'TrendingUp' },
            { label: 'Cost', value: 'Low', description: 'Business costs', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: {
            title: 'Fastest Growing State',
            type: 'tip',
            content: 'Idaho is the <strong>fastest growing state</strong> by population. Tech companies relocating from CA get preferential treatment.'
        },
        seoKeywords: ['idaho small business grants', 'idaho startup funding', 'commerce idaho grants']
    },
    {
        id: 'illinois',
        name: 'Illinois',
        slug: 'illinois',
        abbreviation: 'IL',
        region: 'Midwest',
        totalFunding: '$2.8B+',
        description: 'Illinois provides major incentives through DCEO, the EDGE program, and strong R&D tax credits for tech and manufacturing companies.',
        topPrograms: [
            { name: 'EDGE Tax Credit', amount: '$25M', focus: 'Job Creation' },
            { name: 'SBIR Match', amount: '$100K', focus: 'R&D' },
            { name: 'Advantage Illinois', amount: '$500K', focus: 'Small Business' }
        ],
        keyIndustries: ['Fintech', 'Manufacturing', 'Ag Tech', 'Life Sciences'],
        metrics: [
            { label: 'EDGE', value: '$25M', description: 'Max credit', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'SBIR', value: '$100K', description: 'Match grant', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Chicago', value: '#3', description: 'Tech hub', color: 'text-purple-600', iconName: 'Building' },
            { label: 'R&D', value: '6.5%', description: 'Tax credit', color: 'text-orange-600', iconName: 'Cpu' }
        ],
        expertTip: {
            title: 'SBIR Matching',
            type: 'success',
            content: 'Illinois offers <strong>SBIR matching grants</strong> up to $100K. Win a federal SBIR and get automatic state co-funding.'
        },
        seoKeywords: ['illinois small business grants', 'dceo illinois grants', 'illinois startup funding']
    },
    {
        id: 'indiana',
        name: 'Indiana',
        slug: 'indiana',
        abbreviation: 'IN',
        region: 'Midwest',
        totalFunding: '$1.2B+',
        description: 'Indiana excels in manufacturing and logistics incentives through IEDC grants, the EDGE program, and strong workforce training funds.',
        topPrograms: [
            { name: 'EDGE Tax Credit', amount: '$50M', focus: 'Job Creation' },
            { name: 'Skills Enhancement', amount: '$5K/employee', focus: 'Training' },
            { name: 'Shovel Ready', amount: '$250K', focus: 'Site Development' }
        ],
        keyIndustries: ['Manufacturing', 'Logistics', 'Life Sciences', 'Ag Tech'],
        metrics: [
            { label: 'EDGE', value: '$50M', description: 'Max credit', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Training', value: '$5K', description: 'Per employee', color: 'text-blue-600', iconName: 'Users' },
            { label: 'Mfg', value: '#1', description: 'Per capita', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Cost', value: 'Low', description: 'Business costs', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: {
            title: 'Manufacturing Leader',
            type: 'tip',
            content: 'Indiana is <strong>#1 in manufacturing GDP per capita</strong>. Supply chain and industrial tech startups thrive here.'
        },
        seoKeywords: ['indiana small business grants', 'iedc indiana grants', 'indiana startup funding']
    },
    {
        id: 'iowa',
        name: 'Iowa',
        slug: 'iowa',
        abbreviation: 'IA',
        region: 'Midwest',
        totalFunding: '$780M+',
        description: 'Iowa provides strong incentives for agriculture, renewable energy, and biosciences through IEDA programs and tax credit initiatives.',
        topPrograms: [
            { name: 'HQJC Tax Credit', amount: '$3K/job', focus: 'Job Creation' },
            { name: 'Bioscience Fund', amount: '$1M', focus: 'Life Sciences' },
            { name: 'Renewable Energy', amount: '$500K', focus: 'Clean Energy' }
        ],
        keyIndustries: ['Agriculture', 'Biosciences', 'Renewable Energy', 'Manufacturing'],
        metrics: [
            { label: 'HQJC', value: '$3K/job', description: 'Tax credit', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Bio', value: '$1M', description: 'Fund grants', color: 'text-blue-600', iconName: 'Shield' },
            { label: 'Wind', value: '#2', description: 'In nation', color: 'text-purple-600', iconName: 'Leaf' },
            { label: 'Ag', value: '#1', description: 'Corn/soy', color: 'text-orange-600', iconName: 'Mountain' }
        ],
        expertTip: {
            title: 'Ag Tech Paradise',
            type: 'success',
            content: 'Iowa is <strong>ground zero for ag tech</strong>. Startups can access farmers, universities, and state funding all in one ecosystem.'
        },
        seoKeywords: ['iowa small business grants', 'ieda iowa grants', 'iowa startup funding']
    },
    {
        id: 'kansas',
        name: 'Kansas',
        slug: 'kansas',
        abbreviation: 'KS',
        region: 'Midwest',
        totalFunding: '$620M+',
        description: 'Kansas offers aerospace, agriculture, and manufacturing incentives through Kansas Commerce programs and the PEAK tax credit.',
        topPrograms: [
            { name: 'PEAK Tax Credit', amount: '95%', focus: 'Payroll Retention' },
            { name: 'HPIP Grant', amount: '$50K', focus: 'High Performance' },
            { name: 'KIT/KIR Training', amount: '$5K/employee', focus: 'Workforce' }
        ],
        keyIndustries: ['Aerospace', 'Agriculture', 'Manufacturing', 'Animal Health'],
        metrics: [
            { label: 'PEAK', value: '95%', description: 'Tax retention', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Aerospace', value: '#1', description: 'Per capita', color: 'text-blue-600', iconName: 'Rocket' },
            { label: 'Animal', value: 'Hub', description: 'Health corridor', color: 'text-purple-600', iconName: 'Shield' },
            { label: 'Cost', value: 'Low', description: 'Business costs', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: { title: 'Aerospace Capital', type: 'tip', content: 'Kansas is the <strong>Air Capital of the World</strong>. Aviation and aerospace companies get preferential treatment.' },
        seoKeywords: ['kansas small business grants', 'peak kansas tax credit', 'kansas startup funding']
    },
    {
        id: 'kentucky',
        name: 'Kentucky',
        slug: 'kentucky',
        abbreviation: 'KY',
        region: 'Southeast',
        totalFunding: '$950M+',
        description: 'Kentucky provides strong automotive, bourbon, and manufacturing incentives through KEDFA and the Kentucky Business Investment program.',
        topPrograms: [
            { name: 'KBI Tax Credit', amount: '$25M', focus: 'Job Creation' },
            { name: 'Bluegrass Fund', amount: '$500K', focus: 'Small Business' },
            { name: 'Skills Training', amount: '$2K/employee', focus: 'Workforce' }
        ],
        keyIndustries: ['Automotive', 'Bourbon', 'Manufacturing', 'Logistics'],
        metrics: [
            { label: 'KBI', value: '$25M', description: 'Max credit', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Auto', value: '#3', description: 'In nation', color: 'text-blue-600', iconName: 'Building' },
            { label: 'Bourbon', value: '95%', description: 'US production', color: 'text-purple-600', iconName: 'Award' },
            { label: 'Location', value: 'Central', description: 'Logistics hub', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: { title: 'EV Battery Corridor', type: 'success', content: 'Kentucky is becoming an <strong>EV battery manufacturing hub</strong>. Major investments from Ford and SK Innovation.' },
        seoKeywords: ['kentucky small business grants', 'kedfa kentucky loans', 'kentucky startup funding']
    },
    {
        id: 'louisiana',
        name: 'Louisiana',
        slug: 'louisiana',
        abbreviation: 'LA',
        region: 'Southeast',
        totalFunding: '$1.1B+',
        description: 'Louisiana offers major energy, petrochemical, and film incentives through LED programs and the Industrial Tax Exemption.',
        topPrograms: [
            { name: 'ITEP Exemption', amount: '80%', focus: 'Property Tax' },
            { name: 'QJ Tax Credit', amount: '$3.5K/job', focus: 'Job Creation' },
            { name: 'Film Tax Credit', amount: '40%', focus: 'Entertainment' }
        ],
        keyIndustries: ['Energy', 'Petrochemical', 'Film', 'Maritime'],
        metrics: [
            { label: 'ITEP', value: '80%', description: 'Tax exemption', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Film', value: '40%', description: 'Tax credit', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Energy', value: '#2', description: 'Producer', color: 'text-purple-600', iconName: 'Zap' },
            { label: 'Port', value: 'Major', description: 'Mississippi River', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: { title: 'LNG Boom', type: 'success', content: 'Louisiana is the <strong>LNG export capital</strong> of America. Energy tech startups have massive opportunities.' },
        seoKeywords: ['louisiana small business grants', 'led louisiana incentives', 'louisiana startup funding']
    },
    {
        id: 'massachusetts',
        name: 'Massachusetts',
        slug: 'massachusetts',
        abbreviation: 'MA',
        region: 'Northeast',
        totalFunding: '$4.2B+',
        description: 'Massachusetts leads in biotech and deep tech through Mass Life Sciences, MassVentures, and world-class university partnerships.',
        topPrograms: [
            { name: 'Mass Life Sciences', amount: '$1B', focus: 'Biotech' },
            { name: 'MassVentures', amount: '$500K', focus: 'Tech Startups' },
            { name: 'R&D Tax Credit', amount: '10%', focus: 'Research' }
        ],
        keyIndustries: ['Biotech', 'Healthcare', 'Robotics', 'Clean Energy'],
        metrics: [
            { label: 'Life Sci', value: '$1B', description: 'Initiative', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Biotech', value: '#1', description: 'In nation', color: 'text-blue-600', iconName: 'Shield' },
            { label: 'MIT/Harvard', value: 'Partners', description: 'Research', color: 'text-purple-600', iconName: 'Award' },
            { label: 'VC', value: '#2', description: 'Investment', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'Biotech Capital', type: 'success', content: 'Massachusetts is the <strong>global biotech capital</strong>. Cambridge alone has 400+ life sciences companies.' },
        seoKeywords: ['massachusetts small business grants', 'mass life sciences grants', 'boston startup funding']
    },
    {
        id: 'michigan',
        name: 'Michigan',
        slug: 'michigan',
        abbreviation: 'MI',
        region: 'Midwest',
        totalFunding: '$3.5B+',
        description: 'Michigan provides major automotive, EV, and manufacturing incentives through MEDC programs and the SOAR Fund.',
        topPrograms: [
            { name: 'MEDC Grants', amount: '$1M', focus: 'Economic Development' },
            { name: 'Good Jobs Fund', amount: '$5K/job', focus: 'Job Creation' },
            { name: 'SOAR Fund', amount: '$100K', focus: 'Startups' }
        ],
        keyIndustries: ['Automotive', 'EV/Battery', 'Manufacturing', 'Agriculture'],
        metrics: [
            { label: 'MEDC', value: '$1M', description: 'Max grants', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Auto', value: '#1', description: 'Production', color: 'text-blue-600', iconName: 'Building' },
            { label: 'EV', value: 'Hub', description: 'Development', color: 'text-purple-600', iconName: 'Zap' },
            { label: 'SOAR', value: '$100K', description: 'Startup fund', color: 'text-orange-600', iconName: 'Rocket' }
        ],
        expertTip: { title: 'EV Transformation', type: 'success', content: 'Michigan is <strong>investing billions in EV</strong>. The supply chain opportunity is massive.' },
        seoKeywords: ['michigan small business grants', 'medc michigan grants', 'michigan startup funding']
    },
    {
        id: 'minnesota',
        name: 'Minnesota',
        slug: 'minnesota',
        abbreviation: 'MN',
        region: 'Midwest',
        totalFunding: '$1.8B+',
        description: 'Minnesota offers strong medical device, cleantech, and agriculture incentives through DEED programs and the Angel Tax Credit.',
        topPrograms: [
            { name: 'Angel Tax Credit', amount: '25%', focus: 'Startup Investment' },
            { name: 'JCTP Grant', amount: '$2M', focus: 'Job Creation' },
            { name: 'Launch Minnesota', amount: '$250K', focus: 'Startups' }
        ],
        keyIndustries: ['Medical Devices', 'Agriculture', 'Clean Tech', 'Retail'],
        metrics: [
            { label: 'Angel', value: '25%', description: 'Tax credit', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'MedTech', value: '#1', description: 'Per capita', color: 'text-blue-600', iconName: 'Shield' },
            { label: 'Fortune', value: '17', description: 'HQs', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Quality', value: '#1', description: 'Business climate', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: { title: 'Angel Tax Credit', type: 'tip', content: 'Minnesota offers a <strong>25% angel investor tax credit</strong>. This makes fundraising significantly easier.' },
        seoKeywords: ['minnesota small business grants', 'deed minnesota grants', 'minnesota startup funding']
    },
    {
        id: 'missouri',
        name: 'Missouri',
        slug: 'missouri',
        abbreviation: 'MO',
        region: 'Midwest',
        totalFunding: '$980M+',
        description: 'Missouri provides manufacturing, tech, and agricultural incentives through DED programs and the Missouri Works program.',
        topPrograms: [
            { name: 'Missouri Works', amount: '$3K/job', focus: 'Job Creation' },
            { name: 'BUILD Program', amount: '$500K', focus: 'Infrastructure' },
            { name: 'MOBEC Fund', amount: '$250K', focus: 'Small Business' }
        ],
        keyIndustries: ['Manufacturing', 'Agriculture', 'Fintech', 'Healthcare'],
        metrics: [
            { label: 'Works', value: '$3K/job', description: 'Tax retention', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Central', value: 'Location', description: 'Logistics hub', color: 'text-blue-600', iconName: 'Globe' },
            { label: 'Cost', value: 'Low', description: 'Business costs', color: 'text-purple-600', iconName: 'Award' },
            { label: 'St. Louis', value: 'Tech Hub', description: 'Growing', color: 'text-orange-600', iconName: 'Building' }
        ],
        expertTip: { title: 'Cortex District', type: 'tip', content: 'St. Louis <strong>Cortex Innovation District</strong> offers special incentives for tech startups.' },
        seoKeywords: ['missouri small business grants', 'ded missouri grants', 'missouri startup funding']
    },
    {
        id: 'new-york',
        name: 'New York',
        slug: 'new-york',
        abbreviation: 'NY',
        region: 'Northeast',
        totalFunding: '$6.8B+',
        description: 'New York offers major tech, biotech, and manufacturing incentives through ESD programs, Excelsior Jobs, and regional economic councils.',
        topPrograms: [
            { name: 'Excelsior Jobs', amount: '$50M', focus: 'Job Creation' },
            { name: 'Life Sciences Fund', amount: '$620M', focus: 'Biotech' },
            { name: 'Innovation Hot Spots', amount: '$500K', focus: 'Startups' }
        ],
        keyIndustries: ['Fintech', 'Media', 'Biotech', 'Fashion'],
        metrics: [
            { label: 'Excelsior', value: '$50M', description: 'Max credits', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'NYC', value: '#2', description: 'Tech hub', color: 'text-blue-600', iconName: 'Building' },
            { label: 'Life Sci', value: '$620M', description: 'Fund', color: 'text-purple-600', iconName: 'Shield' },
            { label: 'Upstate', value: 'Chips', description: 'Manufacturing', color: 'text-orange-600', iconName: 'Cpu' }
        ],
        expertTip: { title: 'Upstate Opportunity', type: 'tip', content: '<strong>Upstate NY has lower costs</strong> than NYC but same state incentives. Consider Buffalo, Rochester, or Albany.' },
        seoKeywords: ['new york small business grants', 'esd new york grants', 'nyc startup funding']
    },
    {
        id: 'north-carolina',
        name: 'North Carolina',
        slug: 'north-carolina',
        abbreviation: 'NC',
        region: 'Southeast',
        totalFunding: '$2.4B+',
        description: 'North Carolina excels in biotech, fintech, and manufacturing through EDPNC programs and the Research Triangle ecosystem.',
        topPrograms: [
            { name: 'JDIG Grant', amount: '$10M', focus: 'Job Creation' },
            { name: 'One NC Fund', amount: '$500K', focus: 'Economic Development' },
            { name: 'SBIR Matching', amount: '$100K', focus: 'R&D' }
        ],
        keyIndustries: ['Biotech', 'Fintech', 'Manufacturing', 'Agriculture'],
        metrics: [
            { label: 'JDIG', value: '$10M', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'RTP', value: '#1', description: 'Research park', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Banks', value: '#2', description: 'HQ city', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Growth', value: '+5%', description: 'Annual', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'Research Triangle', type: 'success', content: 'The <strong>Research Triangle Park</strong> is the largest in the US. Access to Duke, UNC, NC State is unmatched.' },
        seoKeywords: ['north carolina small business grants', 'edpnc grants', 'raleigh startup funding']
    },
    {
        id: 'texas',
        name: 'Texas',
        slug: 'texas',
        abbreviation: 'TX',
        region: 'Southwest',
        totalFunding: '$5.2B+',
        description: 'Texas offers massive tech, energy, and manufacturing incentives through the Texas Enterprise Fund and no state income tax.',
        topPrograms: [
            { name: 'Texas Enterprise Fund', amount: '$100M', focus: 'Job Creation' },
            { name: 'Skills Development', amount: '$2M', focus: 'Workforce' },
            { name: 'CPRIT', amount: '$3B', focus: 'Cancer Research' }
        ],
        keyIndustries: ['Technology', 'Energy', 'Manufacturing', 'Aerospace'],
        metrics: [
            { label: 'TEF', value: '$100M', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Tax', value: 'None', description: 'No income tax', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Tech', value: '#2', description: 'In nation', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Growth', value: '#1', description: 'Job creation', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'No State Income Tax', type: 'success', content: 'Texas has <strong>no state income tax</strong>. Combined with TEF grants, this is extremely attractive for relocating companies.' },
        seoKeywords: ['texas small business grants', 'texas enterprise fund', 'austin startup funding']
    },
    {
        id: 'montana',
        name: 'Montana',
        slug: 'montana',
        abbreviation: 'MT',
        region: 'West',
        totalFunding: '$320M+',
        description: 'Montana offers rural business incentives through Big Sky Economic Development and strong agriculture and energy programs.',
        topPrograms: [
            { name: 'Big Sky Trust Fund', amount: '$500K', focus: 'Economic Development' },
            { name: 'CDBG Grants', amount: '$250K', focus: 'Community Development' },
            { name: 'Coal Trust Fund', amount: '$1M', focus: 'Energy Transition' }
        ],
        keyIndustries: ['Agriculture', 'Energy', 'Tourism', 'Technology'],
        metrics: [
            { label: 'Trust', value: '$500K', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Rural', value: '100%', description: 'Focus', color: 'text-blue-600', iconName: 'Mountain' },
            { label: 'Tax', value: 'Low', description: 'Business costs', color: 'text-purple-600', iconName: 'Award' },
            { label: 'Growth', value: '+4%', description: 'Population', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'Remote Work Hub', type: 'tip', content: 'Montana is becoming a <strong>remote work destination</strong>. Tech companies can access talent at lower costs.' },
        seoKeywords: ['montana small business grants', 'big sky trust fund', 'montana startup funding']
    },
    {
        id: 'nevada',
        name: 'Nevada',
        slug: 'nevada',
        abbreviation: 'NV',
        region: 'West',
        totalFunding: '$1.4B+',
        description: 'Nevada provides major tech relocation incentives with no corporate tax, no personal income tax, and the Nevada Governor Office programs.',
        topPrograms: [
            { name: 'GOED Grants', amount: '$5M', focus: 'Economic Development' },
            { name: 'Catalyst Fund', amount: '$500K', focus: 'Tech Startups' },
            { name: 'Workforce Training', amount: '$1K/employee', focus: 'Training' }
        ],
        keyIndustries: ['Technology', 'Gaming', 'Logistics', 'Clean Energy'],
        metrics: [
            { label: 'GOED', value: '$5M', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Tax', value: 'None', description: 'No income tax', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Tesla', value: 'Gigafactory', description: 'Major investment', color: 'text-purple-600', iconName: 'Zap' },
            { label: 'Growth', value: '#2', description: 'In nation', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'Tax Haven', type: 'success', content: 'Nevada has <strong>no corporate tax and no personal income tax</strong>. Major tech companies are relocating here.' },
        seoKeywords: ['nevada small business grants', 'goed nevada incentives', 'las vegas startup funding']
    },
    {
        id: 'new-jersey',
        name: 'New Jersey',
        slug: 'new-jersey',
        abbreviation: 'NJ',
        region: 'Northeast',
        totalFunding: '$2.1B+',
        description: 'New Jersey offers strong pharma, biotech, and fintech incentives through NJEDA programs and tax credit initiatives.',
        topPrograms: [
            { name: 'Grow NJ', amount: '$50M', focus: 'Job Creation' },
            { name: 'Angel Investor Credit', amount: '20%', focus: 'Startup Investment' },
            { name: 'R&D Tax Credit', amount: '10%', focus: 'Research' }
        ],
        keyIndustries: ['Pharma', 'Fintech', 'Life Sciences', 'Logistics'],
        metrics: [
            { label: 'Grow NJ', value: '$50M', description: 'Max credits', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Pharma', value: '#1', description: 'In nation', color: 'text-blue-600', iconName: 'Shield' },
            { label: 'Angel', value: '20%', description: 'Tax credit', color: 'text-purple-600', iconName: 'Award' },
            { label: 'Location', value: 'NYC+Philly', description: 'Access', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: { title: 'Pharma Capital', type: 'tip', content: 'New Jersey is the <strong>pharmaceutical capital</strong> of the world. Biotech startups have unique access to talent and partners.' },
        seoKeywords: ['new jersey small business grants', 'njeda grants', 'new jersey startup funding']
    },
    {
        id: 'ohio',
        name: 'Ohio',
        slug: 'ohio',
        abbreviation: 'OH',
        region: 'Midwest',
        totalFunding: '$2.8B+',
        description: 'Ohio provides major manufacturing and tech incentives through JobsOhio, the largest economic development corporation in the US.',
        topPrograms: [
            { name: 'JobsOhio Grant', amount: '$10M', focus: 'Economic Development' },
            { name: 'R&D Loan', amount: '$2M', focus: 'Innovation' },
            { name: 'Workforce Grant', amount: '$500K', focus: 'Training' }
        ],
        keyIndustries: ['Manufacturing', 'Healthcare', 'Fintech', 'Aerospace'],
        metrics: [
            { label: 'JobsOhio', value: '$10M', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Mfg', value: '#3', description: 'In nation', color: 'text-blue-600', iconName: 'Building' },
            { label: 'Intel', value: '$20B', description: 'Investment', color: 'text-purple-600', iconName: 'Cpu' },
            { label: 'Cost', value: 'Low', description: 'Business costs', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: { title: 'Intel Chip Hub', type: 'success', content: 'Intel is building a <strong>$20B chip manufacturing facility</strong> in Ohio. Supply chain opportunities are massive.' },
        seoKeywords: ['ohio small business grants', 'jobsohio grants', 'ohio startup funding']
    },
    {
        id: 'oregon',
        name: 'Oregon',
        slug: 'oregon',
        abbreviation: 'OR',
        region: 'West',
        totalFunding: '$980M+',
        description: 'Oregon offers strong clean tech, semiconductor, and outdoor industry incentives through Business Oregon programs.',
        topPrograms: [
            { name: 'Oregon Investment Fund', amount: '$250K', focus: 'Startups' },
            { name: 'SBIR Matching', amount: '$100K', focus: 'R&D' },
            { name: 'Workforce Training', amount: '$2K/employee', focus: 'Training' }
        ],
        keyIndustries: ['Semiconductors', 'Clean Tech', 'Outdoor Recreation', 'Software'],
        metrics: [
            { label: 'OIF', value: '$250K', description: 'Startup fund', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Chips', value: '#2', description: 'In nation', color: 'text-blue-600', iconName: 'Cpu' },
            { label: 'Tax', value: 'None', description: 'No sales tax', color: 'text-purple-600', iconName: 'Award' },
            { label: 'Portland', value: 'Tech Hub', description: 'Growing', color: 'text-orange-600', iconName: 'Building' }
        ],
        expertTip: { title: 'No Sales Tax', type: 'tip', content: 'Oregon has <strong>no sales tax</strong>. This makes consumer-facing startups more competitive.' },
        seoKeywords: ['oregon small business grants', 'business oregon grants', 'portland startup funding']
    },
    {
        id: 'pennsylvania',
        name: 'Pennsylvania',
        slug: 'pennsylvania',
        abbreviation: 'PA',
        region: 'Northeast',
        totalFunding: '$3.2B+',
        description: 'Pennsylvania offers major biotech, robotics, and manufacturing incentives through DCED programs and Ben Franklin Technology Partners.',
        topPrograms: [
            { name: 'Ben Franklin', amount: '$500K', focus: 'Tech Startups' },
            { name: 'PA First', amount: '$2M', focus: 'Job Creation' },
            { name: 'Manufacturing Tax Credit', amount: '$5M', focus: 'Manufacturing' }
        ],
        keyIndustries: ['Healthcare', 'Robotics', 'Manufacturing', 'Energy'],
        metrics: [
            { label: 'Ben Franklin', value: '$500K', description: 'Startup fund', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Robotics', value: 'Hub', description: 'Pittsburgh', color: 'text-blue-600', iconName: 'Cpu' },
            { label: 'Pharma', value: '#2', description: 'In nation', color: 'text-purple-600', iconName: 'Shield' },
            { label: 'CMU', value: 'Partner', description: 'Research', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: { title: 'Pittsburgh Robotics', type: 'success', content: 'Pittsburgh is the <strong>robotics capital</strong> of the world. CMU partnerships drive major innovation.' },
        seoKeywords: ['pennsylvania small business grants', 'ben franklin tech partners', 'pittsburgh startup funding']
    },
    {
        id: 'tennessee',
        name: 'Tennessee',
        slug: 'tennessee',
        abbreviation: 'TN',
        region: 'Southeast',
        totalFunding: '$1.6B+',
        description: 'Tennessee offers major automotive and healthcare incentives with no state income tax through ECD programs.',
        topPrograms: [
            { name: 'FastTrack', amount: '$10M', focus: 'Job Creation' },
            { name: 'SBIR Matching', amount: '$100K', focus: 'R&D' },
            { name: 'Training Grant', amount: '$2K/employee', focus: 'Workforce' }
        ],
        keyIndustries: ['Automotive', 'Healthcare', 'Music', 'Logistics'],
        metrics: [
            { label: 'FastTrack', value: '$10M', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Tax', value: 'None', description: 'No income tax', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Auto', value: '#1', description: 'Per capita', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Nashville', value: 'Boom', description: 'Tech growth', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'Nashville Tech Boom', type: 'success', content: 'Nashville is experiencing a <strong>major tech boom</strong>. Healthcare IT and fintech startups are thriving.' },
        seoKeywords: ['tennessee small business grants', 'fasttrack tennessee', 'nashville startup funding']
    },
    {
        id: 'utah',
        name: 'Utah',
        slug: 'utah',
        abbreviation: 'UT',
        region: 'West',
        totalFunding: '$1.1B+',
        description: 'Utah excels as Silicon Slopes with major tech incentives through GOED programs and strong venture capital ecosystem.',
        topPrograms: [
            { name: 'EDTIF Tax Credit', amount: '30%', focus: 'Tech Companies' },
            { name: 'Technology Commercialization', amount: '$500K', focus: 'R&D' },
            { name: 'Rural Fast Track', amount: '$50K', focus: 'Rural Business' }
        ],
        keyIndustries: ['Technology', 'Life Sciences', 'Aerospace', 'Outdoor Recreation'],
        metrics: [
            { label: 'EDTIF', value: '30%', description: 'Tax credit', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Tech', value: '#1', description: 'Job growth', color: 'text-blue-600', iconName: 'TrendingUp' },
            { label: 'Unicorns', value: '20+', description: 'Companies', color: 'text-purple-600', iconName: 'Rocket' },
            { label: 'Cost', value: 'Low', description: 'vs. CA', color: 'text-orange-600', iconName: 'Award' }
        ],
        expertTip: { title: 'Silicon Slopes', type: 'success', content: '<strong>Silicon Slopes</strong> has produced 20+ unicorns. Utah offers CA-level talent at much lower costs.' },
        seoKeywords: ['utah small business grants', 'silicon slopes funding', 'salt lake city startup grants']
    },
    {
        id: 'virginia',
        name: 'Virginia',
        slug: 'virginia',
        abbreviation: 'VA',
        region: 'Southeast',
        totalFunding: '$2.6B+',
        description: 'Virginia offers major defense, tech, and data center incentives through VEDP programs and proximity to Washington DC.',
        topPrograms: [
            { name: 'Virginia Jobs Investment', amount: '$3K/job', focus: 'Job Creation' },
            { name: 'Data Center Tax Credit', amount: '$50M', focus: 'Tech Infrastructure' },
            { name: 'R&D Tax Credit', amount: '15%', focus: 'Research' }
        ],
        keyIndustries: ['Defense', 'Technology', 'Data Centers', 'Life Sciences'],
        metrics: [
            { label: 'VJI', value: '$3K/job', description: 'Grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Data', value: '#1', description: 'Centers', color: 'text-blue-600', iconName: 'Cpu' },
            { label: 'Defense', value: 'Hub', description: 'Contractors', color: 'text-purple-600', iconName: 'Shield' },
            { label: 'Amazon', value: 'HQ2', description: 'Major investment', color: 'text-orange-600', iconName: 'Building' }
        ],
        expertTip: { title: 'Defense Contracting', type: 'tip', content: 'Virginia is <strong>ideal for defense contractors</strong>. Proximity to Pentagon and agencies is unmatched.' },
        seoKeywords: ['virginia small business grants', 'vedp virginia incentives', 'northern virginia startup funding']
    },
    {
        id: 'washington',
        name: 'Washington',
        slug: 'washington',
        abbreviation: 'WA',
        region: 'West',
        totalFunding: '$2.9B+',
        description: 'Washington offers major tech and clean energy incentives with no state income tax through Commerce programs.',
        topPrograms: [
            { name: 'Clean Energy Fund', amount: '$100M', focus: 'Clean Tech' },
            { name: 'Job Skills Program', amount: '$2M', focus: 'Workforce' },
            { name: 'Innovation Partnership', amount: '$500K', focus: 'R&D' }
        ],
        keyIndustries: ['Technology', 'Clean Energy', 'Aerospace', 'Life Sciences'],
        metrics: [
            { label: 'Clean', value: '$100M', description: 'Energy fund', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Tax', value: 'None', description: 'No income tax', color: 'text-blue-600', iconName: 'Award' },
            { label: 'Amazon', value: 'HQ', description: 'Seattle', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Microsoft', value: 'HQ', description: 'Redmond', color: 'text-orange-600', iconName: 'Cpu' }
        ],
        expertTip: { title: 'Tech Giant Access', type: 'success', content: 'Washington is home to <strong>Amazon, Microsoft, and Boeing</strong>. Enterprise sales and partnerships are easier here.' },
        seoKeywords: ['washington small business grants', 'washington state startup funding', 'seattle startup grants']
    },
    {
        id: 'wisconsin',
        name: 'Wisconsin',
        slug: 'wisconsin',
        abbreviation: 'WI',
        region: 'Midwest',
        totalFunding: '$890M+',
        description: 'Wisconsin offers strong manufacturing and agriculture incentives through WEDC programs and the Fabrication Laboratories Network.',
        topPrograms: [
            { name: 'Business Development', amount: '$1M', focus: 'Job Creation' },
            { name: 'Fab Labs Network', amount: '$250K', focus: 'Manufacturing Innovation' },
            { name: 'Workforce Training', amount: '$5K/employee', focus: 'Skills' }
        ],
        keyIndustries: ['Manufacturing', 'Agriculture', 'Healthcare', 'Technology'],
        metrics: [
            { label: 'WEDC', value: '$1M', description: 'Max grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Mfg', value: '#1', description: 'Cheese/dairy', color: 'text-blue-600', iconName: 'Building' },
            { label: 'Foxconn', value: 'Investment', description: 'Major', color: 'text-purple-600', iconName: 'Cpu' },
            { label: 'Water', value: 'Hub', description: 'Technology', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: { title: 'Water Technology', type: 'tip', content: 'Wisconsin is the <strong>Water Technology Hub</strong> of the US. Water tech startups have unique advantages here.' },
        seoKeywords: ['wisconsin small business grants', 'wedc wisconsin grants', 'milwaukee startup funding']
    },
    {
        id: 'maine',
        name: 'Maine',
        slug: 'maine',
        abbreviation: 'ME',
        region: 'Northeast',
        totalFunding: '$350M+',
        description: 'Maine offers funding through MTI for forestry, boat building, and tech innovation, along with diverse small business support programs.',
        topPrograms: [
            { name: 'MTI Tech Asset Fund', amount: '$50K', focus: 'R&D' },
            { name: 'Maine Venture Fund', amount: '$500K', focus: 'Equity' },
            { name: 'Seed Grant', amount: '$25K', focus: 'Early Stage' }
        ],
        keyIndustries: ['Forestry', 'Marine', 'Technology', 'Agriculture'],
        metrics: [
            { label: 'MTI', value: '$5M', description: 'Tech fund', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Marine', value: 'Hub', description: 'Blue economy', color: 'text-blue-600', iconName: 'Anchor' },
            { label: 'Tax', value: 'Credit', description: 'R&D', color: 'text-purple-600', iconName: 'PieChart' },
            { label: 'Remote', value: 'Growth', description: 'Talent', color: 'text-orange-600', iconName: 'Users' }
        ],
        expertTip: { title: 'MTI Funding', type: 'success', content: '<strong>Maine Technology Institute (MTI)</strong> is the primary funding source. They offer grants, loans, and equity investments.' },
        seoKeywords: ['maine small business grants', 'mti maine grants', 'maine startup funding']
    },
    {
        id: 'maryland',
        name: 'Maryland',
        slug: 'maryland',
        abbreviation: 'MD',
        region: 'Northeast',
        totalFunding: '$2.1B+',
        description: 'Maryland is a leader in biotech and cybersecurity, offering TEDCO funding and proximity to federal agencies.',
        topPrograms: [
            { name: 'TEDCO Builder Fund', amount: '$50K', focus: 'Startups' },
            { name: 'MII Funding', amount: '$115K', focus: 'University Tech' },
            { name: 'Cyber Tax Credit', amount: '33%', focus: 'Security' }
        ],
        keyIndustries: ['Biotech', 'Cybersecurity', 'Aerospace', 'Manufacturing'],
        metrics: [
            { label: 'TEDCO', value: '$200K', description: 'Seed fund', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Cyber', value: '#1', description: 'In nation', color: 'text-blue-600', iconName: 'Shield' },
            { label: 'Bio', value: 'Hub', description: 'MedTech', color: 'text-purple-600', iconName: 'Activity' },
            { label: 'Gov', value: 'Contracts', description: 'Federal', color: 'text-orange-600', iconName: 'Building' }
        ],
        expertTip: { title: 'TEDCO is Key', type: 'success', content: '<strong>TEDCO</strong> is the hub for Maryland startups. Their Builder Fund specifically targets disadvantaged founders.' },
        seoKeywords: ['maryland small business grants', 'tedco grants', 'maryland startup funding']
    },
    {
        id: 'mississippi',
        name: 'Mississippi',
        slug: 'mississippi',
        abbreviation: 'MS',
        region: 'Southeast',
        totalFunding: '$480M+',
        description: 'Mississippi provides incentives for manufacturing and agriculture through MDA and the Mississippi Business Finance Corporation.',
        topPrograms: [
            { name: 'MDA Grants', amount: '$100K', focus: 'Development' },
            { name: 'Job Protection Grant', amount: '$200K', focus: 'Retention' },
            { name: 'Minority Business', amount: '$25K', focus: 'Diverse Founders' }
        ],
        keyIndustries: ['Manufacturing', 'Agriculture', 'Energy', 'Blue Economy'],
        metrics: [
            { label: 'MDA', value: '$100K', description: 'Dev grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Cost', value: 'Lowest', description: 'In nation', color: 'text-blue-600', iconName: 'TrendingDown' },
            { label: 'Ag', value: 'Focus', description: 'Key sector', color: 'text-purple-600', iconName: 'Sprout' },
            { label: 'River', value: 'Hub', description: 'Logistics', color: 'text-orange-600', iconName: 'Globe' }
        ],
        expertTip: { title: 'Low Cost of Living', type: 'tip', content: 'Mississippi has the <strong>lowest cost of doing business</strong> in the US. Great for maximizing runway.' },
        seoKeywords: ['mississippi small business grants', 'mda grants', 'jackson startup funding']
    },
    {
        id: 'nebraska',
        name: 'Nebraska',
        slug: 'nebraska',
        abbreviation: 'NE',
        region: 'Midwest',
        totalFunding: '$550M+',
        description: 'Nebraska offers strong ag-tech and manufacturing incentives through DED and the Nebraska Innovation Fund.',
        topPrograms: [
            { name: 'Innovation Fund', amount: '$100K', focus: 'Prototyping' },
            { name: 'Customized Training', amount: '$4K/job', focus: 'Workforce' },
            { name: 'Rural Grant', amount: '$50K', focus: 'Development' }
        ],
        keyIndustries: ['AgTech', 'Manufacturing', 'Fintech', 'Biofuels'],
        metrics: [
            { label: 'Fund', value: '$100K', description: 'Proto grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Ag', value: '#3', description: 'Producer', color: 'text-blue-600', iconName: 'Sprout' },
            { label: 'Tech', value: 'Silicon', description: 'Prairie', color: 'text-purple-600', iconName: 'Cpu' },
            { label: 'Jobs', value: 'High', description: 'Retention', color: 'text-orange-600', iconName: 'Users' }
        ],
        expertTip: { title: 'Silicon Prairie', type: 'success', content: 'Lincoln and Omaha are the heart of the <strong>Silicon Prairie</strong>. Tech density is surprisingly high.' },
        seoKeywords: ['nebraska small business grants', 'ded nebraska grants', 'omaha startup funding']
    },
    {
        id: 'new-hampshire',
        name: 'New Hampshire',
        slug: 'new-hampshire',
        abbreviation: 'NH',
        region: 'Northeast',
        totalFunding: '$320M+',
        description: 'New Hampshire offers a tax-friendly environment with no sales or income tax, supported by BFA loans and training grants.',
        topPrograms: [
            { name: 'Job Training Fund', amount: '50%', focus: 'Matching' },
            { name: 'BFA Loans', amount: '$500K', focus: 'Growth' },
            { name: 'Co-op Fund', amount: '$100K', focus: 'Development' }
        ],
        keyIndustries: ['Manufacturing', 'Technology', 'Tourism', 'Healthcare'],
        metrics: [
            { label: 'Tax', value: '0%', description: 'Sales/Income', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'BFA', value: 'Loan', description: 'Guarantee', color: 'text-blue-600', iconName: 'Shield' },
            { label: 'Tech', value: 'High', description: 'Concentration', color: 'text-purple-600', iconName: 'Cpu' },
            { label: 'QOL', value: '#1', description: 'Ranked', color: 'text-orange-600', iconName: 'Star' }
        ],
        expertTip: { title: 'Tax Advantage', type: 'tip', content: 'New Hampshire has <strong>no sales tax and no personal income tax</strong>. It is the tax haven of New England.' },
        seoKeywords: ['new hampshire small business grants', 'bfa new hampshire', 'nh business finance authority']
    },
    {
        id: 'new-mexico',
        name: 'New Mexico',
        slug: 'new-mexico',
        abbreviation: 'NM',
        region: 'Southwest',
        totalFunding: '$450M+',
        description: 'New Mexico leverages its national labs for deep tech funding through NMSBA and LEED incentives.',
        topPrograms: [
            { name: 'LEDA Grants', amount: '$1M', focus: 'Job Creation' },
            { name: 'JTIP Training', amount: '50%', focus: 'Wage Reimbursement' },
            { name: 'Small Business Grant', amount: '$50K', focus: 'General' }
        ],
        keyIndustries: ['Aerospace', 'Film', 'Energy', 'Deep Tech'],
        metrics: [
            { label: 'LEDA', value: '$1M', description: 'Max project', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Labs', value: '2', description: 'National Labs', color: 'text-blue-600', iconName: 'Beaker' },
            { label: 'Film', value: '35%', description: 'Tax credit', color: 'text-purple-600', iconName: 'Video' },
            { label: 'Space', value: 'Port', description: 'Hub', color: 'text-orange-600', iconName: 'Rocket' }
        ],
        expertTip: { title: 'Lab Partnership', type: 'success', content: 'Partner with <strong>Los Alamos or Sandia National Labs</strong>. The NMSBA program pays for their scientists to solve your technical problems.' },
        seoKeywords: ['new mexico small business grants', 'leda grants nm', 'new mexico startup funding']
    },
    {
        id: 'north-dakota',
        name: 'North Dakota',
        slug: 'north-dakota',
        abbreviation: 'ND',
        region: 'Midwest',
        totalFunding: '$380M+',
        description: 'North Dakota offers robust agriculture, energy, and drone tech incentives through the Commerce Department and BND.',
        topPrograms: [
            { name: 'LIFT Fund', amount: '$1M', focus: 'Tech Innovation' },
            { name: 'APUC Grants', amount: '$50K', focus: 'Ag Products' },
            { name: 'Flex PACE', amount: '$100K', focus: 'Interest Buydown' }
        ],
        keyIndustries: ['UAS/Drones', 'Agriculture', 'Energy', 'Manufacturing'],
        metrics: [
            { label: 'LIFT', value: '$1M', description: 'Loan fund', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Drones', value: '#1', description: 'Test site', color: 'text-blue-600', iconName: 'Plane' },
            { label: 'Bank', value: 'State', description: 'Owned', color: 'text-purple-600', iconName: 'Building' },
            { label: 'Oil', value: '#2', description: 'Producer', color: 'text-orange-600', iconName: 'Droplet' }
        ],
        expertTip: { title: 'Bank of North Dakota', type: 'tip', content: 'The <strong>Bank of North Dakota</strong> is the only state-owned bank in the US. They offer unique business financing programs not available elsewhere.' },
        seoKeywords: ['north dakota small business grants', 'lift fund nd', 'north dakota startup funding']
    },
    {
        id: 'oklahoma',
        name: 'Oklahoma',
        slug: 'oklahoma',
        abbreviation: 'OK',
        region: 'Southwest',
        totalFunding: '$650M+',
        description: 'Oklahoma incentivizes aerospace, energy, and biotech through OCAST and the Quality Jobs program.',
        topPrograms: [
            { name: 'Quality Jobs', amount: '5%', focus: 'Cash Rebate' },
            { name: 'OCAST Funding', amount: '$300K', focus: 'R&D' },
            { name: 'Business Expansion', amount: '$1M', focus: 'Growth' }
        ],
        keyIndustries: ['Aerospace', 'Energy', 'Biotech', 'Manufacturing'],
        metrics: [
            { label: 'Rebate', value: '5%', description: 'Payroll cash', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Aero', value: 'MRO', description: 'Capital', color: 'text-blue-600', iconName: 'Plane' },
            { label: 'Cost', value: 'Low', description: 'Living', color: 'text-purple-600', iconName: 'Home' },
            { label: 'Tech', value: 'Rising', description: 'Tulsa/OKC', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'Tulsa Remote', type: 'success', content: '<strong>Tulsa Remote</strong> pays remote workers $10,000 to move there. Great for founders bootstrapping with a remote job.' },
        seoKeywords: ['oklahoma small business grants', 'ocast grants', 'oklahoma startup funding']
    },
    {
        id: 'rhode-island',
        name: 'Rhode Island',
        slug: 'rhode-island',
        abbreviation: 'RI',
        region: 'Northeast',
        totalFunding: '$250M+',
        description: 'Rhode Island supports innovation and blue economy projects through Commerce RI and the Innovation Voucher program.',
        topPrograms: [
            { name: 'Innovation Voucher', amount: '$50K', focus: 'R&D' },
            { name: 'Small Biz Grant', amount: '$5K', focus: 'General' },
            { name: 'Wavemaker Fellowship', amount: 'Loan', focus: 'Talent' }
        ],
        keyIndustries: ['Blue Economy', 'Biotech', 'Design', 'Manufacturing'],
        metrics: [
            { label: 'Voucher', value: '$50K', description: 'R&D', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Ocean', value: 'Tech', description: 'Hub', color: 'text-blue-600', iconName: 'Anchor' },
            { label: 'Design', value: 'RISD', description: 'Talent', color: 'text-purple-600', iconName: 'PenTool' },
            { label: 'Size', value: 'Small', description: 'Access', color: 'text-orange-600', iconName: 'Map' }
        ],
        expertTip: { title: 'Small State Access', type: 'tip', content: 'In Rhode Island, you can <strong>meet the Governor or Commerce Secretary</strong> easily. It is easier to get attention here than anywhere else.' },
        seoKeywords: ['rhode island small business grants', 'commerce ri grants', 'providence startup funding']
    },
    {
        id: 'south-carolina',
        name: 'South Carolina',
        slug: 'south-carolina',
        abbreviation: 'SC',
        region: 'Southeast',
        totalFunding: '$890M+',
        description: 'South Carolina drives manufacturing and tech growth through the Coordinating Council and SCRA programs.',
        topPrograms: [
            { name: 'SCRA Grants', amount: '$50K', focus: 'Tech Startups' },
            { name: 'Job Tax Credit', amount: '$1.5K', focus: 'Hiring' },
            { name: 'Rural Infrastructure', amount: '$500K', focus: 'Development' }
        ],
        keyIndustries: ['Manufacturing', 'Automotive', 'Aerospace', 'Logistics'],
        metrics: [
            { label: 'SCRA', value: '$50K', description: 'Tech grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Auto', value: 'BMW', description: 'Manufacturing', color: 'text-blue-600', iconName: 'Car' },
            { label: 'Port', value: 'Top 10', description: 'Charleston', color: 'text-purple-600', iconName: 'Anchor' },
            { label: 'Growth', value: 'Fast', description: 'Economy', color: 'text-orange-600', iconName: 'TrendingUp' }
        ],
        expertTip: { title: 'SCRA Support', type: 'success', content: '<strong>SCRA (South Carolina Research Authority)</strong> is a fantastic partner. They offer grants, labs, and mentoring for tech companies.' },
        seoKeywords: ['south carolina small business grants', 'scra grants', 'charleston startup funding']
    },
    {
        id: 'south-dakota',
        name: 'South Dakota',
        slug: 'south-dakota',
        abbreviation: 'SD',
        region: 'Midwest',
        totalFunding: '$220M+',
        description: 'South Dakota offers a low-tax environment and business incentives through GOED and the REDI Fund.',
        topPrograms: [
            { name: 'REDI Fund', amount: 'Loan', focus: 'Job Creation' },
            { name: 'Workforce Development', amount: '$1K/employee', focus: 'Training' },
            { name: 'Proof of Concept', amount: '$25K', focus: 'Tech' }
        ],
        keyIndustries: ['Agriculture', 'Financial Services', 'Manufacturing', 'Bioscience'],
        metrics: [
            { label: 'Tax', value: '0%', description: 'Corp/Income', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Finance', value: 'Hub', description: 'Banking', color: 'text-blue-600', iconName: 'Briefcase' },
            { label: 'Cost', value: 'Low', description: 'Operations', color: 'text-purple-600', iconName: 'TrendingDown' },
            { label: 'Regs', value: 'Light', description: 'Business', color: 'text-orange-600', iconName: 'CheckCircle' }
        ],
        expertTip: { title: 'Zero Tax', type: 'tip', content: 'South Dakota has <strong>no corporate or personal income tax</strong>. It is one of the most tax-friendly states for incorporation.' },
        seoKeywords: ['south dakota small business grants', 'goed south dakota', 'sioux falls startup funding']
    },
    {
        id: 'vermont',
        name: 'Vermont',
        slug: 'vermont',
        abbreviation: 'VT',
        region: 'Northeast',
        totalFunding: '$280M+',
        description: 'Vermont incentives remote work, green energy, and small business through ACCD and VEDA programs.',
        topPrograms: [
            { name: 'VEDA Financing', amount: '$500K', focus: 'Growth' },
            { name: 'Windham County', amount: '$50K', focus: 'Regional' },
            { name: 'Working Lands', amount: '$20K', focus: 'Agriculture' }
        ],
        keyIndustries: ['Agriculture', 'Green Energy', 'Tourism', 'Manufacturing'],
        metrics: [
            { label: 'VEDA', value: '$500K', description: 'Loans', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Green', value: 'Focus', description: 'Economy', color: 'text-blue-600', iconName: 'Leaf' },
            { label: 'Food', value: 'Hub', description: 'Farm-to-table', color: 'text-purple-600', iconName: 'Sprout' },
            { label: 'Brand', value: 'Strong', description: 'Made in VT', color: 'text-orange-600', iconName: 'Star' }
        ],
        expertTip: { title: 'Working Lands', type: 'tip', content: 'If you are in food or forestry, the <strong>Working Lands Enterprise Fund</strong> is a dedicated grant source just for you.' },
        seoKeywords: ['vermont small business grants', 'veda loans', 'burlington startup funding']
    },
    {
        id: 'west-virginia',
        name: 'West Virginia',
        slug: 'west-virginia',
        abbreviation: 'WV',
        region: 'Southeast',
        totalFunding: '$350M+',
        description: 'West Virginia aims to diversify its economy with tech and remote work incentives through Ascend WV and WVEDA.',
        topPrograms: [
            { name: 'Ascend WV', amount: '$12K', focus: 'Remote Work' },
            { name: 'CARES Grant', amount: '$5K', focus: 'Small Business' },
            { name: 'Tourism Matching', amount: '$20K', focus: 'Marketing' }
        ],
        keyIndustries: ['Energy', 'Tourism', 'Manufacturing', 'Technology'],
        metrics: [
            { label: 'Ascend', value: '$12K', description: 'Relocation', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Nature', value: 'Asset', description: 'Tourism', color: 'text-blue-600', iconName: 'Mountain' },
            { label: 'Energy', value: 'Shift', description: 'Transition', color: 'text-purple-600', iconName: 'Zap' },
            { label: 'Cost', value: 'Low', description: 'Living', color: 'text-orange-600', iconName: 'Home' }
        ],
        expertTip: { title: 'Ascend WV', type: 'success', content: '<strong>Ascend WV</strong> pays remote workers $12,000 to move there. A great way to bootstrap a startup with low overhead.' },
        seoKeywords: ['west virginia small business grants', 'wveda grants', 'charleston wv startup funding']
    },
    {
        id: 'wyoming',
        name: 'Wyoming',
        slug: 'wyoming',
        abbreviation: 'WY',
        region: 'West',
        totalFunding: '$310M+',
        description: 'Wyoming provides a crypto-friendly, low-tax environment with incentives through the Wyoming Business Council.',
        topPrograms: [
            { name: 'Business Ready', amount: '$500K', focus: 'Infrastructure' },
            { name: 'Kickstart Wyoming', amount: '$50K', focus: 'Startups' },
            { name: 'SBIR Matching', amount: '$200K', focus: 'R&D' }
        ],
        keyIndustries: ['Blockchain', 'Energy', 'Tourism', 'Agriculture'],
        metrics: [
            { label: 'Kickstart', value: '$50K', description: 'Seed grant', color: 'text-green-600', iconName: 'DollarSign' },
            { label: 'Crypto', value: 'Friendly', description: 'Laws', color: 'text-blue-600', iconName: 'Lock' },
            { label: 'Tax', value: 'None', description: 'Corp/Income', color: 'text-purple-600', iconName: 'Award' },
            { label: 'Match', value: '$200K', description: 'SBIR', color: 'text-orange-600', iconName: 'Zap' }
        ],
        expertTip: { title: 'Blockchain Haven', type: 'success', content: 'Wyoming has the most <strong>blockchain-friendly laws</strong> in the US. Great for DAO and crypto entity formation.' },
        seoKeywords: ['wyoming small business grants', 'wyoming business council', 'cheyenne startup funding']
    }
];

// Helper functions
export function getStateBySlug(slug: string): StateGrant | undefined {
    return usStates.find(state => state.slug === slug);
}

export function getAllStates(): StateGrant[] {
    return usStates;
}

export function getStatesByRegion(region: StateGrant['region']): StateGrant[] {
    return usStates.filter(state => state.region === region);
}



