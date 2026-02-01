export async function getWeatherServerSide(lat: number, lon: number) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("Missing OPENWEATHER_API_KEY");
    }

    const cacheKey = `weather-${lat}-${lon}`;

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        {
            next: {
                revalidate: 3600,
                tags: [cacheKey, 'homes'],
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch weather");
    }

    return response.json();
}
