import { useMemo, useState } from 'react'
import {
  Wallet, LayoutDashboard, ArrowLeftRight, ChartPie, Target, Repeat,
  ChartNoAxesCombined, Settings, CircleHelp, Menu, X, Bell, Plus,
  ArrowUpRight, ArrowDownRight, Eye, EyeOff, Search, ChevronDown,
  MoreHorizontal, CreditCard, ShoppingBag, Car, Utensils, Home,
  BriefcaseBusiness, Coffee, CalendarDays
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell
} from 'recharts'

const cashFlow = [
  { month: 'Mei', income: 8200000, expense: 5100000 },
  { month: 'Jun', income: 9100000, expense: 5700000 },
  { month: 'Jul', income: 8700000, expense: 6200000 },
  { month: 'Agu', income: 10400000, expense: 6500000 },
  { month: 'Sep', income: 9800000, expense: 6100000 },
  { month: 'Okt', income: 11800000, expense: 7200000 },
]
const expenseData = [
  { name: 'Food & Drinks', value: 32, color: '#4778f5' },
  { name: 'Transport', value: 24, color: '#8b5cf6' },
  { name: 'Shopping', value: 20, color: '#f59e0b' },
  { name: 'Bills', value: 14, color: '#14b8a6' },
  { name: 'Others', value: 10, color: '#cbd5e1' },
]
const transactions = [
  { title: 'Gaji Bulanan', category: 'Salary', date: '30 Okt 2026', amount: 8500000, type: 'income', icon: BriefcaseBusiness, color: 'blue' },
  { title: 'Belanja Supermarket', category: 'Shopping', date: '29 Okt 2026', amount: -425000, type: 'expense', icon: ShoppingBag, color: 'orange' },
  { title: 'Makan siang', category: 'Food & Drinks', date: '29 Okt 2026', amount: -65000, type: 'expense', icon: Utensils, color: 'purple' },
  { title: 'Transportasi', category: 'Transport', date: '28 Okt 2026', amount: -120000, type: 'expense', icon: Car, color: 'green' },
  { title: 'Tagihan internet', category: 'Bills', date: '27 Okt 2026', amount: -350000, type: 'expense', icon: Home, color: 'pink' },
]
const budgets = [
  { name: 'Food & Drinks', spent: 1850000, total: 2500000, color: '#4778f5' },
  { name: 'Transport', spent: 720000, total: 1000000, color: '#8b5cf6' },
  { name: 'Shopping', spent: 1450000, total: 1500000, color: '#f59e0b' },
]
const wallets = [
  { name: 'Main Wallet', type: 'Bank account', balance: 12500000, icon: Wallet, tone: 'blue' },
  { name: 'Cash', type: 'Cash', balance: 1750000, icon: CreditCard, tone: 'violet' },
  { name: 'E-Wallet', type: 'Digital wallet', balance: 850000, icon: Wallet, tone: 'mint' },
]
const money = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const groups = [
    { title: 'OVERVIEW', items: [['Dashboard', LayoutDashboard]] },
    { title: 'FINANCE', items: [['Transactions', ArrowLeftRight], ['Wallets', Wallet], ['Budgets', ChartPie], ['Savings Goals', Target], ['Recurring', Repeat]] },
    { title: 'ANALYTICS', items: [['Reports', ChartNoAxesCombined]] },
  ]
  return <>
    {mobileOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-row">
        <div className="brand-mark"><Wallet size={20}/></div>
        <span>FINORA</span>
        <button className="icon-btn close-sidebar" onClick={() => setMobileOpen(false)}><X size={19}/></button>
      </div>
      <nav className="side-nav">
        {groups.map(group => <section key={group.title}>
          <p className="nav-caption">{group.title}</p>
          {group.items.map(([label, Icon]) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className={`nav-item ${active === label ? 'active' : ''}`}>
            <Icon size={18} strokeWidth={1.8}/><span>{label}</span>
            {active === label && <i/>}
          </button>)}
        </section>)}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item"><Settings size={18}/><span>Settings</span></button>
        <button className="nav-item"><CircleHelp size={18}/><span>Help Center</span></button>
        <div className="profile">
          <div className="avatar">FA</div>
          <div><strong>Personal Account</strong><small>Free plan</small></div>
          <MoreHorizontal size={18} className="muted-icon"/>
        </div>
      </div>
    </aside>
  </>
}

function Header({ setMobileOpen, active }) {
  return <header className="topbar">
    <div className="topbar-left">
      <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21}/></button>
      <div><p className="eyebrow">Pages <span>/</span> {active}</p><h1>{active}</h1></div>
    </div>
    <div className="top-actions">
      <label className="search-box"><Search size={16}/><input placeholder="Search anything..." /></label>
      <button className="icon-btn notification"><Bell size={19}/><i/></button>
      <div className="top-avatar">FA</div>
    </div>
  </header>
}

