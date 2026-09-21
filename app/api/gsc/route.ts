import { NextResponse } from "next/server";
import { google } from "googleapis";

const FALLBACK_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOQZ8P5dneHnu/
b1TVPQ8zWQCfdrqf5jN8KH4Mb+IUKft1NwtOjiNYWilYK/0JZNJyV98/OruOfXyF
G6bV08/ZrE+qsTlP2I0B3AkWBpy/32SNJwestaW1E3AFmdoPlXux3AVOKcKZPCo1
4cYvwi36a6xPf5yPklk+mNjlzpaci9EWi3nlaDRT1UI9QKSzH1w+boztGL3O4QEZ
vPG1bFuBjjPDJYRNdKfKD04AYoyHuQ22v58IBOuQDAba3UE/2107s9AZ1RLfbPyV
L5LA1TtrO/pGGrMccTQGTxlQxOcdKBQ69g94N69gujr70hdNOT2GdHxwpR2s+MZx
uCcE2lovAgMBAAECggEAL5ytU7Wq/9/IkC3qhtjz/9XtU2JMfWnd+6y7QDK5nQ79
6ZZ9yTH9jcEuZxisbjU0cUnAkq+DqUZlbrKt5hFhmy1wLIaBpOFn14SMImX/XDl8
1Cqs1l0ONgkZJGnaERvgNHQGU39HWSku00ZdghvQkky1t5pNMUVGzbDp7M6uLM+d
oeA6qoLp+bZNa2blwUo3hUJQua5IE2cW+dtWCeypFBoSIh+3IATt4YMv2S8x6oVg
WTY0pNxbU/V/0J4+wBFKLZZqDV+IegWx//J5ch1NelcgfTBYDrWaKS0dxcd+aEgR
JGBvuvMAfLCpbIxH++9IcFBWmnL4gZW+qk1YpgeSlQKBgQDr8C5YU9gpG5ke1s5C
j98zn5+ZxZHfo4DQnLtUO/RICER3D+x5Z65XH5pn3x7Wr4tb2Nc0ubM89LFSM192
Fuwl6h/s1jcHk+9holxC9DmWAoZ3sWCSTr/lhB9jPwCVEOOQFBxqdhQnVLNBPn2K
1+aKzFkECTPa0vF4NB1mELw1tQKBgQDfy1X4+ChZDIV93DMX8PoJ0JYcLl8dSvC8
lYDvkNN6hcPoZ9KAVIjmQ15T5zjpnwdpYZd22i1MFVZcUivPZuaqneScQXvZD9a2
70OL9n5T5Q5vwA7TV+6IFqCYxW/gxyBBGbe0zoPkpdN7GjoZeL7DJdoAbKCvWkpy
W/Y7uP9+0wKBgQCjBbLQHybVyJb1YxDjlwtvXRTnKEdR0mS4QAOEAWUZvHSqG9uW
S1iAJHsI2Hczedn93YddjA5XyO8Y0BxeuRn0XKAwghdF6ibWPFwpexyrFRWacHo8
vaMEUFVruuWJGkFSlULJIMtuHa06IJaYL/PA5c9/5WfqBCUKnF/P3TJenQKBgEu6
wgfy6axgiVeyyPNkDyh9Fh7JLlR6RIZ8TNpEdtuyIj4ly9yzPnQ0/dmEmASuVNK7
PIbyg3uIiOXKxJp1Zr77mR2rJx6ntm/G/WOCcPMwwrbcFeg8jDIu/f9UaGx21ZpR
+pFLhOQ9nRe+I0T1UBA3YdLc728HLcQPDH7fNk4TAoGBALIs0lCHtSvFu2dpXJUj
OFkbcfiVwyxAlwcI8SMf5lF7fUO+H92xDL0n8Vvf26e8TiFHtD6tO4jdxi+hzE9S
OLBbtMddsBcSb3telRU3rvXNbaiTneQL4pN3l7H/9Jv9haXPFhLGfj5GwN0p0EH/
+FW/AUNCT+AmCNQ3yLcSEsno
-----END PRIVATE KEY-----`;

function getCleanPrivateKey() {
  const envKey = process.env.GSC_PRIVATE_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.replace(/\\n/g, "\n").trim();
  }
  return FALLBACK_PRIVATE_KEY;
}

const CLIENT_EMAIL = process.env.GSC_CLIENT_EMAIL || "seo-dashboard@search-console-32418888.iam.gserviceaccount.com";
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:interiorsbydex.com";

const countryNameMap: Record<string, string> = {
  ind: "India",
  usa: "United States",
  gbr: "United Kingdom",
  sgp: "Singapore",
  are: "United Arab Emirates",
  nld: "Netherlands",
  qat: "Qatar",
  bgd: "Bangladesh",
  can: "Canada",
  deu: "Germany",
  fra: "France",
  aus: "Australia",
  mys: "Malaysia",
  sau: "Saudi Arabia",
  nzl: "New Zealand",
  omn: "Oman",
  kwt: "Kuwait"
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "28", 10);

  const today = new Date();
  today.setDate(today.getDate() - 2); // 2-day GSC reporting lag
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const startStr = formatDate(startDate);
  const endStr = formatDate(today);

  try {
    const auth = new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: getCleanPrivateKey(),
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"]
    });

    const searchconsole = google.searchconsole({ version: "v1", auth });

    // 1. Query Totals & Timeseries
    const dateQueryPromise = searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startStr,
        endDate: endStr,
        dimensions: ["date"],
        rowLimit: 500
      }
    });

    // 2. Query Queries (up to 150)
    const queriesQueryPromise = searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startStr,
        endDate: endStr,
        dimensions: ["query"],
        rowLimit: 150
      }
    });

    // 3. Query Landing Pages (up to 50)
    const pagesQueryPromise = searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startStr,
        endDate: endStr,
        dimensions: ["page"],
        rowLimit: 50
      }
    });

    // 4. Query Countries (for NRI intelligence)
    const countriesQueryPromise = searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startStr,
        endDate: endStr,
        dimensions: ["country"],
        rowLimit: 20
      }
    });

    const [dateRes, queriesRes, pagesRes, countriesRes] = await Promise.all([
      dateQueryPromise,
      queriesQueryPromise,
      pagesQueryPromise,
      countriesQueryPromise
    ]);

    const dateRows = dateRes.data.rows || [];
    const totalClicks = dateRows.reduce((a, b) => a + (b.clicks || 0), 0);
    const totalImpressions = dateRows.reduce((a, b) => a + (b.impressions || 0), 0);
    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgPosition = dateRows.length > 0
      ? dateRows.reduce((a, b) => a + (b.position || 0), 0) / dateRows.length
      : 0;

    // Queries categorization (Non-Branded vs Branded)
    const allQueriesRaw = (queriesRes.data.rows || []).map(r => ({
      query: r.keys?.[0] || "",
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      ctr: parseFloat(((r.ctr || 0) * 100).toFixed(2)),
      position: parseFloat((r.position || 0).toFixed(1))
    }));

    const nonBrandedQueries = allQueriesRaw.filter(q => {
      const lower = q.query.toLowerCase();
      return !lower.includes("dex") && !lower.includes("டிஎக்ஸ்");
    });

    const brandedQueries = allQueriesRaw.filter(q => {
      const lower = q.query.toLowerCase();
      return lower.includes("dex") || lower.includes("டிஎக்ஸ்");
    });

    // Landing pages
    const topPages = (pagesRes.data.rows || []).map(r => ({
      page: (r.keys?.[0] || "").replace("https://interiorsbydex.com", "").replace("http://www.interiorsbydex.com", "") || "/",
      fullUrl: r.keys?.[0] || "",
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      ctr: parseFloat(((r.ctr || 0) * 100).toFixed(2)),
      position: parseFloat((r.position || 0).toFixed(1))
    }));

    // Countries
    const topCountries = (countriesRes.data.rows || []).map(r => {
      const code = (r.keys?.[0] || "").toLowerCase();
      const countryName = countryNameMap[code] || code.toUpperCase();
      return {
        code,
        name: countryName,
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        ctr: parseFloat(((r.ctr || 0) * 100).toFixed(2)),
        position: parseFloat((r.position || 0).toFixed(1))
      };
    });

    return NextResponse.json({
      status: "connected",
      mode: "live_gsc",
      property: SITE_URL,
      dateRange: {
        days,
        start: startStr,
        end: endStr
      },
      metrics: {
        impressions: totalImpressions,
        clicks: totalClicks,
        ctr: parseFloat(avgCtr.toFixed(2)),
        position: parseFloat(avgPosition.toFixed(1))
      },
      timeseries: dateRows.map(r => ({
        date: r.keys?.[0],
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        position: parseFloat((r.position || 0).toFixed(1))
      })),
      allQueries: allQueriesRaw,
      nonBrandedQueries,
      brandedQueries,
      topPages,
      topCountries
    });
  } catch (err: any) {
    console.error("GSC Live Query Error:", err);
    return NextResponse.json({
      status: "error",
      message: err.message,
      property: SITE_URL
    }, { status: 500 });
  }
}
