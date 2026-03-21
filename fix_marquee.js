const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    let start = html.toUpperCase().indexOf('PARTNER UNIVERSITIES');

    if (start !== -1) {
        let end = html.indexOf('</section>', start);
        let section = html.substring(start, end);
        
        // Remove color restriction classes
        section = section.replace(/\bgrayscale\b/g, ' ');
        section = section.replace(/\bhover:grayscale-0\b/g, ' ');
        section = section.replace(/\bopacity-[34567]0\b/g, ' '); // opacity-30, opacity-50, etc.
        section = section.replace(/\bhover:opacity-100\b/g, ' ');
        section = section.replace(/\btransition-all\b/g, ' ');
        section = section.replace(/\bduration-300\b/g, ' ');
        section = section.replace(/\bhover:-translate-y-1\b/g, ' '); // Keep it simple and strictly colored as requested
        
        html = html.substring(0, start) + section + html.substring(end);
        fs.writeFileSync('index.html', html);
        console.log('Fixed marquee colors');
    } else {
        console.log('Section not found');
    }
} catch (e) {
    console.error(e);
}