function StatCard({ title, amount, change, positive, icon: Icon, tint, hidden }) {
  return <article className="stat-card">
    <div className="stat-top"><span>{title}</span><div className={`stat-icon ${tint}`}><Icon size={19}/></div></div>
    <strong className="stat-value">{hidden ? '••••••••' : money(amount)}</strong>
    <div className="stat-foot"><span className={positive ? 'trend-up' : 'trend-down'}>{positive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {change}</span><span>vs last month</span></div>
  </article>
}

function CashFlowCard() {
  const [period, setPeriod] = useState('Last 6 months')
  return <article className="panel cash-panel">
    <div className="panel-heading"><div><h3>Cash Flow</h3><p>Income vs expense overview</p></div><button className="select-like" onClick={() => setPeriod(period === 'Last 6 months' ? 'This year' : 'Last 6 months')}>{period}<ChevronDown size={15}/></button></div>
    <div className="chart-legend"><span><i className="legend-income"/>Income</span><span><i className="legend-expense"/>Expense</span></div>
    <div className="cash-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={cashFlow} margin={{ top: 12, right: 8, left: -16, bottom: 0 }}>
      <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4778f5" stopOpacity={0.16}/><stop offset="100%" stopColor="#4778f5" stopOpacity={0}/></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity={0.12}/><stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs>
      <CartesianGrid stroke="#eef1f6" vertical={false}/><XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false}/><YAxis tickFormatter={v => `${v/1000000}jt`} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={43}/><Tooltip formatter={v => money(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e8edf5', fontSize: 12 }}/><Area type="monotone" dataKey="income" stroke="#4778f5" strokeWidth={2.5} fill="url(#incomeFill)"/><Area type="monotone" dataKey="expense" stroke="#f59e0b" strokeWidth={2.5} fill="url(#expenseFill)"/>
    </AreaChart></ResponsiveContainer></div>
  </article>
}

function ExpenseCard() {
  return <article className="panel expense-panel"><div className="panel-heading"><div><h3>Expense Breakdown</h3><p>Where your money goes</p></div><button className="more-btn"><MoreHorizontal size={20}/></button></div>
    <div className="expense-content"><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={expenseData} dataKey="value" nameKey="name" innerRadius={59} outerRadius={82} paddingAngle={3} stroke="none">{expenseData.map(item => <Cell key={item.name} fill={item.color}/>)}</Pie><Tooltip formatter={v => `${v}%`}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>100%</strong><small>Total</small></div></div>
      <div className="expense-legend">{expenseData.map(item => <div key={item.name}><span><i style={{background:item.color}}/>{item.name}</span><b>{item.value}%</b></div>)}</div></div>
  </article>
}

function BudgetCard() {
  return <article className="panel"><div className="panel-heading"><div><h3>Budget Overview</h3><p>Your monthly spending limits</p></div><button className="text-action">See all</button></div>
    <div className="budget-list">{budgets.map(b => <div className="budget-item" key={b.name}><div className="budget-meta"><strong>{b.name}</strong><span>{money(b.spent)} <em>/ {money(b.total)}</em></span></div><div className="progress"><i style={{width:`${Math.min(100,b.spent/b.total*100)}%`,background:b.color}}/></div></div>)}</div>
  </article>
}

function WalletCard() {
  return <article className="panel"><div className="panel-heading"><div><h3>My Wallets</h3><p>Your accounts at a glance</p></div><button className="text-action">See all</button></div>
    <div className="wallet-list">{wallets.map(w => <div className="wallet-row" key={w.name}><div className={`wallet-symbol ${w.tone}`}><w.icon size={18}/></div><div className="wallet-name"><strong>{w.name}</strong><small>{w.type}</small></div><b>{money(w.balance)}</b></div>)}</div>
  </article>
}

function TransactionsCard() {
  return <article className="panel transactions-panel"><div className="panel-heading"><div><h3>Recent Transactions</h3><p>Your latest financial activity</p></div><button className="text-action">View all</button></div>
    <div className="transaction-table"><div className="table-head"><span>TRANSACTION</span><span>CATEGORY</span><span>DATE</span><span className="align-right">AMOUNT</span></div>
      {transactions.map(t => <div className="transaction-row" key={t.title}><div className="transaction-title"><div className={`transaction-icon ${t.color}`}><t.icon size={16}/></div><strong>{t.title}</strong></div><span className="category-cell">{t.category}</span><span className="date-cell">{t.date}</span><b className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>{t.amount > 0 ? '+' : '-'}{money(Math.abs(t.amount))}</b></div>)}
    </div>
  </article>
}

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const total = useMemo(() => wallets.reduce((sum, w) => sum + w.balance, 0), [])
  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    <div className="main-area">
      <Header setMobileOpen={setMobileOpen} active={active}/>
      <main className="content">
        <div className="welcome-row"><div><p className="eyebrow">FRIDAY, 30 OCTOBER 2026</p><h2>Good afternoon, Ferdian <span>✦</span></h2><p className="welcome-subtitle">Here’s what’s happening with your money today.</p></div><button className="primary-btn"><Plus size={17}/> Add Transaction</button></div>
        <section className="stats-grid">
          <StatCard title="Total Balance" amount={total} change="12.8%" positive icon={Wallet} tint="blue" hidden={!showBalance}/>
          <StatCard title="Total Income" amount={8500000} change="8.2%" positive icon={ArrowDownRight} tint="green" hidden={!showBalance}/>
          <StatCard title="Total Expense" amount={2910000} change="4.6%" positive={false} icon={ArrowUpRight} tint="orange" hidden={!showBalance}/>
        </section>
        <div className="dashboard-grid">
          <CashFlowCard/><ExpenseCard/><BudgetCard/><WalletCard/><TransactionsCard/>
        </div>
        <footer className="footer-note">© 2026 FINORA · Personal Finance Dashboard <span><button onClick={() => setShowBalance(!showBalance)}>{showBalance ? <Eye size={15}/> : <EyeOff size={15}/>} {showBalance ? 'Hide balance' : 'Show balance'}</button></span></footer>
      </main>
    </div>
  </div>
}
