const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    let start = html.toUpperCase().indexOf('PARTNER UNIVERSITIES');

    if (start !== -1) {
        let end = html.indexOf('</section>', start);
        let section = html.substring(start, end);
        
        section = section.replace(/<img([^>]*)class="([^"]*)"/gi, (match, prefix, classes) => {
            if (!classes.includes('hover:scale-110')) {
                let newClasses = classes;
                if (!newClasses.includes('transition-transform')) newClasses += ' transition-transform';
                if (!newClasses.includes('duration-300')) newClasses += ' duration-300';
                newClasses += ' hover:scale-110';
                
                return '<img' + prefix + 'class="' + newClasses + '"';
            }
            return match;
        });
        
        html = html.substring(0, start) + section + html.substring(end);
        fs.writeFileSync('index.html', html);
        console.log('Added hover zoom to marquee logos');
    } else {
        console.log('Section not found');
    }
} catch (e) {
    console.error(e);
}
