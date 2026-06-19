# Portfolio Risk Tracker 📊

A modern, intelligent portfolio analysis tool that instantly calculates diversification scores and provides actionable investment recommendations. Users can analyze their portfolio as a guest or sign up to save results for long-term tracking.

## 🌐 Live Demo

**[View Live App](https://your-project-name.vercel.app)**

> Note: Replace the URL above with your deployed app URL (e.g., from Vercel, Netlify, etc.)

## ✨ Features

### For All Users
- **Instant Analysis**: Enter assets and immediately get a diversification score (0-100%)
- **Detailed Results Dashboard**:
  - Visual diversification score with color-coded ratings
  - Interactive portfolio breakdown chart
  - Actionable recommendations based on portfolio composition
  - Comprehensive asset details table
- **Guest Mode**: View results instantly without creating an account

### For Registered Users
- **Save & Track**: Securely store multiple portfolios
- **Dashboard**: View all saved portfolios at a glance
- **History**: Track portfolio changes over time
- **Quick Re-analysis**: Update and compare different portfolio versions

## 🎯 How It Works

### User Flow

1. **Input Assets**
   - User enters asset name, type, and amount
   - Multiple assets can be added to build the portfolio
   - Clean, intuitive form with real-time validation

2. **Get Results**
   - System instantly calculates diversification using Herfindahl-Hirschman Index (HHI)
   - Displays comprehensive results dashboard
   - Shows recommendations based on portfolio composition

3. **Choose Your Path**
   - **Continue as Guest**: View results (nothing is saved)
   - **Sign Up**: Create account and save results for future access

4. **For Registered Users**
   - Dashboard shows all saved portfolios
   - Quick access to update or re-analyze
   - Secure data storage with Row Level Security

## � Screenshots

### Portfolio Analysis Form
![Portfolio Form](./screenshots/portfolio-form.png)
*Clean, intuitive form for entering assets into your portfolio*

### Results Dashboard
![Results Dashboard](./screenshots/results-dashboard.png)
*Comprehensive diversification analysis with actionable recommendations*

### Guest Signup Modal
![Signup Modal](./screenshots/signup-modal.png)
*Easy sign-up option after viewing your portfolio results*

> **Note**: To add screenshots:
> 1. Take screenshots of your app running locally
> 2. Create a `screenshots/` folder in the project root
> 3. Save images as `portfolio-form.png`, `results-dashboard.png`, `signup-modal.png`
> 4. Uncomment the image links above

## �🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)
- VS Code (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-risk-tracker-2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a free account at [supabase.com](https://supabase.com)
   - Create a new project
   - Go to SQL Editor and run the contents of `schema.sql`
   - Get your API keys from Project Settings → API

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio-risk-tracker-2026/
├── app/
│   ├── auth/
│   │   ├── signup/page.tsx      # Sign up page
│   │   ├── login/page.tsx       # Login page
│   │   └── ...
│   ├── components/
│   │   ├── PortfolioForm.tsx    # Asset input form
│   │   ├── ResultsDashboard.tsx # Results display
│   │   └── GuestSignupModal.tsx # Guest/signup choice
│   ├── api/
│   │   ├── portfolios/route.ts  # Save portfolio endpoint
│   │   └── ...
│   ├── dashboard/page.tsx       # User dashboard
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home/main page
├── lib/
│   ├── portfolioCalculations.ts # Diversification algorithm
│   └── supabaseConfig.ts        # Supabase setup
├── schema.sql                   # Database schema
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## 📊 Diversification Algorithm

The app uses the **Herfindahl-Hirschman Index (HHI)** to calculate diversification:

- **Score 75-100%**: Excellent diversification ✅
- **Score 50-74%**: Good diversification 👍
- **Score 25-49%**: Needs improvement ⚠️
- **Score 0-24%**: Poor diversification ❌

### Scoring Logic
1. Assets are categorized (stocks, bonds, real estate, crypto, commodities, cash)
2. Portfolio weights are calculated for each category
3. HHI is computed: lower values = better diversification
4. HHI is converted to 0-100 scale for user-friendly display

## 🔐 Data & Security

### Guest Users
- Portfolio data is stored in browser memory only
- No data is saved or transmitted
- Session ends when browser is closed

### Registered Users
- All data is securely stored in Supabase
- Row Level Security (RLS) ensures users can only access their own data
- Password authentication via Supabase Auth
- Data is encrypted in transit (HTTPS)

## 📝 API Reference

### Save Portfolio
```
POST /api/portfolios
Body: {
  userId: string
  assets: Array<{name, type, amount}>
  portfolioName?: string
}
```

### Get Portfolios
```
GET /api/portfolios?userId=<userId>
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with a single click

```bash
vercel
```

## 📚 Data Structure

### Asset Object
```typescript
interface PortfolioAsset {
  id?: string
  name: string        // e.g., "Apple Stock"
  type: string        // e.g., "stock"
  amount: number      // e.g., 5000
}
```

### Diversification Result
```typescript
interface DiversificationResult {
  score: number               // 0-100
  assets: PortfolioAsset[]
  recommendations: string[]
  summary: string
}
```

## 🎓 Understanding the Results

### Diversification Score
The score reflects how well your assets are spread across different categories:
- Single asset = 0% (all eggs in one basket)
- 5+ equal assets across categories = 80%+

### Recommendations
The app provides context-specific advice:
- "Stock exposure is very high (>80%). Consider adding bonds..."
- "No bonds detected. Fixed income can provide stability..."
- "You have X assets. Aim for 5-10 for better diversification."

### Summary
A brief overview of your portfolio's diversification status.

## 🛠️ Troubleshooting

### Portfolio not saving?
- Check if you're logged in
- Verify Supabase API keys in `.env.local`
- Check browser console for errors

### Diversification score seems off?
- Ensure asset amounts are in the same currency
- Check asset types are correctly categorized
- Try refreshing the page

### Supabase connection issues?
- Verify API URL and key are correct
- Check Supabase project is active
- Ensure schema.sql has been run

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review [Supabase Docs](https://supabase.com/docs)
3. Check [Next.js Docs](https://nextjs.org/docs)

## 📈 Future Enhancements

- [ ] Historical portfolio tracking and charting
- [ ] Benchmark comparison (S&P 500, etc.)
- [ ] Risk tolerance assessment questionnaire
- [ ] Rebalancing suggestions
- [ ] Export portfolio reports (PDF)
- [ ] Mobile app
- [ ] Advanced analytics and backtesting

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 1. What does this tool do?
The tool calculates portfolio diversification and provides insights to help users understand their overall risk exposure. It combines instant analysis with optional long-term tracking.

## 2. Who uses it?
Students, researchers, and investors seeking quick portfolio assessment without complex financial software.

## 3. What data does it collect or display?
- Asset name, type, and value
- Diversification score (0-100%)
- Category breakdown and asset allocation percentages
- Personalized recommendations based on portfolio composition

## 4. How many pages/screens does it have?
- **Home**: Portfolio input form
- **Results**: Diversification dashboard
- **Guest/Signup Modal**: Choice to save results
- **Dashboard**: View saved portfolios (logged-in users)
- **Auth Pages**: Sign up, login, password recovery

## 5. What happens to the data?
- **Guests**: Data is temporary (browser memory only)
- **Registered Users**: Data is securely saved in Supabase and retrievable anytime

## 6. What tools/packages do I need?
- Node.js 18+
- Supabase
- Next.js 16
- React 19
- Tailwind CSS
- TypeScript

## Example

```
Input:
- Apple Stock: $5,000
- Government Bonds: $3,000

Output:
Diversification Score: 47%
Status: Moderate diversification
Recommendations:
  • Stock exposure is high. Consider adding more bonds.
  • No cash detected. Consider keeping 5-10% liquid.
  • Aim for 5-10 assets for better diversification.
```

---

Built with ❤️ for smart investors