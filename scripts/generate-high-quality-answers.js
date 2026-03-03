const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'generic-extract.json'), 'utf-8'));

function generateStructure(title, excerpt) {
    const text = (title + ' ' + excerpt).toLowerCase();
    
    // Extract funding amounts
    const fundingMatch = text.match(/\$[\d,.]+[kmb]?(?:\+|-[\d,.]+[kmb]?)?/i);
    const fundingStr = fundingMatch ? fundingMatch[0].toUpperCase() : 'valuable funding';

    // Extract regions
    let region = 'Canadian businesses';
    if (text.includes('usa') || text.includes('federal') || text.includes('sba') || text.includes('sbir')) region = 'US businesses';
    if (text.includes('ontario')) region = 'Ontario businesses';
    if (text.includes('bc') || text.includes('british columbia')) region = 'BC businesses';
    if (text.includes('alberta')) region = 'Alberta businesses';
    if (text.includes('quebec')) region = 'Quebec businesses';
    if (text.includes('new york') || text.includes('nyc')) region = 'New York businesses';
    
    // Extract target audience
    let target = '';
    if (text.includes('women')) target = 'women-led ';
    if (text.includes('minority')) target = 'minority-owned ';
    if (text.includes('indigenous') || text.includes('aboriginal')) target = 'Indigenous-owned ';
    if (text.includes('veteran')) target = 'veteran-owned ';
    if (text.includes('rural')) target = 'rural ';
    if (text.includes('startup') || text.includes('seed')) target = 'startup ';

    // Extract sector/use
    let sector = 'growth and expansion';
    if (text.includes('tech') || text.includes('software') || text.includes('saas')) sector = 'technology development and commercialization';
    if (text.includes('manufacturing') || text.includes('equipment')) sector = 'equipment purchases and advanced manufacturing';
    if (text.includes('agtech') || text.includes('agriculture')) sector = 'agricultural innovation and agtech';
    if (text.includes('clean') || text.includes('energy') || text.includes('climate')) sector = 'cleantech and sustainable energy projects';
    if (text.includes('export') || text.includes('trade')) sector = 'international market expansion and export growth';
    if (text.includes('research') || text.includes('r&d') || text.includes('sred')) sector = 'scientific research and experimental development (R&D)';
    
    // Type of funding
    let type = 'financial support';
    if (text.includes('grant') || text.includes('non-repayable')) type = 'non-repayable grants';
    else if (text.includes('loan')) type = 'loans and financing';
    else if (text.includes('tax credit')) type = 'tax credits';

    // Formulate the answer based on the PCOS example
    // Sentence 1: Direct Statement
    let name = title.split('|')[0].trim().replace(/\s*202[567].*/, '');
    if (!name || name.length < 5) name = "This program";
    
    const s1 = `The Short Answer: ${name} provides ${fundingStr} in ${type} specifically tailored for ${target}${region}.`;
    
    // Sentence 2: The Solution / Eligibility
    const s2 = `To qualify, your business must demonstrate clear objectives in ${sector} and meet regional eligibility requirements.`;
    
    // Sentence 3: The Benefit / Edge
    const s3 = `Applying with a comprehensive project plan and leveraging available advisory services can significantly increase your approval odds, turning capital into sustainable growth.`;

    // Special cases
    if (title.includes('SR&ED')) {
        return `The Short Answer: The SR&ED program is Canada's largest R&D incentive, allowing businesses to claim a 35% federal refundable tax credit on eligible scientific research and experimental development costs. When stacked with provincial credits, you can recover up to 65% of your total R&D expenditures. Filing requires detailed technical narratives demonstrating technological uncertainty and systematic investigation.`;
    }
    if (text.includes('sbir')) {
        return `The Short Answer: The SBIR/STTR program acts as "America's Seed Fund," providing up to ${fundingStr} in non-dilutive R&D grants for US tech startups. To win, companies must align their innovative technology with specific federal agency (e.g., NSF, DoD, NIH) research solicitations. Successfully securing Phase I funding dramatically improves the odds of larger Phase II commercialization awards.`;
    }
    if (text.includes('wosb')) {
        return `The Short Answer: The WOSB certification unlocks exclusive access to billions in federal set-aside contracts specifically for women-owned small businesses. Obtaining this certification requires proving 51% unconditional ownership and direct management by a woman. Once certified, you can bid on limited-competition contracts, significantly reducing your competition and accelerating government revenue.`;
    }

    return `${s1} ${s2} ${s3}`;
}

const fixes = {};

[...data.blogs, ...data.guides].forEach(item => {
    fixes[item.slug] = generateStructure(item.title, item.excerpt);
});

fs.writeFileSync(path.join(__dirname, 'generated-fixes.json'), JSON.stringify(fixes, null, 2));
console.log(`Generated high-quality answers for ${Object.keys(fixes).length} items.`);
