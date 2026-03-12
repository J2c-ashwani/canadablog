require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" }});

const project = new Project();
const stateDetailsPath = path.join(__dirname, '../lib/data/stateDetails.ts');
project.addSourceFileAtPath(stateDetailsPath);
const sourceFile = project.getSourceFileOrThrow(stateDetailsPath);

const stateDetailsDecl = sourceFile.getVariableDeclarationOrThrow('stateDetails');
const arrayExpr = stateDetailsDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

async function processStates() {
    const stateElements = arrayExpr.getElements();

    let processed = 0;
    
    for (const element of stateElements) {
        if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
        
        const obj = element;
        const nameProp = obj.getProperty('name');
        if (!nameProp) continue;
        
        const stateNameMatch = nameProp.getText().match(/'(.*)'|"(.*)"/);
        const stateName = stateNameMatch ? (stateNameMatch[1] || stateNameMatch[2]) : "Unknown";
        
        const hasComparisonTable = obj.getProperty('comparisonTable');
        const hasShortAnswer = obj.getProperty('shortAnswer');
        
        if (hasComparisonTable && hasShortAnswer) {
            console.log(`⏭️  Skipping ${stateName} - Already has EEAT data`);
            continue;
        }
        
        console.log(`\n⏳ Processing ${stateName}...`);
        
        // Extract context for the prompt
        const heroStatsProp = obj.getProperty('heroStats');
        const topProgramsProp = obj.getProperty('topPrograms');
        
        let heroStatsText = heroStatsProp ? heroStatsProp.getText() : "{}";
        let topProgramsText = topProgramsProp ? topProgramsProp.getText() : "[]";
        
        if (heroStatsProp && heroStatsProp.getKind() === SyntaxKind.PropertyAssignment) {
           heroStatsText = heroStatsProp.getInitializer().getText();
        }
        
        if (topProgramsProp && topProgramsProp.getKind() === SyntaxKind.PropertyAssignment) {
           topProgramsText = topProgramsProp.getInitializer().getText();
        }
        
        const prompt = `
        You are an expert small business grant consultant. Based on the following data for the state of ${stateName}, generate an engaging 'shortAnswer' and a 'comparisonTable' to maximize user engagement and CTR.
        
        Rules for shortAnswer:
        It should answer the implicit search intent quickly. E.g., "${stateName} businesses access $XB through the [Top Program] (up to $Y), [Program 2] ($Z workforce grants), and [Program 3]. Most programs have no equity requirement. Processing: 45-90 days." Keep it to 2-3 sentences max.
        
        Rules for comparisonTable:
        It should contain exactly 4 of the best programs from the topPrograms data provided.
        Properties: title (string), programs (array of objects: { program: string, amount: string, equity: string, bestFor: string, timeline: string }).
        
        Data:
        State: ${stateName}
        heroStats: ${heroStatsText}
        topPrograms: ${topProgramsText.substring(0, 3000)} /* Truncated */
        
        Output valid JSON with the exact following schema:
        {
            "shortAnswer": "string",
            "comparisonTable": {
                "title": "string",
                "programs": [
                    { "program": "string", "amount": "string", "equity": "string", "bestFor": "string", "timeline": "string" }
                ]
            }
        }
        `;
        
        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            const data = JSON.parse(responseText);
            
            if (!hasShortAnswer) {
                obj.addPropertyAssignment({
                    name: 'shortAnswer',
                    initializer: JSON.stringify(data.shortAnswer)
                });
            }
            
            if (!hasComparisonTable) {
                const tableStr = JSON.stringify(data.comparisonTable, null, 4);
                // Fix up formatting so generated JSON becomes a valid TS object literal, but since it's JSON parsing, stringifying is valid JS object literal which works for TS.
                obj.addPropertyAssignment({
                    name: 'comparisonTable',
                    initializer: tableStr
                });
            }
            
            console.log(`✅ Generated EEAT data for ${stateName}`);
            processed++;
            
            sourceFile.saveSync();
            
            // Rate limiting because 46 states might hit standard free tier limits without slight delays
            await new Promise(resolve => setTimeout(resolve, 5000));
            
        } catch (e) {
            console.error(`❌ Error processing ${stateName}: ${e.message}`);
        }
    }
    
    console.log(`\n🎉 Finished processing ${processed} states.`);
}

processStates();
