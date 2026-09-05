export const evaluators={
  'backup-321-plan-validator': i=>{const c=i.copies||[],media=new Set(c.map(x=>x.medium)),offsite=c.filter(x=>x.offsite).length;return{valid:c.length>=3&&media.size>=2&&offsite>=1,copies:c.length,mediaTypes:media.size,offsiteCopies:offsite}},
  'checksum-delivery-manifest-comparator': i=>{const keys=new Set([...Object.keys(i.expected||{}),...Object.keys(i.received||{})]),rows=[...keys].sort().map(file=>({file,expected:i.expected?.[file]||null,received:i.received?.[file]||null,match:Boolean(i.expected?.[file]&&i.expected[file]===i.received?.[file])}));return{valid:rows.length>0&&rows.every(x=>x.match),rows,mismatches:rows.filter(x=>!x.match).map(x=>x.file)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
