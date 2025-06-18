// place files you want to import through the `$lib` alias in this folder.

export function formatNumber(num: any) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    
    const absNum = Math.abs(num);
    let formatted;
    
    if (absNum >= 1000000000) {
        formatted = (num / 1000000000).toFixed(1) + 'Ч';
    } else if (absNum >= 1000000) {
        formatted = (num / 1000000).toFixed(1) + 'М';
    } else if (absNum >= 1000) {
        formatted = (num / 1000).toFixed(1) + 'Т';
    } else {
        formatted = num.toString();
    }
    
    // Remove .0 if it exists after formatting (e.g., 1.0k → 1k)
    formatted = formatted.replace(/\.0([kmb])/, '1');
    
    return formatted;
}