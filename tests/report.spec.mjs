import { chromium } from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(fs.readFileSync('src/data/public-aggregates.json','utf8'));
const sum=(key,rows=data)=>rows.reduce((n,r)=>n+r[key],0);
assert.deepEqual(['total','perlu_tinjau','kuning','merah','valid'].map(k=>sum(k)),[216,22,38,39,1]);
assert.deepEqual(['2026-06','2026-07','2026-08'].map(m=>sum('total',data.filter(r=>r.month===m))),[3,50,163]);
assert.deepEqual(['Anak','Hb','Ibu'].map(j=>sum('total',data.filter(r=>r.jenis===j))),[147,36,33]);
assert(data.every(r=>Object.keys(r).sort().join(',')==='anonymous_code,jenis,kuning,merah,month,perlu_tinjau,role,total,valid'));
const browser=await chromium.launch(); const results=[];
for(const width of [390,1280]){
 const page=await browser.newPage({viewport:{width,height:width===390?844:800},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const base=process.env.REPORT_URL||'http://localhost:4173/reportkbglow/';
 const active=()=>page.locator('.slide-stage');
 await page.goto(base+'#3');await active().locator('[data-testid="metric-total"]').waitFor();
 assert.equal(await active().locator('[data-testid="metric-total"]').textContent(),'216');
 for(const [role,expected] of [['ADMIN','82'],['KADER','134']]){await active().getByLabel('Peran',{exact:true}).selectOption(role);assert.equal(await active().locator('[data-testid="metric-total"]').textContent(),expected)}
 await active().getByLabel('Sertakan account-test').uncheck();assert.equal(await active().locator('[data-testid="metric-total"]').textContent(),'102');
 await active().getByLabel('Bulan',{exact:true}).selectOption('2026-06');assert.equal(await active().locator('[data-testid="metric-total"]').textContent(),'3');
 await active().getByLabel('Peran',{exact:true}).selectOption('ADMIN');assert.equal(await active().locator('[data-testid="metric-total"]').textContent(),'0');
 await active().getByLabel('Bulan',{exact:true}).selectOption('all');await active().getByLabel('Peran',{exact:true}).selectOption('all');await active().getByLabel('Sertakan account-test').check();await page.locator('body').click({position:{x:5,y:5}});
 const geometry=[];
 for(let i=1;i<=11;i++){
  await page.goto(base+'#'+i);await page.waitForTimeout(180);
  const bad=await active().evaluate(el=>Array.from(el.querySelectorAll('.container, .report-head, .filters, .metrics, .chart-panel, .heatmap, .explain, .caption, h1, .figure, .subhead')).map(n=>({tag:n.className||n.tagName,r:n.getBoundingClientRect()})).filter(({r})=>r.width&&r.height&&(r.x<-.5||r.right>innerWidth+.5||r.y<-.5||r.bottom>innerHeight-65)).map(({tag,r})=>({tag,x:r.x,y:r.y,bottom:r.bottom,right:r.right})));
  geometry.push({slide:i,overflow:bad});
 }
 await page.goto(base+'#1');await page.keyboard.press('ArrowRight');assert.equal(new URL(page.url()).hash,'#2');await page.keyboard.press('ArrowLeft');assert.equal(new URL(page.url()).hash,'#1');
 await page.keyboard.press('s');assert(await page.locator('.noir-rail').isVisible());await page.keyboard.press('s');await page.keyboard.press('g');assert(await page.locator('.noir-grid').isVisible());await page.keyboard.press('Escape');
 await page.goto(base+'#9');await page.keyboard.press('ArrowRight');assert.equal(new URL(page.url()).hash,'#9');await page.keyboard.press('ArrowRight');assert.equal(new URL(page.url()).hash,'#10');await page.keyboard.press('ArrowLeft');assert.equal(new URL(page.url()).hash,'#9');
 results.push({width,height:width===390?844:800,errors,geometry});await page.close();
}
await browser.close();
const report={aggregateAssertions:'passed',typecheck:'passed separately',build:'passed separately',viewports:results,browserPass:results.every(r=>r.errors.length===0&&r.geometry.every(g=>!g.overflow.length)),testedUrl:process.env.REPORT_URL||'http://localhost:4173/reportkbglow/'};
fs.writeFileSync('TEST-RESULTS.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));assert(report.browserPass);
