import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TableDataCell, TableHeaderCell } from "./components/Table";

export default function App() {
  const supabase = createClient(
    import.meta.env.VITE_URL,
    import.meta.env.VITE_KEY
  );

  const [fetchedData, setFetchedData] = useState<[{}] | null>(null);

  async function getRentals() {
    const { data } = await supabase.from("rentals").select(`
	*,
	platforms("*")
`);
    console.log(data);

    if (!data) return;

    const dataWithPrice = data.filter((data) => {
      Object.assign(data, {
        price: `${(
          (data.time_played / 60) *
          data.platforms.price_per_hour
        ).toFixed()}t`,
      });

      delete data.platforms;

      return data;
    });

    return dataWithPrice as any;
  }

  async function getGames() {
    const { data } = await supabase.from("games").select("*");

    console.log(data);

    return data as any;
  }

  async function getCustomers() {
    const { data } = await supabase.from("customers").select("*");

    console.log(data);

    return data as any;
  }

  async function getPlatforms() {
    const { data } = await supabase.from("platforms").select("*");

    console.log(data);

    return data as any;
  }

  useEffect(() => {
    if (!fetchedData) return;

    console.log(fetchedData);
  }, [fetchedData]);

  return (
    <>
      <div className="container mx-auto text-center flex flex-col gap-2 items-center justify-start h-svh py-8 px-4">
        <div>
          <h1 className="text-3xl font-bold">پروژه دیتابیس</h1>
          <h2 className="mt-4 mb-2 text-xl font-semibold">آرین ابوالحسنی</h2>
          <h2 className="text-xl font-semibold">سالار شهسوند</h2>
        </div>

        <div className="border-2 border-gray-300 rounded-lg overflow-scroll shadow-sm max-h-[600px] max-w-full">
          <table>
            <thead>
              {fetchedData && (
                <tr className="divide-x-2 divide-white">
                  {Object.keys(fetchedData[0]).map((tableHeader) => {
                    return <TableHeaderCell>{tableHeader}</TableHeaderCell>;
                  })}
                </tr>
              )}
            </thead>
            <tbody className="divide-y-2 divide-gray-400">
              {fetchedData?.map((data: any) => {
                return (
                  <tr>
                    {Object.values(data).map((eachData: any) => {
                      return <TableDataCell>{eachData}</TableDataCell>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 justify-center items-center mt-4">
          <button
            className="bg-emerald-500 px-3 py-2 rounded-lg drop-shadow-sm transition-all duration-200 text-white font-semibold hover:scale-105 hover:bg-emerald-400 hover:drop-shadow-lg"
            onClick={async () => {
              const data = await getGames();
              setFetchedData(data);
            }}
          >
            نماش بازی ها
          </button>
          <button
            className="bg-emerald-500 px-3 py-2 rounded-lg drop-shadow-sm transition-all duration-200 text-white font-semibold hover:scale-105 hover:bg-emerald-400 hover:drop-shadow-lg"
            onClick={async () => {
              const data = await getPlatforms();
              setFetchedData(data);
            }}
          >
            نماش پلتفورم
          </button>
          <button
            className="bg-emerald-500 px-3 py-2 rounded-lg drop-shadow-sm transition-all duration-200 text-white font-semibold hover:scale-105 hover:bg-emerald-400 hover:drop-shadow-lg"
            onClick={async () => {
              const data = await getCustomers();
              setFetchedData(data);
            }}
          >
            نماش مشتریان
          </button>
          <button
            className="bg-emerald-500 px-3 py-2 rounded-lg drop-shadow-sm transition-all duration-200 text-white font-semibold hover:scale-105 hover:bg-emerald-400 hover:drop-shadow-lg"
            onClick={async () => {
              const data = await getRentals();
              setFetchedData(data);
            }}
          >
            نماش اجاره ها
          </button>
        </div>
      </div>
    </>
  );
}
