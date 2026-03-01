import {Suspense} from "react";
import {WeatherDisplay} from "@/components/weather/weather-display";
import {getWeatherServerSide} from "@/lib/apis/weather";

export default async function WeatherAsync({
                                               lat,
                                               lon,
                                           }: {
    lat: number;
    lon: number;
}) {
    return (
        <Suspense fallback={<WeatherSkeleton/>}>
            <WeatherPage lat={lat} lon={lon}/>
        </Suspense>
    );
}

async function WeatherPage({lat, lon}: { lat: number; lon: number }) {
    try {
        const weatherData = await getWeatherServerSide(lat, lon);
        return <WeatherDisplay data={weatherData}/>;
    } catch (error) {
        console.log(error);
        return <div>Hhaha</div>;
    }
}

function WeatherSkeleton() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm rounded-3xl bg-card p-8 text-foreground">
                <div className="h-8 w-32 animate-pulse rounded bg-muted mb-4"/>
                <div className="h-4 w-48 animate-pulse rounded bg-muted mb-8"/>
                <div className="flex items-center justify-between mb-8">
                    <div className="h-20 w-20 animate-pulse rounded-full bg-muted"/>
                    <div className="h-16 w-24 animate-pulse rounded bg-muted"/>
                </div>
                <div className="space-y-3">
                    <div className="h-4 w-40 animate-pulse rounded bg-muted"/>
                    <div className="h-4 w-36 animate-pulse rounded bg-muted"/>
                    <div className="h-4 w-44 animate-pulse rounded bg-muted"/>
                </div>
            </div>
        </main>
    );
}
