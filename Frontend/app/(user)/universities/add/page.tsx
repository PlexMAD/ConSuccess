"use client";

import { fetchCities } from "@/shared/api/cities";
import { City } from "@/shared/types/universities";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddUniversityPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [cityId, setCityId] = useState<number | "">("");
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCities().then(setCities).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || cityId === "") return;

    setSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/universities", { name, cityId: Number(cityId) });
      router.push("/universities");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Что-то пошло не так");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-4">
      <h1 className="text-2xl font-semibold font-geist">Добавить университет</h1>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Название университета</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vilnius University"
          required
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Город</label>
        <select
          value={cityId}
          onChange={(e) => setCityId(Number(e.target.value))}
          required
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Выберите город</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {submitting ? "Добавление..." : "Добавить"}
      </button>
    </form>
  );
};

export default AddUniversityPage;
