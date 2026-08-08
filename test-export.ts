import { toPng } from 'html-to-image';

// Just to check if it compiles
const el = document.getElementById('svg-mat') as unknown as HTMLElement;
toPng(el).then(console.log);
