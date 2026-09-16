import { useMemo, useState } from 'react'

type Inputs = { yearOneRevenue: number; yearOneProfit: number; unitPrice: number; unitCost: number; expectedUnits: number; marketing: number; operating: number; investment: number }
const initial: Inputs = { yearOneRevenue: 48000, yearOneProfit: 6500, unitPrice: 9, unitCost: 3.4, expectedUnits: 7200, marketing: 7000, operating: 18500, investment: 4000 }
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function App() {
  const [inputs, setInputs] = useState(initial)
  const results = useMemo(() => {
    const revenue = inputs.unitPrice * inputs.expectedUnits
    const cogs = inputs.unitCost * inputs.expectedUnits
    const grossProfit = revenue - cogs
    const netProfit = grossProfit - inputs.marketing - inputs.operating - inputs.investment
    const margin = revenue === 0 ? 0 : netProfit / revenue
    const profitChange = netProfit - inputs.yearOneProfit
    const revenueChange = revenue - inputs.yearOneRevenue
    const breakEvenUnits = inputs.unitPrice <= inputs.unitCost ? null : Math.ceil((inputs.marketing + inputs.operating + inputs.investment) / (inputs.unitPrice - inputs.unitCost))
    const decision = netProfit > 0 && profitChange >= 0 ? 'Proceed with Year 2' : netProfit > 0 ? 'Proceed cautiously' : 'Revise the plan'
    return { revenue, cogs, grossProfit, netProfit, margin, profitChange, revenueChange, breakEvenUnits, decision }
  }, [inputs])
  const change = (key: keyof Inputs, value: string) => setInputs(current => ({ ...current, [key]: Number(value) || 0 }))
  const fields: [keyof Inputs, string, string][] = [
    ['yearOneRevenue', 'Year 1 revenue', 'Your previous year’s sales'], ['yearOneProfit', 'Year 1 net profit', 'Your previous year’s bottom line'],
    ['unitPrice', 'Year 2 price per unit', 'Expected selling price'], ['unitCost', 'Year 2 cost per unit', 'Ingredients, packaging and production'],
    ['expectedUnits', 'Expected units sold', 'Forecasted Year 2 volume'], ['marketing', 'Marketing budget', 'Year 2 promotion spend'],
    ['operating', 'Operating costs', 'Rent, wages and other operating costs'], ['investment', 'One-time investment', 'Equipment, setup or launch costs']
  ]
  return <main>
    <section className="hero"><p className="eyebrow">Pork · Garlic · Ice Cream</p><h1>Year 2 Decision Tool</h1><p>Test your second-year plan before you commit. Update the assumptions to see its projected profit and break-even point.</p></section>
    <section className="grid">
      <form className="card inputs" onSubmit={e => e.preventDefault()}><div className="section-title"><h2>Plan assumptions</h2><button type="button" onClick={() => setInputs(initial)}>Reset example</button></div>{fields.map(([key, label, help]) => <label key={key}><span>{label}<small>{help}</small></span><div className="field"><span>$</span><input aria-label={label} type="number" min="0" step="any" value={inputs[key]} onChange={e => change(key, e.target.value)} /></div></label>)}</form>
      <div className="results"><div className={`decision ${results.netProfit >= 0 ? 'positive' : 'negative'}`}><p>Recommendation</p><h2>{results.decision}</h2><span>{results.netProfit >= 0 ? 'The forecast is profitable under these assumptions.' : 'The forecast loses money; adjust price, volume or costs.'}</span></div><div className="metrics"><Metric label="Year 2 revenue" value={currency.format(results.revenue)} /><Metric label="Net profit" value={currency.format(results.netProfit)} emphasis /><Metric label="Net margin" value={`${(results.margin * 100).toFixed(1)}%`} /><Metric label="Break-even units" value={results.breakEvenUnits?.toLocaleString() ?? 'Not achievable'} /></div><div className="card comparison"><h2>Compared with Year 1</h2><div><span>Revenue change</span><strong className={results.revenueChange >= 0 ? 'up' : 'down'}>{results.revenueChange >= 0 ? '+' : ''}{currency.format(results.revenueChange)}</strong></div><div><span>Profit change</span><strong className={results.profitChange >= 0 ? 'up' : 'down'}>{results.profitChange >= 0 ? '+' : ''}{currency.format(results.profitChange)}</strong></div><p>Gross profit: {currency.format(results.grossProfit)} · Cost of goods: {currency.format(results.cogs)}</p></div></div>
    </section><footer>All figures are planning estimates. Validate your assumptions before making a business decision.</footer>
  </main>
}
function Metric({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) { return <div className={emphasis ? 'metric emphasis' : 'metric'}><span>{label}</span><strong>{value}</strong></div> }
