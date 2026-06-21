import Link from 'next/link';
import { auth } from '@/lib/auth';
// import { logoutAction } from '@/lib/actions';

async function getWeather() {
  try {
    const pointRes = await fetch(
      'https://api.weather.gov/points/41.7370,-111.8338',
      { next: { revalidate: 3600 } }
    );
    const point = await pointRes.json();
    const forecastRes = await fetch(point.properties.forecast, {
      next: { revalidate: 3600 },
    });
    const forecast = await forecastRes.json();
    const period = forecast.properties.periods[0];
    return `${period.name}: ${period.temperature}°${period.temperatureUnit} ${period.shortForecast}`;
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const session = await auth();
  const weather = await getWeather();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg text-white hover:text-violet-400 transition-colors">
          &lt;MyPortfolio /&gt;
        </Link>

        {weather && (
          <span className="hidden md:block text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
            🌤 {weather}
          </span>
        )}

        <div className="flex items-center gap-4">
          <Link href="/#projects" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</Link>
          <Link href="/#articles" className="text-sm text-gray-300 hover:text-white transition-colors">Articles</Link>
          <Link href="/#contact"  className="text-sm text-gray-300 hover:text-white transition-colors">Contact</Link>

          {/* {session ? (
            <>
              <span className="text-sm text-gray-400 hidden sm:block">Hi, {session.user.name}!</span>
              <form action={logoutAction}>
                <button type="submit" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
}