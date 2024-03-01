const ColorListGen = ({length, startColor, endColor, opacity}: { length: number, startColor: string, endColor: string, opacity: number }) => {
    function hexToRgb(startColor: string) {
        return {
            r: parseInt(startColor.slice(1, 3), 16),
            g: parseInt(startColor.slice(3, 5), 16),
            b: parseInt(startColor.slice(5, 7), 16),
        };
    }

    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    const colorList = [];
    for (let i = 0; i < length; i++) {
        const r = start.r + (end.r - start.r) * (i / length);
        const g = start.g + (end.g - start.g) * (i / length);
        const b = start.b + (end.b - start.b) * (i / length);
        
        colorList.push(`rgba(${r},${g},${b},${opacity})`);
    }
    return colorList;
}

export default ColorListGen;