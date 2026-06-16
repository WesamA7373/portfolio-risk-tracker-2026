# portfolio-risk-tracker

## 1. What does this tool do?
The tool calculates portfolio diversification to help users understand their risk exposure.

## 2. Who uses it?
It is designed for students, researchers, and investors who want a quick, accessible way to measure portfolio risk without needing advanced financial software.

## 3. What data does it collect or display?
- Asset name (e.g., Apple stock)
- Asset type (stock, bond, ETF, etc.)
- Asset value (amount invested)
- Diversification score (calculated from portfolio weights)

## 4. How many pages/screens does it have?
- Enter Assets - input portfolio details (asset name, type, value).
- Results Dashboard - displays diversification score with interpretation.
- Save Portfolio (users only) - securely store and retrieve results later.

## 5. What happens to the data?
- Input data is saved to a Supabase database.
- Results are calculated instantly and displayed on the dashboard.
- For guests - data is temporary and disappears after the session.
- For logged-in users - data is securely saved (via Supabase) and can be retrieved later.

## 6. What tools/packages do I need?
- VS Code - development environment.
- GitHub - version control.
- Supabase - database for saving portfolios.
- Vercel - deployment platform.

## Example
```plaintext
Input:
Assets:
- Apple stock, $5000
- Government bond, $3000

Output:
Diversification score: 47%
Comment: Your portfolio is moderately diversified.
Action: Consider adding more asset types (e.g., ETFs or different sectors) to further balance risk.